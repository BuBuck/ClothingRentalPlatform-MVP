import { useState } from 'react';
import { View } from '../types';

interface NavigationProps {
  activeView: View;
  onSwitchView: (v: View) => void;
  isLoggedIn: boolean;
  onOpenLogin: () => void;
}

export default function Navigation({ activeView, onSwitchView, isLoggedIn, onOpenLogin }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b" style={{ background: 'rgba(247,243,238,0.95)', borderColor: 'var(--border)', backdropFilter: 'blur(12px)' }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-display font-bold tracking-tight" style={{ color: 'var(--primary)' }}>Layered</span>
            <span className="text-[10px] font-mono tracking-widest" style={{ color: 'var(--accent)', fontFamily: 'DM Mono, monospace' }}>레이어드</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {['새 컬렉션', '브랜드 파트너', 'AI 사이즈', 'Layer-to-Earn', 'ESG 리포트'].map(item => (
              <a key={item} href="#" className="text-sm hover:opacity-60 transition-opacity text-stone-900">{item}</a>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 p-1 rounded-lg bg-stone-100">
            <button onClick={() => onSwitchView('web')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${activeView === 'web' ? 'bg-white text-[#193D2A] shadow-sm' : 'text-stone-500'}`}>
              웹
            </button>
            <button onClick={() => onSwitchView('app')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${activeView === 'app' ? 'bg-white text-[#193D2A] shadow-sm' : 'text-stone-500'}`}>
              앱
            </button>
          </div>
          
          {isLoggedIn ? (
            <div className="flex items-center gap-3 ml-2">
              <div className="hidden sm:block text-right">
                <p className="text-[11px] font-bold leading-none">김지수 님</p>
                <p className="text-[9px] font-mono text-[#BB5938] mt-0.5">GOLD MEMBER</p>
              </div>
              <button className="w-9 h-9 rounded-full bg-stone-200 overflow-hidden ring-2 ring-[#193D2A]/10 shadow-sm transition-transform active:scale-95">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop" alt="Profile" />
              </button>
            </div>
          ) : (
            <button 
              onClick={onOpenLogin}
              className="hidden sm:flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all active:scale-95 bg-[#193D2A] text-white">
              로그인
            </button>
          )}

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-stone-900">
            <div className="w-5 h-0.5 mb-1 bg-current" />
            <div className="w-5 h-0.5 mb-1 bg-current" />
            <div className="w-5 h-0.5 bg-current" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t px-6 py-4 flex flex-col gap-3 bg-white border-stone-200">
          {['새 컬렉션', '브랜드 파트너', 'AI 사이즈', 'Layer-to-Earn', 'ESG 리포트'].map(item => (
            <a key={item} href="#" className="text-sm py-1 text-stone-900">{item}</a>
          ))}
          <div className="flex gap-2 pt-2">
            <button onClick={() => onSwitchView('web')} className={`flex-1 py-2 rounded-lg text-sm text-center ${activeView === 'web' ? 'bg-[#193D2A] text-white' : 'bg-stone-100'}`}>웹 뷰</button>
            <button onClick={() => onSwitchView('app')} className={`flex-1 py-2 rounded-lg text-sm text-center ${activeView === 'app' ? 'bg-[#193D2A] text-white' : 'bg-stone-100'}`}>앱 뷰</button>
          </div>
          {!isLoggedIn && (
            <button onClick={onOpenLogin} className="w-full py-3 rounded-xl text-sm font-bold mt-2 bg-[#193D2A] text-white">
              로그인
            </button>
          )}
        </div>
      )}
    </nav>
  );
}