interface LoginModalProps {
  onClose: () => void;
  onLogin: () => void;
}

export default function LoginModal({ onClose, onLogin }: LoginModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-white rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
        <div className="p-8 pt-10 text-center">
          <div className="w-16 h-16 bg-[#193D2A] rounded-2xl mx-auto flex items-center justify-center text-white text-2xl mb-6 shadow-xl shadow-[#193D2A]/20">♧</div>
          <h2 className="text-2xl font-bold mb-2">웨어-어스 시작하기</h2>
          <p className="text-[13px] text-[#6c7068] leading-relaxed mb-8">브랜드 재고를 가치 있게,<br />당신의 스타일을 수익으로 만드세요.</p>
          
          <div className="space-y-3">
            <button onClick={onLogin} className="w-full py-4 bg-[#FEE500] text-[#191919] rounded-2xl text-[14px] font-bold flex items-center justify-center gap-2 shadow-sm">
              <span className="text-lg">💬</span> 카카오로 3초 만에 시작
            </button>
            <button onClick={onLogin} className="w-full py-4 bg-[#171b16] text-white rounded-2xl text-[14px] font-bold shadow-sm">
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