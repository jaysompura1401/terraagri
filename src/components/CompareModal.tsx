import React from 'react';
import { Product } from '../types';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddToCart: (p: Product) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddToCart
}) => {
  if (!isOpen) return null;

  const compareItems = products.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border border-surface-container-high overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-4 bg-surface-container-low border-b border-surface-container-high flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">compare</span>
            <div>
              <h3 className="font-bold text-base text-on-surface">Agri-Chemical Formulation Comparison</h3>
              <p className="text-xs text-on-surface-variant">Side-by-side agronomic potency and economics</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="p-4 overflow-y-auto space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {compareItems.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-surface-container-low border border-surface-container-high flex flex-col justify-between"
              >
                <div className="flex flex-col items-center text-center">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-24 h-24 object-contain rounded-lg bg-surface-container-lowest p-1 mb-2"
                  />
                  <span className="text-[10px] font-bold text-primary uppercase">{item.brand}</span>
                  <h4 className="font-bold text-sm text-on-surface line-clamp-1">{item.name}</h4>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-bold text-base text-primary">₹{item.price}</span>
                    <span className="text-xs text-on-surface-variant line-through">₹{item.mrp}</span>
                  </div>
                </div>

                <button
                  onClick={() => onAddToCart(item)}
                  className="mt-3 w-full py-1.5 rounded-lg bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition-colors flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          {/* Matrix Specs */}
          <div className="border border-surface-container-high rounded-xl overflow-hidden divide-y divide-surface-container-high text-xs">
            <div className="grid grid-cols-3 p-2.5 bg-surface-container-low font-bold text-on-surface">
              <span>Metric</span>
              <span className="text-center">{compareItems[0]?.brand}</span>
              <span className="text-center">{compareItems[1]?.brand}</span>
            </div>

            <div className="grid grid-cols-3 p-2.5">
              <span className="font-medium text-on-surface-variant">Active Mode</span>
              <span className="text-center font-semibold text-on-surface">
                {compareItems[0]?.metrics.activeRatio}
              </span>
              <span className="text-center font-semibold text-on-surface">
                {compareItems[1]?.metrics.activeRatio}
              </span>
            </div>

            <div className="grid grid-cols-3 p-2.5">
              <span className="font-medium text-on-surface-variant">Recommended Dosage</span>
              <span className="text-center text-on-surface">
                {compareItems[0]?.metrics.dosage}
              </span>
              <span className="text-center text-on-surface">
                {compareItems[1]?.metrics.dosage}
              </span>
            </div>

            <div className="grid grid-cols-3 p-2.5">
              <span className="font-medium text-on-surface-variant">Pre-Harvest Interval</span>
              <span className="text-center font-bold text-primary">
                {compareItems[0]?.metrics.preHarvest}
              </span>
              <span className="text-center font-bold text-primary">
                {compareItems[1]?.metrics.preHarvest}
              </span>
            </div>

            <div className="grid grid-cols-3 p-2.5">
              <span className="font-medium text-on-surface-variant">Technical Composition</span>
              <span className="text-center text-[11px] text-on-surface-variant leading-tight">
                {compareItems[0]?.technicalComposition}
              </span>
              <span className="text-center text-[11px] text-on-surface-variant leading-tight">
                {compareItems[1]?.technicalComposition}
              </span>
            </div>

            <div className="grid grid-cols-3 p-2.5">
              <span className="font-medium text-on-surface-variant">Registered Crops</span>
              <div className="text-center flex flex-wrap justify-center gap-1">
                {compareItems[0]?.suitableCrops.slice(0, 3).map((c, i) => (
                  <span key={i} className="px-1.5 py-0.5 rounded bg-surface-container-low text-[10px]">
                    {c}
                  </span>
                ))}
              </div>
              <div className="text-center flex flex-wrap justify-center gap-1">
                {compareItems[1]?.suitableCrops.slice(0, 3).map((c, i) => (
                  <span key={i} className="px-1.5 py-0.5 rounded bg-surface-container-low text-[10px]">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 bg-surface-container-low border-t border-surface-container-high">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-lg bg-surface-container-highest text-on-surface font-bold text-sm hover:bg-surface-container transition-colors"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
