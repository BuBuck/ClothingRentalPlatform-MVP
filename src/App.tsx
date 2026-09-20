import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import HowItWorks from './components/HowItWorks'
import FeaturedItems from './components/FeaturedItems'
import AIWardrobeSection from './components/AIWardrobeSection'
import CategoryBrowse from './components/CategoryBrowse'
import AppDownloadSection from './components/AppDownloadSection'
import Footer from './components/Footer'

export type View = 'web' | 'app'
export type RentalStep = 'detail' | 'checkout' | 'success' | null

export default function App() {
  const [activeView, setActiveView] = useState<View>('web')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  
  // Shared Rental State
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [rentalStep, setRentalStep] = useState<RentalStep>(null)
  const [rentalDays, setRentalDays] = useState(3)
  const [selectedSize, setSelectedSize] = useState('')

  const handleLogin = () => {
    setIsLoggedIn(true)
    setShowLoginModal(false)
  }

  const handleProductClick = (product: any) => {
    setSelectedProduct(product)
    setSelectedSize(product.sizes?.[0] || 'S')
    setRentalStep('detail')
  }

  const closeRentalFlow = () => {
    setRentalStep(null)
    setSelectedProduct(null)
  }

  const items = [
    { id: 1, brand: 'LOW CLASSIC', name: '울 싱글 롱 코트', price: 4500, buyPrice: 159000, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&h=1000&fit=crop&auto=format', retail: 398000, tag: 'BRAND NEW', sizes: ['XS', 'S', 'M'], material: 'Wool 100%', match: 98 },
    { id: 2, brand: 'RECTO', name: '새틴 미디 드레스', price: 3800, buyPrice: 119000, image: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=800&h=1000&fit=crop&auto=format', retail: 298000, tag: 'LIMITED', sizes: ['S', 'M'], material: 'Silk 100%', match: 95 },
    { id: 3, brand: 'ANDERSSON BELL', name: '오버사이즈 블레이저', price: 5200, buyPrice: 171000, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b1ddf?w=800&h=1000&fit=crop&auto=format', retail: 428000, tag: 'BEST', sizes: ['S', 'M', 'L'], material: 'Poly/Wool Mix', match: 92 },
    { id: 4, brand: 'MATIN KIM', name: '새틴 랩 스커트', price: 2900, buyPrice: 79000, image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&h=1000&fit=crop&auto=format', retail: 198000, tag: 'TREND', sizes: ['Free'], material: 'Satin', match: 99 },
  ]

  const RentalFlowContent = () => {
    if (!selectedProduct || !rentalStep) return null;

    if (rentalStep === 'detail') {
      return (
        <div className="flex flex-col h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <div className="relative aspect-[3/4] w-full">
            <img src={selectedProduct.image} className="w-full h-full object-cover" alt={selectedProduct.name} />
            <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); closeRentalFlow(); }} className="absolute top-6 right-5 h-10 w-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white text-xl">✕</button>
          </div>
          <div className="px-6 py-8 -mt-10 relative z-10 bg-white rounded-t-[40px] shadow-2xl flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-xs font-mono font-bold text-[#6c7068]" style={{ fontFamily: 'DM Mono, monospace' }}>{selectedProduct.brand}</p>
                <h1 className="text-2xl font-bold mt-1">{selectedProduct.name}</h1>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#BB5938] font-bold">1일 렌탈료</p>
                <p className="text-xl font-bold">₩{selectedProduct.price.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3 p-4 rounded-2xl" style={{ background: 'rgba(25,61,42,0.05)', border: '1px solid var(--border)' }}>
              <div className="h-10 w-10 flex items-center justify-center rounded-xl text-lg" style={{ background: 'var(--primary)', color: '#fff' }}>✦</div>
              <div>
                <p className="text-[13px] font-bold" style={{ color: 'var(--primary)' }}>AI 사이즈 매칭 {selectedProduct.match}%</p>
                <p className="text-[11px] text-[#6c7068]">지수님의 최근 대여 데이터를 분석한 결과입니다.</p>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs font-bold mb-3 uppercase tracking-wider text-[#6c7068]">대여 기간 선택</p>
              <div className="flex gap-2">
                {[1, 2, 3, 5, 7].map(d => (
                  <button key={d} type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setRentalDays(d); }}
                    className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${rentalDays === d ? 'bg-[#193D2A] text-white shadow-lg' : 'bg-[#E8E4D9] text-[#171b16]'}`}>
                    {d}일
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs font-bold mb-3 uppercase tracking-wider text-[#6c7068]">사이즈 선택</p>
              <div className="flex gap-2">
                {selectedProduct.sizes.map((s: string) => (
                  <button key={s} type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedSize(s); }}
                    className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${selectedSize === s ? 'bg-[#171b16] text-white shadow-lg' : 'bg-[#E8E4D9] text-[#171b16]'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 flex gap-3">
              <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setRentalStep('checkout'); }} className="flex-1 py-4 bg-[#193D2A] text-white rounded-2xl text-sm font-bold shadow-xl active:scale-95 transition-transform">
                총 ₩{(selectedProduct.price * rentalDays).toLocaleString()} 대여하기
              </button>
              <button type="button" className="w-16 h-14 flex items-center justify-center rounded-2xl bg-white border border-[#D5D0C4] text-xl shadow-sm">♡</button>
            </div>
            
            <div className="mt-8 border-t pt-6" style={{ borderColor: 'var(--border)' }}>
              <p className="text-xs font-bold text-[#6c7068] mb-2 uppercase">상품 정보</p>
              <p className="text-[13px] leading-relaxed text-[#171b16]">패션 브랜드 {selectedProduct.brand}의 이월 재고 상품입니다. 전문 세탁 및 살균 처리가 완료되었으며, 미세한 사용감이 있을 수 있습니다. (ESG 인증 Re-use 상품)</p>
            </div>
          </div>
        </div>
      )
    }

    if (rentalStep === 'checkout') {
      return (
        <div className="px-6 pt-12 pb-10 flex flex-col h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-4 mb-8">
            <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setRentalStep('detail'); }} className="text-xl">←</button>
            <h1 className="text-2xl font-bold">결제하기</h1>
          </div>

          <div className="flex gap-4 p-4 rounded-2xl bg-white shadow-sm border border-[#D5D0C4] mb-8">
            <div className="w-20 h-24 rounded-xl overflow-hidden bg-stone-100">
              <img src={selectedProduct.image} className="w-full h-full object-cover" alt="" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-mono font-bold text-[#6c7068]">{selectedProduct.brand}</p>
              <p className="text-sm font-bold mt-0.5">{selectedProduct.name}</p>
              <p className="text-xs text-[#6c7068] mt-1">{selectedSize} / {rentalDays}일 대여</p>
              <p className="text-sm font-bold mt-2">₩{(selectedProduct.price * rentalDays).toLocaleString()}</p>
            </div>
          </div>

          <div className="space-y-6 flex-1">
            <section>
              <h2 className="text-xs font-bold text-[#6c7068] mb-3 uppercase tracking-wider">배송 정보 (CVS 픽업)</h2>
              <div className="p-4 rounded-2xl bg-white border border-[#D5D0C4] shadow-sm">
                <p className="text-sm font-bold">GS25 강남웨스트점</p>
                <p className="text-xs text-[#6c7068] mt-1">서울특별시 강남구 테헤란로 123</p>
              </div>
            </section>

            <section>
              <h2 className="text-xs font-bold text-[#6c7068] mb-3 uppercase tracking-wider">결제 수단</h2>
              <div className="flex gap-2">
                <button type="button" className="flex-1 py-3 rounded-xl bg-[#171b16] text-white text-[11px] font-bold shadow-md">Wear Pay</button>
                <button type="button" className="flex-1 py-3 rounded-xl bg-white border border-[#D5D0C4] text-[11px] font-bold">카카오페이</button>
              </div>
            </section>

            <div className="border-t pt-6" style={{ borderColor: 'var(--border)' }}>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-[#6c7068]">대여료 ({rentalDays}일)</p>
                <p className="text-sm font-bold">₩{(selectedProduct.price * rentalDays).toLocaleString()}</p>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                <p className="text-base font-bold">최종 결제 금액</p>
                <p className="text-xl font-bold" style={{ color: 'var(--primary)' }}>₩{(selectedProduct.price * rentalDays).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setRentalStep('success'); }} className="w-full py-4 mt-10 bg-[#193D2A] text-white rounded-2xl text-base font-bold shadow-2xl active:scale-95 transition-transform">
            ₩{(selectedProduct.price * rentalDays).toLocaleString()} 결제하고 대여하기
          </button>
        </div>
      )
    }

    if (rentalStep === 'success') {
      return (
        <div className="flex flex-col items-center justify-center h-full px-8 text-center" onClick={(e) => e.stopPropagation()}>
          <div className="w-24 h-24 bg-[#193D2A] rounded-full flex items-center justify-center text-white text-4xl mb-8 shadow-2xl shadow-[#193D2A]/30">✓</div>
          <h1 className="text-2xl font-bold mb-2">대여가 완료되었습니다!</h1>
          <p className="text-[13px] text-[#6c7068] leading-relaxed mb-10">
            내일 오전 10시까지 선택하신 편의점에 상품이 도착합니다.
          </p>
          <div className="w-full space-y-3">
            <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); closeRentalFlow(); }} className="w-full py-4 bg-[#171b16] text-white rounded-2xl text-sm font-bold shadow-xl">완료</button>
          </div>
        </div>
      )
    }

    return null;
  }

  const LoginModal = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowLoginModal(false)} />
      <div className="relative w-full max-w-sm bg-white rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
        <div className="p-8 pt-10 text-center">
          <div className="w-16 h-16 bg-[#193D2A] rounded-2xl mx-auto flex items-center justify-center text-white text-2xl mb-6 shadow-xl shadow-[#193D2A]/20">♧</div>
          <h2 className="text-2xl font-bold mb-2">웨어-어스 시작하기</h2>
          <p className="text-[13px] text-[#6c7068] leading-relaxed mb-8">브랜드 재고를 가치 있게,<br />당신의 스타일을 수익으로 만드세요.</p>
          
          <div className="space-y-3">
            <button onClick={handleLogin} className="w-full py-4 bg-[#FEE500] text-[#191919] rounded-2xl text-[14px] font-bold flex items-center justify-center gap-2 shadow-sm">
              <span className="text-lg">💬</span> 카카오로 3초 만에 시작
            </button>
            <button onClick={handleLogin} className="w-full py-4 bg-[#171b16] text-white rounded-2xl text-[14px] font-bold shadow-sm">
              이메일로 로그인
            </button>
          </div>
          
          <p className="mt-8 text-[11px] text-[#b0b2ac]">
            로그인 시 <span className="underline">이용약관</span> 및 <span className="underline">개인정보처리방침</span>에 동의하게 됩니다.
          </p>
        </div>
        <button onClick={() => setShowLoginModal(false)} className="absolute top-6 right-6 text-[#b0b2ac] hover:text-[#171b16]">✕</button>
      </div>
    </div>
  )

  if (activeView === 'app') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-start" style={{ background: 'var(--background)' }}>
        <div className="w-full max-w-sm mx-auto flex flex-col min-h-screen relative shadow-2xl overflow-hidden" style={{ background: 'var(--background)' }}>
          <AppView 
            onSwitchView={() => setActiveView('web')} 
            isLoggedIn={isLoggedIn} 
            onOpenLogin={() => setShowLoginModal(true)} 
            onProductClick={handleProductClick}
            rentalStep={rentalStep}
            setRentalStep={setRentalStep}
            RentalFlowContent={RentalFlowContent}
          />
          {showLoginModal && <LoginModal />}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Navigation 
        activeView={activeView} 
        onSwitchView={setActiveView} 
        isLoggedIn={isLoggedIn} 
        onOpenLogin={() => setShowLoginModal(true)} 
      />
      <HeroSection onProductClick={() => handleProductClick(items[0])} />
      <HowItWorks />
      <CategoryBrowse />
      <FeaturedItems onProductClick={handleProductClick} />
      <AIWardrobeSection />
      <AppDownloadSection onSwitchToApp={() => setActiveView('app')} />
      <Footer />
      
      {/* Web Rental Modal */}
      {rentalStep && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={closeRentalFlow} />
          <div className="relative w-full max-w-lg h-[90vh] bg-white rounded-[40px] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
            <RentalFlowContent />
          </div>
        </div>
      )}
      
      {showLoginModal && <LoginModal />}
    </div>
  )
}

function AppView({ onSwitchView, isLoggedIn, onOpenLogin, onProductClick, rentalStep, setRentalStep, RentalFlowContent }: any) {
  const [appTab, setAppTab] = useState<'home' | 'search' | 'closet' | 'profile'>('home')
  const [query, setQuery] = useState('')
  const [photoMode, setPhotoMode] = useState(false)
  const [saved, setSaved] = useState<number[]>([])
  const [rentalNotice, setRentalNotice] = useState<string | null>(null)

  // Closet tab states
  const [myCloset, setMyCloset] = useState<any[]>([
    { id: 1, name: '슬림 스트레이트 생지 데님', brand: '개인 소장', category: '하의', img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=400&fit=crop' },
    { id: 2, name: '오버핏 화이트 워시 셔츠', brand: '개인 소장', category: '상의', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop' }
  ])
  const [newClothName, setNewClosetName] = useState('')
  const [newClothCategory, setNewClosetCategory] = useState('상의')
  const [showAddClothModal, setShowAddClothModal] = useState(false)

  // Profile tab security
  useEffect(() => {
    if (appTab === 'profile' && !isLoggedIn) {
      onOpenLogin()
      setAppTab('home')
    }
  }, [appTab, isLoggedIn])

  const items = [
    { id: 1, brand: 'LOW CLASSIC', name: '울 싱글 롱 코트', price: 4500, buyPrice: 159000, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&h=1000&fit=crop&auto=format', retail: 398000, tag: 'BRAND NEW', sizes: ['XS', 'S', 'M'], material: 'Wool 100%', match: 98 },
    { id: 2, brand: 'RECTO', name: '새틴 미디 드레스', price: 3800, buyPrice: 119000, image: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=800&h=1000&fit=crop&auto=format', retail: 298000, tag: 'LIMITED', sizes: ['S', 'M'], material: 'Silk 100%', match: 95 },
    { id: 3, brand: 'ANDERSSON BELL', name: '오버사이즈 블레이저', price: 5200, buyPrice: 171000, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b1ddf?w=800&h=1000&fit=crop&auto=format', retail: 428000, tag: 'BEST', sizes: ['S', 'M', 'L'], material: 'Poly/Wool Mix', match: 92 },
    { id: 4, brand: 'MATIN KIM', name: '새틴 랩 스커트', price: 2900, buyPrice: 79000, image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&h=1000&fit=crop&auto=format', retail: 198000, tag: 'TREND', sizes: ['Free'], material: 'Satin', match: 99 },
  ]

  const handleAddCloth = (e: any) => {
    e.preventDefault()
    if (!newClothName) return
    const newCloth = {
      id: Date.now(),
      name: newClothName,
      brand: '개인 소장',
      category: newClothCategory,
      img: newClothCategory === '아우터' 
        ? 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=300&h=400&fit=crop' 
        : newClothCategory === '하의'
        ? 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=400&fit=crop'
        : 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop'
    }
    setMyCloset([newCloth, ...myCloset])
    setNewClosetName('')
    setShowAddClothModal(false)
    setRentalNotice('내 옷장에 옷이 성공적으로 등록되었습니다!')
  }

  const toggleSave = (id: number) => setSaved(old => old.includes(id) ? old.filter(v => v !== id) : [...old, id])

  const ProductCard = ({ item }: { item: typeof items[number] }) => (
    <article className="min-w-0 group" onClick={() => onProductClick(item)}>
      <div className="relative aspect-[.82] overflow-hidden rounded-2xl bg-[#e2ddd3]">
        <img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <button onClick={(e) => { e.stopPropagation(); toggleSave(item.id) }} className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur shadow-sm transition-transform active:scale-90">
          <span className="text-sm">{saved.includes(item.id) ? '♥' : '♡'}</span>
        </button>
        <span className="absolute bottom-3 left-3 rounded-md bg-[#193D2A] px-2 py-1 text-[9px] font-mono font-bold text-white uppercase tracking-wider">{item.tag}</span>
      </div>
      <div className="mt-2.5 px-0.5">
        <p className="text-[10px] font-mono font-bold tracking-tight text-[#6c7068]">{item.brand}</p>
        <p className="mt-0.5 truncate text-xs font-medium text-[#171b16]">{item.name}</p>
        <div className="mt-2 flex items-end justify-between">
          <div>
            <p className="text-[9px] font-mono text-[#BB5938] font-bold">1일 렌탈료</p>
            <p className="text-sm font-bold leading-none mt-0.5">₩{item.price.toLocaleString()}<span className="ml-0.5 text-[9px] font-normal text-[#6c7068]">/일</span></p>
          </div>
          <button onClick={(e) => { e.stopPropagation(); onProductClick(item) }} className="rounded-lg bg-[#193D2A] px-2.5 py-1.5 text-[10px] font-bold text-white shadow-sm active:bg-[#122e20]">대여하기</button>
        </div>
      </div>
    </article>
  )

  // Filtered search results
  const filteredProducts = items.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.brand.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="min-h-screen pb-24 text-[#171b16]" style={{ background: 'var(--background)' }}>
      {/* Header */}
      {!rentalStep && (
        <header className="fixed top-0 left-1/2 z-30 w-full max-w-sm -translate-x-1/2 flex items-center justify-between px-5 pb-3 pt-4 border-b bg-white/80 backdrop-blur-md" style={{ borderColor: 'var(--border)' }}>
          <button onClick={onSwitchView} className="text-[10px] font-mono font-bold tracking-tighter" style={{ color: 'var(--muted-foreground)' }}>← WEB</button>
          <div className="text-center">
            <p className="font-display text-lg tracking-[.15em] font-bold" style={{ color: 'var(--primary)' }}>Wear-Us</p>
            <p className="text-[8px] font-mono tracking-widest font-medium" style={{ color: 'var(--accent)', fontFamily: 'DM Mono, monospace' }}>BRAND RE-USE PLATFORM</p>
          </div>
          <button className="relative p-1">
            <span className="text-xl">♧</span>
          </button>
        </header>
      )}

      <main className={`${!rentalStep ? 'pt-16' : ''} overflow-hidden`}>
        {rentalStep ? (
          <RentalFlowContent />
        ) : (
          <>
            {appTab === 'home' && (
              <>
                <div className="px-5 pt-5">
                  <p className="text-[14px] font-bold leading-tight">안녕하세요, 지수님 <br /><span className="font-medium text-[13px]" style={{ color: 'var(--muted-foreground)' }}>오늘의 브랜드 재고를 확인해보세요.</span></p>
                  <button onClick={() => setAppTab('search')} className="mt-4 flex h-14 w-full items-center justify-between rounded-2xl px-5 text-left text-xs shadow-sm" style={{ background: 'var(--card)', border: '1.5px solid var(--border)', color: 'var(--muted-foreground)' }}>
                    <span>AI 사이즈 매칭 · 브랜드 검색</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full text-white text-lg" style={{ background: 'var(--primary)' }}>⌕</span>
                  </button>
                </div>

                <section className="mx-5 mt-5 rounded-2xl p-5 text-white relative overflow-hidden shadow-lg" style={{ background: 'var(--primary)' }}>
                  <div className="relative z-10">
                    <p className="text-[10px] font-mono font-bold" style={{ color: 'rgba(201,218,205,0.9)', fontFamily: 'DM Mono, monospace' }}>B2B2C STOCK CIRCULATION</p>
                    <p className="mt-1.5 text-[17px] font-bold leading-snug">태그도 안 뗀 브랜드 재고,<br />커피 한 잔 값에 내 옷장에.</p>
                    <div className="mt-5 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-mono opacity-80">LOW CLASSIC SPECIAL EDITION</p>
                        <p className="text-sm font-bold mt-0.5">₩4,500<span className="ml-1 text-[10px] font-normal opacity-70">/일부터</span></p>
                      </div>
                      <button onClick={() => onProductClick(items[0])} className="rounded-xl bg-white px-4 py-2 text-[11px] font-bold shadow-sm" style={{ color: 'var(--primary)' }}>지금 보기 →</button>
                    </div>
                  </div>
                </section>

                <section className="mt-9">
                  <div className="flex items-center justify-between px-5 mb-5">
                    <h2 className="text-[16px] font-bold">이번 주 인기 대여템</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-7 px-5">
                    {items.map(item => <ProductCard key={item.id} item={item} />)}
                  </div>
                </section>
              </>
            )}

            {appTab === 'search' && (
              <section className="px-5 pt-5">
                <h1 className="text-2xl font-bold">AI 검색</h1>
                <p className="mt-1.5 text-[13px]" style={{ color: 'var(--muted-foreground)' }}>체형에 딱 맞는 브랜드 재고를 AI가 추천합니다.</p>
                <div className="mt-6 flex border-b" style={{ borderColor: 'var(--border)' }}>
                  <button onClick={() => setPhotoMode(false)} className={`flex-1 py-3 text-[13px] font-bold transition-all ${!photoMode ? 'border-b-2 border-[#193D2A]' : ''}`} style={{ color: !photoMode ? 'var(--primary)' : 'var(--muted-foreground)' }}>키워드</button>
                  <button onClick={() => setPhotoMode(true)} className={`flex-1 py-3 text-[13px] font-bold transition-all ${photoMode ? 'border-b-2 border-[#193D2A]' : ''}`} style={{ color: photoMode ? 'var(--primary)' : 'var(--muted-foreground)' }}>사진 검색</button>
                </div>
                {photoMode ? (
                  <div className="mt-6">
                    <button className="flex h-52 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all active:bg-gray-50" style={{ borderColor: 'var(--border)', background: 'var(--card)', color: 'var(--muted-foreground)' }}>
                      <span className="mb-2 text-3xl">📸</span>
                      <p className="text-[13px] font-semibold text-[#171b16]">스타일 사진 올리기</p>
                      <span className="mt-1 text-[11px] text-center opacity-70 px-8">AI가 사진 속 스타일과 가장 유사한 <br />브랜드 대여 상품을 찾아드려요</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mt-6 flex rounded-2xl overflow-hidden shadow-sm" style={{ border: '1.5px solid var(--primary)', background: '#fff' }}>
                      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="예: 코트, 드레스, 스커트, LOW CLASSIC" className="min-w-0 flex-1 px-5 py-4 text-[13px] outline-none bg-transparent" style={{ color: 'var(--foreground)' }} />
                    </div>
                    {query && (
                      <div className="mt-4 text-xs font-mono font-bold text-[#6c7068]">검색 결과 {filteredProducts.length}건</div>
                    )}
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      {['코트', '드레스', '블레이저', 'LOW CLASSIC', 'RECTO'].map(x => (
                        <button onClick={() => setQuery(x)} key={x} className="rounded-xl px-4 py-2 text-[11px] font-medium shadow-sm active:scale-95 transition-transform" style={{ border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--foreground)' }}>#{x}</button>
                      ))}
                    </div>
                  </>
                )}
                
                <div className="mt-10 mb-5 flex items-center justify-between">
                  <h2 className="text-[15px] font-bold">검색 추천 상품</h2>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {filteredProducts.map(item => <ProductCard key={item.id} item={item} />)}
                </div>
              </section>
            )}

            {appTab === 'closet' && (
              <section className="px-5 pt-5 pb-10">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-2xl font-bold">내 옷장</h1>
                  <button onClick={() => setShowAddClothModal(true)} className="px-4 py-2 rounded-xl text-[11px] font-bold text-white shadow-lg transition-transform active:scale-95" style={{ background: 'var(--primary)' }}>+ 옷 등록</button>
                </div>
                <p className="text-[13px] mb-6 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>내가 보유한 옷을 등록하고, <br />브랜드 악성 재고 아이템과의 <b>AI 코디 추천</b>을 받아보세요!</p>

                {/* AI Coordinate recommendation based on owned clothes */}
                <div className="p-5 rounded-2xl text-white relative overflow-hidden shadow-lg mb-8" style={{ background: 'var(--accent)' }}>
                  <span className="inline-block text-[10px] font-mono font-bold bg-white/20 px-2 py-0.5 rounded-md text-white mb-2" style={{ fontFamily: 'DM Mono, monospace' }}>TODAY'S AI COORDINATE ✦</span>
                  <h2 className="text-lg font-bold leading-tight">내 [데님 팬츠]와 찰떡궁합 추천</h2>
                  <p className="text-[11px] mt-1 text-white/80">개인 소장 생지 데님과 브랜드 재고를 매칭한 오늘의 룩입니다.</p>

                  <div className="mt-4 flex gap-3 items-center bg-white/10 p-3 rounded-xl border border-white/10 cursor-pointer" onClick={() => onProductClick(items[0])}>
                    <div className="w-12 h-16 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
                      <img src={items[0].image} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-mono text-white/70">LOW CLASSIC</p>
                      <p className="text-xs font-bold text-white truncate">{items[0].name}</p>
                      <p className="text-[11px] font-bold mt-1 text-[#FEE500]">₩{items[0].price.toLocaleString()}/일 대여하러 가기 →</p>
                    </div>
                  </div>
                </div>

                <h2 className="text-base font-bold mb-4">등록된 내 옷 ({myCloset.length})</h2>
                <div className="grid grid-cols-2 gap-3">
                  {myCloset.map(cloth => (
                    <div key={cloth.id} className="p-3 bg-white border border-[#D5D0C4] rounded-2xl shadow-sm flex items-center gap-3">
                      <div className="w-12 h-16 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0">
                        <img src={cloth.img} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#E8E4D9]" style={{ color: 'var(--primary)' }}>{cloth.category}</span>
                        <p className="text-xs font-bold text-[#171b16] mt-1.5 truncate">{cloth.name}</p>
                        <p className="text-[9px] text-[#6c7068] mt-0.5">{cloth.brand}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Cloth Modal */}
                {showAddClothModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddClothModal(false)} />
                    <form onSubmit={handleAddCloth} className="relative w-full max-w-sm bg-white rounded-[32px] p-6 shadow-2xl animate-in zoom-in duration-300">
                      <h2 className="text-xl font-bold mb-4">내 옷 등록하기</h2>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[11px] font-bold text-[#6c7068] uppercase mb-1.5">카테고리</label>
                          <div className="flex gap-2">
                            {['상의', '하의', '아우터', '원피스'].map(cat => (
                              <button key={cat} type="button" onClick={() => setNewClosetCategory(cat)}
                                className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${newClothCategory === cat ? 'bg-[#193D2A] text-white border-transparent' : 'bg-white border-[#D5D0C4] text-[#171b16]'}`}>
                                {cat}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-[#6c7068] uppercase mb-1.5">의류 이름</label>
                          <input required value={newClothName} onChange={e => setNewClosetName(e.target.value)} placeholder="예: 오버핏 린넨 자켓" className="w-full px-4 py-3 rounded-xl border border-[#D5D0C4] text-xs outline-none focus:border-[#193D2A] bg-transparent" />
                        </div>
                      </div>

                      <div className="mt-6 flex gap-2">
                        <button type="button" onClick={() => setShowAddClothModal(false)} className="flex-1 py-3 text-xs font-bold rounded-xl bg-gray-100 text-[#6c7068]">취소</button>
                        <button type="submit" className="flex-1 py-3 text-xs font-bold rounded-xl text-white bg-[#193D2A]">등록 완료</button>
                      </div>
                    </form>
                  </div>
                )}
              </section>
            )}

            {appTab === 'profile' && (
              <section className="px-5 pt-5">
                <div className="border-b pb-6" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-2xl bg-stone-200 overflow-hidden ring-2 ring-[#193D2A]/10">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop" alt="Profile" />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] font-bold" style={{ color: 'var(--accent)', fontFamily: 'DM Mono, monospace' }}>MEMBER 01482 ✦ GOLD</p>
                      <h1 className="mt-0.5 text-2xl font-bold">김지수 님</h1>
                      <p className="mt-0.5 text-[12px]" style={{ color: 'var(--muted-foreground)' }}>@jisoo.style</p>
                    </div>
                  </div>
                </div>
                
                {/* ESG & Points Dashboard */}
                <div className="grid grid-cols-2 gap-2 mt-6">
                  <div className="rounded-2xl p-4 flex flex-col justify-between" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                    <p className="text-[10px] font-mono font-bold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>W-E 포인트</p>
                    <div className="mt-2 flex items-baseline gap-1">
                      <b className="text-xl">12,400</b>
                      <span className="text-[11px] font-bold" style={{ color: 'var(--accent)' }}>P</span>
                    </div>
                  </div>
                  <div className="rounded-2xl p-4 flex flex-col justify-between" style={{ background: 'rgba(25,61,42,0.05)', border: '1px solid var(--border)' }}>
                    <p className="text-[10px] font-mono font-bold uppercase tracking-wider" style={{ color: 'var(--primary)' }}>ESG 임팩트</p>
                    <div className="mt-2 flex items-baseline gap-1">
                      <b className="text-xl" style={{ color: 'var(--primary)' }}>2.4</b>
                      <span className="text-[11px] font-bold" style={{ color: 'var(--primary)' }}>CO₂ kg</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-b py-6 text-center" style={{ borderColor: 'var(--border)' }}>
                  {[['12', '대여 내역'], ['4', '공유 스타일']].map(([n, l]) => (
                    <div key={l} className="first:border-r" style={{ borderColor: 'var(--border)' }}>
                      <b className="block text-lg">{n}</b>
                      <span className="text-[10px] font-medium" style={{ color: 'var(--muted-foreground)' }}>{l}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pb-10">
                  {['대여·구매 내역', 'AI 사이즈 프로필', 'Wear-to-Earn 내역', '찜한 상품 (8)', '쿠폰함', '고객센터'].map(x => (
                    <button key={x} className="flex w-full items-center justify-between border-b py-4 text-left text-[14px] font-medium transition-all active:bg-gray-50" style={{ borderColor: 'var(--border)' }}>
                      <span>{x}</span>
                      <span className="text-[12px] opacity-40">→</span>
                    </button>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      {rentalNotice && (
        <div className="fixed bottom-24 left-1/2 z-40 flex w-[calc(100%-2.5rem)] max-w-[22rem] -translate-x-1/2 items-center justify-between rounded-2xl px-5 py-4 text-[13px] text-white shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300" style={{ background: 'var(--foreground)' }}>
          <div className="flex items-center gap-3">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[10px]">✓</span>
            <span className="font-medium">{rentalNotice}</span>
          </div>
          <button onClick={() => setRentalNotice(null)} className="ml-4 text-white/50 text-[11px] font-bold hover:text-white transition-colors">닫기</button>
        </div>
      )}

      {/* Navigation */}
      {!rentalStep && (
        <nav className="fixed bottom-0 left-1/2 z-30 flex w-full max-w-sm -translate-x-1/2 border-t bg-white/95 backdrop-blur-md px-2" style={{ borderColor: 'var(--border)' }}>
          {([['home', '홈', '⌂'], ['search', '검색', '⌕'], ['closet', '옷장', '★'], ['profile', '마이', '◯']] as const).map(([id, label, icon]) => (
            <button key={id} onClick={() => setAppTab(id)} className="flex flex-1 flex-col items-center gap-1.5 py-4 transition-all" style={{ color: appTab === id ? 'var(--primary)' : '#b0b2ac' }}>
              <span className="text-xl leading-none font-bold">{icon}</span>
              <span className="text-[10px] font-bold tracking-tight">{label}</span>
              {appTab === id && <span className="absolute bottom-2 h-1 w-1 rounded-full" style={{ background: 'var(--primary)' }} />}
            </button>
          ))}
        </nav>
      )}
    </div>
  )
}

