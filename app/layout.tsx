// import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "포천중앙침례교회 - 오직 예수! 오직 전도!",
  description: "하나님을 예배하고 이웃을 섬기는 포천중앙침례교회에 오신 것을 환영합니다.",
};

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <span className="text-black font-bold text-sm">포중</span>
              </div>
              <span className="ml-3 text-white font-bold">포천중앙침례교회</span>
            </Link>
          </div>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden lg:flex items-center space-x-8">
            <div className="relative group">
              <button className="text-white hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center">
                교회소개
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                <div className="py-2">
                  <Link href="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">인사말</Link>
                  <Link href="/vision" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">비전·표어</Link>
                  <Link href="/staff" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">담임목사·리더십</Link>
                  <Link href="/location" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">찾아오는 길</Link>
                </div>
              </div>
            </div>

            <div className="relative group">
              <button className="text-white hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center">
                예배안내
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                <div className="py-2">
                  <Link href="/services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">예배시간</Link>
                  <Link href="/newcomers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">처음 오시는 분들께</Link>
                </div>
              </div>
            </div>

            <div className="relative group">
              <button className="text-white hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center">
                말씀/설교
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                <div className="py-2">
                  <Link href="/sermons" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">최근 설교</Link>
                  <Link href="/sermon-series" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">설교 시리즈</Link>
                </div>
              </div>
            </div>

            <div className="relative group">
              <button className="text-white hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center">
                교회소식
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                <div className="py-2">
                  <Link href="/news" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">공지사항</Link>
                  <Link href="/events" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">행사안내</Link>
                </div>
              </div>
            </div>

            <div className="relative group">
              <button className="text-white hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center">
                사역안내
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                <div className="py-2">
                  <Link href="/ministries/youth" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">청년부</Link>
                  <Link href="/ministries/teen" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">중고등부</Link>
                  <Link href="/ministries/children" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">주일학교</Link>
                  <Link href="/ministries/choir" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">야다 찬양단</Link>
                  <Link href="/ministries/groups" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">목장모임</Link>
                </div>
              </div>
            </div>

            <Link href="/gallery" className="text-white hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-colors duration-200">
              갤러리
            </Link>
          </nav>

          {/* SNS 아이콘 */}
          <div className="hidden lg:flex items-center space-x-4">
            <a href="#" className="text-white hover:text-yellow-400 transition-colors duration-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
              </svg>
            </a>
            <a href="#" className="text-white hover:text-yellow-400 transition-colors duration-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <div className="lg:hidden">
            <button className="text-white hover:text-yellow-400 transition-colors duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}