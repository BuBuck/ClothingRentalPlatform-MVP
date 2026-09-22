import { useState, useRef, useEffect } from 'react';
import { MOCK_PRODUCTS } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { View } from '../types';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  products?: typeof MOCK_PRODUCTS;
}

interface AiChatSearchProps {
  isLoggedIn: boolean;
  onOpenLogin: () => void;
  activeView: View;
  onSwitchView: (v: View) => void;
}

export default function AiChatSearch({ isLoggedIn, onOpenLogin, activeView, onSwitchView }: AiChatSearchProps) {
  const [input, setInput] = useState('');
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: '안녕하세요! Layered AI 스타일리스트입니다. 🧥 체형, 무드, 또는 찾고 계신 브랜드나 의류를 말씀해 주시면 딱 맞는 상품을 골라드릴게요!',
      products: MOCK_PRODUCTS.slice(0, 2)
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
    <div className="min-h-screen flex flex-col bg-[#F5F2EB] text-[#171b16]">
      {/* 웹 전용 상단 내비게이션 */}
      <Navigation 
        activeView={activeView} 
        onSwitchView={onSwitchView} 
        isLoggedIn={isLoggedIn} 
        onOpenLogin={onOpenLogin} 
      />

      {/* 메인 컨테이너 (웹 화면 중앙 정렬 및 넓은 레이아웃 확보) */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-8 flex flex-col h-[calc(100vh-160px)]">
        
        {/* 상단 타이틀 영역 */}
        <div className="mb-6 shrink-0">
          <h1 className="text-3xl font-display font-bold">AI 스타일 챗봇 검색</h1>
          <p className="text-sm text-stone-500 mt-1">레이어드 AI가 취향과 체형에 딱 맞는 브랜드 재고를 실시간으로 추천해 드립니다.</p>
        </div>

        {/* 채팅 윈도우 박스 */}
        <div className="flex-1 flex flex-col bg-white rounded-3xl border border-[#D5D0C4] shadow-sm overflow-hidden">
          
          {/* 메시지 스크롤 영역 */}
          <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                
                {/* 말풍선 */}
                <div className={`max-w-[75%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-[#193D2A] text-white rounded-br-none' 
                    : 'bg-[#F5F2EB] text-stone-900 rounded-bl-none border border-[#D5D0C4]'
                }`}>
                  {msg.text}
                </div>

                {/* 추천 상품 카드 그리드 (웹에서는 3개까지 넓게 배치 가능) */}
                {msg.products && msg.products.length > 0 && (
                  <div className="mt-4 w-full max-w-xl grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {msg.products.map(item => (
                      <div key={item.id} className="bg-white p-2 rounded-2xl border border-[#D5D0C4] shadow-sm">
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
          <div className="shrink-0 bg-stone-50 border-t border-[#D5D0C4] p-4">
            
            {/* 추천 질문 칩 */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3">
              {['하객룩 코트 추천해줘', '미니멀한 블랙 원피스', 'LOW CLASSIC 재고', '출근룩 블레이저'].map(chip => (
                <button 
                  key={chip}
                  onClick={() => handleSendMessage(chip)}
                  className="whitespace-nowrap px-4 py-2 bg-white text-xs font-medium rounded-full border border-[#D5D0C4] text-stone-600 hover:text-[#193D2A] hover:border-[#193D2A] transition-all shadow-sm"
                >
                  💡 {chip}
                </button>
              ))}
            </div>

            {/* 입력 폼 */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} 
              className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3 border border-[#D5D0C4] shadow-sm"
            >
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="AI 스타일리스트에게 무엇이든 물어보세요 (예: 주말 하객룩 추천해줘)"
                className="flex-1 text-sm outline-none bg-transparent"
              />
              <button 
                type="submit" 
                className="h-10 px-6 rounded-xl bg-[#193D2A] text-white flex items-center justify-center font-bold text-sm shadow transition-transform active:scale-95"
              >
                전송하기
              </button>
            </form>

          </div>

        </div>

      </main>

      {/* 웹 전용 푸터 */}
      <Footer />
    </div>
  );
}