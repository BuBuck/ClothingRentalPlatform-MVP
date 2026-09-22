import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS, MOCK_SHIPPING_ADDRESS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export default function AppCheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addRentingItem, setIsLoggedIn } = useApp(); // ✦ setIsLoggedIn 가져오기

  const routeState = location.state as { product?: any; size?: string; days?: number } | null;
  const product = routeState?.product || MOCK_PRODUCTS[0];
  const selectedSize = routeState?.size || 'S';
  const rentalDays = routeState?.days || 3;

  const [points, setPoints] = useState('');
  const [payMethod, setPayMethod] = useState('naver');

  const itemPrice = product.price * rentalDays;
  const shippingFee = 2500;
  const usedPoints = Number(points) || 0;
  const totalAmount = itemPrice + shippingFee - usedPoints;

  const handleCompletePayment = () => {
    setIsLoggedIn(true);        // ✦ 결제 완료 시 로그인 상태 true로 전환
    addRentingItem(product);    // ✦ 전역 대여 목록에 상품 추가
    alert(`${totalAmount.toLocaleString()}원 결제가 완료되었습니다! 대여 품목에 추가되었습니다.`);
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] text-stone-900 pb-24">
      <div className="max-w-sm mx-auto px-4 py-4 space-y-4">
        
        {/* 상단 타이틀 */}
        <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl shadow-sm">
          <button onClick={() => navigate(-1)} className="text-sm font-bold">←</button>
          <h1 className="text-sm font-bold">배송/결제</h1>
          <div className="w-4" />
        </div>

        {/* 1. 배송 주소 */}
        <div className="bg-white p-4 rounded-2xl shadow-sm space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="text-xs font-bold text-stone-700">배송 주소</h2>
            <button className="text-[10px] text-stone-500 border border-stone-200 px-2 py-0.5 rounded-lg">변경</button>
          </div>
          <div className="text-xs space-y-1 pt-2 border-t border-stone-100">
            <p><span className="text-stone-400">받는 분:</span> <span className="font-semibold">{MOCK_SHIPPING_ADDRESS.name}</span></p>
            <p><span className="text-stone-400">연락처:</span> {MOCK_SHIPPING_ADDRESS.phone}</p>
            <p><span className="text-stone-400">주소:</span> {MOCK_SHIPPING_ADDRESS.address}</p>
          </div>
        </div>

        {/* 2. 주문 상품 */}
        <div className="bg-white p-4 rounded-2xl shadow-sm space-y-3">
          <h2 className="text-xs font-bold text-stone-700">주문 상품</h2>
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-100 flex gap-3 items-center">
            <img src={product.image} className="w-12 h-16 object-cover rounded-lg bg-stone-200" alt="" />
            <div className="flex-1 min-w-0">
              <p className="text-[9px] font-mono font-bold text-stone-400">{product.brand}</p>
              <p className="text-xs font-bold text-stone-900 truncate mt-0.5">{product.name}</p>
              <p className="text-[10px] text-stone-500 mt-0.5">{selectedSize} / {rentalDays}일 대여</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-[#193D2A]">₩{itemPrice.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* 3. 포인트 */}
        <div className="bg-white p-4 rounded-2xl shadow-sm space-y-2">
          <h2 className="text-xs font-bold text-stone-700">포인트</h2>
          <div className="flex gap-2">
            <input 
              type="number" 
              value={points} 
              onChange={e => setPoints(e.target.value)} 
              placeholder="0" 
              className="flex-1 px-3 py-2 rounded-xl border border-stone-200 text-xs outline-none" 
            />
            <button onClick={() => setPoints('12400')} className="px-3 py-2 bg-stone-100 text-stone-700 text-[11px] font-bold rounded-xl">전액사용</button>
          </div>
          <p className="text-[10px] text-stone-400">보유 포인트: 12,400P</p>
        </div>

        {/* 4. 결제 방법 */}
        <div className="bg-white p-4 rounded-2xl shadow-sm space-y-3">
          <h2 className="text-xs font-bold text-stone-700">결제 방법</h2>
          <div className="space-y-2">
            {[
              { id: 'naver', label: '🟢 네이버페이' },
              { id: 'kakao', label: '🟡 카카오페이' },
              { id: 'card', label: '💳 신용/체크카드' },
            ].map(method => (
              <label key={method.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer ${payMethod === method.id ? 'border-[#193D2A] bg-emerald-50/20' : 'border-stone-200'}`}>
                <input type="radio" name="appPay" checked={payMethod === method.id} onChange={() => setPayMethod(method.id)} className="accent-[#193D2A]" />
                <span className="text-xs font-bold">{method.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 5. 최종 주문정보 */}
        <div className="bg-white p-4 rounded-2xl shadow-sm space-y-2">
          <h2 className="text-xs font-bold text-stone-700">최종 결제금액</h2>
          <div className="text-xs space-y-1.5 pt-2 border-t border-stone-100">
            <div className="flex justify-between text-stone-500">
              <span>상품 대여료</span>
              <span>₩{itemPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-stone-500">
              <span>배송비</span>
              <span>₩{shippingFee.toLocaleString()}</span>
            </div>
            {usedPoints > 0 && (
              <div className="flex justify-between text-stone-500">
                <span>포인트 사용</span>
                <span>- ₩{usedPoints.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-dashed border-stone-200">
              <span>총 결제금액</span>
              <span className="text-[#193D2A]">₩{totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* 하단 결제 버튼 */}
        <button 
          onClick={handleCompletePayment}
          className="w-full py-3.5 bg-[#193D2A] text-white rounded-2xl text-sm font-bold shadow-lg active:scale-98 transition-all"
        >
          ₩{totalAmount.toLocaleString()} 결제하기
        </button>

      </div>
    </div>
  );
}