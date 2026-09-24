import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS, MOCK_CLOSET } from '../data/mockData';
import { Product } from '../types';
import Navigation from '../components/Navigation';
import ProductCard from '../components/ProductCard';
import FloatingChatbot from '../components/FloatingChatbot';

interface WebClosetPageProps {
  isLoggedIn: boolean;
  onOpenLogin: () => void;
  onLogout: () => void; // ✦ onLogout 추가
  onProductClick: (product: Product) => void;
}

export default function WebClosetPage({ isLoggedIn, onOpenLogin, onLogout, onProductClick }: WebClosetPageProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'liked' | 'renting' | 'personal'>('liked');

  // 찜한 상품 (더미로 MOCK_PRODUCTS 중 일부 지정)
  const likedProducts = MOCK_PRODUCTS.filter((_, idx) => idx === 0 || idx === 1 || idx === 4);
  // 대여 중인 상품
  const rentingProducts = MOCK_PRODUCTS.filter((_, idx) => idx === 2);

  return (
    <div className="bg-[#F5F2EB] min-h-screen text-[#171b16] pb-24">
      
      {/* 상단 네비게이션 (✦ onLogout 전달 완료) */}
      <Navigation 
        activeView="web"
        onSwitchView={(view) => view === 'app' && navigate('/app')}
        isLoggedIn={isLoggedIn}
        onOpenLogin={onOpenLogin}
        onLogout={onLogout}
      />

      <div className="max-w-6xl mx-auto px-6 pt-10">
        
        {/* 프로필 요약 섹션 */}
        <div className="bg-white p-8 rounded-3xl border border-[#D5D0C4] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop" 
              alt="Profile" 
              className="w-20 h-20 rounded-full object-cover ring-4 ring-[#193D2A]/10 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold">김지수 님의 클로젯</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-[#BB5938] text-[10px] font-mono font-bold">
                  GOLD MEMBER
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1">스마트한 패션 재고 순환과 대여 라이프를 관리하는 공간입니다.</p>
            </div>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <div className="flex-1 md:flex-none text-center px-5 py-3 rounded-2xl bg-[#F5F2EB] border border-[#D5D0C4]">
              <p className="text-[10px] text-stone-500 font-mono">찜한 상품</p>
              <p className="text-base font-bold text-[#193D2A] mt-0.5">{likedProducts.length}개</p>
            </div>
            <div className="flex-1 md:flex-none text-center px-5 py-3 rounded-2xl bg-[#F5F2EB] border border-[#D5D0C4]">
              <p className="text-[10px] text-stone-500 font-mono">대여/반납 대기</p>
              <p className="text-base font-bold text-[#BB5938] mt-0.5">{rentingProducts.length}개</p>
            </div>
          </div>
        </div>

        {/* 탭 메뉴 */}
        <div className="mt-10 flex gap-3 border-b border-[#D5D0C4] pb-4">
          {[
            { id: 'liked', label: '🤍 찜한 대여 상품', count: likedProducts.length },
            { id: 'renting', label: '📦 대여/반납 현황', count: rentingProducts.length },
            { id: 'personal', label: '🧥 나의 소장 옷장', count: MOCK_CLOSET.length },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
                activeTab === tab.id 
                  ? 'bg-[#193D2A] text-white border-[#193D2A] shadow-sm' 
                  : 'bg-white text-stone-700 border-[#D5D0C4] hover:bg-stone-50'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* 탭별 컨텐츠 내용 */}
        <div className="mt-8">
          
          {/* 1. 찜한 상품 탭 */}
          {activeTab === 'liked' && (
            <div>
              {likedProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
                  {likedProducts.map(item => (
                    <ProductCard key={item.id} item={item} onClick={onProductClick} />
                  ))}
                </div>
              ) : (
                <div className="py-24 text-center bg-white rounded-3xl border border-[#D5D0C4]">
                  <p className="text-xs text-stone-500">찜한 대여 상품이 없습니다.</p>
                </div>
              )}
            </div>
          )}

          {/* 2. 대여/반납 현황 탭 */}
          {activeTab === 'renting' && (
            <div className="space-y-4">
              {rentingProducts.map(item => (
                <div key={item.id} className="bg-white p-6 rounded-3xl border border-[#D5D0C4] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <img src={item.image} alt={item.name} className="w-20 h-24 rounded-2xl object-cover bg-stone-100" />
                    <div>
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-[#193D2A] text-[9px] font-mono font-bold">대여 중 (반납 D-4)</span>
                      <h3 className="text-sm font-bold mt-1">{item.name}</h3>
                      <p className="text-xs text-stone-500">{item.brand} · 사이즈: S</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                    <button 
                      onClick={() => navigate(`/product/${item.id}`)}
                      className="px-4 py-2.5 rounded-xl bg-stone-100 text-stone-700 text-xs font-bold hover:bg-stone-200 transition-all"
                    >
                      상세 보기
                    </button>
                    <button 
                      onClick={() => alert('반납 신청이 완료되었습니다. 수거 일정을 안내해 드릴게요!')}
                      className="px-5 py-2.5 rounded-xl bg-[#BB5938] text-white text-xs font-bold shadow hover:opacity-90 transition-all"
                    >
                      반납 신청하기
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 3. 나의 소장 옷장 탭 */}
          {activeTab === 'personal' && (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {MOCK_CLOSET.map(c => (
                  <div key={c.id} className="bg-white rounded-3xl p-4 border border-[#D5D0C4] shadow-sm group">
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-stone-100 mb-3 relative">
                      <img src={c.img} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-stone-900/70 text-white text-[9px] font-mono font-bold">
                        {c.category}
                      </span>
                    </div>
                    <p className="text-[10px] font-mono text-stone-400">{c.brand}</p>
                    <p className="text-xs font-bold text-stone-900 mt-0.5">{c.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      <FloatingChatbot />

    </div>
  );
}