import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types';
import { MOCK_PRODUCTS } from '../data/mockData';

// ✦ 상세 페이지 전용 헤더 타입 정의
interface DetailHeaderInfo {
  brand: string;
  onBack: () => void;
}

interface AppContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
  rentingItems: Product[];
  addRentingItem: (product: Product) => void;
  isRenting: (productId: number | string) => boolean;
  // ✦ 상세 페이지 상단 헤더 오버라이드용 상태 추가
  detailHeader: DetailHeaderInfo | null;
  setDetailHeader: (header: DetailHeaderInfo | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // ✦ 상세 헤더 상태 관리
  const [detailHeader, setDetailHeader] = useState<DetailHeaderInfo | null>(null);

  // 대여 중인 상품의 ID 목록 관리
  const [rentingIds, setRentingIds] = useState<(number | string)[]>([]);

  const addRentingItem = (product: Product) => {
    setRentingIds(prev => {
      if (prev.includes(product.id)) return prev;
      return [product.id, ...prev];
    });
  };

  const isRenting = (productId: number | string) => {
    return rentingIds.some(id => String(id) === String(productId));
  };

  const rentingItems = MOCK_PRODUCTS.filter(p => isRenting(p.id));

  return (
    <AppContext.Provider value={{
      isLoggedIn,
      setIsLoggedIn,
      showLoginModal,
      setShowLoginModal,
      rentingItems,
      addRentingItem,
      isRenting,
      detailHeader,
      setDetailHeader
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}