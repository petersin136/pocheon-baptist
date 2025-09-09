import Link from 'next/link'
import FindUs from '@/components/FindUs'

export const metadata = {
  title: '처음 오시는 분들께 | 포천중앙침례교회',
  description: '처음 방문하시는 분들을 위한 안내입니다.',
}

export default function NewcomersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white">
          <div className="absolute -top-24 -right-16 w-72 h-72 bg-yellow-300/30 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -left-16 w-80 h-80 bg-purple-300/30 blur-3xl rounded-full" />
          <div className="relative px-6 py-12 md:px-12 md:py-16 text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900">처음 오시는 분들을 환영합니다</h1>
            <p className="mt-4 text-gray-600 text-lg">하나님을 예배하며 함께 가족 되는 기쁨을 누리세요.</p>
            <div className="mt-6 inline-flex gap-3">
              <Link href="/services" className="rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-5 py-3">예배시간 보기</Link>
              <Link href="/location" className="rounded-lg border border-gray-300 hover:bg-gray-50 px-5 py-3 text-gray-700">찾아오는 길</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 담임목사 인사말 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 items-start">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1544006659-f0b21884ce1d?auto=format&fit=crop&w=1200&q=80"
              alt="담임목사 사진"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900">담임목사 인사말</h2>
            <p className="mt-4 text-gray-700 leading-7">
              포천중앙침례교회를 찾아주신 여러분을 진심으로 환영합니다. 우리 교회는 말씀과 기도로 세워져
              예수 그리스도의 사랑을 삶으로 드러내는 공동체가 되기를 소망합니다. 처음 오셔도 낯설지 않도록
              안내팀과 새가족 부서가 함께 동행하겠습니다. 주일예배에 함께 참여하시고, 소그룹 교제 속에서
              하나님의 은혜를 깊이 경험하시길 축복합니다.
            </p>
            <p className="mt-3 text-gray-700 leading-7">“오라 우리가 여호와께로 돌아가자”(호 6:1)</p>
            <div className="mt-6 text-sm text-gray-500">담임목사 드림</div>
          </div>
        </div>
      </section>

      {/* 무엇을 기대하나요 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h3 className="text-xl font-semibold text-gray-900">무엇을 기대하나요?</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[{
            t:'따뜻한 환영', d:'첫 방문부터 안내팀이 예배 자리와 다음 일정까지 세심히 도와드립니다.'
          },{
            t:'말씀 중심 예배', d:'찬양과 기도, 성경 말씀 선포를 통해 하나님께 집중합니다.'
          },{
            t:'다음세대 배려', d:'영아/유치/아동/청소년 예배와 안전한 돌봄 환경을 제공합니다.'
          },{
            t:'주차/편의', d:'교회 앞·인근 공영주차장 이용 가능, 음료/안내 데스크 운영.'
          },{
            t:'소그룹 교제', d:'예배 후 목장/부서 모임에서 서로를 격려하고 삶을 나눕니다.'
          },{
            t:'새가족 과정', d:'간단한 등록 후 2~3주 과정으로 교회 소개와 신앙 기초를 안내합니다.'
          }].map((item,i)=> (
            <div key={i} className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
              <div className="text-lg font-semibold text-gray-900">{item.t}</div>
              <p className="mt-2 text-sm leading-6 text-gray-700">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 첫 방문 가이드 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
          <h3 className="text-xl font-semibold text-gray-900">첫 방문 가이드</h3>
          <ol className="mt-4 space-y-3 text-sm text-gray-700">
            <li><span className="font-semibold text-gray-900">1) 주일 10~15분 일찍</span> 도착해 새가족 데스크에서 간단 등록</li>
            <li><span className="font-semibold text-gray-900">2) 안내팀 동행</span>으로 예배 자리 안내 및 자녀 부서 배정</li>
            <li><span className="font-semibold text-gray-900">3) 예배 후 환영 다과</span> 및 소그룹/사역 안내</li>
          </ol>
          <div className="mt-6">
            <Link href="/services" className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black">예배시간 자세히 보기</Link>
          </div>
        </div>
      </section>

      {/* 사역 소개 하이라이트 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h3 className="text-xl font-semibold text-gray-900">사역 소개</h3>
        <div className="mt-4 grid gap-6 md:grid-cols-3">
          {[{
            t:'주일학교', d:'예배와 성경교육, 즐거운 액티비티로 복음의 기초를 세웁니다.'
          },{
            t:'학생부/청년부', d:'말씀과 공동체 훈련으로 다음세대의 비전을 세웁니다.'
          },{
            t:'선교/나눔', d:'지역사회 섬김과 해외선교를 통해 복음을 전합니다.'
          }].map((item,i)=> (
            <div key={i} className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
              <div className="text-lg font-semibold text-gray-900">{item.t}</div>
              <p className="mt-2 text-sm leading-6 text-gray-700">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 찾아오시는 길 (기존 컴포넌트) */}
      <FindUs />

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h3 className="text-xl font-semibold text-gray-900">자주 묻는 질문</h3>
        <div className="mt-4 space-y-3">
          {[{
            q:'복장은 어떻게 하나요?', a:'자유로운 복장으로 오시면 됩니다. 예배에 집중할 수 있는 단정한 복장을 권합니다.'
          },{
            q:'아이들과 함께 예배드려도 되나요?', a:'가능합니다. 동시에 영아/유치/아동부 예배가 준비되어 있어 편하신 방법으로 참여하실 수 있습니다.'
          },{
            q:'주차는 어디에 하나요?', a:'교회 앞 및 인근 공영주차장을 이용하실 수 있습니다. 주일에는 안내팀이 도와드립니다.'
          }].map((f,i)=> (
            <details key={i} className="rounded-xl border border-gray-200 bg-white p-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-900">{f.q}</summary>
              <p className="mt-2 text-sm text-gray-700 leading-6">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 문의 CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-yellow-50 to-white p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-900">더 궁금하신가요?</h4>
              <p className="mt-1 text-sm text-gray-700">언제든지 문의해 주세요. 기쁨으로 도와드리겠습니다.</p>
            </div>
            <Link href="/contact" className="inline-flex items-center rounded-md bg-yellow-500 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-600">문의하기</Link>
          </div>
        </div>
      </section>
    </div>
  )
}


