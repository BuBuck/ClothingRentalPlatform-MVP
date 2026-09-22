import { Product, RentalStep } from '../types';

interface RentalModalProps {
  product: Product;
  rentalStep: RentalStep;
  rentalDays: number;
  selectedSize: string;
  setRentalDays: (days: number) => void;
  setSelectedSize: (size: string) => void;
  setRentalStep: (step: RentalStep) => void;
  onClose: () => void;
}

export default function RentalModal({
  product,
  rentalStep,
  rentalDays,
  selectedSize,
  setRentalDays,
  setSelectedSize,
  setRentalStep,
  onClose,
}: RentalModalProps) {
  if (!product || !rentalStep) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 md:p-6">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-lg h-[100vh] md:h-[90vh] bg-white rounded-none md:rounded-[40px] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
        
        {/* Step 1: 상품 상세 */}
        {rentalStep === 'detail' && (
          <div className="flex flex-col h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-[3/4] w-full">
              <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
              <button onClick={onClose} className="absolute top-6 right-5 h-10 w-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white text-xl">✕</button>
            </div>
            <div className="px-6 py-8 -mt-10 relative z-10 bg-white rounded-t-[40px] shadow-2xl flex-1">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-xs font-mono font-bold text-[#6c7068]">{product.brand}</p>
                  <h1 className="text-2xl font-bold mt-1">{product.name}</h1>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#BB5938] font-bold">1일 렌탈료</p>
                  <p className="text-xl font-bold">₩{product.price.toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3 p-4 rounded-2xl bg-[#193D2A]/5 border border-black/5">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl text-lg bg-[#193D2A] text-white">✦</div>
                <div>
                  <p className="text-[13px] font-bold text-[#193D2A]">AI 사이즈 매칭 {product.match}%</p>
                  <p className="text-[11px] text-[#6c7068]">지수님의 최근 대여 데이터를 분석한 결과입니다.</p>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-xs font-bold mb-3 uppercase tracking-wider text-[#6c7068]">대여 기간 선택</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 5, 7].map((d) => (
                    <button key={d} type="button" onClick={() => setRentalDays(d)}
                      className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${rentalDays === d ? 'bg-[#193D2A] text-white shadow-lg' : 'bg-[#E8E4D9] text-[#171b16]'}`}>
                      {d}일
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <p className="text-xs font-bold mb-3 uppercase tracking-wider text-[#6c7068]">사이즈 선택</p>
                <div className="flex gap-2">
                  {product.sizes.map((s) => (
                    <button key={s} type="button" onClick={() => setSelectedSize(s)}
                      className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${selectedSize === s ? 'bg-[#171b16] text-white shadow-lg' : 'bg-[#E8E4D9] text-[#171b16]'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-10 flex gap-3">
                <button type="button" onClick={() => setRentalStep('checkout')} className="flex-1 py-4 bg-[#193D2A] text-white rounded-2xl text-sm font-bold shadow-xl active:scale-95 transition-transform">
                  총 ₩{(product.price * rentalDays).toLocaleString()} 대여하기
                </button>
                <button type="button" className="w-16 h-14 flex items-center justify-center rounded-2xl bg-white border border-[#D5D0C4] text-xl shadow-sm">♡</button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: 결제 페이지 */}
        {rentalStep === 'checkout' && (
          <div className="px-6 pt-12 pb-10 flex flex-col h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-4 mb-8">
              <button type="button" onClick={() => setRentalStep('detail')} className="text-xl">←</button>
              <h1 className="text-2xl font-bold">결제하기</h1>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-white shadow-sm border border-[#D5D0C4] mb-8">
              <div className="w-20 h-24 rounded-xl overflow-hidden bg-stone-100">
                <img src={product.image} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-mono font-bold text-[#6c7068]">{product.brand}</p>
                <p className="text-sm font-bold mt-0.5">{product.name}</p>
                <p className="text-xs text-[#6c7068] mt-1">{selectedSize} / {rentalDays}일 대여</p>
                <p className="text-sm font-bold mt-2">₩{(product.price * rentalDays).toLocaleString()}</p>
              </div>
            </div>

            <div className="space-y-6 flex-1">
              <section>
                <h2 className="text-xs font-bold text-[#6c7068] mb-3 uppercase tracking-wider">배송 정보 (CVS 픽업)</h2>
                <div className="p-4 rounded-2xl bg-white border border-[#D5D0C4] shadow-sm">
                  <p className="text-sm font-bold">GS25 강남웨스트점</p>
                  <p className="text-xs text-[#6c7068] mt-1">서울특별시 강남구 테헤란로 123</p>
                </div>
              </section>

              <section>
                <h2 className="text-xs font-bold text-[#6c7068] mb-3 uppercase tracking-wider">결제 수단</h2>
                <div className="flex gap-2">
                  <button type="button" className="flex-1 py-3 rounded-xl bg-[#171b16] text-white text-[11px] font-bold shadow-md">Wear Pay</button>
                  <button type="button" className="flex-1 py-3 rounded-xl bg-white border border-[#D5D0C4] text-[11px] font-bold">카카오페이</button>
                </div>
              </section>
            </div>

            <button type="button" onClick={() => setRentalStep('success')} className="w-full py-4 mt-10 bg-[#193D2A] text-white rounded-2xl text-base font-bold shadow-2xl active:scale-95 transition-transform">
              ₩{(product.price * rentalDays).toLocaleString()} 결제하고 대여하기
            </button>
          </div>
        )}

        {/* Step 3: 완료 */}
        {rentalStep === 'success' && (
          <div className="flex flex-col items-center justify-center h-full px-8 text-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-24 h-24 bg-[#193D2A] rounded-full flex items-center justify-center text-white text-4xl mb-8 shadow-2xl shadow-[#193D2A]/30">✓</div>
            <h1 className="text-2xl font-bold mb-2">대여가 완료되었습니다!</h1>
            <p className="text-[13px] text-[#6c7068] leading-relaxed mb-10">내일 오전 10시까지 선택하신 편의점에 상품이 도착합니다.</p>
            <button type="button" onClick={onClose} className="w-full py-4 bg-[#171b16] text-white rounded-2xl text-sm font-bold shadow-xl">완료</button>
          </div>
        )}
      </div>
    </div>
  );
}