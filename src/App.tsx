import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { CategoriesScreen } from './components/CategoriesScreen';
import { ProductDetailScreen } from './components/ProductDetailScreen';
import { OrdersScreen } from './components/OrdersScreen';
import { CartScreen } from './components/CartScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { CropDoctorModal } from './components/CropDoctorModal';
import { MandiRatesModal } from './components/MandiRatesModal';
import { CompareModal } from './components/CompareModal';
import { CallExpertModal } from './components/CallExpertModal';
import { NotificationsModal } from './components/NotificationsModal';
import { VoiceSearchModal } from './components/VoiceSearchModal';
import { QrScannerModal } from './components/QrScannerModal';
import { PRODUCTS, MOCK_ORDERS } from './data/agriData';
import { Product, CartItem, Order } from './types';
import confetti from 'canvas-confetti';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('home');
  const [products] = useState<Product[]>(PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[1]); // Syngenta Amistar Top
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [wishlistIds, setWishlistIds] = useState<string[]>([
    'syngenta-amistar-top',
    'bayer-belt-expert',
    'upl-saaf-fungicide',
    'coromandel-gromor'
  ]);
  const [deliveryLocation, setDeliveryLocation] = useState<string>('Nashik, Maharashtra 422003');

  // Filter & Search states passed from Home/Header to Categories
  const [catalogSearchQuery, setCatalogSearchQuery] = useState<string>('');
  const [catalogCategory, setCatalogCategory] = useState<string>('All');
  const [catalogCrop, setCatalogCrop] = useState<string>('');
  const [catalogWishlistOnly, setCatalogWishlistOnly] = useState<boolean>(false);

  // Initial cart with items so the app is instantly rich and functional
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: PRODUCTS[1], // Amistar Top
      selectedPackSize: '200 ml',
      quantity: 1,
      price: 940
    },
    {
      product: PRODUCTS[2], // Coromandel Gromor
      selectedPackSize: '50 kg Bag',
      quantity: 1,
      price: 1470
    }
  ]);

  // Modals
  const [isCropDoctorOpen, setIsCropDoctorOpen] = useState(false);
  const [isMandiModalOpen, setIsMandiModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isCallExpertOpen, setIsCallExpertOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleVoiceSearchResult = (query: string) => {
    setCatalogSearchQuery(query);
    setCatalogWishlistOnly(false);
    setCurrentScreen('categories');
    showToast(`Voice Search: "${query}"`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add to cart handler
  const handleAddToCart = (product: Product, packSize?: string, qty: number = 1) => {
    const chosenSize = packSize || product.selectedPackSize || product.packSizes[0]?.size || 'Standard';
    const packObj = product.packSizes.find((p) => p.size === chosenSize) || {
      price: product.price
    };

    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (it) => it.product.id === product.id && it.selectedPackSize === chosenSize
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += qty;
        return updated;
      }
      return [
        ...prev,
        {
          product,
          selectedPackSize: chosenSize,
          quantity: qty,
          price: packObj.price
        }
      ];
    });

    showToast(`Added ${qty}x ${product.name} (${chosenSize}) to cart`);
  };

  // Direct Buy Now handler
  const handleBuyNow = (product: Product, packSize?: string, qty: number = 1) => {
    handleAddToCart(product, packSize, qty);
    setCurrentScreen('cart');
  };

  // Update Cart Qty
  const handleUpdateCartQty = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((it) => {
          if (it.product.id === productId) {
            const newQty = it.quantity + delta;
            return newQty > 0 ? { ...it, quantity: newQty } : null;
          }
          return it;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove Cart Item
  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((it) => it.product.id !== productId));
    showToast('Item removed from cart');
  };

  // Place Order handler
  const handlePlaceOrder = ({
    address,
    paymentMethod,
    total
  }: {
    address: string;
    paymentMethod: string;
    total: number;
  }) => {
    // Confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    const newOrder: Order = {
      id: `AGRI-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(10 + Math.random() * 90)}`,
      orderDate: 'Today, Just now',
      estimatedDeliveryTime: '05:00 PM',
      status: 'confirmed',
      deliveryAddress: address,
      items: [...cart],
      totalAmount: total,
      driver: {
        name: 'Kailash Shinde',
        photo:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        rating: 4.9,
        vehicle: 'Mahindra Bolero Maxi Truck (MH 15 EG 4402)',
        phone: '+91 98220 14421'
      },
      timeline: [
        {
          title: 'Order Confirmed',
          time: 'Just now',
          description: 'Payment verified via ' + paymentMethod.toUpperCase() + '. Consignment allocated at Nashik Agro Hub.',
          completed: true
        },
        {
          title: 'Quality & Batch QR Inspection',
          time: 'In 30 mins',
          description: 'Govt certified seed germination & active agrochem batch seal test.',
          completed: false
        },
        {
          title: 'Out for Field Gate Delivery',
          time: 'By 03:00 PM',
          description: 'Dispatched in Rural Express Van to your farm gate.',
          completed: false
        },
        {
          title: 'Delivered at Tractor Shed',
          time: 'By 05:00 PM',
          description: 'Farmer hand-over and OTP confirmation.',
          completed: false
        }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setCurrentScreen('orders');
    showToast('Order confirmed! Tracking dispatch.');
  };

  // Wishlist toggle
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from saved items');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to favorite items');
        return [...prev, productId];
      }
    });
  };

  // Product selection
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen('product_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter by crop on home screen
  const handleFilterByCrop = (cropName: string) => {
    setCatalogCrop(cropName);
    setCatalogWishlistOnly(false);
    setCurrentScreen('categories');
  };

  const handleSearchFromHome = (query: string) => {
    setCatalogSearchQuery(query);
    setCatalogWishlistOnly(false);
    setCurrentScreen('categories');
  };

  const handleSelectCategoryFromHome = (cat: string) => {
    setCatalogCategory(cat);
    setCatalogWishlistOnly(false);
    setCurrentScreen('categories');
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-inverse-surface/95 text-inverse-on-surface backdrop-blur-md px-4 py-2 rounded-full shadow-lg text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <span className="material-symbols-outlined text-[16px] text-inverse-primary">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Persistent Global Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={(s) => {
          if (s === 'categories') {
            setCatalogWishlistOnly(false);
          }
          setCurrentScreen(s);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        wishlistCount={wishlistIds.length}
        deliveryLocation={deliveryLocation}
        onSelectLocation={(loc) => {
          setDeliveryLocation(loc);
          showToast(`Delivery location set to ${loc}`);
        }}
        onOpenWishlist={() => {
          setCatalogWishlistOnly(true);
          setCurrentScreen('categories');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenQrScanner={() => setIsQrScannerOpen(true)}
      />

      {/* Main Screen Content */}
      <main className="flex-1 flex flex-col w-full">
        {currentScreen === 'home' && (
          <HomeScreen
            products={products}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onNavigate={(s) => {
              setCurrentScreen(s);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCropDoctor={() => setIsCropDoctorOpen(true)}
            onOpenMandiModal={() => setIsMandiModalOpen(true)}
            onOpenCallExpert={() => setIsCallExpertOpen(true)}
            onFilterByCrop={handleFilterByCrop}
            onSearch={handleSearchFromHome}
            onSelectCategory={handleSelectCategoryFromHome}
            onOpenVoiceSearch={() => setIsVoiceSearchOpen(true)}
            onOpenQrScanner={() => setIsQrScannerOpen(true)}
          />
        )}

        {currentScreen === 'categories' && (
          <CategoriesScreen
            products={products}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onNavigate={(s) => {
              setCurrentScreen(s);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCompare={() => setIsCompareModalOpen(true)}
            onOpenCallExpert={() => setIsCallExpertOpen(true)}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            initialSearchQuery={catalogSearchQuery}
            initialCategory={catalogCategory}
            initialCrop={catalogCrop}
            showWishlistOnly={catalogWishlistOnly}
            onClearWishlistFilter={() => setCatalogWishlistOnly(false)}
            onOpenVoiceSearch={() => setIsVoiceSearchOpen(true)}
            onOpenQrScanner={() => setIsQrScannerOpen(true)}
          />
        )}

        {currentScreen === 'product_detail' && (
          <ProductDetailScreen
            product={selectedProduct}
            onBack={() => setCurrentScreen('categories')}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onOpenCallExpert={() => setIsCallExpertOpen(true)}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onOpenQrScanner={() => setIsQrScannerOpen(true)}
          />
        )}

        {currentScreen === 'orders' && (
          <OrdersScreen
            orders={orders}
            onNavigate={(s) => {
              setCurrentScreen(s);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onReorder={(order) => {
              order.items.forEach((it) => {
                handleAddToCart(it.product, it.selectedPackSize, it.quantity);
              });
              setCurrentScreen('cart');
              showToast('Items from previous order re-added to cart');
            }}
            onOpenCallDriver={() => setIsCallExpertOpen(true)}
          />
        )}

        {currentScreen === 'cart' && (
          <CartScreen
            cart={cart}
            onUpdateQty={handleUpdateCartQty}
            onRemoveItem={handleRemoveCartItem}
            onPlaceOrder={handlePlaceOrder}
            onNavigate={(s) => {
              setCurrentScreen(s);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileScreen
            onNavigate={(s) => {
              setCurrentScreen(s);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCallExpert={() => setIsCallExpertOpen(true)}
            onOpenMandiModal={() => setIsMandiModalOpen(true)}
          />
        )}
      </main>

      {/* Persistent Bottom Navigation */}
      <BottomNav
        activeScreen={currentScreen}
        cartCount={totalCartCount}
        hasActiveOrder={orders.some((o) => o.status !== 'delivered')}
        onNavigate={(s) => {
          setCurrentScreen(s);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Global Modals */}
      <CropDoctorModal
        isOpen={isCropDoctorOpen}
        onClose={() => setIsCropDoctorOpen(false)}
        products={products}
        onSelectProduct={handleSelectProduct}
        onAddToCart={handleAddToCart}
      />

      <MandiRatesModal
        isOpen={isMandiModalOpen}
        onClose={() => setIsMandiModalOpen(false)}
      />

      <CompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        products={products}
        onAddToCart={handleAddToCart}
      />

      <CallExpertModal
        isOpen={isCallExpertOpen}
        onClose={() => setIsCallExpertOpen(false)}
        productName={selectedProduct?.name}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigate={(s) => {
          setCurrentScreen(s);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <VoiceSearchModal
        isOpen={isVoiceSearchOpen}
        onClose={() => setIsVoiceSearchOpen(false)}
        onResult={handleVoiceSearchResult}
      />

      <QrScannerModal
        isOpen={isQrScannerOpen}
        onClose={() => setIsQrScannerOpen(false)}
        onSelectProduct={(p) => {
          handleSelectProduct(p);
          showToast(`Authenticated & loaded ${p.name}`);
        }}
        onAddToCart={handleAddToCart}
        onOpenCallExpert={() => setIsCallExpertOpen(true)}
      />
    </div>
  );
}
