import React, { useState } from 'react';

interface CallExpertModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

export const CallExpertModal: React.FC<CallExpertModalProps> = ({
  isOpen,
  onClose,
  productName = 'Crop Formulation'
}) => {
  const [requested, setRequested] = useState(false);
  const [phone, setPhone] = useState('+91 98234 56789');
  const [topic, setTopic] = useState('Dosage per Acre & Tank Mixing');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-md p-5 shadow-2xl border border-surface-container-high animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-primary">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined text-[22px]">support_agent</span>
            </div>
            <div>
              <h3 className="font-bold text-base text-on-surface">Kisan Agronomist Desk</h3>
              <p className="text-xs text-secondary font-bold">Free Farmer Consultation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-surface-container-low flex items-center justify-center text-on-surface-variant"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {!requested ? (
          <div className="space-y-3.5">
            <div className="p-3 rounded-xl bg-surface-container-low text-xs text-on-surface flex items-start gap-2.5">
              <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">
                verified
              </span>
              <div>
                <p className="font-bold text-on-surface">Dr. Aniket Deshmukh (M.Sc. Agronomy)</p>
                <p className="text-on-surface-variant mt-0.5">
                  Available in Marathi, Hindi, & English for personalized spray schedules for {productName}.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface mb-1">
                Your Contact Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-surface-container-high text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface mb-1">
                Select Advice Topic
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-surface-container-high text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest"
              >
                <option>Dosage per Acre & Tank Mixing</option>
                <option>Crop Disease Identification</option>
                <option>Soil Test & Basal Fertilizer Recommendation</option>
                <option>Pre-Harvest Spray Safety Interval</option>
              </select>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => setRequested(true)}
                className="w-full py-3 rounded-xl bg-secondary text-on-secondary font-bold text-sm hover:bg-primary transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                Request Immediate Call (within 2 mins)
              </button>

              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl border border-surface-container-high text-on-surface font-bold text-sm hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px] text-primary">chat</span>
                Chat via WhatsApp
              </a>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-secondary-fixed/50 text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-[32px]">check_circle</span>
            </div>
            <h4 className="font-bold text-lg text-on-surface">Call Request Registered!</h4>
            <p className="text-xs text-on-surface-variant max-w-xs mx-auto">
              Our Agronomist is connecting to <strong className="text-on-surface">{phone}</strong>. Please keep your phone nearby.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2 rounded-lg bg-primary text-on-primary font-bold text-sm"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
