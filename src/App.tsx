import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Product, RentalStep } from './types';
import WebHomePage from './pages/WebHomePage';
import WebSearchResultsPage from './pages/WebSearchResultsPage';
import WebClosetPage from './pages/WebClosetPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import AiPhotoSearch from './pages/AiPhotoSearch';

import AppLayout from './pages/app/AppLayout';
import AppHomePage from './pages/app/AppHomePage';
import AppSearchPage from './pages/app/AppSearchPage';
import AppClosetPage from './pages/app/AppClosetPage';
import AppProfilePage from './pages/app/AppProfilePage';
import AppProductDetailPage from './pages/app/AppProductDetailPage';
import AppCheckoutPage from './pages/app/AppCheckoutPage';

import LoginModal from './components/LoginModal';
import RentalModal from './components/RentalModal';

export default function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // 웹 대여 프로세스 공유 상태
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [rentalStep, setRentalStep] = useState<RentalStep>(null);
  const [rentalDays, setRentalDays] = useState(3);
  const [selectedSize, setSelectedSize] = useState('');

  return (
    <>
      <Routes>
        {/* 웹 랜딩 페이지 */}
        <Route 
          path="/" 
          element={
            <WebHomePage 
              isLoggedIn={isLoggedIn}
              onOpenLogin={() => setShowLoginModal(true)} 
              onLogout={handleLogout}
              onProductClick={(product) => navigate(`/product/${product.id}`)}
            />
          } 
        />
        
        {/* 웹 상품 상세 페이지 */}
        <Route 
          path="/product/:id" 
          element={
            <ProductDetailPage
              isLoggedIn={isLoggedIn}
              onLogout={handleLogout}
              onOpenLogin={() => setShowLoginModal(true)}
            />
          } 
        />

        {/* 웹 결제/배송 페이지 */}
        <Route 
          path="/checkout" 
          element={ <CheckoutPage /> }
        />

        {/* 웹 전용 옷장 페이지 경로 */}
        <Route 
          path="/closet" 
          element={
            <WebClosetPage 
              isLoggedIn={isLoggedIn} 
              onOpenLogin={() => setShowLoginModal(true)}
              onLogout={handleLogout}
              onProductClick={(product) => navigate(`/product/${product.id}`)}
            />
          } 
        />

        {/* 웹 전용 검색 페이지 경로 */}
        <Route 
          path="/search" 
          element={
            <WebSearchResultsPage 
              isLoggedIn={isLoggedIn} 
              onOpenLogin={() => setShowLoginModal(true)}
              onLogout={handleLogout}
              onProductClick={(product) => navigate(`/product/${product.id}`)}
            />
          } 
        />

        {/* 웹 전용 AI 사진 검색 페이지 경로 */}
        <Route 
          path="/photo-search" 
          element={
            <AiPhotoSearch 
              isLoggedIn={isLoggedIn}
              onOpenLogin={() => setShowLoginModal(true)} 
              onLogout={handleLogout}
            />
          } 
        />

        {/* 모바일 앱 전용 라우트 */}
        <Route path="/app" element={<AppLayout />}>
          <Route 
            index 
            element={
              <AppHomePage 
                isLoggedIn={isLoggedIn} 
                onLogin={() => setIsLoggedIn(true)} 
              />
            } 
          />
          <Route path="search" element={<AppSearchPage />} />
          <Route 
            path="closet" 
            element={
              <AppClosetPage 
                isLoggedIn={isLoggedIn} 
                onOpenLogin={() => setShowLoginModal(true)} 
                onProductClick={(product) => {}} 
              />
            } 
          />
          <Route 
            path="profile" 
            element={
              <AppProfilePage 
                isLoggedIn={isLoggedIn} 
                onOpenLogin={() => setShowLoginModal(true)} 
                onProductClick={(product) => {}}
              />
            } 
          />
          <Route path="product/:id" element={<AppProductDetailPage />} />
          <Route path="checkout" element={<AppCheckoutPage />} />
          <Route 
            path="photo-search" 
            element={
              <AiPhotoSearch 
                isLoggedIn={isLoggedIn} 
                onOpenLogin={() => setShowLoginModal(true)}
                onLogout={handleLogout}
              />
            } 
          />
        </Route>
      </Routes>

      {/* 웹 대여 모달 플로우 */}
      {selectedProduct && rentalStep && (
        <RentalModal
          product={selectedProduct}
          rentalStep={rentalStep}
          rentalDays={rentalDays}
          selectedSize={selectedSize}
          setRentalDays={setRentalDays}
          setSelectedSize={setSelectedSize}
          setRentalStep={setRentalStep}
          onClose={() => {
            setRentalStep(null);
            setSelectedProduct(null);
          }}
        />
      )}

      {/* 로그인 모달 */}
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)} 
          onLogin={() => {
            setIsLoggedIn(true);
            setShowLoginModal(false);
          }} 
        />
      )}
    </>
  );
}