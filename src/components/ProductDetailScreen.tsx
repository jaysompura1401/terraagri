import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { generateQrDataUrl } from '../utils/qrVerifier';
import { PRODUCT_WHY_MAP } from '../data/agriAdvisoryData';

interface ProductDetailScreenProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (p: Product, packSize?: string, qty?: number) => void;
  onBuyNow: (p: Product, packSize?: string, qty?: number) => void;
  onOpenCallExpert: () => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onOpenQrScanner?: () => void;
  onOpenDosageCalculator?: (product: Product) => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  onBack,
  onAddToCart,
  onBuyNow,
  onOpenCallExpert,
  wishlistIds,
  onToggleWishlist,
  onOpenQrScanner,
  onOpenDosageCalculator
}) => {
  const availablePacks = product.packSizes || product.packs || [{ size: 'Standard', price: product.price, mrp: product.mrp }];
  const [selectedPack, setSelectedPack] = useState(
    product.selectedPackSize || availablePacks[0]?.size || 'Standard'
  );
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  const whyInfo = PRODUCT_WHY_MAP[product.id];

  useEffect(() => {
    let isMounted = true;
    const payload = product.qrPayload || `terraagri://verify?product=${product.id}&batch=${product.batchCode || 'GEN-2026'}`;
    generateQrDataUrl(payload).then((url) => {
      if (isMounted && url) setQrCodeUrl(url);
    });
    return () => {
      isMounted = false;
    };
  }, [product.id, product.qrPayload, product.batchCode]);

  // Accordion open states
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    composition: true,
    crops: true,
    mixing: false,
    reviews: false
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Pricing based on selected pack size
  const packObj = availablePacks.find((p) => p.size === selectedPack) || {
    size: selectedPack,
    price: product.price,
    mrp: product.mrp
  };

  const discountPercent = Math.round(((packObj.mrp - packObj.price) / packObj.mrp) * 100);

  const handleAdd = () => {
    onAddToCart(product, selectedPack, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on TerraAgri - verified agro-inputs!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText?.(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-16 max-w-screen-md mx-auto">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-md border-b border-surface-container/60">
        <div className="h-16 max-w-screen-md mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              aria-label="Back to listing"
              onClick={onBack}
              className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-surface-container px-2 py-0.5 rounded">
              Verified Formulation
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              aria-label="Share formulation link"
              onClick={handleShare}
              className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors relative"
            >
              <span className="material-symbols-outlined text-[20px]">share</span>
              {copiedShare && (
                <span className="absolute -bottom-6 right-0 bg-inverse-surface text-inverse-on-surface text-[10px] px-2 py-0.5 rounded shadow whitespace-nowrap">
                  Link Copied!
                </span>
              )}
            </button>
            <button
              aria-label="Add to wishlist"
              onClick={() => onToggleWishlist(product.id)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                wishlistIds.includes(product.id)
                  ? 'text-error'
                  : 'text-on-surface-variant hover:text-error'
              }`}
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={
                  wishlistIds.includes(product.id)
                    ? { fontVariationSettings: "'FILL' 1" }
                    : undefined
                }
              >
                favorite
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Image View & Batch Verifier */}
      <div className="px-4 pt-2">
        <div className="relative w-full aspect-square max-h-[380px] bg-surface-container-lowest rounded-2xl overflow-hidden border border-surface-container-high/60 shadow-xs flex items-center justify-center p-4">
          <img
            className="w-full h-full object-contain"
            alt={product.name}
            src={product.images[selectedImageIdx] || product.images[0]}
          />

          {/* Batch authenticity pill */}
          <button
            onClick={onOpenQrScanner}
            className="absolute top-3 left-3 bg-surface/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-xs border border-surface-container-high flex items-center gap-1.5 text-primary hover:bg-surface-container transition-colors"
            title="Scan & verify this batch"
          >
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified_user
            </span>
            <span className="text-[11px] font-bold text-on-surface">
              Batch #{product.batchCode || 'BAY-2026-X841'} · Govt Tested
            </span>
          </button>

          {/* Floating Agronomic Spec Tag */}
          <div className="absolute bottom-3 right-3 bg-surface-container-lowest/90 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-xs text-on-surface-variant text-xs flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-primary">science</span>
            <span>Suspension Concentrate (SC)</span>
          </div>
        </div>

        {/* Thumbnail Carousel */}
        {product.images.length > 1 && (
          <div className="flex gap-2.5 mt-3 overflow-x-auto no-scrollbar">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIdx(idx)}
                className={`w-16 h-16 rounded-xl border-2 overflow-hidden bg-surface-container-lowest p-1 shrink-0 transition-all ${
                  selectedImageIdx === idx
                    ? 'border-primary ring-2 ring-primary/20 scale-105'
                    : 'border-surface-container-high opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Thumb" className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Core Details */}
      <div className="px-4 mt-4 space-y-3">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-secondary-container/40 px-2 py-0.5 rounded">
                {product.brand}
              </span>
              <span className="text-xs text-on-surface-variant">OEM Certified Direct</span>
            </div>
            <div className="flex items-center gap-1 bg-surface-container-low px-2 py-0.5 rounded-full">
              <span
                className="material-symbols-outlined text-[14px] text-tertiary-container"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span className="text-xs font-bold text-on-surface">{product.rating}</span>
              <span className="text-[11px] text-on-surface-variant">({product.reviewsCount})</span>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-on-surface mt-1 leading-tight">{product.name}</h1>
          <p className="text-sm text-on-surface-variant mt-0.5">{product.subTitle}</p>
        </div>

        {/* Price Box */}
        <div className="p-3 bg-surface-container-low rounded-xl flex items-baseline justify-between border border-surface-container-high/60">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">₹{packObj.price}</span>
              <span className="text-sm text-outline line-through">₹{packObj.mrp}</span>
              <span className="text-xs font-bold text-secondary bg-secondary-fixed/40 px-2 py-0.5 rounded-full">
                {discountPercent}% OFF
              </span>
            </div>
            <p className="text-[11px] text-on-surface-variant mt-0.5">
              Inclusive of 18% Agri GST &amp; Doorstep Rural Freight
            </p>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 text-primary text-xs font-bold bg-primary/10 px-2 py-1 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              In Stock (38 Units)
            </span>
          </div>
        </div>

        {/* Pack Size Selector & Smart Value Packs */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
              Available Formulation Sizes:
            </label>
            {onOpenDosageCalculator && (
              <button
                type="button"
                onClick={() => onOpenDosageCalculator(product)}
                className="text-primary hover:underline text-xs font-bold flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">calculate</span>
                <span>Calculate for my Acres</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {availablePacks.map((pack) => {
              const isBest = (pack as any).isBestValue;
              const isPop = (pack as any).isPopular;
              const acreageCover = (pack as any).acreage;

              return (
                <button
                  key={pack.size}
                  onClick={() => setSelectedPack(pack.size)}
                  className={`relative py-2.5 px-2 rounded-xl text-center flex flex-col items-center justify-center border transition-all ${
                    selectedPack === pack.size
                      ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary font-bold shadow-xs'
                      : 'border-surface-container-high bg-surface-container-lowest text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {isBest && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-secondary text-on-secondary text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-full whitespace-nowrap shadow-2xs">
                      Best Value
                    </span>
                  )}
                  {isPop && !isBest && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-full whitespace-nowrap shadow-2xs">
                      Popular
                    </span>
                  )}

                  <span className="text-xs font-bold">{pack.size}</span>
                  <span className="text-[11px] font-extrabold text-on-surface mt-0.5">
                    ₹{pack.price}
                  </span>
                  {acreageCover && (
                    <span className="text-[9px] text-outline mt-0.5 font-medium">
                      {acreageCover}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Key Agronomic Metrics Matrix (Visual Bento Grid) */}
        <div className="space-y-1.5 pt-1">
          <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider">
            Agronomic Efficacy Profile
          </h3>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high/60">
              <div className="flex items-center gap-1.5 text-primary mb-1">
                <span className="material-symbols-outlined text-[18px]">science</span>
                <span className="text-xs font-bold text-on-surface">Active Ratio</span>
              </div>
              <p className="text-xs text-on-surface-variant font-medium">
                {product.metrics.activeRatio}
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high/60">
              <div className="flex items-center gap-1.5 text-primary mb-1">
                <span className="material-symbols-outlined text-[18px]">bug_report</span>
                <span className="text-xs font-bold text-on-surface">Target Pathogens</span>
              </div>
              <p className="text-xs text-on-surface-variant font-medium truncate">
                {product.metrics.targetPests}
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high/60">
              <div className="flex items-center gap-1.5 text-primary mb-1">
                <span className="material-symbols-outlined text-[18px]">water_drop</span>
                <span className="text-xs font-bold text-on-surface">Dosage per Acre</span>
              </div>
              <p className="text-xs text-on-surface-variant font-medium">
                {product.metrics.dosage}
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high/60">
              <div className="flex items-center gap-1.5 text-primary mb-1">
                <span className="material-symbols-outlined text-[18px]">event_available</span>
                <span className="text-xs font-bold text-on-surface">Pre-Harvest Safe Window</span>
              </div>
              <p className="text-xs text-on-surface-variant font-medium">
                {product.metrics.preHarvest}
              </p>
            </div>
          </div>
        </div>

        {/* Digital OEM Authenticity & Batch Hologram Section */}
        <div className="p-3.5 bg-surface-container-low rounded-2xl border border-primary/20 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">verified</span>
              </div>
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-on-surface">
                  Digital OEM Authenticity &amp; Batch QR
                </h3>
                <span className="text-[10px] text-primary font-semibold">
                  100% Guaranteed Non-Spurious Formulation
                </span>
              </div>
            </div>

            {onOpenQrScanner && (
              <button
                onClick={onOpenQrScanner}
                className="px-2.5 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-bold text-xs flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">qr_code_scanner</span>
                <span>Scan Label</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 bg-surface-container-lowest p-2.5 rounded-xl border border-surface-container-high/60">
            <div className="w-16 h-16 bg-white p-1 rounded-lg border border-surface-container shrink-0 flex items-center justify-center shadow-xs">
              {qrCodeUrl ? (
                <img src={qrCodeUrl} alt="Product QR" className="w-full h-full object-contain" />
              ) : (
                <span className="material-symbols-outlined text-primary text-[32px]">qr_code</span>
              )}
            </div>

            <div className="min-w-0 flex-1 space-y-0.5 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-outline uppercase font-bold">Batch:</span>
                <span className="font-mono font-bold text-on-surface text-[11px]">
                  {product.batchCode || 'BAY-2026-X841'}
                </span>
              </div>
              <p className="text-[11px] text-on-surface-variant truncate">
                CIB Reg: {product.cibCirNumber || 'Approved under Insecticides Act'}
              </p>
              <p className="text-[11px] text-on-surface-variant truncate">
                Plant: {product.mfgPlant || `${product.brand} Agrochem Hub`}
              </p>
            </div>
          </div>
        </div>

        {/* Accordions */}
        <div className="border border-surface-container-high rounded-xl overflow-hidden divide-y divide-surface-container-high">
          {/* Accordion 1: Composition */}
          <div>
            <button
              onClick={() => toggleAccordion('composition')}
              className="w-full p-3 bg-surface-container-lowest flex items-center justify-between text-left hover:bg-surface-container-low transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  biotech
                </span>
                <span className="font-bold text-sm text-on-surface">
                  Technical Composition &amp; Action
                </span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                {openAccordions.composition ? 'expand_less' : 'expand_more'}
              </span>
            </button>
            {openAccordions.composition && (
              <div className="p-3 bg-surface-container-low/40 text-xs text-on-surface space-y-2 border-t border-surface-container-high">
                <p>
                  <strong>Formulation:</strong> {product.technicalComposition}
                </p>
                <p className="text-on-surface-variant leading-relaxed">
                  Dual systemic mode of action: Azoxystrobin inhibits mitochondrial respiration by
                  blocking electron transfer (QOI), while Difenoconazole inhibits fungal ergosterol
                  biosynthesis. Provides superior preventive, curative, and anti-sporulant
                  protection across foliar canopy.
                </p>
              </div>
            )}
          </div>

          {/* Accordion 2: Registered Crops */}
          <div>
            <button
              onClick={() => toggleAccordion('crops')}
              className="w-full p-3 bg-surface-container-lowest flex items-center justify-between text-left hover:bg-surface-container-low transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">eco</span>
                <span className="font-bold text-sm text-on-surface">
                  Registered Crops &amp; Target Pests
                </span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                {openAccordions.crops ? 'expand_less' : 'expand_more'}
              </span>
            </button>
            {openAccordions.crops && (
              <div className="p-3 bg-surface-container-low/40 text-xs space-y-2 border-t border-surface-container-high">
                <div className="flex flex-wrap gap-1.5">
                  {product.suitableCrops.map((c, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-semibold text-[11px]"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <p className="text-on-surface-variant text-xs mt-2">
                  Recommended for early curative stage when first symptoms appear on leaf collars
                  or bottom canopy layers.
                </p>
              </div>
            )}
          </div>

          {/* Accordion 3: Safety & Mixing */}
          <div>
            <button
              onClick={() => toggleAccordion('mixing')}
              className="w-full p-3 bg-surface-container-lowest flex items-center justify-between text-left hover:bg-surface-container-low transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  security
                </span>
                <span className="font-bold text-sm text-on-surface">
                  Preparation &amp; Spray Tank Safety
                </span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                {openAccordions.mixing ? 'expand_less' : 'expand_more'}
              </span>
            </button>
            {openAccordions.mixing && (
              <div className="p-3 bg-surface-container-low/40 text-xs text-on-surface space-y-2 border-t border-surface-container-high">
                <ul className="list-disc pl-4 space-y-1 text-on-surface-variant">
                  <li>Fill spray tank half with clean water (neutral pH 6.5 - 7.0).</li>
                  <li>Add recommended quantity of formulation and agitate thoroughly.</li>
                  <li>Do NOT mix with alkaline solutions like Bordeaux mixture or lime sulphur.</li>
                  <li>Wear rubber gloves, goggles, and face mask during application.</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Direct Agronomist Consultation Bar */}
        <div className="bg-surface-container-low rounded-xl p-3 flex items-center justify-between border border-surface-container-high">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-primary text-[24px]">support_agent</span>
            <div>
              <p className="text-xs font-bold text-on-surface">Unsure of mixing ratio for your field?</p>
              <p className="text-[11px] text-on-surface-variant">Speak to Dr. Deshmukh (M.Sc. Agronomy)</p>
            </div>
          </div>
          <button
            onClick={onOpenCallExpert}
            className="px-3 py-1.5 rounded-lg bg-secondary text-on-secondary text-xs font-bold hover:bg-primary transition-colors shrink-0"
          >
            Call Desk
          </button>
        </div>
      </div>

      {/* Sticky Bottom Buy Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-t border-surface-container-high p-3 shadow-lg">
        <div className="max-w-screen-md mx-auto flex items-center justify-between gap-3">
          {/* Stepper Quantity Counter */}
          <div className="flex items-center bg-surface-container-low rounded-xl p-1 border border-surface-container-high shrink-0">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">remove</span>
            </button>
            <span className="w-8 text-center text-sm font-bold text-on-surface">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAdd}
            className={`flex-1 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
              addedToast
                ? 'bg-secondary text-on-secondary'
                : 'bg-surface-container-highest text-on-surface hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {addedToast ? 'check' : 'add_shopping_cart'}
            </span>
            <span>{addedToast ? 'Added to Cart' : `Add (₹${packObj.price * quantity})`}</span>
          </button>

          {/* Buy Now Button */}
          <button
            onClick={() => onBuyNow(product, selectedPack, quantity)}
            className="flex-1 py-3 px-3 rounded-xl bg-primary text-on-primary hover:bg-primary-container text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">bolt</span>
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
