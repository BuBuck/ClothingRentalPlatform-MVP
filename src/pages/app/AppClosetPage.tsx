import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import { MOCK_PRODUCTS } from '../../data/mockData';

interface AppClosetPageProps {
  onProductClick: (product: Product) => void;
  isLoggedIn: boolean;       // 로그인 상태 prop 추가
  onOpenLogin: () => void;   // 로그인 모달 열기 함수 prop 추가
}

export default function AppClosetPage({ onProductClick, isLoggedIn, onOpenLogin }: AppClosetPageProps) {
  const navigate = useNavigate();

  // 로그인 안 된 상태로 옷장 탭 진입 시 로그인 창 띄우고 홈으로 이동
  useEffect(() => {
    if (!isLoggedIn) {
      onOpenLogin();
      navigate('/app', { replace: true });
    }
  }, [isLoggedIn, navigate, onOpenLogin]);

  if (!isLoggedIn) return null;

  const [myCloset, setMyCloset] = useState([
    { id: 1, name: '슬림 스트레이트 생지 데님', brand: '개인 소장', category: '하의', img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=400&fit=crop' },
    { id: 2, name: '오버핏 화이트 워시 셔츠', brand: '개인 소장', category: '상의', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop' }
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClothName, setNewClothName] = useState('');
  const [newClothCategory, setNewClothCategory] = useState('상의');

  const handleAddCloth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClothName) return;
    const newCloth = {
      id: Date.now(),
      name: newClothName,
      brand: '개인 소장',
      category: newClothCategory,
      img: newClothCategory === '아우터' 
        ? 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=300&h=400&fit=crop' 
        : 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=400&fit=crop'
    };
    setMyCloset([newCloth, ...myCloset]);
    setNewClothName('');
    setShowAddModal(false);
  };

  return (
    <section className="px-5 pt-5 pb-24 text-[#171b16]">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">내 옷장</h1>
        <button onClick={() => setShowAddModal(true)} className="px-4 py-2 rounded-xl text-[11px] font-bold text-white shadow-lg transition-transform active:scale-95 bg-[#193D2A]">+ 옷 등록</button>
      </div>
      <p className="text-[13px] mb-6 leading-relaxed text-[#6c7068]">내가 보유한 옷을 등록하고, <br />브랜드 악성 재고 아이템과의 <b>AI 코디 추천</b>을 받아보세요!</p>

      {/* AI Coordinate */}
      <div className="p-5 rounded-2xl text-white relative overflow-hidden shadow-lg mb-8 bg-[#BB5938]">
        <span className="inline-block text-[10px] font-mono font-bold bg-white/20 px-2 py-0.5 rounded-md text-white mb-2">TODAY'S AI COORDINATE ✦</span>
        <h2 className="text-lg font-bold leading-tight">내 [데님 팬츠]와 찰떡궁합 추천</h2>
        
        <div className="mt-4 flex gap-3 items-center bg-white/10 p-3 rounded-xl border border-white/10 cursor-pointer" onClick={() => onProductClick(MOCK_PRODUCTS[0])}>
          <div className="w-12 h-16 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
            <img src={MOCK_PRODUCTS[0].image} className="w-full h-full object-cover" alt="" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-mono text-white/70">{MOCK_PRODUCTS[0].brand}</p>
            <p className="text-xs font-bold text-white truncate">{MOCK_PRODUCTS[0].name}</p>
            <p className="text-[11px] font-bold mt-1 text-[#FEE500]">₩{MOCK_PRODUCTS[0].price.toLocaleString()}/일 대여하러 가기 →</p>
          </div>
        </div>
      </div>

      <h2 className="text-base font-bold mb-4">등록된 내 옷 ({myCloset.length})</h2>
      <div className="grid grid-cols-2 gap-3">
        {myCloset.map(cloth => (
          <div key={cloth.id} className="p-3 bg-white border border-[#D5D0C4] rounded-2xl shadow-sm flex items-center gap-3">
            <div className="w-12 h-16 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0">
              <img src={cloth.img} className="w-full h-full object-cover" alt="" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#E8E4D9] text-[#193D2A]">{cloth.category}</span>
              <p className="text-xs font-bold text-[#171b16] mt-1.5 truncate">{cloth.name}</p>
              <p className="text-[9px] text-[#6c7068] mt-0.5">{cloth.brand}</p>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <form onSubmit={handleAddCloth} className="relative w-full max-w-sm bg-white rounded-[32px] p-6 shadow-2xl">
            <h2 className="text-xl font-bold mb-4">내 옷 등록하기</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-[#6c7068] uppercase mb-1.5">카테고리</label>
                <div className="flex gap-2">
                  {['상의', '하의', '아우터', '원피스'].map(cat => (
                    <button key={cat} type="button" onClick={() => setNewClothCategory(cat)} className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${newClothCategory === cat ? 'bg-[#193D2A] text-white border-transparent' : 'bg-white border-[#D5D0C4]'}`}>{cat}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#6c7068] uppercase mb-1.5">의류 이름</label>
                <input required value={newClothName} onChange={e => setNewClothName(e.target.value)} placeholder="예: 오버핏 린넨 자켓" className="w-full px-4 py-3 rounded-xl border border-[#D5D0C4] text-xs outline-none focus:border-[#193D2A]" />
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-3 text-xs font-bold rounded-xl bg-gray-100 text-[#6c7068]">취소</button>
              <button type="submit" className="flex-1 py-3 text-xs font-bold rounded-xl text-white bg-[#193D2A]">등록 완료</button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}