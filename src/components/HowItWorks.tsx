export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: '브랜드 재고에서 엄선',
      desc: '패션 브랜드의 이월 상품·미세 하자 반품 의류를 무상 또는 초저가로 위탁받아 전문 세탁·살균 후 등록합니다.',
      icon: '✦',
      accent: false,
    },
    {
      num: '02',
      title: 'AI 사이즈 매칭 후 배송',
      desc: '체형 데이터를 입력하면 AI가 핏을 분석해 정확한 사이즈를 추천합니다. 편의점 택배로 간편하게 픽업하세요.',
      icon: '◎',
      accent: true,
    },
    {
      num: '03',
      title: '착용 후 편의점 반납',
      desc: '반납 봉투에 넣어 가까운 편의점에 맡기면 끝. 세탁·살균은 저희가 처리합니다.',
      icon: '↩',
      accent: false,
    },
    {
      num: '04',
      title: '스타일링 샷 공유 → 포인트',
      desc: '착용 후 스타일링 사진을 플랫폼에 공유하면 포인트가 지급됩니다. 다른 사용자가 그 사진을 보고 대여하면 추가 리워드까지.',
      icon: '★',
      accent: true,
    },
  ]

  return (
    <section className="py-20 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="lg:sticky lg:top-24">
            <p className="text-xs font-mono mb-3 tracking-widest uppercase" style={{ color: 'var(--accent)', fontFamily: 'DM Mono, monospace' }}>HOW IT WORKS</p>
            <h2 className="font-display leading-tight mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--foreground)' }}>
              브랜드 재고가<br />
              <span style={{ color: 'var(--primary)' }}>당신의 옷장으로</span>
            </h2>
            <p className="text-base mb-8" style={{ color: 'var(--muted-foreground)', lineHeight: 1.9, maxWidth: '380px' }}>
              버려질 패션 재고가 수익·마케팅 데이터로 돌아가는 B2B 가치,
              그리고 당신은 커피값에 브랜드 새 옷을 입는 B2C 혜택.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[['₩4,500~', '1일 렌탈 시작가', 'var(--primary)'], ['2.3kg', 'CO₂ 절감/건', 'var(--accent)'], ['4회', '손익분기 회전율', 'var(--primary)'], ['98%', 'AI 사이즈 만족도', 'var(--accent)']].map(([val, label, color]) => (
                <div key={label} className="p-4 rounded-xl" style={{ background: 'var(--secondary)', border: '1px solid var(--border)' }}>
                  <p className="text-lg font-display font-bold" style={{ color }}>{val}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)', fontFamily: 'DM Mono, monospace' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {steps.map((step) => (
              <div key={step.num}
                className="flex gap-5 p-5 rounded-2xl transition-all hover:-translate-y-0.5"
                style={{ background: step.accent ? 'var(--primary)' : 'var(--card)', border: '1px solid var(--border)', transitionDuration: '200ms' }}>
                <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-lg font-display font-bold"
                  style={{ background: step.accent ? 'rgba(255,255,255,0.12)' : 'rgba(25,61,42,0.07)', color: step.accent ? 'rgba(255,255,255,0.9)' : 'var(--primary)' }}>
                  {step.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-mono" style={{ color: step.accent ? 'rgba(255,255,255,0.5)' : 'var(--muted-foreground)', fontFamily: 'DM Mono, monospace' }}>{step.num}</span>
                    <h3 className="font-semibold text-sm" style={{ color: step.accent ? '#fff' : 'var(--foreground)' }}>{step.title}</h3>
                  </div>
                  <p className="text-sm" style={{ color: step.accent ? 'rgba(255,255,255,0.7)' : 'var(--muted-foreground)', lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
