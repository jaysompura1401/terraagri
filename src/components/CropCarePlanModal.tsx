import React, { useState } from 'react';
import { Product } from '../types';
import { CROP_CARE_PLANS } from '../data/agriAdvisoryData';

interface CropCarePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  initialCrop?: string;
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product, packSize?: string, qty?: number) => void;
  onOpenDosageCalculator?: (product: Product) => void;
}

export const CropCarePlanModal: React.FC<CropCarePlanModalProps> = ({
  isOpen,
  onClose,
  products,
  initialCrop = 'Cotton',
  onSelectProduct,
  onAddToCart,
  onOpenDosageCalculator
}) => {
  const [selectedCrop, setSelectedCrop] = useState<string>(
    ['Cotton', 'Tomato', 'Paddy / Rice'].includes(initialCrop) ? initialCrop : 'Cotton'
  );
  const [activeStageNumber, setActiveStageNumber] = useState<number>(3);
  const [reminderToast, setReminderToast] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentPlan = CROP_CARE_PLANS.find(
    (p) => p.cropName.toLowerCase().includes(selectedCrop.toLowerCase()) ||
           selectedCrop.toLowerCase().includes(p.cropName.toLowerCase())
  ) || CROP_CARE_PLANS[0];

  const currentStage = currentPlan.stages.find((s) => s.stageNumber === activeStageNumber) || currentPlan.stages[0];

  const stageProducts = products.filter((p) => currentStage.recommendedProductIds.includes(p.id));

  const handleSetReminder = (stageName: string) => {
    setReminderToast(`SMS & WhatsApp spray reminder active for "${stageName}"!`);
    setTimeout(() => setReminderToast(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-2xl max-h-[94vh] flex flex-col shadow-2xl border border-surface-container-high overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-4 bg-primary text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">calendar_month</span>
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg leading-tight">
                Crop Stage-by-Stage Care Plan
              </h3>
              <p className="text-xs text-on-primary-container">
                बुवाई से कटाई तक वैज्ञानिक फसल चक्र व स्प्रे शेड्यूल
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

        {/* Crop Selector Tabs */}
        <div className="p-3 bg-surface-container-low border-b border-surface-container-high/60 flex items-center gap-2">
          <span className="text-xs font-bold text-on-surface whitespace-nowrap">Plan for Crop:</span>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {['Cotton', 'Tomato', 'Paddy / Rice'].map((c) => (
              <button
                key={c}
                onClick={() => {
                  setSelectedCrop(c);
                  const p = CROP_CARE_PLANS.find((plan) => plan.cropName.includes(c));
                  if (p) {
                    const curr = p.stages.find((s) => s.status === 'current') || p.stages[0];
                    setActiveStageNumber(curr.stageNumber);
                  }
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedCrop === c
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-surface-container-lowest text-on-surface border border-surface-container-high hover:bg-surface-container'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Stages Stepper Timeline */}
        <div className="px-4 py-3 bg-surface-container-lowest border-b border-surface-container-high/40 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            {currentPlan.stages.map((stage) => {
              const isSelected = stage.stageNumber === activeStageNumber;
              const isCurrent = stage.status === 'current';
              const isCompleted = stage.status === 'completed';

              return (
                <button
                  key={stage.stageNumber}
                  onClick={() => setActiveStageNumber(stage.stageNumber)}
                  className={`flex items-center gap-2 p-2 rounded-xl text-left border transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/10 ring-1 ring-primary'
                      : 'border-surface-container-high bg-surface-container-low hover:bg-surface-container'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                      isCompleted
                        ? 'bg-secondary text-on-secondary'
                        : isCurrent
                        ? 'bg-primary text-on-primary ring-2 ring-primary-fixed animate-pulse'
                        : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    {isCompleted ? '✓' : stage.stageNumber}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-outline uppercase tracking-wider block">
                      {stage.dayRange}
                    </span>
                    <span className="text-xs font-bold text-on-surface block max-w-[130px] truncate">
                      {stage.stageName}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stage Detailed Content */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          <div className="flex items-start justify-between gap-3 bg-surface-container-low p-3.5 rounded-2xl border border-surface-container-high">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-primary/10 text-primary">
                  Stage {currentStage.stageNumber} of {currentPlan.stages.length}
                </span>
                <span className="text-xs font-bold text-secondary">
                  {currentStage.dayRange}
                </span>
                {currentStage.status === 'current' && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-error-container text-on-error-container">
                    ● Farm Current Stage
                  </span>
                )}
              </div>
              <h3 className="font-extrabold text-base text-on-surface mt-1">
                {currentStage.stageName}
              </h3>
              <p className="text-xs text-primary font-semibold">
                {currentStage.stageNameHindi}
              </p>
            </div>

            <button
              onClick={() => handleSetReminder(currentStage.stageName)}
              className="px-3 py-2 rounded-xl bg-surface-container-lowest border border-surface-container-high hover:border-primary text-primary font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-2xs transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">notifications_active</span>
              <span>Set Spray Alert</span>
            </button>
          </div>

          {/* Vital Agronomic Tasks */}
          <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-surface-container-high space-y-2">
            <span className="text-xs font-bold text-on-surface flex items-center gap-1">
              <span className="material-symbols-outlined text-secondary text-[18px]">checklist</span>
              Key Field Operations (मुख्य कार्य):
            </span>
            <ul className="space-y-1.5">
              {currentStage.vitalTasks.map((task, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-on-surface">
                  <span className="material-symbols-outlined text-secondary text-[16px] shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Spray Guidance */}
          <div className="p-3 rounded-xl bg-secondary-fixed/20 border border-secondary/30 flex items-start gap-2">
            <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
              water_drop
            </span>
            <div className="text-xs text-on-surface">
              <span className="font-bold">Recommended Spray Instruction: </span>
              <span>{currentStage.sprayInstructions}</span>
            </div>
          </div>

          {/* Required Products for this Stage */}
          {stageProducts.length > 0 && (
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-on-surface uppercase tracking-wider">
                Stage Essential Formulations &amp; Inputs:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {stageProducts.map((prod) => (
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
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 pt-1 border-t border-surface-container-high/60">
                      {onOpenDosageCalculator && (
                        <button
                          type="button"
                          onClick={() => {
                            onOpenDosageCalculator(prod);
                            onClose();
                          }}
                          className="flex-1 py-1.5 rounded-lg border border-surface-container-high text-on-surface text-[11px] font-bold hover:bg-surface-container flex items-center justify-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[14px]">calculate</span>
                          <span>Dosage</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => onAddToCart(prod)}
                        className="flex-1 py-1.5 rounded-lg bg-primary text-on-primary text-[11px] font-bold hover:bg-primary-container flex items-center justify-center gap-1 shadow-2xs"
                      >
                        <span className="material-symbols-outlined text-[14px]">add_shopping_cart</span>
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Toast */}
        {reminderToast && (
          <div className="p-2.5 bg-secondary text-on-secondary text-xs font-bold text-center animate-in slide-in-from-bottom-2">
            ✓ {reminderToast}
          </div>
        )}

        {/* Footer */}
        <div className="p-3 bg-surface-container-low border-t border-surface-container-high flex items-center justify-between text-xs">
          <span className="text-outline text-[11px]">
            Total duration: {currentPlan.totalDurationDays} days · Certified KVK Protocol
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-primary text-on-primary font-bold hover:bg-primary-container transition-colors shadow-2xs"
          >
            Close Plan
          </button>
        </div>
      </div>
    </div>
  );
};
