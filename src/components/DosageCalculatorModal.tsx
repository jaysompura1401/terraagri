import React, { useState } from 'react';
import { Product, ProductPack } from '../types';
import { calculateProductDosage } from '../utils/agriCalculator';

interface DosageCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  allProducts: Product[];
  initialAcreage?: number;
  onAddToCart: (product: Product, packSize: string, quantity: number) => void;
  onSelectProduct?: (product: Product) => void;
}

export const DosageCalculatorModal: React.FC<DosageCalculatorModalProps> = ({
  isOpen,
  onClose,
  product: initialProduct,
  allProducts,
  initialAcreage = 3.0,
  onAddToCart,
  onSelectProduct
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(
    initialProduct?.id || allProducts[0]?.id || 'bayer-belt-expert'
  );
  const [acreage, setAcreage] = useState<number>(initialAcreage);
  const [selectedCrop, setSelectedCrop] = useState<string>('Cotton');
  const [addedToast, setAddedToast] = useState(false);

  if (!isOpen) return null;

  const currentProduct = allProducts.find((p) => p.id === selectedProductId) || initialProduct || allProducts[0];
  const calculation = calculateProductDosage(currentProduct, acreage, selectedCrop);

  const handleAddDirect = () => {
    onAddToCart(currentProduct, calculation.recommendedPack.size, calculation.recommendedPacksCount);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      onClose();
    }, 1200);
  };

  const quickAcres = [1.0, 2.0, 3.0, 5.0, 10.0];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl border border-surface-container-high overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-4 bg-primary text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">calculate</span>
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg leading-tight">
                Dosage &amp; Land Quantity Calculator
              </h3>
              <p className="text-xs text-on-primary-container">
                एकड़ के अनुसार सही मात्रा व पैक साइज कैलकुलेटर
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

        {/* Body */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4 text-xs">
          {/* Product Selector */}
          <div>
            <label className="block text-xs font-bold text-on-surface mb-1">
              Select Agro-Chemical / Seed / Fertilizer:
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-surface-container-high bg-surface-container-low text-xs font-medium text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {allProducts.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.brand}) - {p.category}
                </option>
              ))}
            </select>
          </div>

          {/* Crop Selector */}
          <div>
            <label className="block text-xs font-bold text-on-surface mb-1">
              Select Crop:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {['Cotton', 'Tomato', 'Paddy / Rice', 'Soybean', 'Sugarcane', 'Chilli'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedCrop(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    selectedCrop === c
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Land Area Input */}
          <div className="bg-surface-container-low p-3.5 rounded-xl space-y-2 border border-surface-container-high/60">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-on-surface flex items-center gap-1">
                <span className="material-symbols-outlined text-primary text-[18px]">landscape</span>
                Land Area to Treat:
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  step="0.5"
                  min="0.25"
                  max="100"
                  value={acreage}
                  onChange={(e) => setAcreage(Math.max(0.25, parseFloat(e.target.value) || 1))}
                  className="w-20 px-2 py-1 bg-surface-container-lowest rounded-lg border border-surface-container-high text-center font-bold text-sm text-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <span className="font-bold text-on-surface text-xs">Acres (एकड़)</span>
              </div>
            </div>

            {/* Quick Chips */}
            <div className="flex items-center gap-1.5 pt-1">
              <span className="text-[11px] text-outline">Quick:</span>
              {quickAcres.map((ac) => (
                <button
                  key={ac}
                  type="button"
                  onClick={() => setAcreage(ac)}
                  className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all ${
                    acreage === ac
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {ac} Acre
                </button>
              ))}
            </div>
          </div>

          {/* Calculation Output Card */}
          <div className="p-4 rounded-2xl bg-surface-container-lowest border-2 border-primary/30 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-surface-container-high/60 pb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">science</span>
                <span className="font-bold text-sm text-on-surface">
                  Prescribed Dosage for {calculation.acreage} Acre(s)
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                Verified Formula
              </span>
            </div>

            {/* Metric Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <div className="p-2.5 rounded-xl bg-surface-container-low text-center">
                <span className="text-[10px] text-outline font-semibold">Total Quantity Required</span>
                <p className="font-extrabold text-sm text-on-surface mt-0.5">
                  {calculation.totalRequired} {calculation.unit}
                </p>
                <span className="text-[10px] text-primary font-medium">
                  ({calculation.perAcreRequired} {calculation.unit} / acre)
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-surface-container-low text-center">
                <span className="text-[10px] text-outline font-semibold">Water Volume</span>
                <p className="font-extrabold text-sm text-on-surface mt-0.5">
                  {calculation.waterLitersRequired > 0 ? `${calculation.waterLitersRequired} Litres` : 'Basal / Dry'}
                </p>
                <span className="text-[10px] text-secondary font-medium">
                  {calculation.tankFills16L > 0 ? `~${calculation.tankFills16L} spray pumps` : 'Soil application'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-surface-container-low text-center col-span-2 sm:col-span-1">
                <span className="text-[10px] text-outline font-semibold">Recommended Best Pack</span>
                <p className="font-extrabold text-sm text-primary mt-0.5">
                  {calculation.recommendedPacksCount}x {calculation.recommendedPack.size}
                </p>
                <span className="text-[10px] text-on-surface-variant font-bold">
                  ₹{calculation.totalEstimatedCost} Total
                </span>
              </div>
            </div>

            {/* Guidance Alert */}
            <div className="p-3 bg-secondary-fixed/30 rounded-xl flex items-start gap-2 text-on-surface">
              <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                tips_and_updates
              </span>
              <p className="text-[11px] leading-relaxed">
                <strong>Agronomist Spray Tip:</strong> {calculation.applicationGuidance}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-surface-container-low border-t border-surface-container-high/60 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-outline uppercase font-bold">Total Pack Cost</span>
            <p className="font-extrabold text-base text-primary">₹{calculation.totalEstimatedCost}</p>
          </div>

          <div className="flex items-center gap-2">
            {onSelectProduct && (
              <button
                type="button"
                onClick={() => {
                  onSelectProduct(currentProduct);
                  onClose();
                }}
                className="px-3 py-2 rounded-xl border border-surface-container-high text-on-surface hover:bg-surface-container font-bold text-xs transition-colors"
              >
                View Details
              </button>
            )}

            <button
              type="button"
              onClick={handleAddDirect}
              disabled={addedToast}
              className="px-4 py-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">
                {addedToast ? 'check' : 'add_shopping_cart'}
              </span>
              <span>{addedToast ? 'Added to Cart!' : `Add ${calculation.recommendedPacksCount} Pack(s) to Cart`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
