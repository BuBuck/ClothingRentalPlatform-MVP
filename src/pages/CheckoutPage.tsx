import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS, MOCK_SHIPPING_ADDRESS } from '../data/mockData';
import { useApp } from '../context/AppContext';

export default function CheckoutPage() {
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
    alert(`${totalAmount.toLocaleString()}원 결제가 완료되었습니다! 안전하게 배송해 드리겠습니다.`);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] py-10 text-stone-900">
      <div className="max-w-xl mx-auto px-4 space-y-6">
        
        {/* 상단 타이틀 */}
        <div className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl shadow-sm">
          <button onClick={() => navigate(-1)} className="text-sm font-bold">←</button>
          <h1 className="text-base font-bold">배송/결제</h1>
          <div />
        </div>

        {/* 1. 배송 주소 섹션 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-stone-700">배송 주소</h2>
            <button className="text-xs text-stone-500 border border-stone-200 px-2.5 py-1 rounded-lg">주소 변경</button>
          </div>
          <div className="text-sm space-y-1 pt-2 border-t border-stone-100">
            <div className="flex gap-4">
              <span className="text-stone-400 w-12">받는 분</span>
              <span className="font-semibold">{MOCK_SHIPPING_ADDRESS.name}</span>
            </div>
            <div className="flex gap-4">
              <span className="text-stone-400 w-12">연락처</span>
              <span>{MOCK_SHIPPING_ADDRESS.phone}</span>
            </div>
            <div className="flex gap-4">
              <span className="text-stone-400 w-12">주소</span>
              <span>{MOCK_SHIPPING_ADDRESS.address}</span>
            </div>
          </div>
        </div>

        {/* 2. 주문 상품 및 쿠폰 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-stone-700">주문 상품 및 쿠폰</h2>
            <span className="text-xs text-stone-400">총 1건</span>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-100 flex gap-4 items-center">
            <img src={product.image} className="w-16 h-20 object-cover rounded-lg bg-stone-200" alt="" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-mono font-bold text-stone-400">{product.brand}</p>
              <p className="text-xs font-bold text-stone-900 truncate mt-0.5">{product.name}</p>
              <p className="text-[11px] text-stone-500 mt-1">{selectedSize} / {rentalDays}일 대여</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-stone-400 line-through">₩{product.retail.toLocaleString()}</p>
              <p className="text-sm font-bold text-[#193D2A]">₩{itemPrice.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* 3. 포인트 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-3">
          <h2 className="text-sm font-bold text-stone-700">포인트</h2>
          <div className="flex gap-2">
            <input 
              type="number" 
              value={points} 
              onChange={e => setPoints(e.target.value)} 
              placeholder="0" 
              className="flex-1 px-4 py-3 rounded-xl border border-stone-200 text-sm outline-none focus:border-stone-900" 
            />
            <button onClick={() => setPoints('12400')} className="px-4 py-3 bg-stone-100 text-stone-700 text-xs font-bold rounded-xl">최대 사용</button>
          </div>
          <p className="text-[11px] text-stone-400">보유 포인트: 12,400P</p>
        </div>

        {/* 4. 결제 방법 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-stone-700">결제 방법</h2>
          <div className="space-y-2">
            {[
              { id: 'naver', label: '🟢 네이버페이 (Naver Pay)', desc: '네이버 ID로 간편결제' },
              { id: 'kakao', label: '🟡 카카오페이 (Kakao Pay)', desc: '카카오톡 비밀번호로 간편결제' },
              { id: 'card', label: '💳 신용/체크카드 일반결제', desc: '일반 카드사 결제' },
            ].map(method => (
              <label key={method.id} className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${payMethod === method.id ? 'border-[#193D2A] bg-emerald-50/20' : 'border-stone-200'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" name="pay" checked={payMethod === method.id} onChange={() => setPayMethod(method.id)} className="accent-[#193D2A]" />
                  <div>
                    <p className="text-xs font-bold">{method.label}</p>
                    <p className="text-[10px] text-stone-400 mt-0.5">{method.desc}</p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* 5. 최종 주문정보 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-3">
          <h2 className="text-sm font-bold text-stone-700">최종 주문정보</h2>
          <div className="text-xs space-y-2 pt-2 border-t border-stone-100">
            <div className="flex justify-between text-stone-500">
              <span>상품 대여료</span>
              <span>₩{itemPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-stone-500">
              <span>배송비</span>
              <span>₩{shippingFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-stone-500">
              <span>포인트 사용</span>
              <span>- ₩{usedPoints.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-stone-900 pt-3 border-t border-dashed border-stone-200">
              <span>총 결제금액</span>
              <span className="text-[#193D2A]">₩{totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* 결제하기 하단 고정 버튼 */}
        <button 
          onClick={handleCompletePayment}
          className="w-full py-4 bg-[#193D2A] text-white rounded-2xl text-base font-bold shadow-xl active:scale-98 transition-all"
        >
          ₩{totalAmount.toLocaleString()} · 결제하기
        </button>

      </div>
    </div>
  );
}