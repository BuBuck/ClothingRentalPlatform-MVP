import { Product, ClosetItem, Brand } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  { id: 1, brand: 'LOW CLASSIC', name: '울 싱글 롱 코트', price: 4500, buyPrice: 159000, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&h=1000&fit=crop&auto=format', retail: 398000, tag: 'BRAND NEW', sizes: ['XS', 'S', 'M'], material: 'Wool 100%', match: 98 },
  { id: 2, brand: 'RECTO', name: '새틴 미디 드레스', price: 3800, buyPrice: 119000, image: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=800&h=1000&fit=crop&auto=format', retail: 298000, tag: 'LIMITED', sizes: ['S', 'M'], material: 'Silk 100%', match: 95 },
  { id: 3, brand: 'ANDERSSON BELL', name: '오버사이즈 블레이저', price: 5200, buyPrice: 171000, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b1ddf?w=800&h=1000&fit=crop&auto=format', retail: 428000, tag: 'BEST', sizes: ['S', 'M', 'L'], material: 'Poly/Wool Mix', match: 92 },
  { id: 4, brand: 'MATIN KIM', name: '새틴 랩 스커트', price: 2900, buyPrice: 79000, image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&h=1000&fit=crop&auto=format', retail: 198000, tag: 'TREND', sizes: ['Free'], material: 'Satin', match: 99 },
];

export const MOCK_CLOSET: ClosetItem[] = [
  { id: 1, name: '슬림 스트레이트 생지 데님', brand: '개인 소장', category: '하의', img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=400&fit=crop' },
  { id: 2, name: '오버핏 화이트 워시 셔츠', brand: '개인 소장', category: '상의', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop' }
];

export const MOCK_BRANDS = [
  { name: 'LOW CLASSIC', type: '컨템포러리', items: 184, co2: '312kg', img: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=320&h=420&fit=crop&auto=format', esg: true },
  { name: 'ANDERSSON BELL', type: '스트리트', items: 96, co2: '178kg', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=320&h=420&fit=crop&auto=format', esg: false },
  { name: 'RECTO', type: '컨템포러리', items: 142, co2: '241kg', img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=320&h=420&fit=crop&auto=format', esg: true },
  { name: 'MATIN KIM', type: '우먼스웨어', items: 78, co2: '134kg', img: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=320&h=420&fit=crop&auto=format', esg: false },
  { name: 'SJYP', type: '데님·스트리트', items: 63, co2: '97kg', img: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=320&h=420&fit=crop&auto=format', esg: true },
  { name: 'COS', type: '미니멀', items: 228, co2: '408kg', img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=320&h=420&fit=crop&auto=format', esg: true },
];

export const MOCK_SHIPPING_ADDRESS = {
  name: '김지수',
  phone: '010-1234-5678',
  address: '[06236] 서울 강남구 테헤란로 123 (역삼동, 강남빌딩) 4층',
  memo: '요청사항 없음',
};