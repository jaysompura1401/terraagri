import React, { useState } from 'react';
import { PROFILE_AVATAR_URL } from '../data/agriData';

interface ProfileScreenProps {
  onNavigate: (screen: string) => void;
  onOpenCallExpert: () => void;
  onOpenMandiModal: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onNavigate,
  onOpenCallExpert,
  onOpenMandiModal
}) => {
  const [language, setLanguage] = useState<'mr' | 'hi' | 'en'>('en');

  return (
    <div className="flex flex-col w-full pb-28 pt-24 max-w-screen-md mx-auto px-4 space-y-4">
      {/* Profile Header Card */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 border border-surface-container-high/60 shadow-xs flex items-center gap-4">
        <img
          src={PROFILE_AVATAR_URL}
          alt="Ramesh Patil"
          className="w-16 h-16 rounded-full object-cover ring-4 ring-primary/20 shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h1 className="text-lg font-bold text-on-surface truncate">Ramesh Patil</h1>
            <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
          </div>
          <p className="text-xs text-on-surface-variant">
            Dindori, Nashik · Survey #142 (14.5 Acres)
          </p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="bg-secondary-fixed text-on-secondary-fixed-variant text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              Gold Kisan Club
            </span>
            <span className="text-[11px] text-primary font-bold">240 Agri Points</span>
          </div>
        </div>
      </div>

      {/* Farm Land & Crop Profile Bento */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 border border-surface-container-high/60 shadow-xs space-y-3">
        <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider">
          Registered Land &amp; Active Crops
        </h3>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high/50">
            <span className="text-on-surface-variant text-[11px]">Total Land</span>
            <p className="font-bold text-sm text-on-surface mt-0.5">14.5 Acres</p>
            <span className="text-[10px] text-primary font-medium">Drip Irrigated</span>
          </div>

          <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high/50">
            <span className="text-on-surface-variant text-[11px]">Primary Crop</span>
            <p className="font-bold text-sm text-on-surface mt-0.5">Grapes &amp; Onion</p>
            <span className="text-[10px] text-secondary font-medium">Export Grade</span>
          </div>

          <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high/50">
            <span className="text-on-surface-variant text-[11px]">Soil Status</span>
            <p className="font-bold text-sm text-on-surface mt-0.5">pH 7.2</p>
            <span className="text-[10px] text-primary font-medium">Medium Black</span>
          </div>
        </div>
      </div>

      {/* App Language Preference */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 border border-surface-container-high/60 shadow-xs space-y-2.5">
        <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider">
          Regional Language (भाषा निवडा)
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {[
            { code: 'mr', label: 'मराठी' },
            { code: 'hi', label: 'हिंदी' },
            { code: 'en', label: 'English' }
          ].map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code as any)}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                language === lang.code
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Links Menu */}
      <div className="bg-surface-container-lowest rounded-2xl border border-surface-container-high/60 shadow-xs divide-y divide-surface-container-high overflow-hidden">
        <button
          onClick={() => onNavigate('orders')}
          className="w-full p-3.5 flex items-center justify-between hover:bg-surface-container-low transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface">Order Tracking &amp; History</p>
              <p className="text-[11px] text-on-surface-variant">Track consignments to field gate</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
            chevron_right
          </span>
        </button>

        <button
          onClick={onOpenMandiModal}
          className="w-full p-3.5 flex items-center justify-between hover:bg-surface-container-low transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[20px]">trending_up</span>
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface">APMC Mandi Rates Bulletin</p>
              <p className="text-[11px] text-on-surface-variant">Live market price ticker for crops</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
            chevron_right
          </span>
        </button>

        <button
          onClick={onOpenCallExpert}
          className="w-full p-3.5 flex items-center justify-between hover:bg-surface-container-low transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">support_agent</span>
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface">Kisan Agronomist Helpline</p>
              <p className="text-[11px] text-on-surface-variant">Direct talk with crop specialists</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
            chevron_right
          </span>
        </button>

        <div className="p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined text-[20px]">phone_in_talk</span>
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface">Govt Kisan Call Centre</p>
              <p className="text-[11px] text-on-surface-variant">Toll-Free 1800-180-1551</p>
            </div>
          </div>
          <a
            href="tel:18001801551"
            className="px-3 py-1 rounded-lg bg-surface-container text-primary font-bold text-xs hover:bg-surface-container-high"
          >
            Call
          </a>
        </div>
      </div>
    </div>
  );
};
