interface Props {
  onSwitchToApp: () => void
}

export default function AppDownloadSection({ onSwitchToApp }: Props) {
  return (
    <section className="py-20 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="rounded-3xl overflow-hidden relative" style={{ background: 'var(--primary)' }}>
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(247,243,238,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(196,98,42,0.6) 0%, transparent 40%)'
          }} />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
            {/* Left content */}
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <p className="text-xs font-mono mb-4 tracking-widest uppercase" style={{ color: 'rgba(247,243,238,0.6)', fontFamily: 'DM Mono, monospace' }}>WEAR-US APP</p>
              <h2 className="font-display leading-tight mb-5" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--primary-foreground)' }}>
                브랜드 새 옷을<br />
                커피값에, 어디서나
              </h2>
              <p className="text-sm mb-8" style={{ color: 'rgba(247,243,238,0.75)', lineHeight: 1.9, maxWidth: '380px' }}>
                AI 사이즈 매칭, 빠른 브랜드 검색, Wear-to-Earn 피드까지.
                웨어어스 앱으로 더 편리하게 패션 재고 순환을 경험하세요.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex items-center gap-3 px-5 py-3 rounded-xl" style={{ background: 'rgba(247,243,238,0.15)', border: '1.5px solid rgba(247,243,238,0.3)' }}>
                  <span className="text-2xl">🍎</span>
                  <div className="text-left">
                    <p className="text-xs" style={{ color: 'rgba(247,243,238,0.6)', fontFamily: 'DM Mono, monospace' }}>DOWNLOAD ON</p>
                    <p className="text-sm font-semibold" style={{ color: 'var(--primary-foreground)' }}>App Store</p>
                  </div>
                </button>
                <button className="flex items-center gap-3 px-5 py-3 rounded-xl" style={{ background: 'rgba(247,243,238,0.15)', border: '1.5px solid rgba(247,243,238,0.3)' }}>
                  <span className="text-2xl">▶</span>
                  <div className="text-left">
                    <p className="text-xs" style={{ color: 'rgba(247,243,238,0.6)', fontFamily: 'DM Mono, monospace' }}>GET IT ON</p>
                    <p className="text-sm font-semibold" style={{ color: 'var(--primary-foreground)' }}>Google Play</p>
                  </div>
                </button>
              </div>

              <button
                onClick={onSwitchToApp}
                className="mt-4 self-start px-4 py-2 rounded-lg text-xs underline underline-offset-4"
                style={{ color: 'rgba(247,243,238,0.6)', fontFamily: 'Outfit, sans-serif' }}>
                앱 미리보기 →
              </button>
            </div>

            {/* Right: app mockup */}
            <div className="hidden lg:flex items-end justify-center pt-10 px-10">
              <div className="relative w-64" style={{ filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.3))' }}>
                {/* Phone frame */}
                <div className="w-64 h-[520px] rounded-[3rem] overflow-hidden border-4 border-white/20 relative" style={{ background: 'var(--background)' }}>
                  {/* Notch */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 rounded-full z-10" style={{ background: 'rgba(26,22,18,0.9)' }} />

                  {/* App content preview */}
                  <div className="h-full overflow-hidden">
                    <div className="pt-10 px-4">
                      <p className="text-xs font-mono mb-1" style={{ color: 'var(--accent)', fontFamily: 'DM Mono, monospace' }}>WEAR-US</p>
                      <p className="text-base font-display font-semibold mb-3" style={{ color: 'var(--foreground)' }}>오늘의 추천</p>
                      <div className="rounded-2xl overflow-hidden h-48 mb-3 bg-stone-200">
                        <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=300&h=250&fit=crop&auto=format" className="w-full h-full object-cover" alt="앱 미리보기" />
                        <div className="absolute bottom-3 left-4 right-4" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { name: '울 코트', price: '₩18,000', img: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=150&h=190&fit=crop&auto=format' },
                          { name: '슬립 드레스', price: '₩12,500', img: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=150&h=190&fit=crop&auto=format' },
                        ].map(item => (
                          <div key={item.name} className="rounded-xl overflow-hidden" style={{ background: 'var(--card)' }}>
                            <div className="h-24 overflow-hidden bg-stone-100">
                              <img src={item.img} className="w-full h-full object-cover" alt={item.name} />
                            </div>
                            <div className="p-2">
                              <p className="text-xs font-medium" style={{ color: 'var(--foreground)' }}>{item.name}</p>
                              <p className="text-xs font-semibold" style={{ color: 'var(--primary)' }}>{item.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
