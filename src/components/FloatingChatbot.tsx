import { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

import { MOCK_PRODUCTS } from '../data/mockData';
import ProductCard from './ProductCard';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  products?: typeof MOCK_PRODUCTS;
}

const CHAT_STORAGE_KEY = 'layered_chat_history';

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // ✦ 1. LocalStorage에서 대화 기록 불러오기
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const savedMessages = localStorage.getItem(CHAT_STORAGE_KEY);
    if (savedMessages) {
      try {
        return JSON.parse(savedMessages);
      } catch (error) {
        console.error('LocalStorage 파싱 에러:', error);
      }
    }
    // 저장된 내역이 없으면 기본 인사말 렌더링
    return [
      {
        id: '1',
        sender: 'ai',
        text: '안녕하세요! 레이어드 수석 AI 스타일리스트 🎀 레아(Rhea)입니다. 찾으시는 스타일이나 TPO가 있으신가요?',
        products: MOCK_PRODUCTS.slice(0, 2)
      }
    ];
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // ✦ 2. 메시지가 변경될 때마다 LocalStorage에 JSON 형식으로 저장
  useEffect(() => {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const fetchAiResponse = async (userQuery: string) => {
    const apiKey = import.meta.env.VITE_AI_API_KEY;

    if (!apiKey) {
      return 'API 키가 설정되지 않았습니다. .env 파일을 확인해 주세요.';
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
      });

      const systemPrompt = `
        당신은 패션 대여 플랫폼 '레이어드(Layered)'의
        수석 AI 스타일리스트 '레아(Rhea)'입니다.

        고객의 질문에 대해 패션 스타일리스트처럼 답변해주세요.

        [답변 형식]

        1. 사용자가 추천을 해달라고 한다면 "좋아요." 또는 "멋진 계획이네요."로 시작하세요.

        2. 사용자가 가지고 있을 법한 기본 아이템을 활용하여
        자연스러운 코디를 제안하세요.

        3. 상황에 어울리는 대여 아이템을 하나 추천하세요.

        4. 마지막 줄은 반드시 다음 형식으로 작성하세요.

        추천 이유: [키워드1] / [키워드2] / [키워드3]

        [규칙]

        - 모바일에서 읽기 쉽게 작성하세요.
        - 3~4문장 이내로 작성하세요.
        - 친절하고 자연스러운 한국어를 사용하세요.
        - 구체적인 패션 아이템을 추천하세요.
        - 불필요한 설명은 하지 마세요.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-flash-latest',
        contents: userQuery,
        config: {
          systemInstruction: systemPrompt,
        },
      });

      return response.text || '스타일 추천 결과를 가져오지 못했어요.';
    } catch (error) {
      console.error('Gemini API Error:', error);

      return '현재 AI 스타일리스트를 연결할 수 없어요. 잠시 후 다시 시도해 주세요.';
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

    const matchedProducts = MOCK_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) || 
      p.brand.toLowerCase().includes(query.toLowerCase()) ||
      p.tag.toLowerCase().includes(query.toLowerCase())
    );

    const aiReplyText = await fetchAiResponse(query);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: aiReplyText,
      products: matchedProducts.length > 0 ? matchedProducts : undefined
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
              {/* ✦ 4. 이전 웹 페이지로 돌아가는(최소화) '<' 아이콘 추가 */}
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white text-xl pr-2 font-light hover:text-stone-300 transition-colors"
                title="웹 페이지로 돌아가기"
              >
                {'<'}
              </button>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse mt-0.5" />
              <div>
                <p className="text-sm font-bold tracking-wider">Layered AI Stylist</p>
                <p className="text-[10px] text-emerald-200 font-mono">실시간 재고 매칭 중</p>
              </div>
            </div>
            
            {/* 기존 X 버튼 유지 (선택사항) */}
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
                  <span className="text-[10px] font-bold text-stone-500 mb-1 ml-1">레아</span>
                )}
                
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs leading-relaxed shadow-sm whitespace-pre-wrap ${
                  msg.sender === 'user' 
                    ? 'bg-[#193D2A] text-white rounded-br-none' 
                    : 'bg-white text-stone-900 rounded-bl-none border border-[#D5D0C4]'
                }`}>
                  {msg.text}
                </div>

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

            {isLoading && (
              <div className="flex flex-col items-start">
                <span className="text-[10px] font-bold text-stone-500 mb-1 ml-1">레아</span>
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
              {['하객룩 코트 추천해줘', '미니멀한 블랙 원피스', '소개팅 룩', '출근룩 블레이저'].map(chip => (
                <button 
                  key={chip}
                  disabled={isLoading}
                  onClick={() => handleSendMessage(chip)}
                  className="whitespace-nowrap px-3 py-1.5 bg-[#F5F2EB] text-xs font-medium rounded-full border border-[#D5D0C4] text-stone-700 hover:text-[#193D2A] hover:border-[#193D2A] transition-all disabled:opacity-50"
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
                placeholder="상황이나 스타일을 말씀해 주세요!"
                className="flex-1 text-xs outline-none bg-transparent disabled:opacity-50"
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="h-8 w-8 rounded-full bg-[#193D2A] text-white flex items-center justify-center font-bold text-xs shadow transition-transform active:scale-95 disabled:opacity-50 disabled:active:scale-100"
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