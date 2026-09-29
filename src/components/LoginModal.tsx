import { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase'; // firebase.ts 설정 파일 경로에 맞게 수정해주세요

interface LoginModalProps {
  onClose: () => void;
  onLogin: () => void;
}

export default function LoginModal({ onClose, onLogin }: LoginModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  // ✦ Firebase 구글 팝업 로그인 핸들러
  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      console.log('구글 로그인 성공:', user);
      
      // 로그인 성공 시 부모 컴포넌트로 상태 전달 및 모달 닫기
      onLogin();
      onClose();
    } catch (error) {
      console.error('구글 로그인 에러:', error);
      alert('로그인 중 문제가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-white rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
        <div className="p-8 pt-10 text-center">
          <div className="w-16 h-16 bg-[#193D2A] rounded-2xl mx-auto flex items-center justify-center text-white text-2xl mb-6 shadow-xl shadow-[#193D2A]/20">♧</div>
          <h2 className="text-2xl font-bold mb-2">웨어-어스 시작하기</h2>
          <p className="text-[13px] text-[#6c7068] leading-relaxed mb-8">브랜드 재고를 가치 있게,<br />당신의 스타일을 수익으로 만드세요.</p>
          
          <div className="space-y-3">
            {/* ✦ 구글 로그인 버튼 */}
            <button 
              onClick={handleGoogleLogin} 
              disabled={isLoading}
              className="w-full py-4 bg-white border border-[#D5D0C4] text-[#191919] rounded-2xl text-[14px] font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-stone-50 transition-all disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.14C3.15 21.32 7.23 24 12 24z"/>
                <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.62H1.18C.43 8.15 0 9.87 0 12s.43 3.85 1.18 5.38l4.09-3.14z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.15 2.68 1.18 6.62l4.09 3.14c.95-2.85 3.6-4.96 6.73-4.96z"/>
              </svg>
              {isLoading ? '로그인 중...' : '구글로 3초 만에 시작'}
            </button>

            {/* 기존 이메일 로그인 버튼 (원하실 경우 추후 이메일 인증 기능 연동 가능) */}
            <button 
              onClick={onLogin} 
              disabled={isLoading}
              className="w-full py-4 bg-[#171b16] text-white rounded-2xl text-[14px] font-bold shadow-sm hover:bg-stone-800 transition-all"
            >
              이메일로 로그인
            </button>
          </div>
          
          <p className="mt-8 text-[11px] text-[#b0b2ac]">
            로그인 시 <span className="underline">이용약관</span> 및 <span className="underline">개인정보처리방침</span>에 동의하게 됩니다.
          </p>
        </div>
        <button onClick={onClose} className="absolute top-6 right-6 text-[#b0b2ac] hover:text-[#171b16]">✕</button>
      </div>
    </div>
  );
}