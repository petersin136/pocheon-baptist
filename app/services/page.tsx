import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export const metadata = {
  title: '예배시간 안내 | 포천중앙침례교회',
  description: '포천중앙침례교회의 예배시간과 장소를 안내합니다.',
}

export default async function ServicesPage() {
  const supabase = await createClient()

  const { data: siteSettings } = await supabase
    .from('site_settings')
    .select('*')
    .single()

  const { data: serviceTimes } = await supabase
    .from('service_times')
    .select('*')
    .eq('is_active', true)
    .order('display_order')

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-20">
          <div className="absolute -top-48 -left-48 w-[480px] h-[480px] rounded-full bg-yellow-400 blur-3xl" />
          <div className="absolute -bottom-48 -right-48 w-[520px] h-[520px] rounded-full bg-purple-400 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              예배시간 안내
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              {siteSettings?.welcome_message || '하나님께 드리는 모든 예배에 함께하시기 바랍니다.'}
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceTimes?.map((service) => (
              <div
                key={service.id}
                className="group relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute -right-16 -top-16 w-56 h-56 bg-yellow-400/30 blur-2xl rounded-full" />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">
                      {service.service_name}
                    </h3>
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-800">
                      {service.day_of_week}
                    </span>
                  </div>

                  <p className="mt-3 text-2xl font-semibold text-gray-800 tracking-wide">
                    {service.time}
                  </p>

                  {service.location && (
                    <p className="mt-2 text-gray-600">{service.location}</p>
                  )}

                  {service.description && (
                    <p className="mt-4 text-sm text-gray-600 leading-6">
                      {service.description}
                    </p>
                  )}
                </div>

                <div className="px-6 pb-6">
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                  <div className="mt-4 flex items-center justify-between">
                    <Link
                      href="/location"
                      className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      찾아오는 길
                    </Link>
                    <span className="text-xs text-gray-400">
                      {siteSettings?.address || '경기도 포천시'}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {!serviceTimes?.length && (
              <div className="col-span-full">
                <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center bg-white/50">
                  <p className="text-gray-600">예배 정보가 아직 등록되지 않았습니다.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl p-6 bg-gradient-to-br from-yellow-50 to-white border border-yellow-100">
            <h4 className="font-bold text-gray-900">예배 참석 안내</h4>
            <p className="mt-2 text-sm text-gray-600">
              처음 오시는 분들은 안내팀의 도움을 받으실 수 있습니다.
            </p>
          </div>
          <div className="rounded-2xl p-6 bg-gradient-to-br from-purple-50 to-white border border-purple-100">
            <h4 className="font-bold text-gray-900">주차 안내</h4>
            <p className="mt-2 text-sm text-gray-600">교회 앞, 인근 공영주차장 이용 가능합니다.</p>
          </div>
          <div className="rounded-2xl p-6 bg-gradient-to-br from-blue-50 to-white border border-blue-100">
            <h4 className="font-bold text-gray-900">유아/아동</h4>
            <p className="mt-2 text-sm text-gray-600">영아·유치·아동부 예배가 준비되어 있습니다.</p>
          </div>
        </div>
      </section>
    </div>
  )
}


