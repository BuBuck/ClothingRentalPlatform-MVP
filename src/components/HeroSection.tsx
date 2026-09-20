import { useState } from 'react'

interface HeroSectionProps {
  onProductClick: (product?: any) => void
}

export default function HeroSection({ onProductClick }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchMode, setSearchMode] = useState<'text' | 'photo'>('text')
  const [activeFilter, setActiveFilter] = useState('전체')

  const filters = ['전체', '원피스', '아우터', '상의', '하의', '세트']

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

        <div className="flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 mb-6 self-start">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--accent)' }} />
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--muted-foreground)', fontFamily: 'DM Mono, monospace' }}>B2B2C 패션 재고 순환 플랫폼</span>
          </div>

          <h1 className="font-display leading-[1.08] mb-6" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)', color: 'var(--foreground)' }}>
            태그도 안 뗀<br />
            <em className="not-italic" style={{ color: 'var(--primary)' }}>한정판 브랜드 새 옷,</em><br />
            커피 한 잔 값에
          </h1>

          <p className="text-base mb-3 max-w-md" style={{ color: 'var(--muted-foreground)', lineHeight: 1.85 }}>
            패션 브랜드의 이월 상품·반품 의류를 엄선해 3일간 빌려드립니다.
            AI가 체형에 맞는 사이즈를 추천하고, 편의점에서 간편하게 픽업·반납하세요.
          </p>

          <p className="text-xs font-mono mb-8 px-3 py-2 self-start rounded-lg" style={{ background: 'rgba(25,61,42,0.08)', color: 'var(--primary)', fontFamily: 'DM Mono, monospace' }}>
            착용샷 공유 시 포인트 적립 — Wear-to-Earn ✦
          </p>

          {/* AI Search */}
          <div className="rounded-2xl overflow-hidden shadow-lg mb-6" style={{ border: '1.5px solid var(--border)', background: 'var(--card)' }}>
            <div className="flex border-b" style={{ borderColor: 'var(--border)' }}>
              {([['text', '키워드 검색'], ['photo', '사진으로 찾기']] as const).map(([mode, label]) => (
                <button key={mode} onClick={() => setSearchMode(mode)}
                  className="flex-1 py-3 text-sm font-medium transition-all"
                  style={{
                    background: searchMode === mode ? 'var(--primary)' : 'transparent',
                    color: searchMode === mode ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                  }}>
                  {label}
                </button>
              ))}
            </div>

            <div className="p-4">
              {searchMode === 'text' ? (
                <div className="flex gap-3">
                  <input
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="예: 결혼식 하객룩, 봄 여행 코디, 면접 정장..."
                    className="flex-1 text-sm outline-none bg-transparent"
                    style={{ color: 'var(--foreground)' }}
                  />
                  <button className="px-5 py-2 rounded-xl text-sm font-semibold" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}>
                    AI 검색
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="flex-1 flex items-center gap-3 border-2 border-dashed rounded-xl p-3 cursor-pointer hover:opacity-80 transition-opacity" style={{ borderColor: 'var(--border)' }}>
                    <span className="text-2xl">📸</span>
                    <div>
                      <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>원하는 스타일 사진 업로드</p>
                      <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>AI가 유사한 브랜드 대여 상품을 찾아드려요</p>
                    </div>
                  </div>
                  <button className="px-4 py-3 rounded-xl text-sm font-semibold flex-shrink-0" style={{ background: 'var(--accent)', color: '#fff' }}>분석하기</button>
                </div>
              )}
            </div>

            <div className="px-4 pb-3 flex items-center gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              {filters.map(f => (
                <button key={f} onClick={() => setActiveFilter(f)}
                  className="px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 transition-all"
                  style={{
                    background: activeFilter === f ? 'var(--foreground)' : 'var(--muted)',
                    color: activeFilter === f ? 'var(--background)' : 'var(--muted-foreground)',
                    fontFamily: 'DM Mono, monospace',
                  }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-8">
            {[['120+', '제휴 브랜드'], ['4,800+', '대여 상품'], ['22,000+', '회원']].map(([val, label]) => (
              <div key={label}>
                <p className="text-xl font-display font-bold" style={{ color: 'var(--primary)' }}>{val}</p>
                <p className="text-xs" style={{ color: 'var(--muted-foreground)', fontFamily: 'DM Mono, monospace' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: KREAM-style product cards */}
        <div className="hidden lg:grid grid-cols-2 gap-3 h-[600px]">
          <div className="flex flex-col gap-3">
            <div className="flex-1 rounded-2xl overflow-hidden relative bg-stone-200 cursor-pointer" onClick={() => onProductClick()}>
              <img src="https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=520&fit=crop&auto=format" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" alt="LOW CLASSIC 울 코트" />
              <div className="absolute top-3 left-3 px-2 py-1 rounded-md text-[10px] font-mono font-semibold" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', fontFamily: 'DM Mono, monospace' }}>
                NEW ARRIVAL
              </div>
              <div className="absolute bottom-3 left-3 right-3 px-3 py-2.5 rounded-xl" style={{ background: 'rgba(245,241,232,0.93)', backdropFilter: 'blur(8px)' }}>
                <p className="text-[10px] font-mono mb-0.5" style={{ color: 'var(--muted-foreground)', fontFamily: 'DM Mono, monospace' }}>LOW CLASSIC</p>
                <p className="text-sm font-semibold leading-tight" style={{ color: 'var(--foreground)' }}>울 싱글 롱 코트</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm font-bold" style={{ color: 'var(--primary)' }}>₩4,500<span className="text-[10px] font-normal" style={{ color: 'var(--muted-foreground)' }}>/일</span></p>
                  <p className="text-[10px] line-through" style={{ color: 'var(--muted-foreground)' }}>정가 ₩398,000</p>
                </div>
              </div>
            </div>
            <div className="h-44 rounded-2xl overflow-hidden relative bg-stone-200 cursor-pointer" onClick={() => onProductClick()}>
              <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=220&fit=crop&auto=format" className="w-full h-full object-cover" alt="실크 드레스" />
              <div className="absolute top-2 right-2 px-2 py-1 rounded-md text-[10px] font-mono" style={{ background: 'var(--accent)', color: '#fff', fontFamily: 'DM Mono, monospace' }}>WEAR-TO-EARN</div>
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-10">
            <div className="h-44 rounded-2xl overflow-hidden bg-stone-200 cursor-pointer" onClick={() => onProductClick()}>
              <img src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=220&fit=crop&auto=format" className="w-full h-full object-cover" alt="니트 가디건" />
            </div>
            <div className="flex-1 rounded-2xl overflow-hidden relative bg-stone-200 cursor-pointer" onClick={() => onProductClick()}>
              <img src="https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=400&h=480&fit=crop&auto=format" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" alt="RECTO 드레스" />
              <div className="absolute bottom-3 left-3 right-3 px-3 py-2.5 rounded-xl" style={{ background: 'rgba(245,241,232,0.93)', backdropFilter: 'blur(8px)' }}>
                <p className="text-[10px] font-mono mb-0.5" style={{ color: 'var(--muted-foreground)', fontFamily: 'DM Mono, monospace' }}>RECTO</p>
                <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>새틴 미디 드레스</p>
                <p className="text-sm font-bold mt-0.5" style={{ color: 'var(--primary)' }}>₩3,800<span className="text-[10px] font-normal" style={{ color: 'var(--muted-foreground)' }}>/일</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling ticker */}
      <div className="border-t border-b py-3 overflow-hidden" style={{ borderColor: 'var(--border)', background: 'var(--primary)' }}>
        <div className="flex animate-marquee whitespace-nowrap gap-12">
          {Array(4).fill(['패션 브랜드 이월 재고 대여', '·', 'AI 사이즈 매칭', '·', 'Wear-to-Earn 포인트', '·', '편의점 픽업·반납', '·', '제휴 브랜드 120+', '·', 'ESG 인증 플랫폼', '·']).flat().map((t, i) => (
            <span key={i} className="text-sm font-mono" style={{ color: 'rgba(247,243,238,0.85)', fontFamily: 'DM Mono, monospace' }}>{t}</span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 28s linear infinite; }
      `}</style>
    </section>
  )
}
