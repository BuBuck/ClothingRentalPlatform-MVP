import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../data/mockData';
import { Product } from '../types';

export default function AiPhotoSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const isApp = location.pathname.startsWith('/app');

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [matchedProducts, setMatchedProducts] = useState<Product[] | null>(null);

  // 이미지 업로드(선택) 시뮬레이션
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      startAiAnalysis();
    }
  };

  // 샘플 사진으로 테스트하기
  const handleSampleSelect = (imgUrl: string) => {
    setSelectedImage(imgUrl);
    startAiAnalysis();
  };

  // AI 분석 시뮬레이션 로직
  const startAiAnalysis = () => {
    setAnalyzing(true);
    setMatchedProducts(null);

    setTimeout(() => {
      setAnalyzing(false);
      // 무작위 또는 연관된 재고 상품 매칭 결과 설정
      setMatchedProducts([MOCK_PRODUCTS[0], MOCK_PRODUCTS[1], MOCK_PRODUCTS[3]]);
    }, 1800);
  };

  const handleProductClick = (product: Product) => {
    if (isApp) {
      navigate(`/app/product/${product.id}`);
    } else {
      navigate(`/product/${product.id}`);
    }
  };

  return (
    <div className={`flex flex-col bg-[#F9F6EE] text-stone-900 ${isApp ? 'h-full pb-20 overflow-y-auto' : 'min-h-[85vh] max-w-4xl mx-auto my-6 rounded-3xl shadow-lg border border-stone-200 overflow-hidden'}`}>
      
      {/* 상단 헤더 */}
      <div className="px-6 py-4 bg-white border-b border-stone-200 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#193D2A] text-white flex items-center justify-center font-bold text-sm shadow">📸</div>
          <div>
            <h2 className="text-sm font-bold">AI 사진 스타일 검색</h2>
            <p className="text-[10px] text-emerald-700 font-mono">이미지 기반 브랜드 재고 매칭</p>
          </div>
        </div>
        {isApp && (
          <button onClick={() => navigate(-1)} className="text-xs text-stone-500 font-bold">닫기</button>
        )}
      </div>

      <div className="p-6 space-y-6 flex-1">
        
        {/* 1. 업로드 전: 사진 선택 또는 샘플 선택 영역 */}
        {!selectedImage ? (
          <div className="bg-white rounded-3xl p-8 border-2 border-dashed border-stone-300 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-2xl">🧥</div>
            <div>
              <h3 className="text-base font-bold text-stone-800">찾고 싶은 옷의 사진을 올려주세요</h3>
              <p className="text-xs text-stone-500 mt-1">AI가 사진 속 컬러, 핏, 소재를 분석해 가장 유사한 브랜드 대여 상품을 찾아드립니다.</p>
            </div>

            <div className="pt-2">
              <label className="inline-block px-6 py-3 bg-[#193D2A] text-white rounded-2xl text-xs font-bold shadow cursor-pointer hover:bg-[#122e20] transition-all">
                사진 파일 업로드하기
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>

            {/* 빠른 테스트용 샘플 사진 제공 */}
            <div className="pt-6 border-t border-stone-100">
              <p className="text-[11px] font-bold text-stone-400 mb-3 uppercase tracking-wider">또는 샘플 사진으로 테스트 해보세요</p>
              <div className="flex justify-center gap-3">
                {MOCK_PRODUCTS.slice(0, 3).map(p => (
                  <div 
                    key={p.id} 
                    onClick={() => handleSampleSelect(p.image)}
                    className="w-16 h-20 rounded-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-[#193D2A] transition-all shadow-sm"
                  >
                    <img src={p.image} className="w-full h-full object-cover" alt="" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* 2. 업로드 후: 선택한 이미지 & 분석 상태 또는 결과 영역 */
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-sm flex items-center gap-4">
              <div className="w-20 h-24 rounded-2xl overflow-hidden bg-stone-100 flex-shrink-0 relative">
                <img src={selectedImage} className="w-full h-full object-cover" alt="업로드된 스타일" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-[#193D2A]">분석 완료된 이미지</span>
                <p className="text-xs font-bold text-stone-800 mt-1">업로드된 스타일과 유사한 재고 상품</p>
                <button 
                  onClick={() => { setSelectedImage(null); setMatchedProducts(null); }}
                  className="mt-2 text-[11px] text-stone-500 underline font-medium"
                >
                  다른 사진으로 검색하기
                </button>
              </div>
            </div>

            {/* AI 분석 중 로딩 UI */}
            {analyzing && (
              <div className="py-16 text-center space-y-3 bg-white rounded-3xl border border-stone-200 shadow-sm">
                <div className="w-8 h-8 border-4 border-[#193D2A] border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs font-bold text-stone-700">AI가 사진 속 패션 아이템을 분석 중입니다...</p>
                <p className="text-[10px] text-stone-400">컬러 팔레트, 텍스처, 실루엣 대조 중</p>
              </div>
            )}

            {/* AI 분석 완료 후 유사 상품 매칭 결과 그리드 */}
            {matchedProducts && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider">✦ AI가 찾은 가장 유사한 대여 상품</h3>
                  <span className="text-[10px] font-mono text-emerald-700 font-bold">3개 발견됨</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {matchedProducts.map(product => (
                    <div 
                      key={product.id}
                      onClick={() => handleProductClick(product)}
                      className="bg-white rounded-2xl p-3 border border-stone-200 shadow-sm cursor-pointer hover:border-[#193D2A] transition-all group"
                    >
                      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-stone-100 mb-2.5">
                        <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="" />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#193D2A] text-white text-[9px] font-mono font-bold shadow">
                          {product.match}% 유사 매칭
                        </span>
                      </div>
                      <p className="text-[9px] font-mono text-stone-400 font-bold">{product.brand}</p>
                      <p className="text-xs font-bold truncate mt-0.5">{product.name}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs font-bold text-[#193D2A]">₩{product.price.toLocaleString()}/일</span>
                        <span className="text-[10px] text-stone-400 font-bold">대여하기 →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}