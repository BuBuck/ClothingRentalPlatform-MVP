import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../../data/mockData';
import ProductCard from '../../components/ProductCard';

interface AppHomePageProps {
  isLoggedIn: boolean;
  onOpenLogin: () => void;
}

export default function AppHomePage({ isLoggedIn, onOpenLogin }: AppHomePageProps) {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  // 키워드 필터링 로직 (상품명, 브랜드, 태그 대상)
  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(keyword.toLowerCase()) || 
    p.brand.toLowerCase().includes(keyword.toLowerCase()) ||
    p.tag.toLowerCase().includes(keyword.toLowerCase())
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      setSearchSubmitted(true);
    }
  };

  return (
    <div className="pb-24">
      <div className="px-5 pt-5">
        {/* 로그인 여부에 따른 조건부 렌더링 */}
        {isLoggedIn ? (
          <p className="text-[14px] font-bold leading-tight">
            안녕하세요, 지수님 <br />
            <span className="font-medium text-[13px] text-stone-500">오늘의 브랜드 재고를 확인해보세요.</span>
          </p>
        ) : (
          <div className="flex items-center justify-between bg-[#193D2A]/5 p-4 rounded-2xl border border-[#193D2A]/10">
            <div>
              <p className="text-[13px] font-bold text-stone-900">로그인하고 맞춤 재고를 확인해보세요</p>
              <p className="text-[11px] text-stone-500 mt-0.5">AI 사이즈 매칭 및 W-E 혜택 제공</p>
            </div>
            <button 
              onClick={onOpenLogin}
              className="px-4 py-2 bg-[#193D2A] text-white rounded-xl text-xs font-bold shadow-sm"
            >
              로그인
            </button>
          </div>
        )}

        {/* 검색바 (사진 검색 버튼 포함) */}
        <form onSubmit={handleSearchSubmit} className="mt-4 flex h-14 w-full items-center justify-between gap-2 rounded-2xl px-5 bg-white border border-stone-200 shadow-sm">
          <input 
            type="text"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              if (!e.target.value) setSearchSubmitted(false);
            }}
            placeholder="원하는 브랜드, 상품명을 검색해보세요 (예: 코트, RECTO)"
            className="w-full text-xs outline-none bg-transparent"
          />

          {/* 버튼 영역 */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* 1:1 비율의 사진 검색 버튼 */}
            <button 
              type="button" 
              onClick={() => navigate('/app/photo-search')} 
              className="flex h-8 w-8 items-center justify-center rounded-full text-stone-700 bg-stone-100 hover:bg-stone-200 transition-all text-sm font-bold"
              title="사진으로 검색"
            >
              📷
            </button>

            {/* 기존 돋보기 검색 버튼 */}
            <button type="submit" className="flex h-8 w-8 items-center justify-center rounded-full text-white text-base bg-[#193D2A] flex-shrink-0">
              ⌕
            </button>
          </div>
        </form>
      </div>

      {/* 키워드 검색 결과가 제출된 경우 */}
      {searchSubmitted ? (
        <section className="mt-6 px-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[15px] font-bold">'{keyword}' 검색 결과 ({filteredProducts.length})</h2>
            <button onClick={() => { setKeyword(''); setSearchSubmitted(false); }} className="text-xs text-stone-400 underline">초기화</button>
          </div>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-3 gap-y-7">
              {filteredProducts.map(item => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-xs text-stone-400">
              검색 결과가 없습니다. 다른 키워드로 검색해 보세요!
            </div>
          )}
        </section>
      ) : (
        <>
          {/* 홈 배너 */}
          <section className="mx-5 mt-5 rounded-2xl p-5 text-white relative overflow-hidden shadow-lg bg-[#193D2A]">
            <div className="relative z-10">
              <p className="text-[10px] font-mono font-bold text-emerald-200">B2B2C STOCK CIRCULATION</p>
              <p className="mt-1.5 text-[17px] font-bold leading-snug">태그도 안 뗀 브랜드 재고,<br />커피 한 값에 내 옷장에.</p>
            </div>
          </section>

          {/* 이번 주 인기 대여템 */}
          <section className="mt-9">
            <div className="flex items-center justify-between px-5 mb-5">
              <h2 className="text-[16px] font-bold">이번 주 인기 대여템</h2>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-7 px-5">
              {MOCK_PRODUCTS.map(item => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}