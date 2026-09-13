import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { CATEGORIES, CROP_FILTERS } from '../data/agriData';

interface HomeScreenProps {
  products: Product[];
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product, packSize?: string, qty?: number) => void;
  onNavigate: (screen: string) => void;
  onOpenCropDoctor: () => void;
  onOpenMandiModal: () => void;
  onOpenCallExpert: () => void;
  onFilterByCrop: (crop: string) => void;
  onSearch?: (query: string) => void;
  onSelectCategory?: (category: string) => void;
  onOpenVoiceSearch?: () => void;
  onOpenQrScanner?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onNavigate,
  onOpenCropDoctor,
  onOpenMandiModal,
  onOpenCallExpert,
  onFilterByCrop,
  onSearch,
  onSelectCategory,
  onOpenVoiceSearch,
  onOpenQrScanner
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [timerString, setTimerString] = useState('14h : 22m : 05s');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  // Countdown timer simulation
  useEffect(() => {
    let totalSeconds = 14 * 3600 + 22 * 60 + 5;
    const interval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const secs = String(totalSeconds % 60).padStart(2, '0');
        setTimerString(`${hrs}h : ${mins}m : ${secs}s`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
    onNavigate('categories');
  };

  const handleAddClick = (p: Product, packSize?: string) => {
    onAddToCart(p, packSize, 1);
    setAddedIds((prev) => ({ ...prev, [p.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [p.id]: false }));
    }, 1800);
  };

  // Flash deals items
  const bayerProduct = products.find((p) => p.id === 'bayer-belt-expert') || products[0];
  const mahycoProduct = products.find((p) => p.id === 'mahyco-hybrid-tomato') || products[3];
  const iffcoProduct = products.find((p) => p.id === 'iffco-npk-soluble') || products[4];

  // 2x2 Grid products
  const amistarProduct = products.find((p) => p.id === 'syngenta-amistar-top') || products[1];
  const dhanzymeProduct = products.find((p) => p.id === 'dhanuka-dhanzyme-gold') || products[7];
  const neptuneProduct = products.find((p) => p.id === 'neptune-battery-sprayer') || products[5];
  const coragenProduct = products.find((p) => p.id === 'fmc-coragen-insecticide') || products[6];

  // Selected pack sizes for 2x2 grid cards
  const [amistarPack, setAmistarPack] = useState('250ml');
  const [dhanzymePack, setDhanzymePack] = useState('4kg');
  const [neptunePack] = useState('16L Standard');
  const [coragenPack, setCoragenPack] = useState('60ml');

  return (
    <div className="flex flex-col w-full gap-4 pb-28 pt-24 max-w-screen-md mx-auto">
      {/* Search & Smart Field Diagnostic Bar */}
      <div className="px-4 pt-1">
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-1.5 bg-surface-container-lowest shadow-xs rounded-xl p-1.5 border border-surface-container-high/80 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
          <button
            type="submit"
            aria-label="Submit search"
            className="flex items-center justify-center w-9 h-9 text-on-surface-variant hover:text-primary transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>
          <input
            className="w-full bg-transparent text-sm text-on-surface placeholder:text-outline focus:outline-none min-w-0 font-sans"
            placeholder="Search seeds, fertilizers, pesticides, crops..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="w-6 h-6 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant mr-1"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
          {/* Crop Doctor AI Scan Button */}
          <button
            aria-label="Diagnose crop with camera"
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container-low text-primary hover:bg-surface-container transition-colors relative group shrink-0"
            title="Crop Doctor AI Scan"
            type="button"
            onClick={onOpenCropDoctor}
          >
            <span className="material-symbols-outlined text-[20px]">photo_camera</span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-tertiary-container rounded-full ring-2 ring-surface-container-lowest"></span>
          </button>
          {/* QR Code Product & Hologram Scanner Button */}
          {onOpenQrScanner && (
            <button
              aria-label="Scan product QR code or bottle hologram"
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container-low text-primary hover:bg-surface-container transition-colors shrink-0 group relative"
              type="button"
              onClick={onOpenQrScanner}
              title="Scan Product QR & Hologram (Instant Authenticity Check)"
            >
              <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
                qr_code_scanner
              </span>
            </button>
          )}
          {/* Voice Search Button */}
          <button
            aria-label="Voice-to-text product and crop disease search"
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container-low text-on-surface-variant hover:text-primary transition-colors shrink-0 group relative"
            type="button"
            onClick={onOpenVoiceSearch || onOpenCallExpert}
            title="Voice Search (Speak product or crop disease)"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">mic</span>
          </button>
        </form>
      </div>

      {/* Kisan Anti-Counterfeit Verification Quick Banner */}
      {onOpenQrScanner && (
        <div className="px-4">
          <div className="bg-surface-container-low rounded-2xl p-3 sm:p-3.5 border border-primary/25 shadow-xs flex items-center justify-between gap-3 hover:border-primary/40 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px] sm:text-[24px]">qr_code_scanner</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    Anti-Spurious Guard
                  </span>
                  <span className="text-[10px] text-on-surface-variant font-medium">Govt CIB Approved</span>
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-on-surface mt-0.5 truncate">
                  Scan Product QR / Hologram
                </h4>
                <p className="text-[11px] text-on-surface-variant truncate">
                  Authenticate pesticide, seed &amp; fertilizer bottles before field spray
                </p>
              </div>
            </div>

            <button
              onClick={onOpenQrScanner}
              className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container shrink-0 flex items-center gap-1 shadow-2xs transition-transform active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">photo_camera</span>
              <span className="whitespace-nowrap">Scan Label</span>
            </button>
          </div>
        </div>
      )}

      {/* Live Kisan Weather & Mandi Rates Ticker */}
      <div className="px-4">
        <button
          onClick={onOpenMandiModal}
          className="w-full text-left bg-surface-container-low rounded-xl p-3 flex items-center justify-between gap-2 shadow-xs border border-surface-container-high/60 hover:bg-surface-container transition-colors"
        >
          {/* Weather Pill */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary">
              <span
                className="material-symbols-outlined text-[22px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                wb_sunny
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-bold text-on-surface">29°C</span>
                <span className="text-[11px] text-on-surface-variant font-medium">Nashik</span>
              </div>
              <span className="text-[11px] text-outline">Sunny • 65% Humidity</span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-surface-container-highest shrink-0"></div>

          {/* Live Mandi Pulse */}
          <div className="flex items-center gap-2 overflow-hidden min-w-0 flex-1 pl-1">
            <div className="w-8 h-8 rounded-lg bg-secondary-fixed/50 flex items-center justify-center text-secondary shrink-0">
              <span className="material-symbols-outlined text-[18px]">trending_up</span>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shrink-0"></span>
                <span className="text-[10px] text-primary uppercase font-bold tracking-wider">
                  Mandi Rates
                </span>
              </div>
              <p className="text-xs text-on-surface truncate">
                Soybean <span className="font-bold text-primary">₹4,850/qtl</span> • Onion{' '}
                <span className="font-bold text-primary">₹1,820/qtl</span>
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Seasonal Promotional Banner Card */}
      <div className="px-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-container to-secondary p-4 text-on-primary shadow-md">
          {/* Ambient Graphic Vector Glow */}
          <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-secondary-fixed opacity-20 blur-2xl pointer-events-none"></div>
          <div className="absolute right-3 top-3 w-28 h-28 opacity-15 pointer-events-none">
            <svg fill="currentColor" viewBox="0 0 100 100">
              <path d="M50 0 C60 30 90 40 100 50 C70 60 60 90 50 100 C40 70 10 60 0 50 C30 40 40 10 50 0 Z"></path>
            </svg>
          </div>
          <div className="relative z-10 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <span className="bg-secondary-fixed text-on-secondary-fixed-variant text-[11px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
                Kharif Season Special
              </span>
              <div className="flex items-center gap-1 bg-white/15 px-2 py-0.5 rounded-md backdrop-blur-xs text-on-primary text-[11px] font-mono font-medium">
                <span className="material-symbols-outlined text-[14px]">timer</span>
                <span>{timerString}</span>
              </div>
            </div>
            <div className="max-w-[85%]">
              <h2 className="text-xl font-bold text-on-primary leading-tight font-sans">
                Up to 35% Off Certified Hybrid Seeds
              </h2>
              <p className="text-xs text-on-primary-container mt-1 font-sans">
                Cotton, Paddy &amp; Soybean high-yield vigor batches with germination guarantee.
              </p>
            </div>
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-on-primary-container">Use Code:</span>
                <span className="px-2 py-0.5 rounded bg-white/20 text-xs font-bold tracking-wider uppercase text-on-primary">
                  KHARIF35
                </span>
              </div>
              <button
                onClick={() => onNavigate('categories')}
                className="h-9 px-4 bg-surface-container-lowest text-primary hover:bg-surface-container-low text-xs font-bold rounded-lg shadow-xs transition-transform active:scale-95 flex items-center gap-1"
                type="button"
              >
                Shop Now
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Category Pills / Grid */}
      <div className="flex flex-col gap-2">
        <div className="px-4 flex items-center justify-between">
          <h3 className="font-bold text-base text-on-surface">Agri Categories</h3>
          <button
            onClick={() => {
              if (onSelectCategory) onSelectCategory('All');
              onNavigate('categories');
            }}
            className="text-xs font-bold text-primary hover:underline flex items-center"
          >
            All Categories <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Micro-scroll Category Strip */}
        <div className="flex gap-2.5 px-4 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                if (onSelectCategory) onSelectCategory(cat.name);
                onNavigate('categories');
              }}
              className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container-high/60 hover:border-primary/40 hover:bg-surface-container-low transition-all shrink-0 w-24 text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-container-low group-hover:bg-primary-fixed/40 flex items-center justify-center text-primary transition-colors">
                <span className="material-symbols-outlined text-[24px]">{cat.icon}</span>
              </div>
              <span className="text-[11px] text-on-surface font-semibold leading-tight line-clamp-2">
                {cat.name}
              </span>
              <span className="text-[10px] text-outline">{cat.subtext}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Flash Deals Horizontal Carousel */}
      <div className="flex flex-col gap-2">
        <div className="px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[20px] text-tertiary-container"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              bolt
            </span>
            <h3 className="font-bold text-base text-on-surface">Flash Deals</h3>
            <span className="bg-error-container text-on-error-container text-[10px] px-2 py-0.5 rounded-full font-bold">
              Ends Today
            </span>
          </div>
          <button
            onClick={() => onNavigate('categories')}
            className="text-xs font-bold text-primary hover:underline"
          >
            View All
          </button>
        </div>

        <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar py-1">
          {/* Flash Item 1: Bayer Belt Expert */}
          <div className="w-64 bg-surface-container-lowest rounded-xl p-3 shadow-xs border border-surface-container-high/60 shrink-0 flex flex-col justify-between">
            <div
              onClick={() => onSelectProduct(bayerProduct)}
              className="cursor-pointer"
            >
              <div className="relative w-full h-36 rounded-lg overflow-hidden bg-surface-container-low mb-2.5 flex items-center justify-center">
                <img
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                  alt="Bayer Belt Expert"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCnx-UODXV1IgX5PH2MPcwt6FTP2-_cfUsCnAM22cdJL3Mt9kaFMliUgjahJj3wgpFrMpS98NbFiVFGaZHg0h038p6hRp4DEr-JonFchlQbIyVSzcN1j59uaIGx-RffP3c-MsN0YVDcKfrFrZ4NsO8lxdZm1oOfo4O-fS8Bp1gLd0VEasig8_XE9K1Y9MpocK8qTuzGjcX0NFPzjB3H4lv3jE9pW91bEbevf_pLaO3s3InlMA5FEF2hQ"
                />
                <span className="absolute top-2 left-2 bg-error text-on-error text-[10px] font-bold px-1.5 py-0.5 rounded">
                  20% OFF
                </span>
                <div className="absolute bottom-2 left-2 bg-surface-container-lowest/90 backdrop-blur-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span
                    className="material-symbols-outlined text-[13px] text-tertiary-container"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="text-[10px] font-bold text-on-surface">4.8</span>
                  <span className="text-[9px] text-outline">(1.2k)</span>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-1">
                <span className="bg-secondary-fixed/40 text-on-secondary-fixed-variant text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  Cotton, Chilli
                </span>
              </div>
              <h4 className="font-bold text-sm text-on-surface leading-tight line-clamp-1">
                Bayer Belt Expert (100ml)
              </h4>
              <p className="text-xs text-outline mt-0.5">Target: Bollworm, Thrips</p>
            </div>
            <div className="pt-2 mt-2 border-t border-surface-container-high/60 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="font-bold text-base text-primary">₹480</span>
                  <span className="text-xs text-outline line-through">₹600</span>
                </div>
                <span className="text-[10px] text-outline">₹4.80/ml</span>
              </div>
              <button
                className={`h-8 px-3 rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs active:scale-95 transition-all ${
                  addedIds[bayerProduct.id]
                    ? 'bg-secondary text-on-secondary'
                    : 'bg-primary text-on-primary hover:bg-primary-container'
                }`}
                onClick={() => handleAddClick(bayerProduct, '100 ml')}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {addedIds[bayerProduct.id] ? 'check' : 'add_shopping_cart'}
                </span>
                {addedIds[bayerProduct.id] ? 'Added' : 'Add'}
              </button>
            </div>
          </div>

          {/* Flash Item 2: Mahyco Tomato */}
          <div className="w-64 bg-surface-container-lowest rounded-xl p-3 shadow-xs border border-surface-container-high/60 shrink-0 flex flex-col justify-between">
            <div
              onClick={() => onSelectProduct(mahycoProduct)}
              className="cursor-pointer"
            >
              <div className="relative w-full h-36 rounded-lg overflow-hidden bg-surface-container-low mb-2.5 flex items-center justify-center">
                <img
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                  alt="Mahyco Tomato Seeds"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4QXvOKIyxtev1B2fudcjxnnmjbDQ0_rEfUcPbixhYtnV8YTuCPHbmzUo7nHRI9eVJkfmJVbjYr3jVDqyUROXUd7yBp5gVJ0WT0yV6zf1H0YQ_6Z08UYIojiuU2l4WLAaR-M1w7VltjY3EkG-fwbfvpjrlr9vBqO6h-5CyTPGYCZWUgJQfsvTbU6sD7bPX47vVzAhaIgLe7RPTJBGKCdblhY8fWzLwrj5YxUHTnS6qhppgUxYXyRWh0w"
                />
                <span className="absolute top-2 left-2 bg-error text-on-error text-[10px] font-bold px-1.5 py-0.5 rounded">
                  20% OFF
                </span>
                <div className="absolute bottom-2 left-2 bg-surface-container-lowest/90 backdrop-blur-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span
                    className="material-symbols-outlined text-[13px] text-tertiary-container"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="text-[10px] font-bold text-on-surface">4.9</span>
                  <span className="text-[9px] text-outline">(840)</span>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-1">
                <span className="bg-secondary-fixed/40 text-on-secondary-fixed-variant text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  High Yield
                </span>
              </div>
              <h4 className="font-bold text-sm text-on-surface leading-tight line-clamp-1">
                Mahyco Hybrid Tomato (10g)
              </h4>
              <p className="text-xs text-outline mt-0.5">Germination: 92% Certified</p>
            </div>
            <div className="pt-2 mt-2 border-t border-surface-container-high/60 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="font-bold text-base text-primary">₹320</span>
                  <span className="text-xs text-outline line-through">₹400</span>
                </div>
                <span className="text-[10px] text-outline">₹32.00/g</span>
              </div>
              <button
                className={`h-8 px-3 rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs active:scale-95 transition-all ${
                  addedIds[mahycoProduct.id]
                    ? 'bg-secondary text-on-secondary'
                    : 'bg-primary text-on-primary hover:bg-primary-container'
                }`}
                onClick={() => handleAddClick(mahycoProduct, '10g packet')}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {addedIds[mahycoProduct.id] ? 'check' : 'add_shopping_cart'}
                </span>
                {addedIds[mahycoProduct.id] ? 'Added' : 'Add'}
              </button>
            </div>
          </div>

          {/* Flash Item 3: IFFCO NPK */}
          <div className="w-64 bg-surface-container-lowest rounded-xl p-3 shadow-xs border border-surface-container-high/60 shrink-0 flex flex-col justify-between">
            <div
              onClick={() => onSelectProduct(iffcoProduct)}
              className="cursor-pointer"
            >
              <div className="relative w-full h-36 rounded-lg overflow-hidden bg-surface-container-low mb-2.5 flex items-center justify-center">
                <img
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                  alt="IFFCO NPK"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCn5C_IfmgZOU5raXNko5eaiwxUfjgY4gTkugGRay2TXapJGM2m-hXYqw-LcuVXMhOlvHAmiUX8d-ft9hyLRO2uO6UqHxq9fPz5eq8xiyxH-naSAU_KJw7dPvFQjLZAFPfmjFT2AcQwqC2U9es1kgVppUfpoKCsLnBM8ebLc7FcakJDRvHQSb0Drom1ceRmlEboPCDnYdC8CcgJJbkHyU65hPTAWPzXAwZfMpduZeVN2Tv36WnWBeK-Ew"
                />
                <span className="absolute top-2 left-2 bg-error text-on-error text-[10px] font-bold px-1.5 py-0.5 rounded">
                  21% OFF
                </span>
                <div className="absolute bottom-2 left-2 bg-surface-container-lowest/90 backdrop-blur-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span
                    className="material-symbols-outlined text-[13px] text-tertiary-container"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="text-[10px] font-bold text-on-surface">4.7</span>
                  <span className="text-[9px] text-outline">(2.4k)</span>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-1">
                <span className="bg-secondary-fixed/40 text-on-secondary-fixed-variant text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  Organic Grade
                </span>
              </div>
              <h4 className="font-bold text-sm text-on-surface leading-tight line-clamp-1">
                IFFCO Soluble NPK 19:19:19
              </h4>
              <p className="text-xs text-outline mt-0.5">Foliar &amp; Drip Fertigation</p>
            </div>
            <div className="pt-2 mt-2 border-t border-surface-container-high/60 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="font-bold text-base text-primary">₹165</span>
                  <span className="text-xs text-outline line-through">₹210</span>
                </div>
                <span className="text-[10px] text-outline">₹165.00/kg</span>
              </div>
              <button
                className={`h-8 px-3 rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs active:scale-95 transition-all ${
                  addedIds[iffcoProduct.id]
                    ? 'bg-secondary text-on-secondary'
                    : 'bg-primary text-on-primary hover:bg-primary-container'
                }`}
                onClick={() => handleAddClick(iffcoProduct, '1kg pack')}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {addedIds[iffcoProduct.id] ? 'check' : 'add_shopping_cart'}
                </span>
                {addedIds[iffcoProduct.id] ? 'Added' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Target by Your Crop Filter Strip */}
      <div className="flex flex-col gap-2 px-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-on-surface">Target by Your Crop</h3>
          <span className="text-xs text-outline">Customized Dosage</span>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {CROP_FILTERS.map((crop) => {
            const isSelected = selectedCrop === crop.id;
            return (
              <button
                key={crop.id}
                onClick={() => {
                  setSelectedCrop(crop.id);
                  onFilterByCrop(crop.name);
                  onNavigate('categories');
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shadow-xs flex items-center gap-1.5 transition-all ${
                  isSelected
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-low border border-surface-container-high/70'
                }`}
              >
                {crop.id !== 'all' && (
                  <span className={`w-2 h-2 rounded-full ${crop.color}`}></span>
                )}
                {crop.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Best Sellers & Verified Agro-Chemicals 2-Column Grid */}
      <div className="flex flex-col gap-2 px-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-on-surface">Verified Agro-Inputs</h3>
            <p className="text-xs text-outline">100% Brand Certified &amp; Batch Tested</p>
          </div>
          <div className="flex items-center gap-1 text-primary">
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
            <span className="text-[11px] font-bold">Authorized</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          {/* Grid Card 1: Amistar Top Fungicide */}
          <div className="bg-surface-container-lowest rounded-xl p-2.5 shadow-xs border border-surface-container-high/60 flex flex-col justify-between">
            <div>
              <div
                onClick={() => onSelectProduct(amistarProduct)}
                className="relative w-full h-32 rounded-lg overflow-hidden bg-surface-container-low mb-2 cursor-pointer flex items-center justify-center"
              >
                <img
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                  alt="Syngenta Amistar Top"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYpFTVh9kW0VX77sQJUJwIh_-rPpVGSGhSzpscRNmggKwpQ-_WhzFio8cKVN3aIVkNpd_qBHnPQBPjmrP7zx2fdB5HRIz2VpkkRT-Mz3FNC3DIJl90BrSRiseTHpPHQTuerQXa2aTc9wcsODH7kw0CM9mBF8VFGbSODM3OjY3zF6xm6nTVEC31g22YEplzh-dldGvd54u3_b57BgyxxTUDiJ_9MnSKoURMNc2Tfk3wgrJ85m4wIwxi4g"
                />
                <div className="absolute top-1.5 left-1.5 bg-secondary-fixed text-on-secondary-fixed-variant text-[10px] px-1.5 py-0.5 rounded font-bold">
                  Syngenta
                </div>
                <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-surface-container-lowest/80 backdrop-blur-xs flex items-center justify-center text-primary">
                  <span
                    className="material-symbols-outlined text-[14px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-1">
                <span className="bg-surface-container-low text-[10px] text-on-surface-variant px-1 rounded">
                  Wheat
                </span>
                <span className="bg-surface-container-low text-[10px] text-on-surface-variant px-1 rounded">
                  Paddy
                </span>
              </div>
              <h4
                onClick={() => onSelectProduct(amistarProduct)}
                className="font-bold text-xs text-on-surface leading-snug line-clamp-1 cursor-pointer hover:text-primary"
              >
                Amistar Top Fungicide
              </h4>
              <p className="text-[11px] text-outline line-clamp-1">Azoxystrobin + Difenoconazole</p>
              {/* Pack selector chips */}
              <div className="flex items-center gap-1 mt-2">
                {['250ml', '500ml', '1L'].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setAmistarPack(sz)}
                    className={`px-1.5 py-0.5 rounded text-[10px] transition-colors ${
                      amistarPack === sz
                        ? 'bg-primary text-on-primary font-bold'
                        : 'bg-surface-container-low text-on-surface-variant'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
            <div className="pt-3 mt-2 flex flex-col gap-2 border-t border-surface-container-high/40">
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-base text-primary">₹820</span>
                <span className="text-xs text-outline line-through">₹950</span>
              </div>
              <button
                onClick={() => handleAddClick(amistarProduct, amistarPack)}
                className="w-full h-8 rounded-lg bg-surface-container-low text-primary hover:bg-primary hover:text-on-primary text-xs font-bold flex items-center justify-center gap-1 transition-colors active:scale-95"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {addedIds[amistarProduct.id] ? 'check' : 'shopping_bag'}
                </span>
                {addedIds[amistarProduct.id] ? 'Added' : 'Add to Cart'}
              </button>
            </div>
          </div>

          {/* Grid Card 2: Dhanzyme Gold Bio-Stimulant */}
          <div className="bg-surface-container-lowest rounded-xl p-2.5 shadow-xs border border-surface-container-high/60 flex flex-col justify-between">
            <div>
              <div
                onClick={() => onSelectProduct(dhanzymeProduct)}
                className="relative w-full h-32 rounded-lg overflow-hidden bg-surface-container-low mb-2 cursor-pointer flex items-center justify-center"
              >
                <img
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                  alt="Dhanzyme Gold"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFFhrqypnN8X8CQhK-POtlfYYK22OlXFSxKp90q6L4jHKFL2Rw0iNZD2BVKM_mlHngUMilCuWDmQgPq5gD5SvyTkr-rGBM_KDIhZ3FY5dzp8V25jplf5hLOK1QxQwkEIMHqlMAoxXcxaFdNENhR4PSKnA983gfUenel8qvcqeKzJoHbNbZOP3fwQi9xt39lcoemVrLna-Y5TjwQ5iNFoWGcdccU9mWpyPdYEoJpF6Cwp_lD9SusFQ-Qg"
                />
                <div className="absolute top-1.5 left-1.5 bg-secondary-fixed text-on-secondary-fixed-variant text-[10px] px-1.5 py-0.5 rounded font-bold">
                  Dhanuka
                </div>
                <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-surface-container-lowest/80 backdrop-blur-xs flex items-center justify-center text-primary">
                  <span
                    className="material-symbols-outlined text-[14px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-1">
                <span className="bg-surface-container-low text-[10px] text-on-surface-variant px-1 rounded">
                  All Crops
                </span>
                <span className="bg-surface-container-low text-[10px] text-on-surface-variant px-1 rounded">
                  Bio
                </span>
              </div>
              <h4
                onClick={() => onSelectProduct(dhanzymeProduct)}
                className="font-bold text-xs text-on-surface leading-snug line-clamp-1 cursor-pointer hover:text-primary"
              >
                Dhanzyme Gold Bio-Stimulant
              </h4>
              <p className="text-[11px] text-outline line-clamp-1">Seaweed Organic Extract</p>
              {/* Pack selector chips */}
              <div className="flex items-center gap-1 mt-2">
                {['1kg', '4kg', '10kg'].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setDhanzymePack(sz)}
                    className={`px-1.5 py-0.5 rounded text-[10px] transition-colors ${
                      dhanzymePack === sz
                        ? 'bg-primary text-on-primary font-bold'
                        : 'bg-surface-container-low text-on-surface-variant'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
            <div className="pt-3 mt-2 flex flex-col gap-2 border-t border-surface-container-high/40">
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-base text-primary">₹440</span>
                <span className="text-xs text-outline line-through">₹520</span>
              </div>
              <button
                onClick={() => handleAddClick(dhanzymeProduct, dhanzymePack)}
                className="w-full h-8 rounded-lg bg-surface-container-low text-primary hover:bg-primary hover:text-on-primary text-xs font-bold flex items-center justify-center gap-1 transition-colors active:scale-95"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {addedIds[dhanzymeProduct.id] ? 'check' : 'shopping_bag'}
                </span>
                {addedIds[dhanzymeProduct.id] ? 'Added' : 'Add to Cart'}
              </button>
            </div>
          </div>

          {/* Grid Card 3: 16L Battery Farm Sprayer */}
          <div className="bg-surface-container-lowest rounded-xl p-2.5 shadow-xs border border-surface-container-high/60 flex flex-col justify-between">
            <div>
              <div
                onClick={() => onSelectProduct(neptuneProduct)}
                className="relative w-full h-32 rounded-lg overflow-hidden bg-surface-container-low mb-2 cursor-pointer flex items-center justify-center"
              >
                <img
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                  alt="Neptune Sprayer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkoGmiI6eTPIbPudhTJJ8fg8Mn65eKeJ2nBgFP9z5kTE01ZfK_BWYi2FeOKpHYVyRpMopxJ54768syQqmb2roWVkvLZkqebjzZ1SAeL8cBsM7d7gFRVmic4u5ICNvOpl0VDVITs7AJyxjcXiX7MAaJM09o_S9OJ9AM5bx0GdQc0JJSquumcQgtsx1z0tu5BzZvFRuJuFMrY7afDmQlwG6eMOG9UoAYkB2uTiX5sNQdOWoCU0VjCYuGcg"
                />
                <div className="absolute top-1.5 left-1.5 bg-secondary-fixed text-on-secondary-fixed-variant text-[10px] px-1.5 py-0.5 rounded font-bold">
                  Neptune
                </div>
                <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-surface-container-lowest/80 backdrop-blur-xs flex items-center justify-center text-primary">
                  <span
                    className="material-symbols-outlined text-[14px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-1">
                <span className="bg-surface-container-low text-[10px] text-on-surface-variant px-1 rounded">
                  Sprayer
                </span>
                <span className="bg-surface-container-low text-[10px] text-on-surface-variant px-1 rounded">
                  12V/12Ah
                </span>
              </div>
              <h4
                onClick={() => onSelectProduct(neptuneProduct)}
                className="font-bold text-xs text-on-surface leading-snug line-clamp-1 cursor-pointer hover:text-primary"
              >
                16L Battery Farm Sprayer
              </h4>
              <p className="text-[11px] text-outline line-clamp-1">6-hour continuous spray</p>
              {/* Pack selector chips */}
              <div className="flex items-center gap-1 mt-2">
                <span className="px-1.5 py-0.5 rounded bg-primary text-on-primary text-[10px] font-bold">
                  16L Standard
                </span>
              </div>
            </div>
            <div className="pt-3 mt-2 flex flex-col gap-2 border-t border-surface-container-high/40">
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-base text-primary">₹2,190</span>
                <span className="text-xs text-outline line-through">₹2,800</span>
              </div>
              <button
                onClick={() => handleAddClick(neptuneProduct, neptunePack)}
                className="w-full h-8 rounded-lg bg-surface-container-low text-primary hover:bg-primary hover:text-on-primary text-xs font-bold flex items-center justify-center gap-1 transition-colors active:scale-95"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {addedIds[neptuneProduct.id] ? 'check' : 'shopping_bag'}
                </span>
                {addedIds[neptuneProduct.id] ? 'Added' : 'Add to Cart'}
              </button>
            </div>
          </div>

          {/* Grid Card 4: FMC Coragen */}
          <div className="bg-surface-container-lowest rounded-xl p-2.5 shadow-xs border border-surface-container-high/60 flex flex-col justify-between">
            <div>
              <div
                onClick={() => onSelectProduct(coragenProduct)}
                className="relative w-full h-32 rounded-lg overflow-hidden bg-surface-container-low mb-2 cursor-pointer flex items-center justify-center"
              >
                <img
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                  alt="Coragen"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRreBKvsbvSpph8x4c6IO0xdR09QBuxw2Qkwe72SAQmMVxc80n5UTgwh06stG5qzM1Yf9q3m8A18oJilj-RVVemm7_wdkwm-B4IioLsguLg_Hwt96pVI39F2Snbclk5mAKpwgLgNkzFW54-CIkCE5wEEh8ZGDjjQNs_rHHWgn_Fg9LEcJAS4KMQmNgZdaV3sXbMb4uAUwXRw7TeQhK8MmwSIRFhiDCzBUx_yVnicN9zAiJ2JMajV1KFQ"
                />
                <div className="absolute top-1.5 left-1.5 bg-secondary-fixed text-on-secondary-fixed-variant text-[10px] px-1.5 py-0.5 rounded font-bold">
                  FMC India
                </div>
                <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-surface-container-lowest/80 backdrop-blur-xs flex items-center justify-center text-primary">
                  <span
                    className="material-symbols-outlined text-[14px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-1">
                <span className="bg-surface-container-low text-[10px] text-on-surface-variant px-1 rounded">
                  Sugarcane
                </span>
                <span className="bg-surface-container-low text-[10px] text-on-surface-variant px-1 rounded">
                  Corn
                </span>
              </div>
              <h4
                onClick={() => onSelectProduct(coragenProduct)}
                className="font-bold text-xs text-on-surface leading-snug line-clamp-1 cursor-pointer hover:text-primary"
              >
                Coragen Rynaxypyr (60ml)
              </h4>
              <p className="text-[11px] text-outline line-clamp-1">Long-duration Borer defense</p>
              {/* Pack selector chips */}
              <div className="flex items-center gap-1 mt-2">
                {['60ml', '150ml'].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setCoragenPack(sz)}
                    className={`px-1.5 py-0.5 rounded text-[10px] transition-colors ${
                      coragenPack === sz
                        ? 'bg-primary text-on-primary font-bold'
                        : 'bg-surface-container-low text-on-surface-variant'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
            <div className="pt-3 mt-2 flex flex-col gap-2 border-t border-surface-container-high/40">
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-base text-primary">₹790</span>
                <span className="text-xs text-outline line-through">₹890</span>
              </div>
              <button
                onClick={() => handleAddClick(coragenProduct, coragenPack)}
                className="w-full h-8 rounded-lg bg-surface-container-low text-primary hover:bg-primary hover:text-on-primary text-xs font-bold flex items-center justify-center gap-1 transition-colors active:scale-95"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {addedIds[coragenProduct.id] ? 'check' : 'shopping_bag'}
                </span>
                {addedIds[coragenProduct.id] ? 'Added' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Kisan Advisory Free Consultation Strip */}
      <div className="px-4">
        <div className="bg-surface-container-low rounded-xl p-3.5 flex items-center justify-between gap-3 shadow-xs border border-surface-container-high/60">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-on-primary shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[24px]">support_agent</span>
            </div>
            <div>
              <h4 className="font-bold text-sm text-on-surface">Have crop disease doubts?</h4>
              <p className="text-xs text-outline">Talk to an Agronomist Expert for free.</p>
            </div>
          </div>
          <button
            onClick={onOpenCallExpert}
            className="h-9 px-3.5 bg-secondary text-on-secondary hover:bg-primary text-xs font-bold rounded-lg shadow-xs shrink-0 flex items-center gap-1 transition-all active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">call</span>
            Call
          </button>
        </div>
      </div>
    </div>
  );
};
