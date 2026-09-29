import { useState, useRef, useEffect } from 'react';
import { MOCK_PRODUCTS } from '../data/mockData';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  products?: Product[];
  reasons?: string[];
}

const CHAT_STORAGE_KEY = 'layered_chat_history';

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // LocalStorage에서 대화 기록 불러오기
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const savedMessages = localStorage.getItem(CHAT_STORAGE_KEY);
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (error) {
        console.error('LocalStorage 파싱 에러:', error);
      }
    }
    return [
      {
        id: '1',
        sender: 'ai',
        text: '안녕하세요! 레이어드 수석 AI 스타일리스트 🎀 레아(Rhea)입니다. 내 옷장과 취향을 바탕으로 딱 맞는 스타일을 추천해 드릴게요. 어떤 약속이나 스타일을 고민 중이신가요?',
        products: MOCK_PRODUCTS.slice(0, 2),
        reasons: ['맞춤형 옷장 분석', '실시간 재고 매칭']
      }
    ];
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 대화 내용 변경 시 LocalStorage에 JSON 형태로 자동 저장
  useEffect(() => {
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      console.error('Storage save error:', e);
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const lowerQuery = query.toLowerCase();

      let selectedProduct = MOCK_PRODUCTS[0];
      let basicClosetItem = '흰 티셔츠와 슬랙스';
      let situationName = '말씀하신 일정';
      let customReasons = ['보유 옷장 자동 매칭', '높은 코디 활용도', '트렌디한 핏 분석'];

      if (lowerQuery.includes('소개팅') || lowerQuery.includes('데이트') || lowerQuery.includes('만남')) {
        basicClosetItem = '심플한 무지 니트와 슬랙스';
        situationName = '설레는 만남 자리';
        selectedProduct = MOCK_PRODUCTS.find(p => p.tag.includes('자켓') || p.tag.includes('블레이저') || p.tag.includes('코트')) || MOCK_PRODUCTS[0];
        customReasons = ['첫인상을 높여주는 단정함', '과하지 않은 세미캐주얼', '정핏 매치'];
      } else if (lowerQuery.includes('여행') || lowerQuery.includes('바다') || lowerQuery.includes('휴가') || lowerQuery.includes('놀러')) {
        basicClosetItem = '편안한 흰 나시와 데님 팬츠';
        situationName = '즐거운 여행과 야외 활동';
        selectedProduct = MOCK_PRODUCTS.find(p => p.tag.includes('셔츠') || p.tag.includes('가디건') || p.tag.includes('원피스')) || MOCK_PRODUCTS[1];
        customReasons = ['사진이 잘 나오는 포인트 컬러', '가볍게 걸치기 좋은 아우터', '활동성 강조'];
      } else if (lowerQuery.includes('결혼식') || lowerQuery.includes('하객') || lowerQuery.includes('정장') || lowerQuery.includes('격식')) {
        basicClosetItem = '미니멀한 블랙 원피스나 깔끔한 슬랙스';
        situationName = '격식 있는 예식 자리';
        selectedProduct = MOCK_PRODUCTS.find(p => p.tag.includes('코트') || p.tag.includes('자켓') || p.tag.includes('블레이저')) || MOCK_PRODUCTS[0];
        customReasons = ['단정하고 고급스러운 무드', '격식에 맞는 TPO', '세련된 실루엣'];
      } else {
        basicClosetItem = '고객님의 옷장 속 베이직 아이템';
        situationName = '고민 중이신 스타일';
        selectedProduct = MOCK_PRODUCTS[0];
        customReasons = ['맞춤형 믹스매치', '높은 활용도', '트렌디한 감성'];
      }

      const text = `좋아요! 말씀해주신 내용을 바탕으로 살펴보니, 저장된 옷장 속 '${basicClosetItem}'에 저희 사이트의 '${selectedProduct.name}'을(를) 더하는 조합이 가장 멋스러워요.\n\n${situationName}에 딱 어울리면서도 포인트를 살릴 수 있는 베스트 코디랍니다! ✨`;

      // ✦ 중복 없는 고유 상품 2개 추출 (Set 활용)
      const subProduct = MOCK_PRODUCTS.find(p => p.id !== selectedProduct.id) || MOCK_PRODUCTS[1];
      const uniqueProducts = Array.from(new Set([selectedProduct, subProduct]));

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: text,
        reasons: customReasons,
        products: uniqueProducts
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {isOpen && (
        <div className="w-[420px] h-[600px] bg-white rounded-3xl border border-[#D5D0C4] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 mb-4">
          
          {/* 팝업 헤더 */}
          <div className="px-5 py-4 bg-[#193D2A] text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white text-lg pr-2 font-light hover:text-stone-300 transition-colors"
                title="웹으로 돌아가기"
              >
                {'<'}
              </button>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse mt-0.5" />
              <div>
                <p className="text-sm font-bold tracking-wider">Layered AI 스타일 추천</p>
                <p className="text-[10px] text-emerald-200 font-mono">스타일리스트 레아(Rhea)</p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs hover:bg-white/20 transition-all font-bold"
            >
              ✕
            </button>
          </div>

          {/* 메시지 리스트 스크롤 영역 */}
          <div className="flex-1 min-h-0 overflow-y-auto p-5 space-y-4 bg-[#F5F2EB]/50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                
                {msg.sender === 'ai' && (
                  <span className="text-[10px] font-bold text-stone-500 mb-1 ml-1">스타일리스트 레아</span>
                )}
                
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs leading-relaxed shadow-sm whitespace-pre-wrap ${
                  msg.sender === 'user' 
                    ? 'bg-[#193D2A] text-white rounded-br-none' 
                    : 'bg-white text-stone-900 rounded-bl-none border border-[#D5D0C4]'
                }`}>
                  {msg.text}
                </div>

                {msg.sender === 'ai' && msg.reasons && msg.reasons.length > 0 && (
                  <div className="mt-2 max-w-[85%] bg-amber-50/80 border border-amber-200/60 rounded-xl p-2.5 text-[11px] text-stone-700">
                    <p className="font-bold text-[#193D2A] mb-1 flex items-center gap-1">
                      <span>✦</span> 추천 이유:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {msg.reasons.map((reason, idx) => (
                        <span key={`reason-${msg.id}-${idx}`} className="bg-white px-2 py-0.5 rounded-md border border-amber-100 text-[10px] text-stone-600 font-medium">
                          {reason}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {msg.products && msg.products.length > 0 && (
                  <div className="mt-2.5 w-full grid grid-cols-2 gap-2.5">
                    {/* ✦ 수정됨: key에 index를 조합하여 절대 중복되지 않도록 고유성 확보 */}
                    {msg.products.map((item, pIdx) => (
                      <div key={`product-${msg.id}-${item.id}-${pIdx}`} className="bg-white p-2 rounded-xl border border-[#D5D0C4] shadow-xs">
                        <ProductCard item={item} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex flex-col items-start">
                <span className="text-[10px] font-bold text-stone-500 mb-1 ml-1">스타일리스트 레아</span>
                <div className="px-4 py-2.5 rounded-2xl bg-white border border-[#D5D0C4] rounded-bl-none shadow-sm flex gap-1">
                  <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 하단 입력 및 칩 영역 */}
          <div className="shrink-0 bg-white border-t border-[#D5D0C4] p-3.5">
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2.5">
              {['내일 소개팅 있는데 뭐 입지?', '바닷가 여행 룩 추천해줘', '결혼식 하객룩 골라줘', '편한 출근룩 코디'].map((chip) => (
                <button 
                  key={`chip-${chip}`}
                  disabled={isLoading}
                  onClick={() => handleSendMessage(chip)}
                  className="whitespace-nowrap px-3 py-1.5 bg-[#F5F2EB] text-xs font-medium rounded-full border border-[#D5D0C4] text-stone-700 hover:text-[#193D2A] hover:border-[#193D2A] transition-all"
                >
                  💡 {chip}
                </button>
              ))}
            </div>

            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} 
              className="flex items-center gap-2.5 bg-[#F5F2EB] rounded-2xl px-4 py-2 border border-[#D5D0C4]"
            >
              <input 
                type="text"
                value={input}
                disabled={isLoading}
                onChange={(e) => setInput(e.target.value)}
                placeholder="어떤 스타일이나 약속이 있으신가요?"
                className="flex-1 text-xs outline-none bg-transparent"
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="h-8 w-8 rounded-full bg-[#193D2A] text-white flex items-center justify-center font-bold text-xs shadow transition-transform active:scale-95 disabled:opacity-50"
              >
                ↑
              </button>
            </form>
          </div>

        </div>
      )}

      {/* 플로팅 원형 버튼 */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 bg-[#193D2A] text-white px-5 py-3.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all border border-emerald-900/20"
        >
          <span className="text-xl">💬</span>
          <div className="text-left">
            <p className="text-xs font-bold leading-tight">AI 챗봇과 대화</p>
            <p className="text-[9px] text-emerald-200 font-mono tracking-wider">LAYERED STYLIST</p>
          </div>
        </button>
      )}

    </div>
  );
}