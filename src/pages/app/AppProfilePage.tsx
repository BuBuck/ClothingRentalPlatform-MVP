import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';

interface AppProfilePageProps {
  isLoggedIn: boolean;
  onOpenLogin: () => void;
  onProductClick: (product: Product) => void;
}

export default function AppProfilePage({ isLoggedIn, onOpenLogin, onProductClick }: AppProfilePageProps) {
  const navigate = useNavigate();
  const { rentingItems } = useApp();

  useEffect(() => {
    if (!isLoggedIn) {
      onOpenLogin();
      navigate('/app');
    }
  }, [isLoggedIn, navigate, onOpenLogin]);

  if (!isLoggedIn) return null;

  // 로그인 상태일 때만 대여 중인 상품 목록 노출
  const activeRentingItems = isLoggedIn ? rentingItems : [];

  return (
    <section className="px-5 pt-5 pb-24 text-[#171b16]">
      {/* 프로필 상단 */}
      <div className="border-b pb-6 border-[#D5D0C4]">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-stone-200 overflow-hidden ring-2 ring-[#193D2A]/10">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop" alt="Profile" />
          </div>
          <div>
            <p className="font-mono text-[10px] font-bold text-[#BB5938]">MEMBER 01482 ✦ GOLD</p>
            <h1 className="mt-0.5 text-2xl font-bold">김지수 님</h1>
            <p className="mt-0.5 text-[12px] text-[#6c7068]">@jisoo.style</p>
          </div>
        </div>
      </div>
      
      {/* 포인트 및 ESG 카드 */}
      <div className="grid grid-cols-2 gap-2 mt-6">
        <div className="rounded-2xl p-4 flex flex-col justify-between bg-white border border-[#D5D0C4]">
          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6c7068]">W-E 포인트</p>
          <div className="mt-2 flex items-baseline gap-1">
            <b className="text-xl">12,400</b>
            <span className="text-[11px] font-bold text-[#BB5938]">P</span>
          </div>
        </div>
        <div className="rounded-2xl p-4 flex flex-col justify-between bg-[#193D2A]/5 border border-[#D5D0C4]">
          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#193D2A]">ESG 임팩트</p>
          <div className="mt-2 flex items-baseline gap-1">
            <b className="text-xl text-[#193D2A]">2.4</b>
            <span className="text-[11px] font-bold text-[#193D2A]">CO₂ kg</span>
          </div>
        </div>
      </div>

      {/* 대여 중인 상품 영역 */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-[#171b16]">현재 대여 중인 상품 ({activeRentingItems.length})</h2>
          <button onClick={() => alert('내역 페이지로 이동합니다.')} className="text-xs font-bold text-[#193D2A] hover:underline">
            + 자세히 보기
          </button>
        </div>

        {activeRentingItems.length === 0 ? (
          <div className="p-6 rounded-2xl bg-white border border-[#D5D0C4] text-center text-xs text-stone-400">
            현재 대여 중인 상품이 없습니다.
          </div>
        ) : (
          <div className="flex flex-nowrap gap-3 overflow-x-auto pb-2 scrollbar-none">
            {activeRentingItems.map((item, index) => (
              <div 
                key={index}
                onClick={() => onProductClick(item)}
                className="w-40 flex-shrink-0 bg-white rounded-2xl p-3 border border-[#D5D0C4] shadow-sm cursor-pointer hover:border-[#193D2A] transition-all"
              >
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-stone-100 mb-2">
                  <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#193D2A] text-white text-[9px] font-mono font-bold">
                    대여중
                  </span>
                </div>
                <p className="text-[9px] font-mono text-[#6c7068] font-bold">{item.brand}</p>
                <p className="text-xs font-bold truncate mt-0.5 text-[#171b16]">{item.name}</p>
                <p className="text-[10px] text-[#BB5938] font-bold mt-1">반납 D-4</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4">
        {['AI 사이즈 프로필', 'Wear-to-Earn 내역', '찜한 상품 (8)', '쿠폰함', '고객센터'].map(menu => (
          <button key={menu} className="flex w-full items-center justify-between border-b border-[#D5D0C4] py-4 text-left text-[14px] font-medium transition-all active:bg-gray-50">
            <span>{menu}</span>
            <span className="text-[12px] opacity-40">→</span>
          </button>
        ))}
      </div>
    </section>
  );
}