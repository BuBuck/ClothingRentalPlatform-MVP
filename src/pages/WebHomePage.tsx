// 

import { useState } from 'react';
import { Product } from '../types';
import { MOCK_PRODUCTS, MOCK_BRANDS } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

import ProductCard from '../components/ProductCard';
import Navigation from '../components/Navigation';
import FloatingChatbot from '../components/FloatingChatbot';

interface WebHomePageProps {
  isLoggedIn: boolean;
  onOpenLogin: () => void;
  onLogout: () => void;
  onProductClick: (product: Product) => void;
}

export default function WebHomePage({ isLoggedIn, onOpenLogin, onLogout, onProductClick }: WebHomePageProps) {

  const [activeTab, setActiveTab] = useState<'all' | 'coat' | 'dress' | 'jacket' | 'esg'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  const bannerSlides = [
    {
      title: '태그도 안 뗀 한정판 브랜드 새 옷',
      subtitle: '커피 한 잔 값에 시작하는 스마트한 렌탈',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&h=600&fit=crop&auto=format',
      tag: 'SPECIAL EXHIBITION'
    },
    {
      title: 'AI 사이즈 매칭으로 핏 실패 제로',
      subtitle: '브랜드별 실측 데이터 기반 맞춤형 사이즈 추천',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1400&h=600&fit=crop&auto=format',
      tag: 'AI SERVICE'
    }
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  const quickCategories = [
    { label: '전체', icon: '🔥', tab: 'all' },
    { label: '아우터/코트', icon: '🧥', tab: 'coat' },
    { label: '원피스/드레스', icon: '👗', tab: 'dress' },
    { label: '자켓/블레이저', icon: '👔', tab: 'jacket' },
    { label: 'ESG 파트너', icon: '🌱', tab: 'esg' },
  ];

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    if (activeTab === 'coat') return p.name.includes('코트') || p.tag.includes('아우터');
    if (activeTab === 'dress') return p.name.includes('드레스') || p.tag.includes('원피스');
    if (activeTab === 'jacket') return p.name.includes('자켓') || p.name.includes('블레이저');
    if (activeTab === 'esg') return p.esg === true;
    return true;
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="bg-[#F5F2EB] min-h-screen text-[#171b16] pb-24">

      <Navigation 
        activeView="web"
        onSwitchView={(view) => view === 'app' && navigate('/app')}
        isLoggedIn={isLoggedIn}
        onOpenLogin={onOpenLogin}
        onLogout={onLogout}
      />

      <section className="max-w-6xl mx-auto px-6 pt-8">
        <form onSubmit={handleSearchSubmit} className="bg-white p-3 rounded-2xl border border-[#D5D0C4] shadow-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 pl-3">
            <span className="text-base text-stone-400">⌕</span>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="원하는 브랜드, 상품명을 검색해보세요 (예: 코트, RECTO, LOW CLASSIC)"
              className="w-full text-xs md:text-sm outline-none bg-transparent py-2"
            />
          </div>

          <button 
            type="button" 
            onClick={() => navigate('/photo-search')} 
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#193D2A]/5 hover:bg-[#193D2A]/10 border border-[#193D2A]/15 text-[#193D2A] transition-all shrink-0"
            title="AI 사진으로 검색"
          >
            <span className="text-sm">📷</span>
            <span className="text-xs font-bold hidden sm:inline">사진으로 찾기</span>
          </button>
        </form>
      </section>
      
      <section className="max-w-6xl mx-auto px-6 pt-6">
        <div className="relative rounded-3xl overflow-hidden aspect-[21/9] bg-stone-900 shadow-xl group">
          <img 
            src={bannerSlides[currentBanner].image} 
            alt="Banner" 
            className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8 md:p-12 text-white">
            <span className="px-3 py-1 rounded-full bg-[#BB5938] text-[10px] font-mono font-bold w-fit mb-3 tracking-wider">
              {bannerSlides[currentBanner].tag}
            </span>
            <h1 className="text-2xl md:text-4xl font-display font-bold leading-tight mb-2">
              {bannerSlides[currentBanner].title}
            </h1>
            <p className="text-xs md:text-sm text-stone-300 font-mono">
              {bannerSlides[currentBanner].subtitle}
            </p>
          </div>

          <div className="absolute bottom-6 right-6 flex gap-2">
            {bannerSlides.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentBanner(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${currentBanner === idx ? 'bg-white w-6' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-5 gap-3 md:gap-6">
          {quickCategories.map(cat => (
            <button
              key={cat.tab}
              onClick={() => setActiveTab(cat.tab as any)}
              className={`flex flex-col items-center justify-center py-4 px-2 rounded-2xl border transition-all ${
                activeTab === cat.tab 
                  ? 'bg-[#193D2A] text-white border-[#193D2A] shadow-md scale-105' 
                  : 'bg-white text-stone-800 border-[#D5D0C4] hover:bg-stone-50'
              }`}
            >
              <span className="text-2xl mb-1.5">{cat.icon}</span>
              <span className="text-xs font-bold tracking-tight">{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 mt-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-bold">인기 브랜드 파트너</h2>
          <span className="text-xs font-mono text-[#6c7068]">BRAND SHOWCASE</span>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {MOCK_BRANDS.map(brand => (
            <div key={brand.name} className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#D5D0C4] bg-stone-200 shadow-sm group-hover:border-[#193D2A] transition-all">
                <img src={brand.img} alt={brand.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <span className="text-xs font-bold text-stone-800">{brand.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 mt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-xs font-mono mb-1 tracking-widest uppercase text-[#BB5938]">JUST DROPPED</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold">지금 주목해야 할 대여 상품</h2>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
            {filteredProducts.map(item => (
              <ProductCard key={item.id} item={item} onClick={onProductClick} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center text-sm text-stone-500 bg-white rounded-3xl border border-[#D5D0C4]">
            조건에 일치하는 상품이 없습니다. 다른 키워드로 검색해 보세요!
          </div>
        )}
      </section>

      <FloatingChatbot />

    </div>
  );
}