import { useState } from 'react'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import HowItWorks from './components/HowItWorks'
import FeaturedItems from './components/FeaturedItems'
import AIWardrobeSection from './components/AIWardrobeSection'
import CategoryBrowse from './components/CategoryBrowse'
import AppDownloadSection from './components/AppDownloadSection'
import Footer from './components/Footer'

export type View = 'web' | 'app'

export default function App() {
  const [activeView, setActiveView] = useState<View>('web')

  if (activeView === 'app') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-start" style={{ background: 'var(--background)' }}>
        <div className="w-full max-w-sm mx-auto flex flex-col min-h-screen relative" style={{ background: 'var(--background)' }}>
          <AppView onSwitchView={() => setActiveView('web')} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Navigation activeView={activeView} onSwitchView={setActiveView} />
      <HeroSection />
      <HowItWorks />
      <CategoryBrowse />
      <FeaturedItems />
      <AIWardrobeSection />
      <AppDownloadSection onSwitchToApp={() => setActiveView('app')} />
      <Footer />
    </div>
  )
}

function AppView({ onSwitchView }: { onSwitchView: () => void }) {
  const [appTab, setAppTab] = useState<'home' | 'search' | 'feed' | 'profile'>('home')
  const [query, setQuery] = useState('')
  const [photoMode, setPhotoMode] = useState(false)
  const [saved, setSaved] = useState<number[]>([])
  const [rentalNotice, setRentalNotice] = useState<string | null>(null)

  const items = [
    { id: 1, brand: 'LOW CLASSIC', name: '울 싱글 롱 코트', price: '4,500', image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500&h=660&fit=crop&auto=format', retail: '398,000' },
    { id: 2, brand: 'RECTO', name: '새틴 미디 드레스', price: '3,800', image: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=500&h=660&fit=crop&auto=format', retail: '298,000' },
    { id: 3, brand: 'ANDERSSON BELL', name: '오버사이즈 블레이저', price: '5,200', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b1ddf?w=500&h=660&fit=crop&auto=format', retail: '428,000' },
    { id: 4, brand: 'MATIN KIM', name: '새틴 랩 스커트', price: '2,900', image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&h=660&fit=crop&auto=format', retail: '198,000' },
  ]

  const feedPosts = [
    { id: 1, user: '@jisoo.style', points: 2400, img: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=530&fit=crop&auto=format', brand: 'LOW CLASSIC', caption: '결혼식 하객룩 완성 ✦', likes: 847 },
    { id: 2, user: '@minji.wears', points: 1890, img: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=400&h=530&fit=crop&auto=format', brand: 'RECTO', caption: '면접 드레스, 합격했어요 🎉', likes: 623 },
    { id: 3, user: '@hana.ootd', points: 3100, img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=530&fit=crop&auto=format', brand: 'COS', caption: '제주 여행 코디 🌿', likes: 1204 },
    { id: 4, user: '@soyeon', points: 980, img: 'https://images.unsplash.com/photo-1594938298603-c8148c4b1ddf?w=400&h=530&fit=crop&auto=format', brand: 'ANDERSSON BELL', caption: '데이트룩 최고예요', likes: 312 },
  ]

  const toggleSave = (id: number) => setSaved(old => old.includes(id) ? old.filter(v => v !== id) : [...old, id])

  const ProductCard = ({ item }: { item: typeof items[number] }) => (
    <article className="min-w-0">
      <div className="relative aspect-[.76] overflow-hidden rounded-xl bg-[#e2ddd3]">
        <img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
        <button onClick={() => toggleSave(item.id)} className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-xs shadow-sm">
          {saved.includes(item.id) ? '♥' : '♡'}
        </button>
        <span className="absolute bottom-2 left-2 rounded-md bg-[#193D2A] px-2 py-1 text-[9px] font-medium text-white">BRAND NEW</span>
      </div>
      <p className="mt-2 text-[10px] font-mono font-bold tracking-wide text-[#6c7068]">{item.brand}</p>
      <p className="mt-0.5 truncate text-xs font-medium">{item.name}</p>
      <div className="mt-1 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold">₩{item.price}<span className="ml-1 text-[9px] font-normal text-[#6c7068]">/일</span></p>
          <p className="text-[9px] text-[#6c7068] line-through">정가 ₩{item.retail}</p>
        </div>
        <button onClick={() => setRentalNotice(`${item.name}을(를) 대여 바구니에 담았어요.`)} className="rounded-lg bg-[#193D2A] px-2.5 py-1.5 text-[10px] font-bold text-white">대여</button>
      </div>
    </article>
  )

  return (
    <div className="min-h-screen pb-20 text-[#171b16]" style={{ background: 'var(--background)' }}>
      <header className="flex items-center justify-between px-5 pb-3 pt-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <button onClick={onSwitchView} className="text-[10px]" style={{ color: 'var(--muted-foreground)' }}>← WEB</button>
        <div className="text-center">
          <p className="font-display text-lg tracking-[.08em]" style={{ color: 'var(--primary)' }}>Wear-Us</p>
          <p className="text-[8px] font-mono tracking-widest" style={{ color: 'var(--accent)', fontFamily: 'DM Mono, monospace' }}>웨어어스</p>
        </div>
        <button className="relative">
          <span className="text-lg">♧</span>
          <span className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-[#bb5938]" />
        </button>
      </header>

      <main className="overflow-hidden">
        {appTab === 'home' && (
          <>
            <div className="px-5 pt-4">
              <p className="text-[13px] font-semibold">안녕하세요, 지수님 <span style={{ color: 'var(--primary)' }}>오늘의 브랜드 재고를 확인해보세요.</span></p>
              <button onClick={() => setAppTab('search')} className="mt-3 flex h-12 w-full items-center justify-between rounded-xl px-4 text-left text-xs" style={{ background: 'var(--secondary)', color: 'var(--muted-foreground)' }}>
                <span>AI 사이즈 매칭 · 브랜드 검색</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full text-white text-base" style={{ background: 'var(--primary)' }}>⌕</span>
              </button>
            </div>

            {/* Hero banner */}
            <section className="mx-5 mt-4 rounded-2xl p-5 text-white" style={{ background: 'var(--primary)' }}>
              <p className="text-[10px] font-mono" style={{ color: 'rgba(201,218,205,0.8)', fontFamily: 'DM Mono, monospace' }}>LOW CLASSIC 이월 재고 · 단독 입고</p>
              <p className="mt-1.5 text-base font-bold leading-snug">태그도 안 뗀 새 옷,<br />오늘 14시 주문 시 내일 도착.</p>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold">₩4,500<span className="ml-1 text-[10px] font-normal opacity-70">/일부터</span></p>
                  <p className="text-[9px] opacity-50 line-through">정가 ₩398,000</p>
                </div>
                <button onClick={() => { setQuery('LOW CLASSIC'); setAppTab('search') }} className="rounded-xl bg-white px-3 py-2 text-[11px] font-bold" style={{ color: 'var(--primary)' }}>
                  지금 보기 →
                </button>
              </div>
            </section>

            {/* Occasion chips */}
            <section className="mt-6">
              <div className="px-5 flex items-center justify-between mb-3">
                <h2 className="text-[14px] font-bold">어떤 날에 필요하세요?</h2>
              </div>
              <div className="flex gap-2 overflow-x-auto px-5" style={{ scrollbarWidth: 'none' }}>
                {[['💍','결혼식'], ['✈️','여행'], ['💼','면접'], ['🎂','파티'], ['☕','데이트']].map(([icon, label]) => (
                  <button onClick={() => { setQuery(label); setAppTab('search') }} key={label}
                    className="flex min-w-[68px] flex-col items-center gap-1.5 rounded-xl py-3 text-[11px] font-medium flex-shrink-0"
                    style={{ border: '1px solid var(--border)', background: 'var(--card)' }}>
                    <span className="text-lg">{icon}</span>{label}
                  </button>
                ))}
              </div>
            </section>

            {/* Trust badge */}
            <div className="mx-5 mt-5 flex items-center gap-3 rounded-xl px-4 py-3" style={{ border: '1px solid var(--border)', background: 'rgba(25,61,42,0.05)' }}>
              <span className="flex h-8 w-8 items-center justify-center rounded-full text-sm" style={{ background: '#d7eadb' }}>✓</span>
              <div>
                <b className="block text-xs" style={{ color: 'var(--primary)' }}>전문 세탁·살균 후 배송</b>
                <p className="text-[10px]" style={{ color: 'var(--muted-foreground)' }}>편의점 반납 · AI 사이즈 매칭 · Wear-to-Earn 포인트</p>
              </div>
            </div>

            {/* Products */}
            <section className="mt-7">
              <div className="flex items-center justify-between px-5 mb-4">
                <h2 className="text-[15px] font-bold">이번 주 인기 대여템</h2>
                <button className="text-[11px] font-semibold" style={{ color: 'var(--primary)' }}>더보기</button>
              </div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-5 px-5">
                {items.map(item => <ProductCard key={item.id} item={item} />)}
              </div>
            </section>

            {/* Wear-to-Earn CTA */}
            <button onClick={() => setAppTab('feed')} className="mx-5 mt-7 flex w-[calc(100%-2.5rem)] items-center justify-between rounded-2xl p-4 text-left" style={{ background: 'var(--accent)' }}>
              <span>
                <span className="block text-[10px] font-mono font-bold text-white/70" style={{ fontFamily: 'DM Mono, monospace' }}>WEAR-TO-EARN</span>
                <b className="mt-1 block text-sm text-white">스타일링 샷 공유하고 포인트 받기</b>
                <span className="mt-0.5 block text-[10px] text-white/70">착용 후 사진 공유 → 포인트 적립 → 다음 대여 할인</span>
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white text-sm">★</span>
            </button>
          </>
        )}

        {appTab === 'search' && (
          <section className="px-5 pt-4">
            <h1 className="text-2xl font-bold">AI 검색</h1>
            <p className="mt-1 text-xs" style={{ color: 'var(--muted-foreground)' }}>말로 찾거나 사진으로 스타일을 분석하세요.</p>
            <div className="mt-4 flex border-b" style={{ borderColor: 'var(--border)' }}>
              <button onClick={() => setPhotoMode(false)} className={`flex-1 py-3 text-xs font-bold ${!photoMode ? 'border-b-2 border-[#193D2A]' : ''}`} style={{ color: !photoMode ? 'var(--primary)' : 'var(--muted-foreground)' }}>키워드</button>
              <button onClick={() => setPhotoMode(true)} className={`flex-1 py-3 text-xs font-bold ${photoMode ? 'border-b-2 border-[#193D2A]' : ''}`} style={{ color: photoMode ? 'var(--primary)' : 'var(--muted-foreground)' }}>사진 검색</button>
            </div>
            {photoMode ? (
              <button className="mt-5 flex h-44 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed text-xs" style={{ borderColor: 'var(--primary)', background: 'var(--secondary)', color: 'var(--muted-foreground)' }}>
                <span className="mb-2 text-2xl">+</span>스타일 사진 올리기
                <span className="mt-1 text-[10px]">AI가 비슷한 브랜드 대여 상품을 찾아드려요</span>
              </button>
            ) : (
              <>
                <div className="mt-4 flex rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--primary)' }}>
                  <input value={query} onChange={e => setQuery(e.target.value)} placeholder="예: 제주도 여행룩, 면접 정장" className="min-w-0 flex-1 px-4 py-3 text-xs outline-none bg-transparent" style={{ color: 'var(--foreground)' }} />
                  <button className="px-4 text-xs font-bold text-white" style={{ background: 'var(--primary)' }}>찾기</button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {['하객룩', '가을 여행', '면접', '데이트'].map(x => (
                    <button onClick={() => setQuery(x)} key={x} className="rounded-lg px-3 py-1.5 text-[11px]" style={{ border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--foreground)' }}>#{x}</button>
                  ))}
                </div>
              </>
            )}
            <p className="mt-6 text-xs font-bold">AI 추천 <span className="font-normal" style={{ color: 'var(--accent)' }}>사이즈 98% 매칭</span></p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {items.slice(0, 2).map(item => <ProductCard key={item.id} item={item} />)}
            </div>
          </section>
        )}

        {appTab === 'feed' && (
          <section className="px-5 pt-4">
            <div className="flex items-center justify-between mb-1">
              <h1 className="text-2xl font-bold">Wear-to-Earn</h1>
              <button className="px-3 py-1.5 rounded-xl text-xs font-bold text-white" style={{ background: 'var(--accent)' }}>+ 착용샷 공유</button>
            </div>
            <p className="text-xs mb-4" style={{ color: 'var(--muted-foreground)' }}>착용 후 사진 공유 → 포인트 적립 → 다음 대여 할인</p>
            <div className="grid grid-cols-2 gap-2">
              {feedPosts.map(post => (
                <div key={post.id} className="group cursor-pointer">
                  <div className="relative rounded-2xl overflow-hidden aspect-[3/4] mb-2 bg-stone-200">
                    <img src={post.img} alt={post.caption} className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(23,27,22,0.72) 0%, transparent 50%)' }} />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md" style={{ background: 'var(--accent)' }}>
                      <p className="text-[9px] font-mono font-bold text-white">+{post.points.toLocaleString()}P</p>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-[9px] font-mono text-white/60">{post.user}</p>
                      <p className="text-xs text-white leading-tight">{post.caption}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-mono" style={{ color: 'var(--muted-foreground)', fontFamily: 'DM Mono, monospace' }}>{post.brand}</p>
                    <p className="text-[10px]" style={{ color: 'var(--muted-foreground)' }}>♥ {post.likes}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {appTab === 'profile' && (
          <section className="px-5 pt-4">
            <div className="border-b pb-5" style={{ borderColor: 'var(--border)' }}>
              <p className="font-mono text-[10px]" style={{ color: 'var(--accent)', fontFamily: 'DM Mono, monospace' }}>MEMBER 01482</p>
              <h1 className="mt-1 text-2xl font-bold">김지수 님</h1>
              <p className="mt-0.5 text-xs" style={{ color: 'var(--muted-foreground)' }}>@jisoo.style</p>
            </div>
            <div className="grid grid-cols-4 border-b py-5 text-center" style={{ borderColor: 'var(--border)' }}>
              {[['12', '대여'], ['8,400', 'W-E 포인트'], ['2.4', 'CO₂ kg'], ['4', '착용샷']].map(([n, l]) => (
                <div key={l}><b className="block text-base">{n}</b><span className="text-[9px]" style={{ color: 'var(--muted-foreground)', fontFamily: 'DM Mono, monospace' }}>{l}</span></div>
              ))}
            </div>
            <div className="mt-4">
              {['대여 내역', '찜한 상품', 'Wear-to-Earn 내역', 'AI 사이즈 프로필', '쿠폰·포인트', '고객센터'].map(x => (
                <button key={x} className="flex w-full items-center justify-between border-b py-4 text-left text-sm" style={{ borderColor: 'var(--border)' }}>
                  <span>{x}</span><span style={{ color: 'var(--muted-foreground)' }}>→</span>
                </button>
              ))}
            </div>
          </section>
        )}
      </main>

      {rentalNotice && (
        <div className="fixed bottom-20 left-1/2 z-20 flex w-[calc(100%-2rem)] max-w-[22rem] -translate-x-1/2 items-center justify-between rounded-xl px-4 py-3 text-xs text-white shadow-xl" style={{ background: 'var(--foreground)' }}>
          <span>{rentalNotice}</span>
          <button onClick={() => setRentalNotice(null)} className="ml-3 text-white/60">닫기</button>
        </div>
      )}

      <nav className="fixed bottom-0 left-1/2 flex w-full max-w-sm -translate-x-1/2 border-t bg-white" style={{ borderColor: 'var(--border)' }}>
        {([['home', '홈', '⌂'], ['search', '검색', '⌕'], ['feed', '피드', '★'], ['profile', '마이', '◯']] as const).map(([id, label, icon]) => (
          <button key={id} onClick={() => setAppTab(id)} className="flex flex-1 flex-col items-center gap-1 py-3" style={{ color: appTab === id ? 'var(--primary)' : '#8c8e87' }}>
            <span className="text-base leading-none">{icon}</span>
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
