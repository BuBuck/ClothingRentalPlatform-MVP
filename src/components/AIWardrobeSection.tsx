import { useState } from 'react'

type SizeKey = '체형' | '상의' | '하의'

const sizeOptions: Record<SizeKey, string[]> = {
  '체형': ['슬림', '스탠다드', '와이드'],
  '상의': ['XS', 'S', 'M', 'L', 'XL'],
  '하의': ['24', '26', '27', '28', '29', '30'],
}

const aiRecommended = [
  { name: '울 싱글 롱 코트', brand: 'LOW CLASSIC', size: 'M (정사이즈)', fit: '숄더 45cm · 가슴 96cm · 기장 112cm', img: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=300&h=400&fit=crop&auto=format', price: 4500, match: 98 },
  { name: '새틴 미디 드레스', brand: 'RECTO', size: 'S (약간 여유)', fit: '가슴 86cm · 허리 70cm · 기장 108cm', img: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=300&h=400&fit=crop&auto=format', price: 3800, match: 95 },
]

const wardrobeItems = [
  { id: 1, img: 'https://images.unsplash.com/photo-1594938298603-c8148c4b1ddf?w=200&h=260&fit=crop&auto=format', tag: '상의' },
  { id: 2, img: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=200&h=260&fit=crop&auto=format', tag: '하의' },
  { id: 3, img: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200&h=260&fit=crop&auto=format', tag: '아우터' },
  { id: 4, img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=200&h=260&fit=crop&auto=format', tag: '원피스' },
]

export default function AIWardrobeSection() {
  const [activeTab, setActiveTab] = useState<'size' | 'wardrobe'>('size')
  const [selected, setSelected] = useState<Record<SizeKey, string>>({ '체형': '스탠다드', '상의': 'S', '하의': '26' })
  const [matched, setMatched] = useState(false)
  const [matching, setMatching] = useState(false)

  const handleMatch = () => {
    setMatching(true)
    setTimeout(() => { setMatching(false); setMatched(true) }, 1600)
  }

  return (
    <section className="py-20 border-t" style={{ borderColor: 'var(--border)', background: 'var(--secondary)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <div>
            <p className="text-xs font-mono mb-3 tracking-widest uppercase" style={{ color: 'var(--accent)', fontFamily: 'DM Mono, monospace' }}>AI FEATURES</p>
            <h2 className="font-display leading-tight mb-5" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.8rem)', color: 'var(--foreground)' }}>
              핏 실패 없는 대여,<br />
              <span style={{ color: 'var(--primary)' }}>AI 사이즈 매칭</span>
            </h2>
            <p className="text-base mb-8" style={{ color: 'var(--muted-foreground)', lineHeight: 1.9, maxWidth: '420px' }}>
              온라인 구매의 가장 큰 고민, 사이즈와 핏. 체형 데이터를 한 번만 입력하면
              AI가 브랜드별 실측 데이터를 기반으로 맞는 사이즈를 추천합니다.
              대여해보고 마음에 들면 할인가에 즉시 구매도 가능합니다.
            </p>

            <div className="flex flex-col gap-4 mb-8">
              {[
                ['◎', 'AI 체형 분석', '키·몸무게·어깨 너비 입력만으로 브랜드별 추천 사이즈를 계산합니다.'],
                ['✦', '실착 데이터 피드백', '대여 후 핏 평가를 남기면 다음 추천이 더 정확해집니다.'],
                ['→', '체험 후 구매 할인', '입어보고 마음에 든 상품을 정가 대비 할인가로 즉시 구매하세요.'],
              ].map(([icon, title, desc]) => (
                <div key={title} className="flex gap-4 items-start">
                  <span className="text-base font-display mt-0.5 w-5 text-center flex-shrink-0" style={{ color: 'var(--primary)' }}>{icon}</span>
                  <div>
                    <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--foreground)' }}>{title}</p>
                    <p className="text-sm" style={{ color: 'var(--muted-foreground)', lineHeight: 1.7 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl flex items-center gap-3" style={{ background: 'rgba(25,61,42,0.07)', border: '1px solid var(--border)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg" style={{ background: 'var(--primary)', color: '#fff' }}>98</div>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>AI 사이즈 만족도 98%</p>
                <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>실착 데이터 12만 건 기반 · 브랜드별 실측 비교</p>
              </div>
            </div>
          </div>

          {/* Right: interactive demo */}
          <div>
            {/* Tabs */}
            <div className="flex gap-1 mb-4 p-1 rounded-xl w-fit" style={{ background: 'var(--muted)' }}>
              {([['size', 'AI 사이즈 매칭'], ['wardrobe', 'AI 옷장 코디']] as const).map(([id, label]) => (
                <button key={id} onClick={() => setActiveTab(id)}
                  className="px-4 py-2 rounded-lg text-xs font-medium transition-all"
                  style={{ background: activeTab === id ? 'var(--card)' : 'transparent', color: activeTab === id ? 'var(--primary)' : 'var(--muted-foreground)' }}>
                  {label}
                </button>
              ))}
            </div>

            <div className="rounded-2xl overflow-hidden" style={{ border: '1.5px solid var(--border)', background: 'var(--card)' }}>
              {activeTab === 'size' ? (
                <>
                  <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
                    <div>
                      <p className="text-xs font-mono" style={{ color: 'var(--muted-foreground)', fontFamily: 'DM Mono, monospace' }}>AI SIZE MATCH</p>
                      <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>체형 정보를 입력하세요</p>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col gap-5">
                    {(Object.keys(sizeOptions) as SizeKey[]).map(category => (
                      <div key={category}>
                        <p className="text-xs font-mono mb-2" style={{ color: 'var(--muted-foreground)', fontFamily: 'DM Mono, monospace' }}>{category}</p>
                        <div className="flex gap-2 flex-wrap">
                          {sizeOptions[category].map(opt => (
                            <button key={opt} onClick={() => setSelected(prev => ({ ...prev, [category]: opt }))}
                              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                              style={{
                                background: selected[category] === opt ? 'var(--primary)' : 'var(--secondary)',
                                color: selected[category] === opt ? 'var(--primary-foreground)' : 'var(--foreground)',
                                border: '1px solid var(--border)',
                              }}>
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                    <button onClick={handleMatch} className="w-full py-3 rounded-xl text-sm font-semibold transition-all" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}>
                      {matching ? 'AI 분석 중...' : '내 사이즈로 상품 매칭'}
                    </button>
                  </div>
                  {matched && (
                    <div className="px-5 pb-5 border-t pt-5" style={{ borderColor: 'var(--border)' }}>
                      <p className="text-xs font-mono mb-3" style={{ color: 'var(--accent)', fontFamily: 'DM Mono, monospace' }}>✦ AI 매칭 결과</p>
                      <div className="flex flex-col gap-3">
                        {aiRecommended.map(item => (
                          <div key={item.name} className="flex gap-3 rounded-xl p-3" style={{ background: 'var(--secondary)', border: '1px solid var(--border)' }}>
                            <div className="w-16 h-20 rounded-lg overflow-hidden bg-stone-200 flex-shrink-0">
                              <img src={item.img} className="w-full h-full object-cover" alt={item.name} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <div>
                                  <p className="text-[10px] font-mono" style={{ color: 'var(--muted-foreground)', fontFamily: 'DM Mono, monospace' }}>{item.brand}</p>
                                  <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{item.name}</p>
                                </div>
                                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold flex-shrink-0" style={{ background: 'var(--primary)', color: '#fff', fontFamily: 'DM Mono, monospace' }}>
                                  {item.match}% 매칭
                                </span>
                              </div>
                              <p className="text-xs mb-1.5" style={{ color: 'var(--muted-foreground)', lineHeight: 1.5 }}>{item.size} · {item.fit}</p>
                              <p className="text-sm font-bold" style={{ color: 'var(--primary)' }}>₩{item.price.toLocaleString()}/일</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
                    <div>
                      <p className="text-xs font-mono" style={{ color: 'var(--muted-foreground)', fontFamily: 'DM Mono, monospace' }}>MY WARDROBE</p>
                      <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>내 옷장 4개 · AI 코디 추천</p>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: 'var(--muted)', color: 'var(--foreground)' }}>+ 추가</button>
                  </div>
                  <div className="p-4 grid grid-cols-4 gap-2">
                    {wardrobeItems.map(item => (
                      <div key={item.id} className="relative rounded-xl overflow-hidden aspect-[3/4] bg-stone-100">
                        <img src={item.img} className="w-full h-full object-cover" alt={item.tag} />
                        <div className="absolute bottom-0 left-0 right-0 p-1" style={{ background: 'linear-gradient(to top, rgba(26,22,18,0.65), transparent)' }}>
                          <p className="text-[9px] font-mono text-white" style={{ fontFamily: 'DM Mono, monospace' }}>{item.tag}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-5 pb-5 border-t pt-4" style={{ borderColor: 'var(--border)' }}>
                    <div className="rounded-xl p-4" style={{ background: 'var(--primary)', color: '#fff' }}>
                      <p className="text-[10px] font-mono mb-1" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'DM Mono, monospace' }}>TODAY'S AI EDIT</p>
                      <p className="text-sm font-semibold">테라코타 컬러 아이템이 필요해요.</p>
                      <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.65)' }}>현재 옷장에 따뜻한 톤이 부족합니다 — RECTO 새틴 드레스 추천</p>
                      <button className="mt-3 px-3 py-2 rounded-lg text-xs font-semibold" style={{ background: 'var(--accent)' }}>AI 코디 대여하기 →</button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
