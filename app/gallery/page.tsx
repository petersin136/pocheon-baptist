import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'

type Category = {
  slug: string
  label: string
  path: string
}

const CATEGORIES: Category[] = [
  { slug: 'all', label: '전체', path: '' },
  { slug: 'events', label: '교회행사', path: 'events' },
  { slug: 'missions', label: '선교보고', path: 'missions' },
  { slug: 'youth', label: '청년부', path: 'youth' },
  { slug: 'students', label: '학생부', path: 'students' },
  { slug: 'children', label: '주일학교', path: 'children' },
]

type GalleryItem = {
  url: string
  path: string
  name: string
  updatedAt?: string
  caption?: string
}

async function listCategoryImages(supabase: any, category: Category): Promise<GalleryItem[]> {
  try {
    const base = supabase.storage.from('assets')
    const listPath = category.path || ''
    const { data, error } = await base.list(listPath, {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'desc' },
    })
    if (error) {
      console.error('Storage list error:', error)
      return []
    }
    const items: GalleryItem[] = (data || [])
      .filter((x: any) => x?.name)
      .map((file: any) => {
        const full = category.path ? `${category.path}/${file.name}` : file.name
        const { data: pub } = base.getPublicUrl(full)
        return {
          url: pub.publicUrl,
          path: full,
          name: file.name as string,
          updatedAt: (file as any)?.updated_at ?? undefined,
        }
      })

    // 최신순 정렬(업데이트 시간이 있으면 우선, 없으면 이름 기준)
    items.sort((a, b) => {
      if (a.updatedAt && b.updatedAt) return a.updatedAt > b.updatedAt ? -1 : 1
      return a.name > b.name ? -1 : 1
    })
    return items
  } catch (e) {
    console.error('Storage fetch failed:', e)
    return []
  }
}

function fallbackImages(): GalleryItem[] {
  const samples = [
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac',
    'https://images.unsplash.com/photo-1529070538774-1843cb3265df',
    'https://images.unsplash.com/photo-1515165562835-c3b8c2b3a0b5',
    'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba',
  ]
  return samples.map((u, i) => ({ url: `${u}?auto=format&fit=crop&w=1200&q=80`, path: `sample/${i}`, name: `sample-${i}` }))
}

export const metadata = {
  title: '갤러리 | 포천중앙침례교회',
}

async function getCaptionsFor(items: GalleryItem[], supabase: any): Promise<Record<string, string>> {
  const meta = supabase.storage.from('assets')
  const result: Record<string, string> = {}
  for (const it of items) {
    try {
      const { data, error } = await meta.download(`${it.path}.txt`)
      if (!error && data) {
        const text = await data.text()
        result[it.path] = text
      }
    } catch {
      // ignore missing captions
    }
  }
  return result
}

async function getComments(imagePath?: string) {
  try {
    const supabase = await createClient()
    // Try select with image_path if column exists
    let query = supabase.from('gallery_comments')
      .select('id, gallery_id, display_name, content, created_at, image_path')
      .order('created_at', { ascending: false })
      .limit(50)
    if (imagePath) query = query.eq('image_path', imagePath)
    const { data, error } = await query
    if (error) return []
    return data ?? []
  } catch {
    return []
  }
}

async function addComment(formData: FormData) {
  'use server'
  const name = String(formData.get('name') || '').slice(0, 50)
  const content = String(formData.get('content') || '').slice(0, 500)
  const imagePath = String(formData.get('image_path') || '') || null
  if (!content) return
  try {
    const supabase = await createClient()
    // Try to insert with image_path if column exists
    const { error } = await supabase.from('gallery_comments').insert({ gallery_id: null, display_name: name || '익명', content, image_path: imagePath })
    if (error) {
      // Fallback without image_path
      await supabase.from('gallery_comments').insert({ gallery_id: null, display_name: name || '익명', content })
    }
  } catch (e) {
    console.error('comment insert failed', e)
  }
  revalidatePath('/gallery')
}

