import React, { useState, useMemo } from 'react';
import { Product } from '../types';

interface CategoriesScreenProps {
  products: Product[];
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product, packSize?: string, qty?: number) => void;
  onNavigate: (screen: string) => void;
  onOpenCompare: () => void;
  onOpenCallExpert: () => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  initialSearchQuery?: string;
  initialCategory?: string;
  initialCrop?: string;
  showWishlistOnly?: boolean;
  onClearWishlistFilter?: () => void;
  onOpenVoiceSearch?: () => void;
  onOpenQrScanner?: () => void;
}

export const CategoriesScreen: React.FC<CategoriesScreenProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onNavigate,
  onOpenCompare,
  onOpenCallExpert,
  wishlistIds,
  onToggleWishlist,
  initialSearchQuery = '',
  initialCategory = 'All',
  initialCrop = '',
  showWishlistOnly = false,
  onClearWishlistFilter,
  onOpenVoiceSearch,
  onOpenQrScanner
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeSubcategory, setActiveSubcategory] = useState('All');
  const [selectedCrop, setSelectedCrop] = useState(initialCrop);
  const [selectedSort, setSelectedSort] = useState('Best Match');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [showComparePill, setShowComparePill] = useState(true);
  const [wishlistFilter, setWishlistFilter] = useState(showWishlistOnly);

  // Active filter criteria
  const [filterInStockOnly, setFilterInStockOnly] = useState(false);
  const [filterOrganicOnly, setFilterOrganicOnly] = useState(false);
  const [filterOemDirectOnly, setFilterOemDirectOnly] = useState(false);
  const [filterPriceRange, setFilterPriceRange] = useState<string>('all'); // 'all', 'under-500', '500-1500', 'above-1500'

  // Sync if initial props change
  React.useEffect(() => {
    if (initialSearchQuery) setSearchQuery(initialSearchQuery);
  }, [initialSearchQuery]);

  React.useEffect(() => {
    if (initialCategory) setActiveCategory(initialCategory);
  }, [initialCategory]);

  React.useEffect(() => {
    if (initialCrop) setSelectedCrop(initialCrop);
  }, [initialCrop]);

  React.useEffect(() => {
    setWishlistFilter(showWishlistOnly);
  }, [showWishlistOnly]);

  // Subcategory tabs based on active category
  const subcategories = useMemo(() => {
    return [
      'All',
      'Organic Bio-Fungicides',
      'Chemical Formulations',
      'Bio-stimulants',
      'Bulk Packs (5L+)'
    ];
  }, []);

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Wishlist only filter
        if (wishlistFilter && !wishlistIds.includes(p.id)) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchBrand = p.brand.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchTech = p.technicalName?.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchCrops = p.crops?.some((c) => c.toLowerCase().includes(q));
          if (!matchName && !matchBrand && !matchDesc && !matchTech && !matchCat && !matchCrops) {
            return false;
          }
        }

        // Category filter
        if (activeCategory && activeCategory !== 'All' && activeCategory !== 'all') {
          const catLower = activeCategory.toLowerCase();
          const pCatLower = p.category.toLowerCase();
          if (catLower.includes('seed') && !pCatLower.includes('seed')) return false;
          if (catLower.includes('protect') && !pCatLower.includes('protect')) return false;
          if (catLower.includes('nutrit') && !pCatLower.includes('nutrit')) return false;
          if (catLower.includes('spray') && !pCatLower.includes('spray') && !pCatLower.includes('drip')) return false;
          if (catLower.includes('animal') && !pCatLower.includes('feed') && !pCatLower.includes('animal')) return false;
        }

        // Subcategory chip filter
        if (activeSubcategory && activeSubcategory !== 'All') {
          if (activeSubcategory === 'Organic Bio-Fungicides') {
            const isBio = p.badge?.toLowerCase().includes('bio') || p.tags?.some((t) => t.toLowerCase().includes('bio')) || p.description.toLowerCase().includes('bio');
            if (!isBio) return false;
          } else if (activeSubcategory === 'Chemical Formulations') {
            const isBio = p.badge?.toLowerCase().includes('bio') || p.tags?.some((t) => t.toLowerCase().includes('bio'));
            if (isBio) return false;
          } else if (activeSubcategory === 'Bio-stimulants') {
            const isStimulant = p.category.toLowerCase().includes('nutrition') || p.tags?.some((t) => t.toLowerCase().includes('growth') || t.toLowerCase().includes('stimulant')) || p.name.toLowerCase().includes('dhanzyme');
            if (!isStimulant) return false;
          } else if (activeSubcategory === 'Bulk Packs (5L+)') {
            const packs = p.packSizes || p.packs || [];
            const hasBulk = packs.some((pk) => pk.size.includes('5') || pk.size.includes('10') || pk.size.includes('50') || pk.size.includes('1 L') || pk.size.includes('1L'));
            if (!hasBulk) return false;
          }
        }

        // Crop filter
        if (selectedCrop && selectedCrop !== 'all' && selectedCrop !== 'All Crops') {
          const cropQ = selectedCrop.toLowerCase();
          const cropsList = p.crops || [];
          const matchCrop = cropsList.some((c) => c.toLowerCase().includes(cropQ));
          if (!matchCrop && !p.description.toLowerCase().includes(cropQ)) {
            return false;
          }
        }

        // Stock filter
        if (filterInStockOnly && p.inStock === false) {
          return false;
        }

        // Organic filter
        if (filterOrganicOnly) {
          const isOrg = p.badge?.toLowerCase().includes('bio') || p.tags?.some((t) => t.toLowerCase().includes('bio') || t.toLowerCase().includes('organic'));
          if (!isOrg) return false;
        }

        // OEM Direct filter
        if (filterOemDirectOnly && !p.isOemDirect) {
          return false;
        }

        // Price range filter
        if (filterPriceRange === 'under-500' && p.price >= 500) return false;
        if (filterPriceRange === '500-1500' && (p.price < 500 || p.price > 1500)) return false;
        if (filterPriceRange === 'above-1500' && p.price <= 1500) return false;

        return true;
      })
      .sort((a, b) => {
        if (selectedSort === 'Price: Low to High') {
          return a.price - b.price;
        }
        if (selectedSort === 'Price: High to Low') {
          return b.price - a.price;
        }
        if (selectedSort === 'Customer Rating') {
          return (b.rating || 4.5) - (a.rating || 4.5);
        }
        if (selectedSort === 'Highest Discount') {
          const discA = a.mrp ? Math.round(((a.mrp - a.price) / a.mrp) * 100) : 0;
          const discB = b.mrp ? Math.round(((b.mrp - b.price) / b.mrp) * 100) : 0;
          return discB - discA;
        }
        // Best Match (Default)
        return (b.rating || 4.5) - (a.rating || 4.5);
      });
  }, [
    products,
    wishlistFilter,
    wishlistIds,
    searchQuery,
    activeCategory,
    activeSubcategory,
    selectedCrop,
    filterInStockOnly,
    filterOrganicOnly,
    filterOemDirectOnly,
    filterPriceRange,
    selectedSort
  ]);

  // Active filter badge count for tune button
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCrop && selectedCrop !== 'all' && selectedCrop !== 'All Crops') count++;
    if (filterInStockOnly) count++;
    if (filterOrganicOnly) count++;
    if (filterOemDirectOnly) count++;
    if (filterPriceRange !== 'all') count++;
    if (wishlistFilter) count++;
    return count;
  }, [selectedCrop, filterInStockOnly, filterOrganicOnly, filterOemDirectOnly, filterPriceRange, wishlistFilter]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setActiveCategory('All');
    setActiveSubcategory('All');
    setSelectedCrop('');
    setFilterInStockOnly(false);
    setFilterOrganicOnly(false);
    setFilterOemDirectOnly(false);
    setFilterPriceRange('all');
    setWishlistFilter(false);
    if (onClearWishlistFilter) onClearWishlistFilter();
  };

  return (
    <div className="flex flex-col w-full pb-32 pt-24 max-w-screen-md mx-auto px-4 min-w-0">
      {/* Header with Title & Back Button */}
      <section className="pt-2 pb-2 bg-surface flex flex-col gap-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <button
                aria-label="Go back"
                onClick={() => onNavigate('home')}
                className="w-8 h-8 -ml-1 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors shrink-0"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              </button>
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider truncate">
                {wishlistFilter
                  ? 'Saved Favorites'
                  : activeCategory !== 'All'
                  ? activeCategory
                  : 'Agro-Inputs & Formulations'}
              </span>
            </div>
            <h1 className="text-xl font-bold text-on-surface truncate">
              {wishlistFilter
                ? 'My Saved Wishlist'
                : activeCategory !== 'All'
                ? `${activeCategory} Catalog`
                : 'Crop Protection & Formulations'}
            </h1>
            <p className="text-xs text-on-surface-variant">
              {filteredProducts.length} verified agro-formulations found
            </p>
          </div>

          {/* Quick Clear / All toggle */}
          {wishlistFilter && (
            <button
              onClick={() => {
                setWishlistFilter(false);
                if (onClearWishlistFilter) onClearWishlistFilter();
              }}
              className="px-3 py-1.5 rounded-lg bg-surface-container-low text-xs font-bold text-primary border border-surface-container-high hover:bg-surface-container transition-colors shrink-0"
            >
              Show All
            </button>
          )}
        </div>

        {/* Integrated Live Search Bar with Voice-to-Text */}
        <div className="relative w-full flex items-center">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search brands (Syngenta, Bayer), technicals, crops..."
            className="w-full bg-surface-container-low pl-9 pr-24 py-2 rounded-xl text-xs text-on-surface placeholder:text-outline border border-surface-container-high/60 focus:outline-none focus:border-primary transition-colors"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="w-5 h-5 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
            {onOpenQrScanner && (
              <button
                type="button"
                onClick={onOpenQrScanner}
                title="Scan Product QR & Hologram Label"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-primary hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
              </button>
            )}
            <button
              type="button"
              onClick={onOpenVoiceSearch}
              title="Voice Search (Search by speaking)"
              className="w-7 h-7 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">mic</span>
            </button>
          </div>
        </div>

        {/* Active Filter Tags Micro-Rail */}
        {(activeFiltersCount > 0 || searchQuery) && (
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-4 px-4">
            {wishlistFilter && (
              <div className="inline-flex items-center gap-1 bg-error-container/40 text-on-error-container px-2.5 py-1 rounded-full shrink-0 text-xs font-semibold">
                <span className="material-symbols-outlined text-[13px] text-error">favorite</span>
                <span>Wishlist ({wishlistIds.length})</span>
                <button
                  onClick={() => {
                    setWishlistFilter(false);
                    if (onClearWishlistFilter) onClearWishlistFilter();
                  }}
                  className="hover:opacity-75 transition-opacity ml-0.5"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>
            )}
            {searchQuery && (
              <div className="inline-flex items-center gap-1 bg-secondary-container/40 text-on-secondary-container px-2.5 py-1 rounded-full shrink-0 text-xs font-semibold">
                <span>"{searchQuery}"</span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="hover:opacity-75 transition-opacity ml-0.5"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>
            )}
            {selectedCrop && selectedCrop !== 'all' && (
              <div className="inline-flex items-center gap-1 bg-primary-container/40 text-on-primary-container px-2.5 py-1 rounded-full shrink-0 text-xs font-semibold">
                <span>Crop: {selectedCrop}</span>
                <button
                  onClick={() => setSelectedCrop('')}
                  className="hover:opacity-75 transition-opacity ml-0.5"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>
            )}
            {filterInStockOnly && (
              <div className="inline-flex items-center gap-1 bg-secondary-container/40 text-on-secondary-container px-2.5 py-1 rounded-full shrink-0 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
                <span>In Stock Only</span>
                <button
                  onClick={() => setFilterInStockOnly(false)}
                  className="hover:opacity-75 transition-opacity ml-0.5"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>
            )}
            {filterOrganicOnly && (
              <div className="inline-flex items-center gap-1 bg-secondary-container/40 text-on-secondary-container px-2.5 py-1 rounded-full shrink-0 text-xs font-semibold">
                <span>Organic Certified</span>
                <button
                  onClick={() => setFilterOrganicOnly(false)}
                  className="hover:opacity-75 transition-opacity ml-0.5"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>
            )}
            {filterOemDirectOnly && (
              <div className="inline-flex items-center gap-1 bg-secondary-container/40 text-on-secondary-container px-2.5 py-1 rounded-full shrink-0 text-xs font-semibold">
                <span>OEM Direct</span>
                <button
                  onClick={() => setFilterOemDirectOnly(false)}
                  className="hover:opacity-75 transition-opacity ml-0.5"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>
            )}
            {filterPriceRange !== 'all' && (
              <div className="inline-flex items-center gap-1 bg-secondary-container/40 text-on-secondary-container px-2.5 py-1 rounded-full shrink-0 text-xs font-semibold">
                <span>
                  {filterPriceRange === 'under-500'
                    ? 'Under ₹500'
                    : filterPriceRange === '500-1500'
                    ? '₹500 - ₹1,500'
                    : 'Above ₹1,500'}
                </span>
                <button
                  onClick={() => setFilterPriceRange('all')}
                  className="hover:opacity-75 transition-opacity ml-0.5"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>
            )}
            <button
              onClick={clearAllFilters}
              className="text-xs font-bold text-primary underline shrink-0 px-1 hover:text-primary-container"
            >
              Clear all
            </button>
          </div>
        )}
      </section>

      {/* Control Sticky Filter & Sort Bar */}
      <div className="sticky top-[76px] z-20 bg-surface/95 backdrop-blur-md -mx-4 px-4 py-2.5 shadow-xs border-y border-surface-container-high/60 mb-2">
        <div className="flex items-center justify-between gap-2">
          {/* Filters Toggle Button */}
          <button
            onClick={() => setShowFilterDrawer(true)}
            className="flex items-center gap-1.5 bg-surface-container-low px-3 py-1.5 rounded-lg text-on-surface hover:bg-surface-container transition-colors shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">tune</span>
            <span className="text-xs font-bold">Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-[10px] font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-2">
            {/* Sort Menu */}
            <div className="relative">
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="appearance-none bg-surface-container-low px-3 py-1.5 pr-7 rounded-lg text-xs font-semibold text-on-surface hover:bg-surface-container transition-colors shadow-xs focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              >
                <option>Best Match</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Customer Rating</option>
                <option>Highest Discount</option>
              </select>
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none">
                arrow_drop_down
              </span>
            </div>

            {/* Grid/List Toggle */}
            <button
              aria-label="Toggle grid layout"
              onClick={() => setViewMode((prev) => (prev === 'list' ? 'grid' : 'list'))}
              className={`w-8 h-8 flex items-center justify-center rounded-lg shadow-xs transition-colors ${
                viewMode === 'grid'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low text-on-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {viewMode === 'grid' ? 'grid_view' : 'view_agenda'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Quick Chips Horizontal Scroll */}
      <div className="-mx-4 px-4 py-2 overflow-x-auto no-scrollbar flex items-center gap-2 mb-2">
        {subcategories.map((chip) => {
          const isSelected = activeSubcategory === chip;
          return (
            <button
              key={chip}
              onClick={() => setActiveSubcategory(chip)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap shadow-xs transition-all ${
                isSelected
                  ? 'bg-primary text-on-primary font-bold'
                  : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container border border-surface-container-high/60'
              }`}
            >
              {chip}
            </button>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="bg-surface-container-lowest rounded-2xl p-8 text-center flex flex-col items-center gap-3 border border-surface-container-high/60 my-4 shadow-xs">
          <div className="w-14 h-14 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant">
            <span className="material-symbols-outlined text-[32px]">inventory_2</span>
          </div>
          <h3 className="font-bold text-base text-on-surface">No agro-inputs matched your search</h3>
          <p className="text-xs text-on-surface-variant max-w-xs">
            Try adjusting your search terms or reset filters to browse the full certified catalog.
          </p>
          <button
            onClick={clearAllFilters}
            className="px-4 py-2 bg-primary text-on-primary font-bold text-xs rounded-xl shadow-xs hover:bg-primary-container transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Main Product Listing Feed */}
      {viewMode === 'list' ? (
        <div className="flex flex-col gap-3.5">
          {filteredProducts.map((product) => (
            <ProductListCard
              key={product.id}
              product={product}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={() => onToggleWishlist(product.id)}
              onSelectProduct={() => onSelectProduct(product)}
              onAddToCart={(packSize, qty) => onAddToCart(product, packSize, qty)}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => (
            <ProductGridCard
              key={product.id}
              product={product}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={() => onToggleWishlist(product.id)}
              onSelectProduct={() => onSelectProduct(product)}
              onAddToCart={(packSize, qty) => onAddToCart(product, packSize, qty)}
            />
          ))}
        </div>
      )}

      {/* Verified Agronomist Assistance Prompt Banner */}
      <div className="bg-surface-container-high/70 rounded-xl p-3 flex items-center gap-3 border border-surface-container-highest mt-5">
        <div className="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-xs">
          <span className="material-symbols-outlined text-[24px]">support_agent</span>
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-sm font-bold text-on-surface">
            Unsure about dosage per acre?
          </span>
          <p className="text-xs text-on-surface-variant line-clamp-1">
            Chat with a certified Agronomist for tailored spray schedules.
          </p>
        </div>
        <button
          onClick={onOpenCallExpert}
          className="bg-surface-container-lowest text-primary px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 shadow-xs hover:bg-surface transition-colors"
        >
          Ask Expert
        </button>
      </div>

      {/* Floating Interactive Action Bar: Product Comparison */}
      {showComparePill && (
        <div className="fixed bottom-20 left-0 right-0 z-30 px-4 pointer-events-none flex justify-center">
          <div className="pointer-events-auto bg-inverse-surface/95 text-inverse-on-surface backdrop-blur-xl px-4 py-2 rounded-full shadow-2xl flex items-center gap-2.5 sm:gap-3 transition-transform duration-200 active:scale-98 border border-white/10 max-w-[calc(100vw-32px)]">
            <div className="flex items-center gap-1.5 min-w-0 truncate">
              <div className="relative flex -space-x-1.5 overflow-hidden shrink-0">
                <div className="w-5 h-5 rounded-full bg-surface-container-highest border border-inverse-surface flex items-center justify-center text-[9px] text-on-surface font-bold">
                  1
                </div>
                <div className="w-5 h-5 rounded-full bg-surface-container-highest border border-inverse-surface flex items-center justify-center text-[9px] text-on-surface font-bold">
                  2
                </div>
              </div>
              <span className="text-xs font-semibold text-inverse-on-surface truncate">
                2 Products to Compare
              </span>
            </div>
            <div className="h-4 w-px bg-outline-variant/40 shrink-0"></div>
            <button
              onClick={onOpenCompare}
              className="text-xs font-bold text-inverse-primary hover:underline flex items-center gap-1 shrink-0"
            >
              <span>Compare</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
            <button
              aria-label="Dismiss comparison pill"
              onClick={() => setShowComparePill(false)}
              className="w-5 h-5 rounded-full bg-surface-variant/20 flex items-center justify-center hover:bg-surface-variant/40 text-inverse-on-surface ml-0.5 shrink-0"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          </div>
        </div>
      )}

      {/* Filter Drawer Modal */}
      {showFilterDrawer && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-surface-container-lowest rounded-t-2xl sm:rounded-2xl w-full max-w-md p-5 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">tune</span>
                <h3 className="font-bold text-lg text-on-surface">Filter Agro-Inputs</h3>
              </div>
              <button
                onClick={() => setShowFilterDrawer(false)}
                className="w-8 h-8 rounded-full hover:bg-surface-container-low flex items-center justify-center text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="py-4 space-y-4">
              {/* Crop Filter */}
              <div>
                <h4 className="text-xs font-bold text-on-surface uppercase mb-2">Suitable Crop</h4>
                <div className="flex flex-wrap gap-1.5">
                  {['All Crops', 'Cotton', 'Paddy', 'Chilli', 'Soybean', 'Sugarcane', 'Tomato', 'Vegetables'].map(
                    (crop) => {
                      const isSelected =
                        crop === 'All Crops' ? !selectedCrop || selectedCrop === 'all' : selectedCrop.toLowerCase().includes(crop.toLowerCase());
                      return (
                        <button
                          key={crop}
                          onClick={() => {
                            if (crop === 'All Crops') {
                              setSelectedCrop('');
                            } else {
                              setSelectedCrop(isSelected ? '' : crop);
                            }
                          }}
                          className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                            isSelected
                              ? 'bg-primary text-on-primary'
                              : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                          }`}
                        >
                          {crop}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h4 className="text-xs font-bold text-on-surface uppercase mb-2">Price Budget</h4>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { label: 'Under ₹500', value: 'under-500' },
                    { label: '₹500 - ₹1.5k', value: '500-1500' },
                    { label: 'Above ₹1.5k', value: 'above-1500' }
                  ].map((p) => (
                    <button
                      key={p.value}
                      onClick={() => setFilterPriceRange((prev) => (prev === p.value ? 'all' : p.value))}
                      className={`py-1.5 px-2 rounded-lg text-xs font-semibold text-center transition-colors ${
                        filterPriceRange === p.value
                          ? 'bg-primary text-on-primary'
                          : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quality & Certifications */}
              <div>
                <h4 className="text-xs font-bold text-on-surface uppercase mb-2">Certification & Stock</h4>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center gap-2.5 cursor-pointer p-1.5 rounded-lg hover:bg-surface-container-low">
                    <input
                      type="checkbox"
                      checked={filterInStockOnly}
                      onChange={(e) => setFilterInStockOnly(e.target.checked)}
                      className="accent-primary w-4 h-4 rounded cursor-pointer"
                    />
                    <span className="text-on-surface font-medium">In Stock at Nashik / Pune Hub</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer p-1.5 rounded-lg hover:bg-surface-container-low">
                    <input
                      type="checkbox"
                      checked={filterOrganicOnly}
                      onChange={(e) => setFilterOrganicOnly(e.target.checked)}
                      className="accent-primary w-4 h-4 rounded cursor-pointer"
                    />
                    <span className="text-on-surface font-medium">100% Organic &amp; Bio Certified</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer p-1.5 rounded-lg hover:bg-surface-container-low">
                    <input
                      type="checkbox"
                      checked={filterOemDirectOnly}
                      onChange={(e) => setFilterOemDirectOnly(e.target.checked)}
                      className="accent-primary w-4 h-4 rounded cursor-pointer"
                    />
                    <span className="text-on-surface font-medium">OEM Direct Manufacturer Seal</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-surface-container-high flex gap-2">
              <button
                onClick={() => {
                  clearAllFilters();
                  setShowFilterDrawer(false);
                }}
                className="flex-1 py-2.5 rounded-lg border border-surface-container-high text-xs font-bold hover:bg-surface-container-low"
              >
                Reset All
              </button>
              <button
                onClick={() => setShowFilterDrawer(false)}
                className="flex-1 py-2.5 rounded-lg bg-primary text-on-primary text-xs font-bold hover:bg-primary-container"
              >
                Apply ({filteredProducts.length} Results)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// Product List Card Subcomponent
// ==========================================
interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onSelectProduct: () => void;
  onAddToCart: (packSize: string, qty: number) => void;
}

const ProductListCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
  onAddToCart
}) => {
  const packs = product.packSizes || product.packs || [
    { size: 'Standard', price: product.price, mrp: product.mrp || Math.round(product.price * 1.2) }
  ];

  const [selectedPack, setSelectedPack] = useState(packs[0]?.size || 'Standard');
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const currentPackObj = packs.find((p) => p.size === selectedPack) || packs[0];
  const price = currentPackObj.price;
  const mrp = currentPackObj.mrp || Math.round(price * 1.2);
  const discountPercent = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

  const handleAdd = () => {
    onAddToCart(selectedPack, qty);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <article className="bg-surface-container-lowest rounded-xl p-3.5 flex flex-col gap-3 shadow-xs border border-surface-container-high/70 relative overflow-hidden transition-all hover:border-primary/40">
      {/* Top action row with badges & wishlist - with plenty of space */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap min-w-0">
          {product.isOemDirect && (
            <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full text-[10px] uppercase font-bold flex items-center gap-1 shrink-0">
              <span className="material-symbols-outlined text-[12px]">verified</span> OEM Direct
            </span>
          )}
          {product.badge && (
            <span className="bg-primary-container/60 text-on-primary-container px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0">
              {product.badge}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist();
          }}
          className={`w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center transition-colors shrink-0 ${
            isWishlisted ? 'text-error' : 'text-on-surface-variant hover:text-error'
          }`}
        >
          <span
            className="material-symbols-outlined text-[18px]"
            style={isWishlisted ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            favorite
          </span>
        </button>
      </div>

      {/* Main product info */}
      <div onClick={onSelectProduct} className="flex gap-3 cursor-pointer">
        {/* Product Image */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-lg bg-surface-container-low overflow-hidden relative flex items-center justify-center p-1 border border-surface-container-high/50">
          <img
            className="w-full h-full object-contain"
            alt={product.name}
            src={product.image}
            loading="lazy"
          />
          <div className="absolute bottom-1 left-1 bg-surface-container-highest/90 backdrop-blur-xs text-on-surface px-1.5 py-0.5 rounded text-[9px] font-bold flex items-center gap-0.5">
            <span
              className="material-symbols-outlined text-[11px] text-tertiary-container"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span>{product.rating || 4.7}</span>
          </div>
        </div>

        {/* Title, Brand, Crops */}
        <div className="flex flex-col flex-1 min-w-0 justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-primary">
              <span className="text-[11px] font-bold uppercase tracking-wide truncate">
                {product.brand}
              </span>
              <span className="w-1 h-1 rounded-full bg-outline-variant shrink-0"></span>
              <span className="text-[11px] text-on-surface-variant truncate">
                {product.category}
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-on-surface leading-tight mt-0.5 line-clamp-2">
              {product.name}
            </h2>
            {product.technicalName && (
              <p className="text-xs text-on-surface-variant line-clamp-1 mt-0.5">
                {product.technicalName}
              </p>
            )}
          </div>

          {/* Suitable Crop Micro Tags */}
          {product.crops && product.crops.length > 0 && (
            <div className="flex items-center gap-1 mt-1.5 overflow-hidden flex-wrap">
              {product.crops.slice(0, 3).map((crop) => (
                <span
                  key={crop}
                  className="bg-surface-container-high text-on-surface px-1.5 py-0.5 rounded text-[10px] truncate"
                >
                  {crop}
                </span>
              ))}
              {product.crops.length > 3 && (
                <span className="text-[10px] text-on-surface-variant">
                  +{product.crops.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Stock Indicator */}
          <div className="flex items-center gap-1.5 mt-1">
            <span
              className={`w-2 h-2 rounded-full ${
                product.inStock !== false ? 'bg-primary animate-pulse' : 'bg-outline'
              }`}
            ></span>
            <span
              className={`text-[11px] font-semibold ${
                product.inStock !== false ? 'text-primary' : 'text-on-surface-variant'
              }`}
            >
              {product.inStock !== false ? 'In Stock · Rural Delivery 24h' : 'Available on backorder'}
            </span>
          </div>
        </div>
      </div>

      {/* Pack Size Interactive Selector Strip */}
      {packs.length > 1 && (
        <div className="flex flex-col gap-1 pt-1.5 border-t border-surface-container-high/40">
          <span className="text-[11px] text-on-surface-variant">Select Formulation Pack:</span>
          <div className="flex flex-wrap gap-1.5">
            {packs.map((p) => (
              <button
                key={p.size}
                onClick={() => setSelectedPack(p.size)}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                  selectedPack === p.size
                    ? 'bg-primary text-on-primary font-bold shadow-xs'
                    : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                }`}
              >
                {p.size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Pricing & Add to Cart Controls */}
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 pt-1.5 border-t border-surface-container-high/40">
        <div className="flex flex-col min-w-0">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-lg sm:text-xl font-bold text-on-surface">₹{price}</span>
            {mrp > price && (
              <span className="text-xs line-through text-outline">₹{mrp}</span>
            )}
            {discountPercent > 0 && (
              <span className="text-[11px] font-bold text-primary bg-secondary-container/40 px-1 rounded">
                -{discountPercent}%
              </span>
            )}
          </div>
          <span className="text-[10px] text-on-surface-variant truncate">
            Pack: {selectedPack}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Stepper Quantity Counter */}
          <div className="flex items-center bg-surface-container-low rounded-lg p-0.5 shadow-xs border border-surface-container-high">
            <button
              aria-label="Decrease quantity"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-surface-container rounded transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">remove</span>
            </button>
            <span className="w-6 text-center text-xs font-bold text-on-surface">
              {qty}
            </span>
            <button
              aria-label="Increase quantity"
              onClick={() => setQty((q) => q + 1)}
              className="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-surface-container rounded transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
            </button>
          </div>

          {/* Add CTA */}
          <button
            onClick={handleAdd}
            className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all active:scale-95 ${
              isAdded
                ? 'bg-secondary text-on-secondary'
                : 'bg-primary text-on-primary hover:bg-primary-container'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isAdded ? 'check' : 'add_shopping_cart'}
            </span>
            <span>{isAdded ? 'Added' : 'Add'}</span>
          </button>
        </div>
      </div>
    </article>
  );
};

// ==========================================
// Product Grid Card Subcomponent
// ==========================================
const ProductGridCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
  onAddToCart
}) => {
  const packs = product.packSizes || product.packs || [
    { size: 'Standard', price: product.price, mrp: product.mrp || Math.round(product.price * 1.2) }
  ];
  const [selectedPack] = useState(packs[0]?.size || 'Standard');
  const [isAdded, setIsAdded] = useState(false);

  const currentPackObj = packs.find((p) => p.size === selectedPack) || packs[0];
  const price = currentPackObj.price;
  const mrp = currentPackObj.mrp || Math.round(price * 1.2);
  const discountPercent = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

  const handleAdd = () => {
    onAddToCart(selectedPack, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <article className="bg-surface-container-lowest rounded-xl p-2.5 flex flex-col justify-between shadow-xs border border-surface-container-high/70 relative hover:border-primary/40 transition-all">
      {/* Wishlist Button */}
      <button
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        onClick={(e) => {
          e.stopPropagation();
          onToggleWishlist();
        }}
        className={`absolute top-2 right-2 w-7 h-7 rounded-full bg-surface-container-low/90 backdrop-blur-xs flex items-center justify-center transition-colors z-10 ${
          isWishlisted ? 'text-error' : 'text-on-surface-variant hover:text-error'
        }`}
      >
        <span
          className="material-symbols-outlined text-[16px]"
          style={isWishlisted ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          favorite
        </span>
      </button>

      <div onClick={onSelectProduct} className="flex flex-col gap-1.5 cursor-pointer">
        <div className="w-full aspect-square rounded-lg bg-surface-container-low overflow-hidden flex items-center justify-center relative p-1 border border-surface-container-high/50">
          <img
            className="w-full h-full object-contain"
            alt={product.name}
            src={product.image}
            loading="lazy"
          />
          {product.badge && (
            <span className="absolute bottom-1 left-1 bg-secondary-container/90 text-on-secondary-container px-1 py-0.5 rounded text-[9px] font-bold truncate max-w-[85%]">
              {product.badge}
            </span>
          )}
        </div>

        <span className="text-[10px] text-primary uppercase font-bold truncate">
          {product.brand}
        </span>
        <h3 className="text-xs font-bold text-on-surface line-clamp-1">{product.name}</h3>
        {product.technicalName && (
          <p className="text-[11px] text-on-surface-variant line-clamp-1">
            {product.technicalName}
          </p>
        )}

        <div className="flex items-center gap-1 text-[11px] text-on-surface-variant">
          <span
            className="material-symbols-outlined text-[13px] text-tertiary-container"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
          <span className="font-bold text-on-surface">{product.rating || 4.7}</span>
        </div>

        <div className="bg-surface-container-low px-1.5 py-0.5 rounded text-center text-[10px] text-on-surface font-medium truncate">
          {selectedPack}
        </div>
      </div>

      <div className="flex flex-col gap-1.5 mt-2 pt-2 border-t border-surface-container-high/40">
        <div className="flex items-baseline gap-1">
          <span className="text-sm sm:text-base font-bold text-on-surface">₹{price}</span>
          {mrp > price && (
            <span className="text-[10px] line-through text-outline">₹{mrp}</span>
          )}
          {discountPercent > 0 && (
            <span className="text-[10px] text-primary font-bold">-{discountPercent}%</span>
          )}
        </div>
        <button
          onClick={handleAdd}
          className={`w-full py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1 shadow-xs transition-colors active:scale-95 ${
            isAdded
              ? 'bg-secondary text-on-secondary'
              : 'bg-primary text-on-primary hover:bg-primary-container'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">
            {isAdded ? 'check' : 'add'}
          </span>
          <span>{isAdded ? 'Added' : 'Add'}</span>
        </button>
      </div>
    </article>
  );
};
