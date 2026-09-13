import React, { useState } from 'react';
import { BRAND_LOGO_URL, PROFILE_AVATAR_URL } from '../data/agriData';

interface HeaderProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  wishlistCount: number;
  deliveryLocation: string;
  onSelectLocation: (loc: string) => void;
  onOpenNotifications: () => void;
  onOpenWishlist?: () => void;
  onOpenQrScanner?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  wishlistCount,
  deliveryLocation,
  onSelectLocation,
  onOpenNotifications,
  onOpenWishlist,
  onOpenQrScanner
}) => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [customLocationInput, setCustomLocationInput] = useState('');

  const LOCATIONS = [
    { name: 'Nashik, Maharashtra 422003', details: 'Field Gate 2, Survey 142, Dindori Road' },
    { name: 'Pimpalgaon Baswant, Nashik 422209', details: 'Gut No. 42, Farm House Warehouse' },
    { name: 'Lasalgaon, Niphad 422306', details: 'APMC Market Road, Onion Storage Hub' },
    { name: 'Nagpur Central Hub 440001', details: 'Plot 18, MIDC Hingna Agricultural Yard' },
    { name: 'Baramati Agro Hub, Pune 413102', details: 'Gate 4, Sugar Factory Road, Baramati' },
    { name: 'Aurangabad / Chh. Sambhajinagar 431005', details: 'Sector B-3, Waluj Agri Warehouse' }
  ];

  const handleCustomLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customLocationInput.trim()) {
      onSelectLocation(customLocationInput.trim());
      setCustomLocationInput('');
      setShowLocationModal(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 w-full z-40 pt-safe bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container/60">
        <div className="h-20 max-w-screen-md mx-auto px-4 flex flex-col justify-center gap-1">
          {/* Top Bar */}
          <div className="flex items-center justify-between gap-2">
            {/* Brand Logo - displayed once */}
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 group text-left focus:outline-none shrink-0"
              aria-label="TerraAgri Home"
            >
              <img
                alt="TerraAgri"
                className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
                src={BRAND_LOGO_URL}
              />
            </button>

            {/* Actions: QR Scanner, Wishlist, Notification, Profile */}
            <div className="flex items-center gap-1">
              {/* QR Scanner */}
              {onOpenQrScanner && (
                <button
                  aria-label="Scan Product QR & Hologram"
                  onClick={onOpenQrScanner}
                  className="h-9 px-2.5 rounded-full flex items-center gap-1 text-primary bg-primary/10 hover:bg-primary/20 transition-all font-bold text-xs shadow-2xs border border-primary/20"
                  title="Scan Product QR / Hologram"
                >
                  <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
                  <span className="hidden sm:inline">Scan QR</span>
                </button>
              )}

              {/* Wishlist */}
              <button
                aria-label="Wishlist"
                onClick={() => {
                  if (onOpenWishlist) {
                    onOpenWishlist();
                  } else {
                    onNavigate('categories');
                  }
                }}
                className="w-10 h-10 relative flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-container-low"
                title="Saved Products"
              >
                <span className="material-symbols-outlined text-[22px]">favorite</span>
                {wishlistCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-error text-on-error font-bold text-[10px] flex items-center justify-center leading-none">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Notification */}
              <button
                aria-label="Notifications"
                onClick={onOpenNotifications}
                className="w-10 h-10 relative flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-container-low"
              >
                <span className="material-symbols-outlined text-[22px]">notifications</span>
                <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-primary ring-2 ring-surface"></span>
              </button>

              {/* Profile Avatar */}
              <button
                onClick={() => onNavigate('profile')}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:ring-2 hover:ring-primary/40 transition-all ml-0.5"
                title="Ramesh Patil's Farm Profile"
              >
                <img
                  alt="Farmer Profile"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
                  src={PROFILE_AVATAR_URL}
                />
              </button>
            </div>
          </div>

          {/* Deliver to address line */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowLocationModal(true)}
              className="flex items-center gap-1.5 bg-surface-container-low px-2.5 py-0.5 rounded-full hover:bg-surface-container transition-colors max-w-full text-left min-w-0"
            >
              <span className="material-symbols-outlined text-[16px] text-primary shrink-0">
                location_on
              </span>
              <span className="text-[11px] text-on-surface truncate font-sans">
                Deliver to: <span className="font-bold text-on-surface">{deliveryLocation}</span>
              </span>
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant shrink-0">
                arrow_drop_down
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Location Picker Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl w-full max-w-md p-5 shadow-2xl border border-surface-container-high animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-[22px]">pin_drop</span>
                <h3 className="font-bold text-lg text-on-surface">Select Farm Delivery Point</h3>
              </div>
              <button
                onClick={() => setShowLocationModal(false)}
                className="w-8 h-8 rounded-full hover:bg-surface-container-low flex items-center justify-center text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <p className="text-xs text-on-surface-variant mb-3">
              Delivery logistics will route via certified rural agro-freight pickup vans directly to your field gate.
            </p>

            {/* Custom location input */}
            <form onSubmit={handleCustomLocationSubmit} className="mb-3">
              <div className="flex items-center gap-1.5 bg-surface-container-low p-1.5 rounded-xl border border-surface-container-high focus-within:border-primary">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant pl-1">
                  edit_location
                </span>
                <input
                  type="text"
                  placeholder="Enter village, survey no., or pin code..."
                  value={customLocationInput}
                  onChange={(e) => setCustomLocationInput(e.target.value)}
                  className="bg-transparent border-none text-xs text-on-surface focus:outline-none flex-1 placeholder:text-outline"
                />
                <button
                  type="submit"
                  disabled={!customLocationInput.trim()}
                  className="bg-primary text-on-primary px-3 py-1 rounded-lg text-xs font-bold disabled:opacity-50 transition-opacity"
                >
                  Set
                </button>
              </div>
            </form>

            <div className="space-y-2">
              {LOCATIONS.map((loc, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onSelectLocation(loc.name);
                    setShowLocationModal(false);
                  }}
                  className={`w-full p-3 rounded-xl border text-left transition-all flex items-start gap-3 ${
                    deliveryLocation.includes(loc.name.split(',')[0])
                      ? 'border-primary bg-surface-container-low text-primary ring-1 ring-primary'
                      : 'border-surface-container-high hover:bg-surface-container-lowest hover:border-outline-variant'
                  }`}
                >
                  <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">
                    agriculture
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-on-surface">{loc.name}</p>
                    <p className="text-xs text-on-surface-variant mt-0.5">{loc.details}</p>
                  </div>
                  {deliveryLocation.includes(loc.name.split(',')[0]) && (
                    <span className="material-symbols-outlined text-primary text-[18px]">
                      check_circle
                    </span>
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowLocationModal(false)}
              className="mt-4 w-full py-2.5 rounded-lg bg-surface-container-low text-primary font-bold text-sm hover:bg-surface-container transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
