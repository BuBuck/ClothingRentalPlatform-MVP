import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavigationProps {
  activeView: 'web' | 'app';
  onSwitchView: (view: 'web' | 'app') => void;
  isLoggedIn: boolean;
  onOpenLogin: () => void;
  onLogout?: () => void;
}

export default function Navigation({ activeView, onSwitchView, isLoggedIn, onOpenLogin, onLogout }: NavigationProps) {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#F5F2EB]/90 backdrop-blur-md border-b border-[#D5D0C4]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/')} className="text-xl font-display font-extrabold tracking-tight text-[#171b16]">
            Layered<span className="text-[#BB5938]">.</span>
          </button>
          
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-stone-600">
            <button onClick={() => navigate('/')} className="hover:text-[#193D2A] transition-colors">홈</button>
            <button onClick={() => navigate('/photo-search')} className="hover:text-[#193D2A] transition-colors">AI 사진 검색</button>
            <a href="#brands" className="hover:text-[#193D2A] transition-colors">브랜드 파트너</a>
            <a href="#esg" className="hover:text-[#193D2A] transition-colors">ESG 리포트</a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          
          <div className="flex bg-[#EADCCB] p-1 rounded-xl text-[11px] font-bold">
            <button 
              onClick={() => onSwitchView('web')}
              className={`px-3 py-1 rounded-lg transition-all ${activeView === 'web' ? 'bg-[#193D2A] text-white shadow-xs' : 'text-stone-600'}`}
            >
              WEB
            </button>
            <button 
              onClick={() => {
                onSwitchView('app');
                navigate('/app');
              }}
              className={`px-3 py-1 rounded-lg transition-all ${activeView === 'app' ? 'bg-[#193D2A] text-white shadow-xs' : 'text-stone-600'}`}
            >
              APP 뷰
            </button>
          </div>

          {isLoggedIn ? (
            <div className="relative" ref={menuRef}>
              <div 
                onClick={() => setShowProfileMenu(prev => !prev)}
                className="flex items-center gap-3 ml-2 cursor-pointer group"
              >
                <div className="hidden sm:block text-right">
                  <p className="text-[11px] font-bold leading-none group-hover:text-[#193D2A] transition-colors">김지수 님</p>
                  <p className="text-[9px] font-mono text-[#BB5938] mt-0.5">GOLD MEMBER</p>
                </div>
                <button className="w-9 h-9 rounded-full bg-stone-200 overflow-hidden ring-2 ring-[#193D2A]/10 shadow-sm transition-transform active:scale-95 pointer-events-none">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop" alt="Profile" />
                </button>
              </div>

              {showProfileMenu && (
                <div className="absolute right-0 mt-3 w-72 bg-white rounded-3xl shadow-2xl border border-[#D5D0C4] p-5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  
                  <div className="flex items-center gap-3.5 pb-4 border-b border-stone-100">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop" 
                      alt="Profile" 
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-[#193D2A]/20"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-stone-900">김지수 님</h4>
                      <p className="text-[10px] text-stone-500 font-mono">jisoo.kim@layered.com</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded bg-amber-50 text-[#BB5938] text-[9px] font-bold font-mono">
                        GOLD 멤버십 (할인 10%)
                      </span>
                    </div>
                  </div>

                  <div className="py-2 space-y-1 text-xs font-medium text-stone-700">
                    <button 
                      onClick={() => { setShowProfileMenu(false); navigate('/closet'); }}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F5F2EB] transition-colors"
                    >
                      <span>🧥 나의 대여 및 클로젯</span>
                      <span className="text-stone-400">→</span>
                    </button>
                  </div>

                  <div className="pt-3 border-t border-stone-100">
                    <button 
                      onClick={() => {
                        setShowProfileMenu(false);
                        
                        if (onLogout) {
                          onLogout();
                        }
                        navigate('/', { replace: true });
                      }}
                      className="w-full py-2 text-center text-xs text-stone-400 hover:text-red-600 font-bold transition-colors"
                    >
                      로그아웃
                    </button>
                  </div>

                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={onOpenLogin}
              className="px-4 py-2 rounded-xl bg-[#193D2A] text-white text-xs font-bold shadow-sm hover:bg-[#122b1e] transition-all"
            >
              로그인
            </button>
          )}

        </div>

      </div>
    </header>
  );
}