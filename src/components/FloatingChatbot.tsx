import { useState, useRef, useEffect } from 'react';
import { MOCK_PRODUCTS } from '../data/mockData';
import ProductCard from './ProductCard';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  products?: typeof MOCK_PRODUCTS;
}

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: '안녕하세요! Layered AI 스타일리스트입니다. 🧥 찾고 계신 스타일이나 브랜드가 있으신가요?',
      products: MOCK_PRODUCTS.slice(0, 2)
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');

    setTimeout(() => {
      const matchedProducts = MOCK_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.tag.toLowerCase().includes(query.toLowerCase())
      );

      const aiReplyText = matchedProducts.length > 0 
        ? `"${query}" 키워드와 어울리는 추천 대여 상품이에요. 마음에 드는 상품을 골라보세요!` 
        : `요청하신 "${query}"에 딱 맞는 스타일을 찾았어요! 아래 추천 아이템을 확인해 보세요. ✨`;

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiReplyText,
        products: matchedProducts.length > 0 ? matchedProducts : MOCK_PRODUCTS.slice(0, 2)
      };

      setMessages(prev => [...prev, aiMsg]);
    }, 500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* ✦ 1. 팝업창 크기 확장 (w-[420px] h-[600px]로 넉넉하게 조정) */}
      {isOpen && (
        <div className="w-[420px] h-[600px] bg-white rounded-3xl border border-[#D5D0C4] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* 팝업 헤더 */}
          <div className="px-6 py-4 bg-[#193D2A] text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <p className="text-sm font-bold tracking-wider">Layered AI Stylist</p>
                <p className="text-[10px] text-emerald-200 font-mono">실시간 재고 매칭 중</p>
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
                
                {/* 말풍선 */}
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-[#193D2A] text-white rounded-br-none' 
                    : 'bg-white text-stone-900 rounded-bl-none border border-[#D5D0C4]'
                }`}>
                  {msg.text}
                </div>

                {/* 추천 상품 카드 그리드 */}
                {msg.products && msg.products.length > 0 && (
                  <div className="mt-2.5 w-full grid grid-cols-2 gap-2.5">
                    {msg.products.map(item => (
                      <div key={item.id} className="bg-white p-2 rounded-xl border border-[#D5D0C4] shadow-xs">
                        <ProductCard item={item} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* 하단 입력 및 칩 영역 */}
          <div className="shrink-0 bg-white border-t border-[#D5D0C4] p-3.5">
            
            {/* 빠른 질문 칩 */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2.5">
              {['하객룩 코트 추천', '블랙 미니 드레스', '출근룩 블레이저'].map(chip => (
                <button 
                  key={chip}
                  onClick={() => handleSendMessage(chip)}
                  className="whitespace-nowrap px-3 py-1.5 bg-[#F5F2EB] text-xs font-medium rounded-full border border-[#D5D0C4] text-stone-700 hover:text-[#193D2A] hover:border-[#193D2A] transition-all"
                >
                  💡 {chip}
                </button>
              ))}
            </div>

            {/* 입력 폼 */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} 
              className="flex items-center gap-2.5 bg-[#F5F2EB] rounded-2xl px-4 py-2 border border-[#D5D0C4]"
            >
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="스타일을 물어보세요..."
                className="flex-1 text-xs outline-none bg-transparent"
              />
              <button 
                type="submit" 
                className="h-8 w-8 rounded-full bg-[#193D2A] text-white flex items-center justify-center font-bold text-xs shadow transition-transform active:scale-95"
              >
                ↑
              </button>
            </form>

          </div>

        </div>
      )}

      {/* 2. 플로팅 원형 버튼 */}
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