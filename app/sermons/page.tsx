import { createClient } from '@/utils/supabase/server'
export const metadata = { title: '최근 설교 | 포천중앙침례교회' }

export default async function SermonsPage() {
  const supabase = await createClient()
  const { data: siteSettings } = await supabase.from('site_settings').select('*').single()
  const playlistId = siteSettings?.sermons_playlist_id || process.env.NEXT_PUBLIC_YT_PLAYLIST_ID || 'PLoZ9GtdU4gCMLmyZchaGKz-cG14MFgMNo'
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Featured Sermon */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent pointer-events-none" />
          <div className="relative">
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/videoseries?list=${playlistId}`}
                title="최근 설교 재생목록"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="absolute left-0 right-0 bottom-0 p-6 md:p-8 flex flex-col md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white drop-shadow">최근 설교</h1>
                <p className="mt-1 text-white/90 text-sm md:text-base">주일예배 설교 영상을 시청하실 수 있습니다.</p>
              </div>
              <a
                href={`https://www.youtube.com/playlist?list=${playlistId}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 md:mt-0 inline-flex items-center rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2"
              >
                동영상 보기
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


