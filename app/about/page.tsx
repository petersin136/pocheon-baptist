import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'

export const metadata = {
  title: '인사말 | 포천중앙침례교회',
}

export default async function AboutPage() {
  const supabase = await createClient()
  const { data: siteSettings } = await supabase.from('site_settings').select('*').single()
  const lead = siteSettings?.welcome_message || '포천중앙침례교회를 방문해 주셔서 감사합니다. 말씀과 기도, 사랑의 실천으로 지역과 열방을 섬기는 공동체를 꿈꾸며, 처음 오신 분들도 가족처럼 환영합니다.'
  const pastorNote = siteSettings?.vision_statement || '주일예배에서 하나님을 깊이 예배하고, 소그룹 교제 속에서 서로를 격려하며, 다음 세대를 세우는 사역에 함께 동참하시길 초대합니다. 여러분의 삶에 하나님의 평강이 가득하길 기도합니다.'
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white">
          <div className="absolute -top-24 -right-16 w-72 h-72 bg-yellow-300/30 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -left-16 w-80 h-80 bg-purple-300/30 blur-3xl rounded-full" />
          <div className="relative grid md:grid-cols-[1.1fr_1fr] gap-8 items-center px-6 py-10 md:px-12 md:py-14">
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900">인사말</h1>
              <p className="mt-4 text-gray-700 text-lg leading-8 whitespace-pre-wrap">{lead}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/services" className="rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-5 py-3">예배시간 보기</Link>
                <Link href="/location" className="rounded-lg border border-gray-300 hover:bg-gray-50 px-5 py-3 text-gray-700">찾아오는 길</Link>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">담임목사 인사</h2>
              <p className="mt-3 text-gray-700 leading-7 whitespace-pre-wrap">{pastorNote}</p>
              <p className="mt-2 text-gray-600 text-sm">“오라 우리가 여호와께로 돌아가자” (호 6:1)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Three feature blocks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
            <div className="text-lg font-semibold text-gray-900">우리 교회는</div>
            <p className="mt-2 text-sm leading-6 text-gray-700">하나님 중심의 예배와 말씀, 기도, 사랑의 실천을 소중히 여깁니다.</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
            <div className="text-lg font-semibold text-gray-900">사명</div>
            <p className="mt-2 text-sm leading-6 text-gray-700">제자 되고 제자 삼는 공동체로 지역과 열방을 섬깁니다.</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
            <div className="text-lg font-semibold text-gray-900">핵심 가치</div>
            <ul className="mt-2 list-disc pl-5 text-sm leading-6 text-gray-700">
              <li>말씀과 기도</li>
              <li>사랑과 섬김</li>
              <li>다음 세대</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-yellow-50 to-white p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">주일에 함께 예배해요</h3>
              <p className="mt-1 text-sm text-gray-700">예배 안내를 확인하고 오시는 길을 참고하세요.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/services" className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black">예배시간</Link>
              <Link href="/location" className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">찾아오는 길</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


