import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export default function AppProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isRenting, rentingItems, setDetailHeader } = useApp(); // ✦ setDetailHeader 가져오기

  const product = MOCK_PRODUCTS.find(p => String(p.id) === String(id)) || MOCK_PRODUCTS[0];
  
  const currentlyRenting = isRenting(product.id);
  const rentedItemInfo = currentlyRenting 
    ? rentingItems.find(item => String(item.id) === String(product.id)) 
    : null;

  const [selectedSize, setSelectedSize] = useState('S');
  const [rentalDays, setRentalDays] = useState(3);

  // ✦ 상세 페이지 진입 시 전역 헤더를 이 상품의 브랜드명으로 오버라이드, 이탈 시 복구
  useEffect(() => {
    setDetailHeader({
      brand: product.brand,
      onBack: () => navigate(-1)
    });

    return () => {
      setDetailHeader(null); // 다른 페이지로 갈 때는 기본 헤더로 원복
    };
  }, [product.brand, navigate, setDetailHeader]);

  useEffect(() => {
    if (currentlyRenting) {
      if (rentedItemInfo && (rentedItemInfo as any).size) {
        setSelectedSize((rentedItemInfo as any).size);
      }
      if (rentedItemInfo && (rentedItemInfo as any).days) {
        setRentalDays((rentedItemInfo as any).days);
      }
    }
  }, [currentlyRenting, rentedItemInfo]);

  const handleRentClick = () => {
    if (currentlyRenting) return;
    navigate('/app/checkout', {
      state: { product, size: selectedSize, days: rentalDays }
    });
  };

  return (
    <div className="pb-32 bg-white min-h-screen text-[#171b16]">
      
      {/* ✦ 기존 내부 상단 탭 코드 제거 완료 (AppLayout의 전역 헤더가 상단에 고정됨) */}

      {/* 상품 이미지 */}
      <div className="aspect-[3/4] bg-stone-100 overflow-hidden relative">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        {currentlyRenting && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center">
            <span className="px-4 py-2 bg-[#BB5938] text-white rounded-xl font-mono text-xs font-bold shadow-lg">
              현재 대여 중인 상품입니다 ✦
            </span>
          </div>
        )}
      </div>

      {/* 상품 정보 및 옵션 선택 영역 */}
      <div className="px-5 pt-6 space-y-4">
        <div>
          <p className="text-[10px] font-mono font-bold text-[#6c7068]">{product.brand}</p>
          <h2 className="text-lg font-bold mt-0.5">{product.name}</h2>
          <p className="text-sm font-bold text-[#193D2A] mt-1">₩{product.price.toLocaleString()}<span className="text-[11px] font-normal text-[#6c7068]"> /일</span></p>
        </div>

        {/* 사이즈 선택 */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between items-center">
            <p className="text-xs font-bold">사이즈 선택</p>
            {currentlyRenting && <span className="text-[10px] text-[#BB5938] font-bold">대여 완료된 사이즈</span>}
          </div>
          <div className="flex gap-2">
            {['XS', 'S', 'M', 'L'].map(size => {
              const isSelected = selectedSize === size;
              return (
                <button 
                  key={size}
                  onClick={() => {
                    if (currentlyRenting) return;
                    setSelectedSize(size);
                  }}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                    isSelected ? 'border-[#193D2A] bg-[#193D2A] text-white' : 'border-[#D5D0C4] text-stone-700'
                  } ${currentlyRenting ? 'cursor-default opacity-80' : ''}`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* 대여 기간 선택 */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between items-center">
            <p className="text-xs font-bold">대여 기간</p>
            {currentlyRenting && <span className="text-[10px] text-[#BB5938] font-bold">적용된 대여 기간</span>}
          </div>
          <div className="flex gap-2">
            {[3, 5, 7].map(days => {
              const isSelected = rentalDays === days;
              return (
                <button 
                  key={days}
                  onClick={() => {
                    if (currentlyRenting) return;
                    setRentalDays(days);
                  }}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                    isSelected ? 'border-[#193D2A] bg-[#193D2A] text-white' : 'border-[#D5D0C4] text-stone-700'
                  } ${currentlyRenting ? 'cursor-default opacity-80' : ''}`}
                >
                  {days}일 대여
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 하단 고정 대여 버튼 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm bg-white border-t border-[#D5D0C4] p-4 shadow-lg">
        <button 
          onClick={handleRentClick}
          className={`w-full py-4 rounded-2xl text-sm font-bold transition-all ${currentlyRenting ? 'bg-[#BB5938] text-white cursor-default' : 'bg-[#193D2A] text-white active:scale-98'}`}
        >
          {currentlyRenting ? '반납 대기 중인 대여 상품 (반납 D-4)' : `₩${(product.price * rentalDays).toLocaleString()} · 대여하기`}
        </button>
      </div>
    </div>
  );
}