async function saveCaption(formData: FormData) {
  'use server'
  const imagePath = String(formData.get('image_path') || '')
  const caption = String(formData.get('caption') || '')
  if (!imagePath) return
  try {
    const supabase = await createClient()
    const meta = supabase.storage.from('assets')
    const blob = new Blob([caption], { type: 'text/plain; charset=utf-8' })
    await meta.upload(`${imagePath}.txt`, blob, { upsert: true })
  } catch (e) {
    console.error('save caption failed', e)
  }
  revalidatePath('/gallery')
}

export default async function GalleryPage({ searchParams }: { searchParams?: Promise<Record<string, string | string[] | undefined>> }) {
  const supabase = await createClient()
  const params = (await searchParams) || {}
  const currentSlug = (typeof params?.c === 'string' ? params.c : 'all') || 'all'
  const pageParam = (typeof params?.page === 'string' ? params.page : '1') || '1'
  const page = Math.max(1, Number.parseInt(pageParam, 10) || 1)
  const PAGE_SIZE = 12
  const viewPath = typeof params?.view === 'string' ? params.view : undefined
  const current = CATEGORIES.find((c) => c.slug === currentSlug) || CATEGORIES[0]

  let items: GalleryItem[] = []
  if (current.slug === 'all') {
    const lists = await Promise.all(CATEGORIES.filter((c) => c.slug !== 'all').map((c) => listCategoryImages(supabase, c)))
    items = lists.flat()
    // 최신순으로 한 번 더 정렬
    items.sort((a, b) => (a.updatedAt && b.updatedAt ? (a.updatedAt > b.updatedAt ? -1 : 1) : a.name > b.name ? -1 : 1))
  } else {
    items = await listCategoryImages(supabase as any, current)
  }

  const total = items.length
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const start = (page - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE
  let pageItems = items.slice(start, end)

  if (!pageItems.length) {
    pageItems = fallbackImages()
  }

  // fetch captions for current page items
  const captions = await getCaptionsFor(pageItems, supabase)
  pageItems = pageItems.map((it) => ({ ...it, caption: captions[it.path] }))

  // If single view mode
  if (viewPath) {
    const meta = supabase.storage.from('assets')
    const { data: pub } = meta.getPublicUrl(viewPath)
    const capMap = await getCaptionsFor([{ url: '', path: viewPath, name: '' }], supabase)
    const thisCaption = capMap[viewPath]
    const comments = await getComments(viewPath)
    // Prev/Next within current items
    const allPaths = items.map((x) => x.path)
    const idx = Math.max(0, allPaths.indexOf(viewPath))
    const prevPath = idx > 0 ? allPaths[idx - 1] : undefined
    const nextPath = idx < allPaths.length - 1 ? allPaths[idx + 1] : undefined

    const baseQuery = `/gallery?c=${current.slug}&page=${page}`
    const currentItem = items.find((x) => x.path === viewPath)
    const photoUrl = currentItem?.url || pub.publicUrl
    return (
      <div className="min-h-screen bg-white text-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <Link href={baseQuery} className="text-sm text-gray-600 hover:text-gray-900">← 목록으로</Link>
            <div className="flex items-center gap-2">
              {prevPath && (
                <Link href={`${baseQuery}&view=${encodeURIComponent(prevPath)}`} className="px-3 py-1.5 rounded border hover:bg-gray-50">이전</Link>
              )}
              {nextPath && (
                <Link href={`${baseQuery}&view=${encodeURIComponent(nextPath)}`} className="px-3 py-1.5 rounded border hover:bg-gray-50">다음</Link>
              )}
            </div>
          </div>

          <div className="mt-6 rounded-2xl overflow-hidden border border-gray-200 bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photoUrl} alt="photo" className="w-full h-auto object-contain" />
          </div>

          {/* 이미지 설명(읽기 전용) */}
          {thisCaption && (
            <div className="mt-4 text-base text-gray-700 whitespace-pre-wrap">{thisCaption}</div>
          )}

          {/* 댓글 */}
          <section className="mt-10">
            <h2 className="text-lg font-semibold">댓글</h2>
            <form action={addComment} className="mt-4 grid gap-3 md:grid-cols-[200px_1fr_auto] items-start">
              <input type="hidden" name="image_path" value={viewPath} />
              <input name="name" placeholder="이름(선택)" className="rounded-md border border-gray-300 px-3 py-2" />
              <textarea name="content" placeholder="응원/소감을 남겨주세요." required className="rounded-md border border-gray-300 px-3 py-2 md:col-span-1" rows={3} />
              <button type="submit" className="h-[42px] px-4 rounded-md bg-gray-900 text-white text-sm font-semibold hover:bg-black">등록</button>
            </form>
            <div className="mt-6 space-y-4">
              {comments.map((c: any) => (
                <div key={c.id} className="rounded-xl bg-white border border-gray-200 p-4">
                  <div className="text-sm text-gray-900 font-medium">{c.display_name || '익명'}</div>
                  <div className="mt-1 text-sm text-gray-700 whitespace-pre-wrap">{c.content}</div>
                  <div className="mt-1 text-xs text-gray-400">{new Date(c.created_at).toLocaleString('ko-KR')}</div>
                </div>
              ))}
              {!comments.length && (
                <p className="text-sm text-gray-500">아직 댓글이 없습니다. 첫 댓글을 남겨보세요.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    )
  }

  const comments = await getComments()

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">갤러리</h1>
        </div>

        {/* 카테고리 탭(링크) */}
        <div className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.slug === 'all' ? '/gallery' : `/gallery?c=${cat.slug}`}
              className={
                `inline-flex items-center rounded-full border px-4 py-2 text-sm transition-all ` +
                (cat.slug === current.slug ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200')
              }
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {/* 그리드 + 캡션 */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {pageItems.map((img) => {
            const base = `/gallery?c=${current.slug}${page > 1 ? `&page=${page}` : ''}`
            const href = `${base}&view=${encodeURIComponent(img.path)}`
            const Card = (
              <div className="group overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                <div className="relative w-full" style={{ paddingTop: '66%' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt={img.name} className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                {img.caption && (
                  <div className="px-4 py-3 text-sm text-gray-700 border-t bg-white/80">
                    {img.caption}
                  </div>
                )}
              </div>
            )
            return (
              <Link key={img.path} href={href}>{Card}</Link>
            )
          })}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <Link
              href={`/gallery?c=${current.slug}${page > 2 ? `&page=${page - 1}` : page === 2 ? '' : ''}`}
              className={`px-3 py-2 text-sm rounded border ${page === 1 ? 'pointer-events-none opacity-40' : 'hover:bg-gray-50'}`}
            >
              이전
            </Link>
            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1
              const base = `/gallery?c=${current.slug}`
              const href = p === 1 ? base : `${base}&page=${p}`
              return (
                <Link key={p} href={href} className={`px-3 py-2 text-sm rounded border ${p === page ? 'bg-gray-900 text-white border-gray-900' : 'hover:bg-gray-50'}`}>
                  {p}
                </Link>
              )
            })}
            <Link
              href={`/gallery?c=${current.slug}&page=${Math.min(totalPages, page + 1)}`}
              className={`px-3 py-2 text-sm rounded border ${page === totalPages ? 'pointer-events-none opacity-40' : 'hover:bg-gray-50'}`}
            >
              다음
            </Link>
          </div>
        )}

        {/* 댓글 섹션 */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900">댓글</h2>
          <form action={addComment} className="mt-4 grid gap-3 md:grid-cols-[200px_1fr_auto] items-start">
            <input name="name" placeholder="이름(선택)" className="rounded-md border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 px-3 py-2" />
            <textarea name="content" placeholder="응원/소감을 남겨주세요." required className="rounded-md border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 px-3 py-2 md:col-span-1" rows={3} />
            <button type="submit" className="h-[42px] px-4 rounded-md bg-gray-900 text-white text-sm font-semibold hover:bg-black">등록</button>
          </form>
          <div className="mt-6 space-y-4">
            {comments.map((c: any) => (
              <div key={c.id} className="rounded-xl bg-white border border-gray-100 p-4">
                <div className="text-sm text-gray-900 font-medium">{c.display_name || '익명'}</div>
                <div className="mt-1 text-sm text-gray-700 whitespace-pre-wrap">{c.content}</div>
                <div className="mt-1 text-xs text-gray-400">{new Date(c.created_at).toLocaleString('ko-KR')}</div>
              </div>
            ))}
            {!comments.length && (
              <p className="text-sm text-gray-500">아직 댓글이 없습니다. 첫 댓글을 남겨보세요.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}


