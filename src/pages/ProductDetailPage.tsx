import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../data/mockData';
import { useApp } from '../context/AppContext';

interface ProductDetailPageProps {
  isLoggedIn: boolean;
  onOpenLogin: () => void;
}

export default function ProductDetailPage({ isLoggedIn, onOpenLogin }: ProductDetailPageProps) {
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
    <div className="min-h-screen bg-[#F4F4F4] py-10 text-stone-900">
      <div className="max-w-4xl mx-auto px-4">
        <button onClick={() => navigate(-1)} className="text-sm font-bold mb-6 hover:underline">← 돌아가기</button>
        
        <div className="bg-white rounded-3xl p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
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
                    className={`flex-1 py-3 rounded-xl text-xs font-bold border transition-all ${selectedSize === size ? 'border-[#193D2A] bg-[#193D2A] text-white' : 'border-stone-200 text-stone-700'} ${currentlyRenting ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                    className={`flex-1 py-3 rounded-xl text-xs font-bold border transition-all ${rentalDays === days ? 'border-[#193D2A] bg-[#193D2A] text-white' : 'border-stone-200 text-stone-700'} ${currentlyRenting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {days}일 대여
                  </button>
                ))}
              </div>
            </div>

            {/* ✦ 하단 대여하기 버튼 (텍스트 레이아웃 분리 및 가독성 개선) */}
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
    </div>
  );
}