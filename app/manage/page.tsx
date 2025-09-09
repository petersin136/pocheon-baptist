import Link from 'next/link'

export const metadata = { title: '관리자 대시보드' }

export default function ManageDashboard() {
  const cards = [
    { href: '/manage/gallery', title: '갤러리 관리', desc: '이미지 업로드, 캡션 편집, 목록 관리' },
    { href: '/manage/services', title: '예배시간 관리', desc: '예배 시간/장소/정렬 편집' },
    { href: '/manage/hero', title: '히어로 · 문구 편집', desc: '메인 슬로건/환영문, 배경 미디어' },
  ]
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold text-gray-900">관리자 대시보드</h1>
        <p className="mt-2 text-sm text-gray-600">자주 사용하는 관리 섹션으로 이동하세요.</p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <Link key={c.href} href={c.href} className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all">
              <div className="text-lg font-semibold text-gray-900 group-hover:text-gray-700">{c.title}</div>
              <div className="mt-2 text-sm text-gray-600">{c.desc}</div>
              <div className="mt-4 inline-flex items-center text-sm text-gray-500 group-hover:text-gray-700">바로가기 →</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}



