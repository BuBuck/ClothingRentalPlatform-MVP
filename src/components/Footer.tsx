export default function Footer() {
  return (
    <footer className="border-t pt-16 pb-8" style={{ borderColor: 'var(--border)', background: 'var(--foreground)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <p className="text-2xl font-display font-bold mb-1" style={{ color: 'var(--background)' }}>Wear-Us</p>
            <p className="text-xs font-mono mb-4" style={{ color: 'rgba(247,243,238,0.4)', fontFamily: 'DM Mono, monospace' }}>웨어어스 · B2B2C 패션 재고 순환</p>
            <p className="text-sm" style={{ color: 'rgba(247,243,238,0.6)', lineHeight: 1.8 }}>
              버려질 브랜드 재고에 새로운 여정을. 커피 한 잔 값에 한정판 새 옷을.
            </p>
          </div>
          {[
            { title: '서비스', links: ['대여 방법', 'AI 사이즈 매칭', 'Wear-to-Earn', '편의점 반납', '즉시 구매'] },
            { title: '브랜드', links: ['파트너 브랜드', '입점 신청', 'ESG 리포트', '피팅 데이터', '재고 위탁'] },
            { title: '회사', links: ['웨어어스 소개', '지속가능성', '채용', '투자자 IR', '고객센터'] },
          ].map(col => (
            <div key={col.title}>
              <p className="text-xs font-mono mb-4 tracking-widest uppercase" style={{ color: 'rgba(247,243,238,0.4)', fontFamily: 'DM Mono, monospace' }}>{col.title}</p>
              <div className="flex flex-col gap-2.5">
                {col.links.map(link => (
                  <a key={link} href="#" className="text-sm hover:opacity-100 transition-opacity" style={{ color: 'rgba(247,243,238,0.65)', fontFamily: 'Outfit, sans-serif' }}>{link}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderColor: 'rgba(247,243,238,0.1)' }}>
          <p className="text-xs font-mono" style={{ color: 'rgba(247,243,238,0.3)', fontFamily: 'DM Mono, monospace' }}>
            © 2026 Wear-Us Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono" style={{ color: 'rgba(247,243,238,0.3)', fontFamily: 'DM Mono, monospace' }}>
              ESG 인증 플랫폼 · 절감 CO₂: <span style={{ color: 'rgba(196,98,42,0.8)' }}>31,200kg</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
