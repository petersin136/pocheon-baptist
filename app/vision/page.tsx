export const metadata = { title: '비전·표어 | 포천중앙침례교회' }

export default function VisionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-10 shadow-sm">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">비전·표어</h1>
          <p className="mt-6 text-gray-700 leading-7">
            우리 교회의 비전은 “제자 되고 제자 삼자”입니다. 예수 그리스도를 닮아가는 삶을 목표로,
            말씀과 기도, 예배와 섬김 속에서 성숙한 그리스도인을 세워갑니다.
          </p>
          <ul className="mt-6 list-disc pl-5 text-gray-700 leading-7">
            <li>하나님 중심의 예배 공동체</li>
            <li>사랑과 나눔의 섬김 공동체</li>
            <li>다음세대를 세우는 제자 공동체</li>
          </ul>
        </div>
      </section>
    </div>
  )
}


