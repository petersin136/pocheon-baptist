import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function Index() {
  const supabase = await createClient()
  
  // 사이트 설정 불러오기
  const { data: siteSettings } = await supabase
    .from('site_settings')
    .select('*')
    .single()
  
  // 예배시간 불러오기
  const { data: serviceTimes } = await supabase
    .from('service_times')
    .select('*')
    .eq('is_active', true)
    .order('display_order')

  return (
    <div className="min-h-screen">
      {/* Hero 섹션 - HTB 스타일 */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 배경 영상 */}
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={siteSettings?.hero_image_url || 'https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'}
          >
            <source src="https://bvhqpdtajkluuowjrkly.supabase.co/storage/v1/object/public/hero-videos/203678-922748476_medium.mp4" type="video/mp4" />
          </video>
          {/* 영상 위 그라데이션 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-blue-800/20"></div>
        </div>
        
        {/* 오버레이 */}
        <div className="absolute inset-0 bg-black/10 z-10"></div>
        
        {/* 히어로 콘텐츠 */}
        <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-up">
            {siteSettings?.main_slogan || '오직 예수! 오직 전도!'}
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-white/90 animate-fade-up animation-delay-300">
            {siteSettings?.welcome_message || '하나님을 예배하고 이웃을 섬기는 포천중앙침례교회에 오신 것을 환영합니다.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up animation-delay-600">
            <Link 
              href="/services" 
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
            >
              예배시간 보기
            </Link>
            <Link 
              href="/sermons" 
              className="border-2 border-white text-white hover:bg-white hover:text-black font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
            >
              최근 설교 보기
            </Link>
          </div>
        </div>
        
        {/* 스크롤 인디케이터 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* 예배시간 섹션 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              예배시간 안내
            </h2>
            <p className="text-gray-600 text-lg">
              하나님께 예배하며 함께 은혜를 나누는 시간입니다.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceTimes?.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.service_name}
                </h3>
                <p className="text-gray-600 mb-1">
                  {service.day_of_week} {service.time}
                </p>
                <p className="text-gray-500 text-sm">
                  {service.location}
                </p>
                {service.description && (
                  <p className="text-gray-600 text-sm mt-2">
                    {service.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 교회 비전 섹션 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {siteSettings?.vision_statement || '제자 되고 제자 삼자'}
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              하나님의 말씀을 중심으로 한 교회, 사랑과 섬김으로 지역사회와 함께하는 교회, 
              모든 세대가 함께 예배하고 성장하는 교회를 꿈꿉니다.
            </p>
          </div>
        </div>
      </section>

      {/* 연락처 섹션 */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">찾아오시는 길</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 mt-1 mr-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-medium">주소</p>
                    <p className="text-gray-300">{siteSettings?.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-5 h-5 mt-1 mr-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <div>
                    <p className="font-medium">전화번호</p>
                    <p className="text-gray-300">{siteSettings?.phone_1}</p>
                    {siteSettings?.phone_2 && (
                      <p className="text-gray-300">{siteSettings?.phone_2}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-6">방문을 환영합니다</h2>
              <p className="text-gray-300 mb-6">
                처음 오시는 분들을 위해 안내 도우미가 있습니다. 
                언제든지 편안하게 방문해주세요.
              </p>
              <Link 
                href="/contact" 
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition-colors duration-300 inline-block"
              >
                문의하기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}