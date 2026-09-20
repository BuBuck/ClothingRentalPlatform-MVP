const brands = [
  { name: 'LOW CLASSIC', type: '컨템포러리', items: 184, co2: '312kg', img: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=320&h=420&fit=crop&auto=format', esg: true },
  { name: 'ANDERSSON BELL', type: '스트리트', items: 96, co2: '178kg', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=320&h=420&fit=crop&auto=format', esg: false },
  { name: 'RECTO', type: '컨템포러리', items: 142, co2: '241kg', img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=320&h=420&fit=crop&auto=format', esg: true },
  { name: 'MATIN KIM', type: '우먼스웨어', items: 78, co2: '134kg', img: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=320&h=420&fit=crop&auto=format', esg: false },
  { name: 'SJYP', type: '데님·스트리트', items: 63, co2: '97kg', img: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=320&h=420&fit=crop&auto=format', esg: true },
  { name: 'COS', type: '미니멀', items: 228, co2: '408kg', img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=320&h=420&fit=crop&auto=format', esg: true },
]

export default function CategoryBrowse() {
  return (
    <section className="py-20 border-t" style={{ borderColor: 'var(--border)', background: 'var(--secondary)' }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-xs font-mono mb-2 tracking-widest uppercase" style={{ color: 'var(--accent)', fontFamily: 'DM Mono, monospace' }}>BRAND PARTNERS</p>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--foreground)' }}>
              버려질 재고가<br />수익과 ESG 지표로
            </h2>
          </div>
          <div className="max-w-xs">
            <p className="text-sm" style={{ color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
              제휴 브랜드는 재고 소진 비용을 절감하고, 고객 체형·선호도 피팅 데이터를 리포트로 받아갑니다.
            </p>
          </div>
        </div>

        {/* Brand grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
          {brands.map((brand) => (
            <div key={brand.name} className="group cursor-pointer">
              <div className="relative rounded-xl overflow-hidden aspect-[3/4] mb-2.5 bg-stone-200">
                <img src={brand.img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={brand.name} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(23,27,22,0.75) 0%, transparent 55%)' }} />
                {brand.esg && (
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-mono font-bold" style={{ background: 'var(--primary)', color: '#fff', fontFamily: 'DM Mono, monospace' }}>ESG</div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-2.5">
                  <p className="text-xs font-bold text-white leading-tight">{brand.name}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: 'rgba(247,243,238,0.65)', fontFamily: 'DM Mono, monospace' }}>{brand.items}개 · CO₂ {brand.co2} 절감</p>
                </div>
              </div>
              <p className="text-[10px] font-mono" style={{ color: 'var(--muted-foreground)', fontFamily: 'DM Mono, monospace' }}>{brand.type}</p>
            </div>
          ))}
        </div>

        {/* ESG impact bar */}
        <div className="rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6" style={{ background: 'var(--primary)' }}>
          {[['120+', '제휴 브랜드'], ['14,800건', '재고 순환', ], ['31,200kg', 'CO₂ 절감'], ['↗ ESG', '정부 지원 1순위']].map(([val, label]) => (
            <div key={label} className="text-center">
              <p className="text-xl font-display font-bold" style={{ color: 'var(--primary-foreground)' }}>{val}</p>
              <p className="text-xs mt-1" style={{ color: 'rgba(247,243,238,0.55)', fontFamily: 'DM Mono, monospace' }}>{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-1">
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
            브랜드 파트너십을 통해 고객 피팅 데이터와 ESG 리포트를 받아가세요.
          </p>
          <button className="flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold" style={{ background: 'var(--foreground)', color: 'var(--background)' }}>
            파트너 입점 신청 →
          </button>
        </div>
      </div>
    </section>
  )
}
