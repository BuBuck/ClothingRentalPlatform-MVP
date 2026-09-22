import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function AppLayout() {
  const navigate = useNavigate();
  const { detailHeader } = useApp();

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-stone-100">
      <div className="w-full max-w-sm mx-auto flex flex-col h-screen relative shadow-2xl bg-[#F5F2EB] text-[#171b16] overflow-hidden">
        
        {/* 상단 헤더 영역 */}
        {detailHeader ? (
          <header className="sticky top-0 z-40 w-full flex items-center justify-between px-5 py-4 border-b bg-white/95 backdrop-blur-md border-[#D5D0C4] shrink-0">
            <button onClick={detailHeader.onBack} className="text-sm font-bold">←</button>
            <h1 className="text-xs font-mono font-bold tracking-wider">{detailHeader.brand}</h1>
            <div className="w-4" />
          </header>
        ) : (
          <header className="sticky top-0 z-40 w-full flex items-center justify-between px-5 pb-3 pt-4 border-b bg-white/90 backdrop-blur-md border-[#D5D0C4] shrink-0">
            <button onClick={() => navigate('/')} className="text-[10px] font-mono font-bold tracking-tighter text-[#6c7068]">← WEB</button>
            <div className="text-center">
              <p className="font-display text-lg tracking-[.15em] font-bold text-[#193D2A]">Layered</p>
              <p className="text-[8px] font-mono tracking-widest font-medium text-[#BB5938]">BRAND RE-USE PLATFORM</p>
            </div>
            <span className="text-xl">✧</span>
          </header>
        )}

        <main className="flex-1 min-h-0 relative overflow-y-auto">
          <Outlet />
        </main>

        {/* App Bottom Navigation */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 z-30 flex w-full max-w-sm border-t bg-white/95 backdrop-blur-md px-2 border-[#D5D0C4]">
          {[
            { to: '/app', label: '홈', icon: '⌂', end: true },
            { to: '/app/search', label: 'AI챗봇', icon: '◆', end: false },
            { to: '/app/closet', label: '옷장', icon: '★', end: false },
            { to: '/app/profile', label: '마이', icon: '◯', end: false },
          ].map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center gap-1.5 py-4 transition-all ${
                  isActive ? 'text-[#193D2A]' : 'text-[#b0b2ac]'
                }`
              }
            >
              <span className="text-xl leading-none font-bold">{tab.icon}</span>
              <span className="text-[10px] font-bold tracking-tight">{tab.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}