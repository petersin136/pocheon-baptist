"use client"
import React from "react";

export default function FindUs() {
  const addr = "경기 포천시 중앙로75번길 34";
  const placeName = "포천중앙침례교회";

  // 지도/길찾기 링크 (클릭 시 새 탭)
  const q = encodeURIComponent(`${placeName} ${addr}`);
  const googleDir = `https://www.google.com/maps/dir/?api=1&destination=${q}`;
  const naverDir = `https://map.naver.com/v5/search/${q}`;
  const kakaoDir = `https://map.kakao.com/?q=${q}`;

  return (
    <section
      id="find-us"
      className="mx-auto max-w-5xl px-4 py-10 md:py-16"
      aria-labelledby="find-us-heading"
    >
      {/* SEO 구조화 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Church",
            name: placeName,
            address: {
              "@type": "PostalAddress",
              streetAddress: "중앙로75번길 34",
              addressLocality: "포천시",
              addressRegion: "경기도",
              addressCountry: "KR",
            },
            url: "https://", // 사이트 도메인으로 교체
            geo: { "@type": "GeoCoordinates" },
          }),
        }}
      />
      <h2 id="find-us-heading" className="text-2xl md:text-3xl font-bold">
        찾아오시는 길
      </h2>

      {/* 주소 + 복사 버튼 */}
      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto] items-start">
        <div className="rounded-2xl border p-4">
          <p className="text-sm text-gray-500">주소</p>
          <p className="mt-1 text-lg md:text-xl font-semibold">
            {addr} <span className="text-gray-400">({placeName})</span>
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={googleDir}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border px-3 py-2 text-sm hover:shadow"
            >
              구글 지도 길찾기
            </a>
            <a
              href={naverDir}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border px-3 py-2 text-sm hover:shadow"
            >
              네이버 지도 길찾기
            </a>
            <a
              href={kakaoDir}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border px-3 py-2 text-sm hover:shadow"
            >
              카카오맵 길찾기
            </a>
            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(`${placeName} - ${addr}`);
                  alert("주소가 복사되었습니다.");
                } catch {
                  alert("복사에 실패했어요. 길찾기 버튼을 이용해 주세요.");
                }
              }}
              className="rounded-xl border px-3 py-2 text-sm hover:shadow"
            >
              주소 복사
            </button>
          </div>
        </div>

        {/* 간단 안내 카드 */}
        <div className="rounded-2xl border p-4 space-y-3">
          <div>
            <p className="text-sm font-medium">대중교통</p>
            <ul className="mt-1 list-disc pl-5 text-sm leading-6 text-gray-700">
              <li>가까운 주요 정류장: <b>포천시청</b>, <b>포천시외버스터미널</b></li>
              <li>해당 정류장 하차 후 교회까지 도보권</li>
              <li>의정부·동두천 방면에서 다수 시내/광역버스 운행</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium">자가용</p>
            <ul className="mt-1 list-disc pl-5 text-sm leading-6 text-gray-700">
              <li>네비게이션에 “{placeName}” 또는 주소 입력</li>
              <li>포천시청 인근, 교회 앞/주변 공영주차장 이용 가능</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium">예배 시작 전</p>
            <ul className="mt-1 list-disc pl-5 text-sm leading-6 text-gray-700">
              <li>주말에는 주변 도로가 혼잡할 수 있어 <b>조금 일찍</b> 출발을 권장합니다.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 임베드 지도 */}
      <div className="mt-8 rounded-2xl overflow-hidden border">
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <iframe
            title="포천중앙침례교회 위치"
            src={`https://www.google.com/maps?q=${q}&output=embed`}
            className="absolute inset-0 h-full w-full"
            loading="lazy"
          />
        </div>
        <p className="p-3 text-xs text-gray-500">
          * 대중교통 노선 및 도보 시간은 변동될 수 있으니 길찾기 링크에서 최신 경로를 확인해 주세요.
        </p>
      </div>
    </section>
  );
}



