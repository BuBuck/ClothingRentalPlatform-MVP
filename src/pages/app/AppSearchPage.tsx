import { useState, useRef, useEffect } from 'react';
import { MOCK_PRODUCTS } from '../../data/mockData';
import ProductCard from '../../components/ProductCard';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  products?: typeof MOCK_PRODUCTS;
}

export default function AppSearchPage() {
  const [input, setInput] = useState('');
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: '안녕하세요! Wear-Us AI 스타일리스트입니다. 🧥 체형, 무드, 또는 찾고 계신 브랜드나 의류를 말씀해 주시면 딱 맞는 상품을 골라드릴게요!',
      products: MOCK_PRODUCTS.slice(0, 2)
    }
  ]);

  // ✦ 스크롤 최하단 이동을 위한 ref 선언
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 메시지가 추가될 때마다 자동으로 최하단으로 스크롤 실행
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    <section className="flex flex-col h-full text-[#171b16] bg-[#F5F2EB] overflow-hidden">
      
      {/* 채팅 메시지 리스트 영역 */}
      <div className="flex-1 min-h-0 overflow-y-auto px-5 py-4 space-y-4">
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
              <div className="mt-3 w-full grid grid-cols-2 gap-2.5">
                {msg.products.map(item => (
                  <div key={item.id} className="bg-white p-2 rounded-2xl border border-[#D5D0C4]">
                    <ProductCard item={item} />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {/* ✦ 스크롤 기준점용 빈 엘리먼트 */}
        <div ref={messagesEndRef} />
      </div>

      {/* 하단 고정 영역 (질문 칩 + 채팅 입력폼) */}
      <div className="shrink-0 mb-19">
        
        {/* 하단 추천 질문 칩 */}
        <div className="pt-2 pd-4 pl-2 pr-0">
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {['하객룩 코트 추천해줘', '미니멀한 블랙 원피스', 'LOW CLASSIC 재고', '출근룩 블레이저'].map(chip => (
              <button 
                key={chip}
                onClick={() => handleSendMessage(chip)}
                className="whitespace-nowrap px-3 py-1.5 bg-white text-[11px] font-medium rounded-full border border-[#D5D0C4] text-[#6c7068] hover:text-[#193D2A] hover:border-[#193D2A] transition-all shadow-sm"
              >
                💡 {chip}
              </button>
            ))}
          </div>
        </div>

        {/* 채팅 입력폼 영역 */}
        <div className="px-4 py-2 bg-white">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} 
            className="flex items-center gap-2 bg-[#F5F2EB] rounded-2xl px-4 py-2 border border-[#D5D0C4]"
          >
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="AI에게 필요한 스타일을 물어보세요..."
              className="flex-1 text-xs outline-none bg-transparent py-1"
            />
            <button 
              type="submit" 
              className="h-8 w-8 rounded-full bg-[#193D2A] text-white flex items-center justify-center font-bold text-sm shadow transition-transform active:scale-95"
            >
              ↑
            </button>
          </form>
        </div>

      </div>

    </section>
  );
}