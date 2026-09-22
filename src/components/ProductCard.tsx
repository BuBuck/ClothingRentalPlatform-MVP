import { useNavigate, useLocation } from 'react-router-dom';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  item: Product;
}

export default function ProductCard({ item }: ProductCardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, isRenting } = useApp();

  // ✦ 로그인이 되어 있고, 전역 ID 목록에 이 상품 ID가 포함되어 있는지 확인
  const currentlyRenting = isLoggedIn && isRenting(item.id);

  const handleCardClick = () => {
    const isApp = location.pathname.startsWith('/app');
    if (isApp) {
      navigate(`/app/product/${item.id}`);
    } else {
      navigate(`/product/${item.id}`);
    }
  };

  return (
    <article className="min-w-0 group cursor-pointer" onClick={handleCardClick}>
      <div className="relative aspect-[.82] overflow-hidden rounded-2xl bg-[#e2ddd3]">
        <img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        
        {currentlyRenting ? (
          <span className="absolute bottom-3 left-3 rounded-md bg-[#BB5938] px-2 py-1 text-[9px] font-mono font-bold text-white uppercase tracking-wider shadow">
            대여중 ✦
          </span>
        ) : (
          <span className="absolute bottom-3 left-3 rounded-md bg-[#193D2A] px-2 py-1 text-[9px] font-mono font-bold text-white uppercase tracking-wider">
            {item.tag}
          </span>
        )}
      </div>
      <div className="mt-2.5 px-0.5">
        <p className="text-[10px] font-mono font-bold tracking-tight text-[#6c7068]">{item.brand}</p>
        <p className="mt-0.5 truncate text-xs font-medium text-[#171b16]">{item.name}</p>
        <div className="mt-2 flex items-end justify-between">
          <div>
            <p className="text-[9px] font-mono text-[#BB5938] font-bold">1일 렌탈료</p>
            <p className="text-sm font-bold leading-none mt-0.5">
              ₩{item.price.toLocaleString()}<span className="ml-0.5 text-[9px] font-normal text-[#6c7068]">/일</span>
            </p>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); handleCardClick(); }} 
            className={`rounded-lg px-2.5 py-1.5 text-[10px] font-bold text-white shadow-sm ${currentlyRenting ? 'bg-[#BB5938]' : 'bg-[#193D2A]'}`}
          >
            {currentlyRenting ? '반납 연장' : '상세보기'}
          </button>
        </div>
      </div>
    </article>
  );
}