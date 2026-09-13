import React, { useState } from 'react';
import { Product } from '../types';

interface CropDoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const CropDoctorModal: React.FC<CropDoctorModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onAddToCart
}) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedCase, setSelectedCase] = useState<any>(null);

  if (!isOpen) return null;

  const CASES = [
    {
      crop: 'Cotton',
      image:
        'https://images.unsplash.com/photo-1594488554904-8975a5e9547d?auto=format&fit=crop&w=600&q=80',
      issue: 'American Bollworm & Thrips Infestation',
      scientificName: 'Helicoverpa armigera & Thrips tabaci',
      severity: 'High (Immediate Spray Recommended)',
      symptoms: 'Damaged squares, premature boll drop, silvery crinkling on leaf margins.',
      recommendedProductId: 'bayer-belt-expert',
      dosage: '0.4 ml / Litre of water (60-80 ml / Acre)',
      timing: 'Apply early morning or late afternoon'
    },
    {
      crop: 'Tomato',
      image:
        'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=600&q=80',
      issue: 'Early Blight & Anthracnose Fruit Spot',
      scientificName: 'Alternaria solani',
      severity: 'Moderate (Preventive & Curative Stage)',
      symptoms: 'Concentric brown target-like rings on lower leaves, fruit collar necrosis.',
      recommendedProductId: 'syngenta-amistar-top',
      dosage: '1.0 ml / Litre of water',
      timing: 'Ensure coverage on both leaf undersides'
    },
    {
      crop: 'Paddy / Rice',
      image:
        'https://images.unsplash.com/photo-1536617621972-602555543cbe?auto=format&fit=crop&w=600&q=80',
      issue: 'Sheath Blight & Leaf Folder',
      scientificName: 'Rhizoctonia solani',
      severity: 'Severe (Spread risk in humid weather)',
      symptoms: 'Snake-skin like irregular oval lesions above waterline, folded green leaves.',
      recommendedProductId: 'syngenta-amistar-top',
      dosage: '200 ml / Acre in 200L water',
      timing: 'Spray at tillering to panicle initiation'
    }
  ];

  const handleSelectCase = (c: any) => {
    setAnalyzing(true);
    setTimeout(() => {
      setSelectedCase(c);
      setAnalyzing(false);
    }, 800);
  };

  const recommendedProduct = selectedCase
    ? products.find((p) => p.id === selectedCase.recommendedProductId) || products[0]
    : null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl border border-surface-container-high overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-4 bg-primary text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px]">photo_camera</span>
            <div>
              <h3 className="font-bold text-lg leading-tight">Crop Doctor AI Field Scan</h3>
              <p className="text-xs text-on-primary-container">
                Instant pest & fungal diagnosis powered by agronomic vision models
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

        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {!selectedCase && !analyzing && (
            <div className="space-y-3">
              <div className="border-2 border-dashed border-primary/30 rounded-xl p-6 text-center bg-surface-container-low/50 hover:bg-surface-container-low transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-primary text-[38px] mb-2">
                  add_a_photo
                </span>
                <p className="font-bold text-sm text-on-surface">Take or Upload Crop Leaf Photo</p>
                <p className="text-xs text-on-surface-variant mt-1">
                  Ensure affected leaf area is focused under clear sunlight
                </p>
              </div>

              <div>
                <p className="text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
                  Or select active field problem to simulate:
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {CASES.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectCase(c)}
                      className="p-2 rounded-xl border border-surface-container-high hover:border-primary text-left bg-surface-container-lowest transition-all group"
                    >
                      <img
                        src={c.image}
                        alt={c.issue}
                        className="w-full h-16 rounded-lg object-cover mb-1.5 group-hover:brightness-105"
                      />
                      <span className="text-[10px] font-bold text-primary block truncate">
                        {c.crop}
                      </span>
                      <span className="text-[11px] font-medium text-on-surface line-clamp-2 leading-tight">
                        {c.issue}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {analyzing && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <span className="material-symbols-outlined text-primary text-[44px] animate-spin">
                progress_activity
              </span>
              <p className="font-bold text-sm text-on-surface">Scanning leaf symptom vectors...</p>
              <p className="text-xs text-on-surface-variant max-w-xs">
                Matching against Central Institute of Cotton & Plant Pathology database...
              </p>
            </div>
          )}

          {selectedCase && recommendedProduct && !analyzing && (
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-surface-container-low rounded-xl">
                <img
                  src={selectedCase.image}
                  alt={selectedCase.issue}
                  className="w-20 h-20 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="px-1.5 py-0.5 rounded bg-error/15 text-error text-[10px] font-bold">
                      {selectedCase.severity}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-on-surface mt-1">{selectedCase.issue}</h4>
                  <p className="text-[11px] italic text-on-surface-variant">
                    {selectedCase.scientificName}
                  </p>
                  <p className="text-xs text-on-surface mt-1">{selectedCase.symptoms}</p>
                </div>
              </div>

              {/* Prescription Card */}
              <div className="p-3 border border-secondary/30 bg-secondary-fixed/15 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-secondary uppercase tracking-wide flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    Agronomist Recommended Remedy
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-surface-container-lowest p-2.5 rounded-lg">
                  <img
                    src={recommendedProduct.images[0]}
                    alt={recommendedProduct.name}
                    className="w-14 h-14 object-contain rounded bg-surface-container-low shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-primary uppercase">
                      {recommendedProduct.brand}
                    </span>
                    <h5 className="font-bold text-xs text-on-surface truncate">
                      {recommendedProduct.name}
                    </h5>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="font-bold text-sm text-primary">
                        ₹{recommendedProduct.price}
                      </span>
                      <span className="text-[10px] text-on-surface-variant line-through">
                        ₹{recommendedProduct.mrp}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onAddToCart(recommendedProduct)}
                    className="px-3 py-2 rounded-lg bg-primary text-on-primary text-xs font-bold shadow-xs hover:bg-primary-container active:scale-95 transition-all shrink-0"
                  >
                    Add
                  </button>
                </div>

                <div className="text-xs text-on-surface space-y-1 pt-1">
                  <p>
                    <strong>Dosage:</strong> {selectedCase.dosage}
                  </p>
                  <p>
                    <strong>Spray Window:</strong> {selectedCase.timing}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedCase(null)}
                  className="flex-1 py-2 text-xs font-bold rounded-lg border border-surface-container-high text-on-surface hover:bg-surface-container-low transition-colors"
                >
                  Scan Another Leaf
                </button>
                <button
                  onClick={() => {
                    onSelectProduct(recommendedProduct);
                    onClose();
                  }}
                  className="flex-1 py-2 text-xs font-bold rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors"
                >
                  View Product Details
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
