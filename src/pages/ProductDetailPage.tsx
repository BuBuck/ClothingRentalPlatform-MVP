import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import Navigation from '../components/Navigation'; // ✦ 네비게이션 임포트
import FloatingChatbot from '../components/FloatingChatbot'; // ✦ 플로팅 챗봇 임포트

interface ProductDetailPageProps {
  isLoggedIn: boolean;
  onOpenLogin: () => void;
  onLogout: () => void; // ✦ 로그아웃 핸들러 추가
}

export default function ProductDetailPage({ isLoggedIn, onOpenLogin, onLogout }: ProductDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isRenting } = useApp();

  const product = MOCK_PRODUCTS.find(p => String(p.id) === String(id)) || MOCK_PRODUCTS[0];
  const [selectedSize, setSelectedSize] = useState('S');
  const [rentalDays, setRentalDays] = useState(3);

  const currentlyRenting = isRenting(product.id);

  const handleRentClick = () => {
    if (currentlyRenting) return;
    if (!isLoggedIn) {
      onOpenLogin();
      return;
    }
    navigate('/checkout', {
      state: { product, size: selectedSize, days: rentalDays }
    });
  };

  const totalPrice = product.price * rentalDays;

  return (
    <div className="bg-[#F5F2EB] min-h-screen text-[#171b16] pb-24">
      
      {/* ✦ 상단 네비게이션바 추가 (다른 웹 페이지들과 동일) */}
      <Navigation 
        activeView="web"
        onSwitchView={(view) => view === 'app' && navigate('/app')}
        isLoggedIn={isLoggedIn}
        onOpenLogin={onOpenLogin}
        onLogout={onLogout}
      />

      <div className="max-w-4xl mx-auto px-6 pt-10">
        <button onClick={() => navigate(-1)} className="text-xs font-bold mb-6 text-stone-600 hover:text-[#193D2A] transition-colors">
          ← 돌아가기
        </button>
        
        <div className="bg-white rounded-3xl p-8 border border-[#D5D0C4] shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 상품 이미지 */}
          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-stone-100 relative">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            {currentlyRenting && (
              <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center">
                <span className="px-5 py-2.5 bg-[#BB5938] text-white rounded-2xl font-mono text-sm font-bold shadow-lg">
                  현재 대여 중인 상품입니다 ✦
                </span>
              </div>
            )}
          </div>

          {/* 상품 상세 정보 */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="px-2.5 py-1 rounded bg-[#193D2A]/10 text-[#193D2A] text-[10px] font-mono font-bold uppercase">
                {product.tag}
              </span>
              <p className="text-xs font-mono font-bold text-stone-400">{product.brand}</p>
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <p className="text-xl font-bold text-[#193D2A]">
                ₩{product.price.toLocaleString()}<span className="text-xs font-normal text-stone-500"> /일</span>
              </p>
            </div>

            {/* 사이즈 선택 */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-stone-700">사이즈 선택</p>
              <div className="flex gap-2">
                {['XS', 'S', 'M', 'L'].map(size => (
                  <button 
                    key={size}
                    disabled={currentlyRenting}
                    onClick={() => setSelectedSize(size)}
                    className={`flex-1 py-3 rounded-xl text-xs font-bold border transition-all ${selectedSize === size ? 'border-[#193D2A] bg-[#193D2A] text-white shadow-xs' : 'border-[#D5D0C4] text-stone-700 bg-white hover:bg-stone-50'} ${currentlyRenting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* 대여 기간 선택 */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-stone-700">대여 기간</p>
              <div className="flex gap-2">
                {[3, 5, 7].map(days => (
                  <button 
                    key={days}
                    disabled={currentlyRenting}
                    onClick={() => setRentalDays(days)}
                    className={`flex-1 py-3 rounded-xl text-xs font-bold border transition-all ${rentalDays === days ? 'border-[#193D2A] bg-[#193D2A] text-white shadow-xs' : 'border-[#D5D0C4] text-stone-700 bg-white hover:bg-stone-50'} ${currentlyRenting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {days}일 대여
                  </button>
                ))}
              </div>
            </div>

            {/* 하단 대여하기 버튼 */}
            <button 
              onClick={handleRentClick}
              disabled={currentlyRenting}
              className={`w-full py-4 px-6 rounded-2xl flex items-center justify-between shadow-lg transition-all ${currentlyRenting ? 'bg-[#BB5938] text-white cursor-not-allowed opacity-90 justify-center' : 'bg-[#193D2A] text-white hover:bg-[#122b1e]'}`}
            >
              {currentlyRenting ? (
                <span className="text-xs md:text-sm font-bold">반납 대기 중인 대여 상품 (반납 D-4)</span>
              ) : (
                <>
                  <span className="text-xs font-medium text-emerald-200 font-mono">{rentalDays}일 총 대여료</span>
                  <span className="text-sm md:text-base font-bold">₩{totalPrice.toLocaleString()} 대여하기 →</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <FloatingChatbot />

    </div>
  );
}