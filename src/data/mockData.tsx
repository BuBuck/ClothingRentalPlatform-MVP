import { Product, ClosetItem, Brand } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  { id: 1, brand: 'LOW CLASSIC', name: '울 싱글 롱 코트', price: 4500, buyPrice: 159000, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&h=1000&fit=crop&auto=format', retail: 398000, tag: 'BRAND NEW', sizes: ['XS', 'S', 'M'], material: 'Wool 100%', match: 98 },
  { id: 2, brand: 'RECTO', name: '새틴 미디 드레스', price: 3800, buyPrice: 119000, image: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=800&h=1000&fit=crop&auto=format', retail: 298000, tag: 'LIMITED', sizes: ['S', 'M'], material: 'Silk 100%', match: 95 },
  { id: 3, brand: 'ANDERSSON BELL', name: '오버사이즈 블레이저', price: 5200, buyPrice: 171000, image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&h=1000&fit=crop&auto=format', retail: 428000, tag: 'BEST', sizes: ['S', 'M', 'L'], material: 'Poly/Wool Mix', match: 92 },
  { id: 4, brand: 'MATIN KIM', name: '새틴 랩 스커트', price: 2900, buyPrice: 79000, image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&h=1000&fit=crop&auto=format', retail: 198000, tag: 'TREND', sizes: ['Free'], material: 'Satin', match: 99 },
  { id: 5, brand: 'MATIN KIM', name: '크롭 레더 라이더 자켓', price: 6100, buyPrice: 219000, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop&auto=format', retail: 520000, tag: 'NEW', sizes: ['S', 'M'], material: 'Lamb Leather', match: 97 },
  { id: 6, brand: 'COS', name: '코튼 트렌치 맥 코트', price: 4800, buyPrice: 169000, image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=800&h=1000&fit=crop&auto=format', retail: 380000, tag: 'ESG', sizes: ['XS', 'S', 'M', 'L'], material: 'Cotton 100%', match: 96 },
  { id: 7, brand: 'RECTO', name: '와이드 핏 데님 팬츠', price: 3200, buyPrice: 99000, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&h=1000&fit=crop&auto=format', retail: 248000, tag: 'BEST', sizes: ['S', 'M', 'L'], material: 'Cotton 100%', match: 90 },
  { id: 8, brand: 'ANDERSSON BELL', name: '스트라이프 니트 가디건', price: 3500, buyPrice: 109000, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=1000&fit=crop&auto=format', retail: 278000, tag: 'TREND', sizes: ['S', 'M'], material: 'Wool/Mohair', match: 94 },
  { id: 9, brand: 'LOW CLASSIC', name: '시어 울트라 레이어드 블라우스', price: 3100, buyPrice: 89000, image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop&auto=format', retail: 228000, tag: 'NEW', sizes: ['S', 'M'], material: 'Silk/Cotton Mix', match: 93 },
  { id: 10, brand: 'RECTO', name: '구조적인 사선 버튼 자켓', price: 5800, buyPrice: 198000, image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=800&h=1000&fit=crop&auto=format', retail: 480000, tag: 'LIMITED', sizes: ['S', 'M'], material: 'Wool Blend', match: 96 },
  { id: 11, brand: 'ANDERSSON BELL', name: '유니크 패치워크 데님 자켓', price: 5500, buyPrice: 185000, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop&auto=format', retail: 410000, tag: 'TREND', sizes: ['S', 'M', 'L'], material: 'Cotton 100%', match: 91 },
  { id: 12, brand: 'MATIN KIM', name: '버클 포인트 코튼 카고 팬츠', price: 3400, buyPrice: 95000, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&h=1000&fit=crop&auto=format', retail: 238000, tag: 'BEST', sizes: ['S', 'M'], material: 'Cotton 100%', match: 89 },
  { id: 13, brand: 'SJYP', name: '로고자카드 니트 크롭탑', price: 2700, buyPrice: 72000, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=1000&fit=crop&auto=format', retail: 178000, tag: 'BRAND NEW', sizes: ['Free'], material: 'Viscose/Nylon', match: 95 },
  { id: 14, brand: 'COS', name: '미니멀 울 블렌드 원피스', price: 4300, buyPrice: 142000, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=1000&fit=crop&auto=format', retail: 320000, tag: 'ESG', sizes: ['XS', 'S', 'M'], material: 'Wool/Poly', match: 97 },
  { id: 15, brand: 'LOW CLASSIC', name: '클래식 벨티드 트렌치 코트', price: 5900, buyPrice: 205000, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&h=1000&fit=crop&auto=format', retail: 490000, tag: 'BEST', sizes: ['S', 'M'], material: 'Cotton/Poly Mix', match: 99 },
  { id: 16, brand: 'RECTO', name: '비대칭 홀터넥 슬리브리스', price: 2600, buyPrice: 68000, image: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=800&h=1000&fit=crop&auto=format', retail: 168000, tag: 'TREND', sizes: ['S', 'M'], material: 'Modal/Span', match: 92 },
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