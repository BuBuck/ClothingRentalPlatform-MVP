import { useState } from 'react'

const items = [
  { id: 1, name: '울 싱글 롱 코트', brand: 'LOW CLASSIC', price: 4500, buyPrice: 159000, retail: 398000, days: 1, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&h=1000&fit=crop&auto=format', tag: '아우터', liked: false, eco: true, rating: 4.9, sizes: ['XS', 'S', 'M'], material: 'Wool 100%', match: 98 },
  { id: 2, name: '새틴 미디 드레스', brand: 'RECTO', price: 3800, buyPrice: 119000, retail: 298000, days: 1, image: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=800&h=1000&fit=crop&auto=format', tag: '원피스', liked: true, eco: false, rating: 4.7, sizes: ['S', 'M'], material: 'Silk 100%', match: 95 },
  { id: 3, name: '오버사이즈 블레이저', brand: 'ANDERSSON BELL', price: 5200, buyPrice: 171000, retail: 428000, days: 1, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b1ddf?w=800&h=1000&fit=crop&auto=format', tag: '세트', liked: false, eco: true, rating: 4.8, sizes: ['S', 'M', 'L'], material: 'Poly/Wool Mix', match: 92 },
  { id: 4, name: '새틴 랩 스커트', brand: 'MATIN KIM', price: 2900, buyPrice: 79000, retail: 198000, days: 1, image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&h=1000&fit=crop&auto=format', tag: '하의', liked: false, eco: true, rating: 4.5, sizes: ['Free'], material: 'Satin', match: 99 },
  { id: 5, name: '퀼팅 숄더 다운 패딩', brand: 'SJYP', price: 4100, buyPrice: 149000, retail: 358000, days: 1, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop&auto=format', tag: '아우터', liked: true, eco: false, rating: 4.6, sizes: ['S', 'M'], material: 'Goose Down', match: 94 },
  { id: 6, name: '시어 플로럴 블라우스', brand: 'COS', price: 2400, buyPrice: 69000, retail: 148000, days: 1, image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop&auto=format', tag: '상의', liked: false, eco: true, rating: 4.8, sizes: ['XS', 'S', 'M'], material: 'Polyester 100%', match: 91 },
]

const feedPosts = [
  { id: 1, user: '@jisoo.style', points: 2400, likes: 847, caption: 'LOW CLASSIC 코트로 결혼식 하객룩 완성했어요 ✦', img: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=360&h=480&fit=crop&auto=format', brand: 'LOW CLASSIC', rental: '₩4,500/일' },
  { id: 2, user: '@minji.wears', points: 1890, likes: 623, caption: '면접에 RECTO 드레스 입었더니 합격했습니다 🎉', img: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=360&h=480&fit=crop&auto=format', brand: 'RECTO', rental: '₩3,800/일' },
  { id: 3, user: '@hana.ootd', points: 3100, likes: 1204, caption: '제주도 여행에 딱 맞는 봄 코디 찾았다', img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=360&h=480&fit=crop&auto=format', brand: 'COS', rental: '₩2,400/일' },
  { id: 4, user: '@soyeon.rent', points: 980, likes: 312, caption: '데이트룩 고민 끝! ANDERSSON BELL 블레이저 최고', img: 'https://images.unsplash.com/photo-1594938298603-c8148c4b1ddf?w=360&h=480&fit=crop&auto=format', brand: 'ANDERSSON BELL', rental: '₩5,200/일' },
]

interface FeaturedItemsProps {
  onProductClick: (product: any) => void
}

export default function FeaturedItems({ onProductClick }: FeaturedItemsProps) {
  const [tab, setTab] = useState<'items' | 'feed'>('items')
  const [likes, setLikes] = useState<Record<number, boolean>>(
    Object.fromEntries(items.map(i => [i.id, i.liked]))
  )
  const [feedLikes, setFeedLikes] = useState<Record<number, boolean>>({})

  return (
    <section className="py-20 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-mono mb-2 tracking-widest uppercase" style={{ color: 'var(--accent)', fontFamily: 'DM Mono, monospace' }}>COLLECTION</p>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--foreground)' }}>
              지금 가장 인기있는
            </h2>
          </div>
          <a href="#" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: 'var(--primary)' }}>전체 보기 →</a>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 p-1 rounded-xl self-start w-fit" style={{ background: 'var(--muted)' }}>
          {([['items', '인기 대여템'], ['feed', 'Wear-to-Earn 피드']] as const).map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: tab === id ? 'var(--card)' : 'transparent',
                color: tab === id ? 'var(--primary)' : 'var(--muted-foreground)',
              }}>
              {label}
            </button>
          ))}
        </div>

        {tab === 'items' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 lg:gap-6">
            {items.map(item => (
              <div key={item.id} className="group cursor-pointer" onClick={() => onProductClick(item)}>
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4] mb-3 bg-stone-100">
                  <img src={item.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={item.name} />
                  {item.eco && (
                    <div className="absolute top-3 left-3 px-2 py-1 rounded-lg" style={{ background: 'rgba(25,61,42,0.9)' }}>
                      <span className="text-[10px] font-mono text-white" style={{ fontFamily: 'DM Mono, monospace' }}>ESG</span>
                    </div>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); setLikes(prev => ({ ...prev, [item.id]: !prev[item.id] })) }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                    style={{ background: 'rgba(245,241,232,0.92)' }}>
                    <span className="text-sm">{likes[item.id] ? '♥' : '♡'}</span>
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                    <button className="w-full py-2.5 rounded-xl text-sm font-semibold" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}>
                      즉시 대여
                    </button>
                  </div>
                </div>
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[10px] font-mono mb-0.5" style={{ color: 'var(--muted-foreground)', fontFamily: 'DM Mono, monospace' }}>{item.brand}</p>
                      <p className="text-sm font-medium leading-snug" style={{ color: 'var(--foreground)' }}>{item.name}</p>
                    </div>
                    <span className="text-[10px] flex-shrink-0 mt-0.5 px-1.5 py-0.5 rounded" style={{ background: 'var(--muted)', color: 'var(--muted-foreground)', fontFamily: 'DM Mono, monospace' }}>{item.tag}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <div>
                      <p className="text-base font-display font-bold" style={{ color: 'var(--primary)' }}>
                        ₩{item.price.toLocaleString()}<span className="text-xs font-normal ml-0.5" style={{ color: 'var(--muted-foreground)' }}>/{item.days}일</span>
                      </p>
                      <p className="text-[10px] line-through" style={{ color: 'var(--muted-foreground)' }}>정가 ₩{item.retail.toLocaleString()}</p>
                    </div>
                    <span className="text-xs" style={{ color: 'var(--muted-foreground)', fontFamily: 'DM Mono, monospace' }}>★ {item.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        ) : (
          <div>
            <div className="mb-6 p-4 rounded-xl flex items-center gap-3" style={{ background: 'rgba(25,61,42,0.06)', border: '1px solid var(--border)' }}>
              <span className="text-xl">★</span>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>착용샷 공유하면 포인트 지급 — Wear-to-Earn</p>
                <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>다른 유저가 내 사진 보고 대여하면 추가 리워드까지. 대여 1건당 평균 1,200P 적립.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {feedPosts.map(post => (
                <div key={post.id} className="group cursor-pointer">
                  <div className="relative rounded-2xl overflow-hidden aspect-[3/4] mb-3 bg-stone-100">
                    <img src={post.img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={post.caption} />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(23,27,22,0.7) 0%, transparent 50%)' }} />
                    <button
                      onClick={() => setFeedLikes(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                      className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(245,241,232,0.92)' }}>
                      <span className="text-xs">{feedLikes[post.id] ? '♥' : '♡'}</span>
                    </button>
                    <div className="absolute top-3 left-3 px-2 py-1 rounded-lg" style={{ background: 'var(--accent)' }}>
                      <p className="text-[9px] font-mono font-bold text-white" style={{ fontFamily: 'DM Mono, monospace' }}>+{post.points.toLocaleString()}P</p>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-[10px] font-mono text-white/70 mb-1" style={{ fontFamily: 'DM Mono, monospace' }}>{post.user}</p>
                      <p className="text-xs text-white leading-snug">{post.caption}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-mono" style={{ color: 'var(--muted-foreground)', fontFamily: 'DM Mono, monospace' }}>{post.brand}</p>
                      <p className="text-sm font-bold" style={{ color: 'var(--primary)' }}>{post.rental}</p>
                    </div>
                    <span className="text-xs" style={{ color: 'var(--muted-foreground)', fontFamily: 'DM Mono, monospace' }}>♥ {post.likes.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
