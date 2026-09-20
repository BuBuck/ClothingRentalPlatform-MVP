import { useState } from 'react'
import { View } from '../App'

interface Props {
  activeView: View
  onSwitchView: (v: View) => void
}

export default function Navigation({ activeView, onSwitchView }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b" style={{ background: 'rgba(247,243,238,0.95)', borderColor: 'var(--border)', backdropFilter: 'blur(12px)' }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-display font-bold tracking-tight" style={{ color: 'var(--primary)' }}>Wear-Us</span>
            <span className="text-[10px] font-mono tracking-widest" style={{ color: 'var(--accent)', fontFamily: 'DM Mono, monospace' }}>웨어어스</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {['새 컬렉션', '브랜드 파트너', 'AI 사이즈', 'Wear-to-Earn', 'ESG 리포트'].map(item => (
              <a key={item} href="#" className="text-sm hover:opacity-60 transition-opacity" style={{ color: 'var(--foreground)' }}>{item}</a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="hidden sm:flex items-center gap-1 p-1 rounded-lg" style={{ background: 'var(--muted)' }}>
            <button onClick={() => onSwitchView('web')}
              className="px-3 py-1.5 rounded-md text-xs font-medium transition-all"
              style={{ background: activeView === 'web' ? 'var(--card)' : 'transparent', color: activeView === 'web' ? 'var(--primary)' : 'var(--muted-foreground)' }}>
              웹
            </button>
            <button onClick={() => onSwitchView('app')}
              className="px-3 py-1.5 rounded-md text-xs font-medium transition-all"
              style={{ background: activeView === 'app' ? 'var(--card)' : 'transparent', color: activeView === 'app' ? 'var(--primary)' : 'var(--muted-foreground)' }}>
              앱
            </button>
          </div>
          <button className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}>
            로그인
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2" style={{ color: 'var(--foreground)' }}>
            <div className="w-5 h-0.5 mb-1" style={{ background: 'currentColor' }} />
            <div className="w-5 h-0.5 mb-1" style={{ background: 'currentColor' }} />
            <div className="w-5 h-0.5" style={{ background: 'currentColor' }} />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t px-6 py-4 flex flex-col gap-3" style={{ background: 'var(--background)', borderColor: 'var(--border)' }}>
          {['새 컬렉션', '브랜드 파트너', 'AI 사이즈', 'Wear-to-Earn', 'ESG 리포트'].map(item => (
            <a key={item} href="#" className="text-sm py-1" style={{ color: 'var(--foreground)' }}>{item}</a>
          ))}
          <div className="flex gap-2 pt-2">
            <button onClick={() => onSwitchView('web')} className="flex-1 py-2 rounded-lg text-sm text-center" style={{ background: activeView === 'web' ? 'var(--primary)' : 'var(--muted)', color: activeView === 'web' ? 'var(--primary-foreground)' : 'var(--foreground)', fontFamily: 'Outfit, sans-serif' }}>웹 뷰</button>
            <button onClick={() => onSwitchView('app')} className="flex-1 py-2 rounded-lg text-sm text-center" style={{ background: activeView === 'app' ? 'var(--primary)' : 'var(--muted)', color: activeView === 'app' ? 'var(--primary-foreground)' : 'var(--foreground)', fontFamily: 'Outfit, sans-serif' }}>앱 뷰</button>
          </div>
        </div>
      )}
    </nav>
  )
}
