import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kết Quả Xổ Số',
  description: 'Cập nhật kết quả xổ số nhanh nhất, chính xác nhất.',
};

async function getLatestLottery() {
  try {
    // In a real deployed app, this would be an environment variable
    const res = await fetch('http://127.0.0.1:8000/api/lottery/latest', {
      // SSG/ISR caching logic để đáp ứng CDN Cache rules
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function Home() {
  const lotteryData = await getLatestLottery();

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 text-gray-900 p-4">
      {/* Container: 1 col for mobile, 2-cols for tablet, main+sidebar for desktop */}
      <div className="w-full max-w-[1320px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Main Content: Takes up full width on mobile/tablet, 2/3 width on desktop */}
        <main className="lg:col-span-2 space-y-6">
          <header className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h1 className="text-2xl sm:text-3xl font-bold text-red-600">
              Kết Quả Xổ Số {lotteryData?.data?.date || ''}
            </h1>
          </header>

          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            {lotteryData && lotteryData.data ? (
              <div className="space-y-6">
                <div className="mb-6 flex flex-col items-center">
                  <span className="text-gray-500 font-semibold mb-2 text-sm sm:text-base">ĐẶC BIỆT</span>
                  <span className="text-4xl sm:text-5xl font-bold text-red-500 tracking-wider">
                    {lotteryData.data.special}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 text-center border-t border-gray-100 pt-4">
                  <div className="font-semibold text-gray-600 sm:col-span-1 flex items-center justify-center">Giải Nhất</div>
                  <div className="text-xl sm:text-2xl font-bold sm:col-span-3">{lotteryData.data.first}</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 text-center border-t border-gray-100 pt-4">
                  <div className="font-semibold text-gray-600 sm:col-span-1 flex items-center justify-center">Giải Nhì</div>
                  <div className="flex gap-4 sm:gap-6 justify-center text-lg sm:text-xl font-bold sm:col-span-3">
                    {lotteryData.data.second.map((num: string, idx: number) => (
                      <span key={idx}>{num}</span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 text-center border-t border-gray-100 pt-4">
                  <div className="font-semibold text-gray-600 sm:col-span-1 flex items-center justify-center">Giải Ba</div>
                  <div className="grid grid-cols-3 gap-y-2 gap-x-4 justify-center text-lg sm:text-xl font-bold sm:col-span-3">
                    {lotteryData.data.third.map((num: string, idx: number) => (
                      <span key={idx}>{num}</span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 text-center border-t border-gray-100 pt-4">
                  <div className="font-semibold text-gray-600 sm:col-span-1 flex items-center justify-center">Giải Tư</div>
                  <div className="grid grid-cols-4 gap-y-2 gap-x-4 justify-center text-lg sm:text-xl font-bold sm:col-span-3">
                    {lotteryData.data.fourth.map((num: string, idx: number) => (
                      <span key={idx}>{num}</span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 text-center border-t border-gray-100 pt-4">
                  <div className="font-semibold text-gray-600 sm:col-span-1 flex items-center justify-center">Giải Năm</div>
                  <div className="grid grid-cols-3 gap-y-2 gap-x-4 justify-center text-lg sm:text-xl font-bold sm:col-span-3">
                    {lotteryData.data.fifth.map((num: string, idx: number) => (
                      <span key={idx}>{num}</span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 text-center border-t border-gray-100 pt-4">
                  <div className="font-semibold text-gray-600 sm:col-span-1 flex items-center justify-center">Giải Sáu</div>
                  <div className="grid grid-cols-3 gap-y-2 gap-x-4 justify-center text-lg sm:text-xl font-bold sm:col-span-3 text-pink-600">
                    {lotteryData.data.sixth.map((num: string, idx: number) => (
                      <span key={idx}>{num}</span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 text-center border-t border-gray-100 pt-4 pb-2">
                  <div className="font-semibold text-gray-600 sm:col-span-1 flex items-center justify-center">Giải Bảy</div>
                  <div className="grid grid-cols-4 gap-y-2 gap-x-4 justify-center text-2xl font-bold sm:col-span-3 text-red-700">
                    {lotteryData.data.seventh.map((num: string, idx: number) => (
                      <span key={idx}>{num}</span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-10">
                Hệ thống đang kết nối... vui lòng F5 lại trang hoặc chờ.
              </div>
            )}
          </section>

          {/* Quy tắc Quảng cáo: Ads after results, no popups, no redirect */}
          <div className="bg-gray-200 h-32 flex items-center justify-center text-gray-500 rounded-lg shadow-sm border border-gray-300">
            [Vùng Đặt Quảng Cáo An Toàn - Không Popup]
          </div>
        </main>

        {/* Sidebar: Hidden on mobile unless scrolled, shown beside on desktop/tablet */}
        <aside className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Tiện Ích Nhỏ</h2>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="hover:text-blue-500 cursor-pointer transition">🔍 Dò Vé Số Nhanh</li>
              <li className="hover:text-blue-500 cursor-pointer transition">📖 Giải Mã Giấc Mơ</li>
              <li className="hover:text-blue-500 cursor-pointer transition">📊 Thống Kê Chu Kỳ</li>
            </ul>
          </div>

          <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
            <h3 className="text-lg font-semibold text-indigo-800 mb-2">Tải Ứng Dụng</h3>
            <p className="text-sm text-indigo-600 mb-4">Trải nghiệm mượt mà hơn với ứng dụng mobile-first.</p>
            <button className="bg-indigo-600 text-white w-full py-2 rounded font-medium hover:bg-indigo-700 transition">
              Tải App Ngay
            </button>
          </div>
        </aside>

      </div>
    </div>
  );
}
