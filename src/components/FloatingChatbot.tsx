import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
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

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // ✦ LocalStorage 연동 제거 및 기본 상태로 초기화
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: '안녕하세요! 레이어드 수석 AI 스타일리스트 🎀 레아(Rhea)입니다. 내 옷장과 취향을 바탕으로 딱 맞는 스타일을 추천해 드릴게요. 어떤 약속이나 스타일을 고민 중이신가요?',
      products: MOCK_PRODUCTS.slice(0, 2),
      reasons: ['맞춤형 옷장 분석', '실시간 재고 매칭']
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

  // 실제 Gemini API 호출 함수
  const fetchGeminiResponse = async (userQuery: string) => {
    const apiKey = import.meta.env.VITE_AI_API_KEY;

    if (!apiKey) {
      return 'API 키가 설정되지 않았습니다. .env 파일이나 GitHub Secrets를 확인해 주세요.';
    }

    const productCatalog = MOCK_PRODUCTS.map(p => `ID: ${p.id}, 이름: ${p.name}, 브랜드: ${p.brand}, 태그: ${p.tag}, 가격: ${p.price}`).join('\n');

    const systemPrompt = `
      당신은 패션 대여 플랫폼 '레이어드(Layered)'의 수석 AI 스타일리스트 '레아(Rhea)'입니다.

      고객의 상황에 맞는 코디를 제안하기 위해 다음 정보를 참고하세요:

      - 고객의 질문: "${userQuery}"
      - 고객의 옷장 보유 상품: "${userWardrobe}"
      - 레이어드 플랫폼 보유 상품 카탈로그: "${productCatalog}"

      [추천 우선순위 규칙]
      1. 먼저 고객의 옷장에 있는 상품(${userWardrobe})을 확인하고, 고객의 상황이나 분위기에 어울린다면 최우선으로 조합에 포함해 제안하세요.
      2. 옷장의 아이템만으로 코디가 부족하거나 어울리는 아이템이 없다면, 플랫폼 상품 카탈로그(${productCatalog})에서 적절한 상품을 골라 믹스매치 코디를 완성하세요.
      3. 플랫폼 카탈로그에도 적합한 상품이 없다면, 트렌드에 맞는 추천 상품의 이름만 간결하게 언급하여 제안하세요.

      [답변 규칙]
      1. 친절하고 트렌디한 어조를 유지하세요.
      2. 모바일 화면에서 가독성이 좋도록 3~4문장 이내로 핵심만 간결하게 작성하세요.
    `;

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`,
        {
          contents: [{ parts: [{ text: systemPrompt }] }]
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      const aiText = response.data.candidates[0].content.parts[0].text;
      return aiText;
    } catch (error) {
      console.error('Gemini API Error:', error);
      return '앗, 지금 패션 트렌드를 분석하는 중에 통신이 지연되고 있어요. 잠시 후 다시 말씀해 주시겠어요?';
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
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

    const aiResponseText = await fetchGeminiResponse(query);

    const matchedProduct = MOCK_PRODUCTS.find(p => 
      query.toLowerCase().includes(p.name.toLowerCase()) || 
      query.toLowerCase().includes(p.tag.toLowerCase()) ||
      query.toLowerCase().includes(p.brand.toLowerCase())
    ) || MOCK_PRODUCTS[0];

    const subProduct = MOCK_PRODUCTS.find(p => p.id !== matchedProduct.id) || MOCK_PRODUCTS[1];
    const uniqueProducts = Array.from(new Set([matchedProduct, subProduct]));

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: aiResponseText,
      reasons: ['실시간 AI 맞춤 분석', '보유 옷장 연동 믹스매치', '트렌디한 핏 제안'],
      products: uniqueProducts
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
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
                placeholder="AI 스타일리스트에게 무엇이든 물어보세요!"
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