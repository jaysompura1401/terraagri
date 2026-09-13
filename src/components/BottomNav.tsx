import React from 'react';

interface BottomNavProps {
  activeScreen: string;
  cartCount: number;
  hasActiveOrder?: boolean;
  onNavigate: (screen: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeScreen,
  cartCount,
  hasActiveOrder = true,
  onNavigate
}) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'categories', label: 'Categories', icon: 'grid_view' },
    { id: 'cart', label: 'Cart', icon: 'shopping_bag', badge: cartCount },
    { id: 'orders', label: 'Orders', icon: 'schedule', activePulse: hasActiveOrder },
    { id: 'profile', label: 'Profile', icon: 'person' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 pb-safe bg-surface/95 backdrop-blur-xl shadow-[0_-1px_12px_rgba(0,0,0,0.05)] border-t border-surface-container/60">
      <div className="flex justify-around items-center h-16 max-w-screen-md mx-auto px-2">
        {tabs.map((tab) => {
          const isActive =
            activeScreen === tab.id ||
            (tab.id === 'categories' && activeScreen === 'product_detail');

          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] min-h-[44px] transition-colors group relative ${
                isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-[22px] transition-transform group-hover:scale-110"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {tab.icon}
                </span>

                {/* Number Badge for Cart */}
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1.5 -right-3 min-w-[16px] h-4 px-1 rounded-full bg-primary text-on-primary font-bold text-[10px] flex items-center justify-center leading-none shadow-xs">
                    {tab.badge}
                  </span>
                )}

                {/* Pulse dot for Active Order */}
                {tab.activePulse && tab.id === 'orders' && (
                  <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-secondary-fixed ring-2 ring-surface animate-pulse" />
                )}
              </div>

              <span className="text-[11px] font-sans tracking-tight leading-tight">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
