export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number; // 1일 대여료
  buyPrice: number; // 구매가 (또는 특별구매가)
  retail: number; // 발매가
  days: number;
  image: string;
  tag: string;
  liked: boolean;
  eco: boolean;
  rating: number;
  sizes: string[];
  material: string;
  match: number;
  color: string;
  releaseDate?: string;
  modelNo?: string;
}

export const items: Product[] = [
  {
    id: 1,
    name: '울 싱글 롱 코트',
    brand: 'LOW CLASSIC',
    price: 4500,
    buyPrice: 159000,
    retail: 398000,
    days: 1,
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&h=1000&fit=crop&auto=format',
    tag: '아우터',
    liked: false,
    eco: true,
    rating: 4.9,
    sizes: ['XS', 'S', 'M'],
    material: 'Wool 100%',
    match: 98,
    color: 'Charcoal',
    releaseDate: '25/11',
    modelNo: 'LC-25-OW01'
  },
  {
    id: 2,
    name: '새틴 미디 드레스',
    brand: 'RECTO',
    price: 3800,
    buyPrice: 119000,
    retail: 298000,
    days: 1,
    image: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=800&h=1000&fit=crop&auto=format',
    tag: '원피스',
    liked: true,
    eco: false,
    rating: 4.7,
    sizes: ['S', 'M'],
    material: 'Silk 100%',
    match: 95,
    color: 'Navy',
    releaseDate: '26/02',
    modelNo: 'RC-26-DR03'
  },
  {
    id: 3,
    name: '오버사이즈 블레이저',
    brand: 'ANDERSSON BELL',
    price: 5200,
    buyPrice: 171000,
    retail: 428000,
    days: 1,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b1ddf?w=800&h=1000&fit=crop&auto=format',
    tag: '세트',
    liked: false,
    eco: true,
    rating: 4.8,
    sizes: ['S', 'M', 'L'],
    material: 'Poly/Wool Mix',
    match: 92,
    color: 'Beige',
    releaseDate: '25/09',
    modelNo: 'AB-25-JK05'
  },
  {
    id: 4,
    name: '새틴 랩 스커트',
    brand: 'MATIN KIM',
    price: 2900,
    buyPrice: 79000,
    retail: 198000,
    days: 1,
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&h=1000&fit=crop&auto=format',
    tag: '하의',
    liked: false,
    eco: true,
    rating: 4.5,
    sizes: ['Free'],
    material: 'Satin',
    match: 99,
    color: 'Black',
    releaseDate: '26/04',
    modelNo: 'MK-26-SK01'
  },
  {
    id: 5,
    name: '퀼팅 숄더 다운 패딩',
    brand: 'SJYP',
    price: 4100,
    buyPrice: 149000,
    retail: 358000,
    days: 1,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop&auto=format',
    tag: '아우터',
    liked: true,
    eco: false,
    rating: 4.6,
    sizes: ['S', 'M'],
    material: 'Goose Down',
    match: 94,
    color: 'Khaki',
    releaseDate: '25/12',
    modelNo: 'SJ-25-PD02'
  },
  {
    id: 6,
    name: '시어 플로럴 블라우스',
    brand: 'COS',
    price: 2400,
    buyPrice: 69000,
    retail: 148000,
    days: 1,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop&auto=format',
    tag: '상의',
    liked: false,
    eco: true,
    rating: 4.8,
    sizes: ['XS', 'S', 'M'],
    material: 'Polyester 100%',
    match: 91,
    color: 'White',
    releaseDate: '26/03',
    modelNo: 'CS-26-BL08'
  }
];
