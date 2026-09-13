import React, { useState } from 'react';
import { Product, CropProblemDef } from '../types';
import { CROP_PROBLEMS, SMART_BUNDLES } from '../data/agriAdvisoryData';

interface CropProblemFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  initialCrop?: string;
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product, packSize?: string, qty?: number) => void;
  onOpenDosageCalculator?: (product: Product) => void;
  onOpenExpert?: () => void;
}

export const CropProblemFinderModal: React.FC<CropProblemFinderModalProps> = ({
  isOpen,
  onClose,
  products,
  initialCrop = 'Cotton',
  onSelectProduct,
  onAddToCart,
  onOpenDosageCalculator,
  onOpenExpert
}) => {
  const [selectedCrop, setSelectedCrop] = useState<string>(initialCrop);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProblemId, setActiveProblemId] = useState<string>(
    CROP_PROBLEMS.find((p) => p.crop === initialCrop)?.id || CROP_PROBLEMS[0].id
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [addedToast, setAddedToast] = useState<string | null>(null);

  if (!isOpen) return null;

  const CROPS_LIST = ['Cotton', 'Tomato', 'Paddy / Rice', 'Soybean', 'Sugarcane', 'All Crops'];
  const CATEGORIES = ['All', 'Insect Pest', 'Fungal Disease', 'Nutritional Deficiency'];

  // Filter problems
  const filteredProblems = CROP_PROBLEMS.filter((prob) => {
    const matchesCrop = selectedCrop === 'All Crops' || prob.crop === selectedCrop || prob.crop === 'All Crops';
    const matchesCat = selectedCategory === 'All' || prob.category === selectedCategory;
    const matchesQuery = !searchQuery ||
      prob.nameEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prob.nameHindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prob.symptoms.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCrop && matchesCat && matchesQuery;
  });

  const currentProblem = filteredProblems.find((p) => p.id === activeProblemId) || filteredProblems[0] || CROP_PROBLEMS[0];

  // Matched products
  const matchedProducts = currentProblem
    ? products.filter((p) => currentProblem.recommendedProductIds.includes(p.id))
    : [];

  // Related bundle if available
  const matchedBundle = currentProblem?.recommendedBundleId
    ? SMART_BUNDLES.find((b) => b.id === currentProblem.recommendedBundleId)
    : null;

  const handleAddProduct = (prod: Product) => {
    onAddToCart(prod);
    setAddedToast(prod.name);
    setTimeout(() => setAddedToast(null), 2000);
  };

  const handleAddBundle = () => {
    if (!matchedBundle) return;
    matchedBundle.productPacks.forEach((item) => {
      const p = products.find((prod) => prod.id === item.productId);
      if (p) {
        onAddToCart(p, item.packSize, item.quantity);
      }
    });
    setAddedToast(`Entire ${matchedBundle.title} added!`);
    setTimeout(() => setAddedToast(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-2xl max-h-[94vh] flex flex-col shadow-2xl border border-surface-container-high overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-4 bg-primary text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">troubleshoot</span>
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg leading-tight">
                Crop &amp; Disease Problem Solution Finder
              </h3>
              <p className="text-xs text-on-primary-container">
                फसल चुनें → समस्या चुनें → तुरंत समाधान और सही मात्रा
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Step 1: Crop Pills Selector */}
        <div className="p-3 bg-surface-container-low border-b border-surface-container-high/60 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-on-surface flex items-center gap-1">
              <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-[11px] font-bold flex items-center justify-center">1</span>
              Select Your Crop (अपनी फसल चुनें):
            </span>
            <span className="text-[11px] text-primary font-semibold">Step 1 of 3</span>
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
            {CROPS_LIST.map((crop) => (
              <button
                key={crop}
                onClick={() => {
                  setSelectedCrop(crop);
                  const firstForCrop = CROP_PROBLEMS.find((p) => p.crop === crop);
                  if (firstForCrop) setActiveProblemId(firstForCrop.id);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-2xs ${
                  selectedCrop === crop
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container border border-surface-container-high'
                }`}
              >
                {crop}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="px-4 pt-3 flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search symptom (e.g. bollworm, leaf curl, blight, धब्बे, सुंडी)..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-surface-container-low border border-surface-container-high text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex gap-1 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-secondary text-on-secondary'
                    : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2 & 3: Content Split / Scrolling Area */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {/* Step 2: Problem Selection List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-on-surface flex items-center gap-1">
                <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-[11px] font-bold flex items-center justify-center">2</span>
                Identify the Observed Symptom (रोग / कीट लक्षण चुनें):
              </span>
              <span className="text-[11px] text-outline">
                {filteredProblems.length} issue(s) cataloged
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredProblems.map((prob) => {
                const isSelected = currentProblem?.id === prob.id;
                return (
                  <button
                    key={prob.id}
                    onClick={() => setActiveProblemId(prob.id)}
                    className={`p-2.5 rounded-xl text-left border transition-all flex gap-2.5 ${
                      isSelected
                        ? 'border-primary bg-primary/5 ring-1 ring-primary shadow-xs'
                        : 'border-surface-container-high bg-surface-container-lowest hover:bg-surface-container-low'
                    }`}
                  >
                    <img
                      src={prob.photoUrl}
                      alt={prob.nameEnglish}
                      className="w-14 h-14 rounded-lg object-cover bg-surface-container shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-secondary bg-secondary-fixed/50 px-1.5 py-0.5 rounded">
                          {prob.crop}
                        </span>
                        <span className="text-[9px] text-outline truncate">{prob.category}</span>
                      </div>
                      <h4 className="font-bold text-xs text-on-surface mt-0.5 line-clamp-1">
                        {prob.nameEnglish}
                      </h4>
                      <p className="text-[11px] text-primary font-semibold truncate">
                        {prob.nameHindi}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Verified Agronomic Diagnosis & Recommended Products */}
          {currentProblem && (
            <div className="p-3.5 rounded-2xl bg-surface-container-low border border-primary/30 space-y-3">
              <div className="flex items-start justify-between gap-2 border-b border-surface-container-high/60 pb-2.5">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-[11px] font-bold flex items-center justify-center">3</span>
                    <h3 className="font-extrabold text-sm sm:text-base text-on-surface">
                      {currentProblem.nameEnglish}
                    </h3>
                  </div>
                  <p className="text-xs font-semibold text-primary pl-6">
                    {currentProblem.nameHindi} · <span className="font-normal italic text-outline text-[11px]">{currentProblem.scientificName}</span>
                  </p>
                </div>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shrink-0 ${
                  currentProblem.urgency.includes('Immediate')
                    ? 'bg-error-container text-on-error-container'
                    : 'bg-tertiary-container text-on-tertiary-container'
                }`}>
                  {currentProblem.urgency}
                </span>
              </div>

              {/* Symptoms Description */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-surface-container-lowest border border-surface-container-high">
                  <span className="text-[10px] font-bold text-outline uppercase">Field Symptoms (लक्षण):</span>
                  <p className="text-on-surface text-[11px] mt-0.5 leading-relaxed">{currentProblem.symptomsHindi}</p>
                </div>
                <div className="p-2 rounded-xl bg-surface-container-lowest border border-surface-container-high">
                  <span className="text-[10px] font-bold text-outline uppercase">Prescribed Treatment Action:</span>
                  <p className="text-primary text-[11px] font-medium mt-0.5 leading-relaxed">{currentProblem.whyThisTreatment}</p>
                </div>
              </div>

              {/* Smart Bundle Offer (if exists) */}
              {matchedBundle && (
                <div className="p-3 rounded-xl bg-gradient-to-r from-secondary-fixed/40 to-primary-fixed/30 border border-secondary/30 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-secondary text-[18px]">package_2</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">
                        Smart Value Kit · Save {matchedBundle.discountPercent}%
                      </span>
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm text-on-surface mt-0.5 truncate">
                      {matchedBundle.title}
                    </h4>
                    <p className="text-[11px] text-on-surface-variant line-clamp-1">
                      {matchedBundle.benefitHindi}
                    </p>
                  </div>

                  <button
                    onClick={handleAddBundle}
                    className="px-3 py-1.5 rounded-xl bg-secondary text-on-secondary font-bold text-xs hover:bg-primary transition-colors shrink-0 shadow-2xs"
                  >
                    Add Kit
                  </button>
                </div>
              )}

              {/* Individual Recommended Formulations */}
              <div className="space-y-2 pt-1">
                <span className="text-xs font-bold text-on-surface uppercase tracking-wider">
                  Recommended CIB-Approved Formulations:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {matchedProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="p-3 rounded-xl bg-surface-container-lowest border border-surface-container-high shadow-xs flex flex-col justify-between gap-2"
                    >
                      <div className="flex gap-2.5">
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-14 h-14 rounded-lg object-contain bg-surface-container-low p-1 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold text-primary uppercase">
                            {prod.brand}
                          </span>
                          <h5 className="font-bold text-xs text-on-surface line-clamp-1">
                            {prod.name}
                          </h5>
                          <p className="text-[11px] text-outline mt-0.5 truncate">
                            Dose: {prod.metrics.dosage}
                          </p>
                          <div className="flex items-baseline gap-1 mt-1">
                            <span className="font-bold text-sm text-primary">₹{prod.price}</span>
                            <span className="text-[11px] text-outline line-through">₹{prod.mrp}</span>
                            <span className="text-[10px] text-error font-bold">{prod.discountPercent}% OFF</span>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1.5 pt-1 border-t border-surface-container-high/60">
                        {onOpenDosageCalculator && (
                          <button
                            type="button"
                            onClick={() => {
                              onOpenDosageCalculator(prod);
                              onClose();
                            }}
                            className="flex-1 py-1.5 rounded-lg border border-surface-container-high text-on-surface text-[11px] font-bold hover:bg-surface-container flex items-center justify-center gap-1 transition-colors"
                          >
                            <span className="material-symbols-outlined text-[14px]">calculate</span>
                            <span>Calculate Acres</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleAddProduct(prod)}
                          className="flex-1 py-1.5 rounded-lg bg-primary text-on-primary text-[11px] font-bold hover:bg-primary-container flex items-center justify-center gap-1 shadow-2xs transition-colors"
                        >
                          <span className="material-symbols-outlined text-[14px]">add_shopping_cart</span>
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Toast Notification */}
        {addedToast && (
          <div className="p-2.5 bg-primary text-on-primary text-xs font-bold text-center animate-in slide-in-from-bottom-2">
            ✓ {addedToast} added to your cart!
          </div>
        )}

        {/* Footer */}
        <div className="p-3 bg-surface-container-low border-t border-surface-container-high flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={() => {
              if (onOpenExpert) {
                onOpenExpert();
                onClose();
              }
            }}
            className="flex items-center gap-1 text-primary font-bold hover:underline"
          >
            <span className="material-symbols-outlined text-[18px]">support_agent</span>
            <span>Still confused? Consult Kisan Agronomist</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-surface-container text-on-surface font-bold hover:bg-surface-container-high transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
