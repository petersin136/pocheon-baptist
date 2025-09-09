export const metadata = { title: '담임목사·리더십 | 포천중앙침례교회' }

export default function StaffPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-10 shadow-sm">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">담임목사·리더십</h1>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[1,2,3].map((i)=> (
              <div key={i} className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://picsum.photos/seed/staff${i}/800/500`} alt="리더 사진" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <div className="text-lg font-semibold text-gray-900">리더 {i}</div>
                  <div className="mt-1 text-sm text-gray-600">사역 분야 소개가 들어갑니다.</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}


