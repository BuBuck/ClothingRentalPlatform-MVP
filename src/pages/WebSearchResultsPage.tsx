import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../data/mockData';
import { Product } from '../types';
import Navigation from '../components/Navigation';
import ProductCard from '../components/ProductCard';
import FloatingChatbot from '../components/FloatingChatbot';

interface WebSearchResultsPageProps {
  isLoggedIn: boolean;
  onOpenLogin: () => void;
  onProductClick: (product: Product) => void;
}

export default function WebSearchResultsPage({ isLoggedIn, onOpenLogin, onProductClick }: WebSearchResultsPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  
  const [searchInput, setSearchInput] = useState(queryParam);
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const navigate = useNavigate();

  // URL 쿼리 파라미터가 바뀔 때 입력창 싱크 맞추기
  useEffect(() => {
    setSearchInput(queryParam);
  }, [queryParam]);

  // 검색 및 태그 필터링 로직
  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesQuery = p.name.toLowerCase().includes(queryParam.toLowerCase()) || 
                         p.brand.toLowerCase().includes(queryParam.toLowerCase()) ||
                         p.material.toLowerCase().includes(queryParam.toLowerCase());
    
    if (selectedTag === 'esg') return matchesQuery && p.match > 95; // 예시 필터
    if (selectedTag === 'coat') return matchesQuery && (p.name.includes('코트') || p.tag.includes('아우터'));
    if (selectedTag === 'dress') return matchesQuery && (p.name.includes('드레스') || p.tag.includes('원피스'));
    return matchesQuery;
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    }
  };

  return (
    <div className="bg-[#F5F2EB] min-h-screen text-[#171b16] pb-24">
      
      {/* 상단 네비게이션 */}
      <Navigation 
        activeView="web"
        onSwitchView={(view) => view === 'app' && navigate('/app')}
        isLoggedIn={isLoggedIn}
        onOpenLogin={onOpenLogin}
      />

      <div className="max-w-6xl mx-auto px-6 pt-10">
        
        {/* 검색 인풋 바 */}
        <form onSubmit={handleSearchSubmit} className="bg-white p-3 rounded-2xl border border-[#D5D0C4] shadow-sm flex items-center gap-3">
          <span className="text-base text-stone-400 pl-2">⌕</span>
          <input 
            type="text" 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="브랜드, 상품명, 소재로 검색해보세요..."
            className="w-full text-xs md:text-sm outline-none bg-transparent py-1.5"
          />
          <button 
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#193D2A] text-white text-xs font-bold shadow-sm hover:bg-[#122b1e] transition-all shrink-0"
          >
            검색
          </button>
        </form>

        {/* 검색 결과 헤더 정보 */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#D5D0C4]">
          <div>
            <p className="text-xs font-mono text-[#BB5938] mb-1">SEARCH RESULT</p>
            <h1 className="text-2xl md:text-3xl font-display font-bold">
              "{queryParam}" <span className="text-stone-500 font-normal text-lg">검색 결과 ({filteredProducts.length}개)</span>
            </h1>
          </div>

          {/* 서브 필터 칩 */}
          <div className="flex gap-2">
            {[
              { id: 'all', label: '전체 보기' },
              { id: 'coat', label: '아우터/코트' },
              { id: 'dress', label: '원피스/드레스' },
              { id: 'esg', label: 'AI 고매칭순' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTag(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  selectedTag === tab.id 
                    ? 'bg-[#193D2A] text-white border-[#193D2A] shadow-sm' 
                    : 'bg-white text-stone-700 border-[#D5D0C4] hover:bg-stone-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 상품 그리드 결과 */}
        <div className="mt-8">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
              {filteredProducts.map(item => (
                <ProductCard key={item.id} item={item} onClick={onProductClick} />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center bg-white rounded-3xl border border-[#D5D0C4] shadow-sm space-y-3">
              <div className="text-3xl">🧥</div>
              <p className="text-sm font-bold text-stone-800">검색결과가 없습니다</p>
              <p className="text-xs text-stone-500">단어의 스펠링이 정확한지 확인하거나 다른 검색어로 입력해 보세요.</p>
              <button 
                onClick={() => { setSearchInput(''); setSearchParams({ q: '' }); }}
                className="mt-2 px-4 py-2 rounded-xl bg-[#193D2A] text-white text-xs font-bold"
              >
                전체 상품 보기
              </button>
            </div>
          )}
        </div>

      </div>

      <FloatingChatbot />

    </div>
  );
}