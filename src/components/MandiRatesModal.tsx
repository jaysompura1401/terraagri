import React from 'react';
import { MANDI_RATES } from '../data/agriData';

interface MandiRatesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MandiRatesModal: React.FC<MandiRatesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-lg max-h-[85vh] flex flex-col shadow-2xl border border-surface-container-high overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-4 bg-surface-container-low border-b border-surface-container-high flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-secondary-fixed/50 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[20px]">trending_up</span>
            </div>
            <div>
              <h3 className="font-bold text-base text-on-surface">APMC Daily Mandi Bulletin</h3>
              <p className="text-xs text-on-surface-variant">
                Live Maharashtra Agricultural Produce Market Rates
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-3">
          <div className="p-3 rounded-xl bg-secondary-fixed/20 border border-secondary-fixed flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-secondary uppercase">Today's Market Pulse</p>
              <p className="text-xs text-on-surface">
                Soybean & Onion prices surged +2.5% following robust festival export demand.
              </p>
            </div>
            <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container-lowest px-2 py-1 rounded-full shrink-0">
              Govt e-NAM Sync
            </span>
          </div>

          <div className="divide-y divide-surface-container-high">
            {MANDI_RATES.map((rate, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-on-surface">{rate.crop}</h4>
                  <p className="text-xs text-on-surface-variant">{rate.market}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-base text-primary">
                    ₹{rate.ratePerQtl.toLocaleString('en-IN')}{' '}
                    <span className="text-xs font-normal text-on-surface-variant">/ qtl</span>
                  </span>
                  <div
                    className={`text-xs font-semibold flex items-center justify-end gap-0.5 ${
                      rate.trend === 'up'
                        ? 'text-primary'
                        : rate.trend === 'down'
                        ? 'text-error'
                        : 'text-on-surface-variant'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {rate.trend === 'up'
                        ? 'arrow_upward'
                        : rate.trend === 'down'
                        ? 'arrow_downward'
                        : 'horizontal_rule'}
                    </span>
                    {rate.change}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-surface-container-low rounded-xl text-xs text-on-surface-variant">
            <p className="font-bold text-on-surface mb-0.5">Need price hedging advisory?</p>
            <p>Connect with TerraAgri Mandi Desk to book forward deliveries directly with millers.</p>
          </div>
        </div>

        <div className="p-3 bg-surface-container-low border-t border-surface-container-high">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-lg bg-primary text-on-primary font-bold text-sm hover:bg-primary-container transition-colors"
          >
            Close Bulletin
          </button>
        </div>
      </div>
    </div>
  );
};
