import { createClient } from '@/utils/supabase/server'
import { createAdminClient } from '@/utils/supabase/admin'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

const CATEGORIES = [
  { slug: 'events', label: '교회행사' },
  { slug: 'missions', label: '선교보고' },
  { slug: 'youth', label: '청년부' },
  { slug: 'students', label: '학생부' },
  { slug: 'children', label: '주일학교' },
]

async function listRecent() {
  // 목록 조회는 일반 서버 클라이언트로 충분
  const supabase = await createClient()
  const base = supabase.storage.from('assets')
  const results: { url: string; path: string }[] = []
  for (const c of CATEGORIES) {
    const { data } = await base.list(c.slug, { limit: 24, sortBy: { column: 'name', order: 'desc' } })
    for (const f of data || []) {
      const full = `${c.slug}/${f.name}`
      const { data: pub } = base.getPublicUrl(full)
      if (pub?.publicUrl) results.push({ url: pub.publicUrl, path: full })
    }
  }
  return results
}

async function uploadAction(formData: FormData) {
  'use server'
  const category = String(formData.get('category') || '')
  const file = formData.get('file') as File | null
  const caption = String(formData.get('caption') || '')
  if (!category || !file) {
    console.error('Upload aborted: missing category or file')
    return
  }

  const supabase = createAdminClient()
  const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`
  const storagePath = `${category}/${fileName}`

  // Upload image to gallery bucket
  // Convert to bytes explicitly to avoid platform-specific File handling issues
  const bytes = await file.arrayBuffer()
  const { data: uploaded, error: upErr } = await supabase.storage
    .from('assets')
    .upload(storagePath, bytes, { cacheControl: '3600', upsert: false, contentType: file.type || 'application/octet-stream' })
  if (upErr) {
    console.error('Upload error:', upErr)
    throw new Error(`Upload failed: ${upErr.message}`)
  }
  console.log('Upload success:', uploaded)

  // Save caption alongside the image in the same bucket as a .txt file
  const captionBlob = new Blob([caption], { type: 'text/plain; charset=utf-8' })
  const { error: capErr } = await supabase.storage
    .from('assets')
    .upload(`${storagePath}.txt`, captionBlob, { upsert: true })

  if (capErr) {
    console.error('Caption save error:', capErr)
  }

  revalidatePath('/manage/gallery')
  revalidatePath('/gallery')
  redirect('/manage/gallery')
}

export const metadata = { title: '관리자 · 갤러리' }

export default async function ManageGalleryPage() {
  const recent = await listRecent()
  const supabase = await createClient()
  const captions: Record<string, string> = {}
  const meta = supabase.storage.from('assets')
  for (const item of recent) {
    try {
      const { data } = await meta.download(`${item.path}.txt`)
      if (data) captions[item.path] = await data.text()
    } catch {}
  }

  async function saveCaption(formData: FormData) {
    'use server'
    const imagePath = String(formData.get('image_path') || '')
    const caption = String(formData.get('caption') || '')
    if (!imagePath) return
    const supa = await createClient()
    const blob = new Blob([caption], { type: 'text/plain; charset=utf-8' })
    await supa.storage.from('assets').upload(`${imagePath}.txt`, blob, { upsert: true })
    revalidatePath('/manage/gallery')
    revalidatePath('/gallery')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold text-gray-900">갤러리 업로드</h1>
        <p className="mt-2 text-sm text-gray-600">카테고리 선택 → 이미지 업로드 → 캡션 저장. (업로드 정책에 따라 인증이 필요할 수 있습니다)</p>

        <form action={uploadAction} className="mt-6 rounded-xl bg-white p-4 shadow border border-gray-100">
          <div className="grid gap-4 md:grid-cols-3 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700">카테고리</label>
              <select name="category" className="mt-1 w-full rounded-md border-gray-300 focus:border-yellow-500 focus:ring-yellow-500">
                {CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.label}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">파일</label>
              <input name="file" type="file" accept="image/*" required className="mt-1 w-full rounded-md border-gray-300 focus:border-yellow-500 focus:ring-yellow-500" />
            </div>

            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700">캡션</label>
              <textarea name="caption" rows={3} placeholder="사진 설명을 입력하세요." className="mt-1 w-full rounded-md border-gray-300 focus:border-yellow-500 focus:ring-yellow-500" />
            </div>

            <div className="md:col-span-3 flex justify-end">
              <button type="submit" className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black">업로드</button>
            </div>
          </div>
        </form>

        <h2 className="mt-10 text-lg font-semibold text-gray-900">최근 업로드 (일부)</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {recent.map((r) => (
            <div key={r.path} className="overflow-hidden rounded-xl bg-white border border-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.url} alt={r.path} className="aspect-[4/3] w-full object-cover" />
              <div className="px-3 py-2 border-t">
                <div className="text-xs text-gray-500 truncate">{r.path}</div>
                <form action={saveCaption} className="mt-2 grid gap-2 md:grid-cols-[1fr_auto] items-start">
                  <input type="hidden" name="image_path" value={r.path} />
                  <textarea name="caption" defaultValue={captions[r.path] || ''} placeholder="캡션을 입력하세요" rows={2} className="rounded-md border-gray-300 w-full" />
                  <button type="submit" className="px-3 py-2 rounded-md bg-gray-900 text-white text-xs font-semibold hover:bg-black">저장</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


