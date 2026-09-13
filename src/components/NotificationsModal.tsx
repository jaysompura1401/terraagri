import React from 'react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: string) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  if (!isOpen) return null;

  const NOTIFICATIONS = [
    {
      id: 1,
      type: 'delivery',
      icon: 'local_shipping',
      iconBg: 'bg-primary/10 text-primary',
      title: 'Consignment Out for Delivery',
      desc: 'Vehicle MH 15 EG 4402 is 12km from Survey 142 Gate 2. Driver Kailash Shinde.',
      time: '10m ago',
      action: 'orders'
    },
    {
      id: 2,
      type: 'weather',
      icon: 'thunderstorm',
      iconBg: 'bg-tertiary-fixed text-tertiary',
      title: 'Monsoon Spray Advisory',
      desc: 'IMD forecasts scattered rain in Nashik valley by 6 PM. Complete systemic sprays with sticker adjuvant.',
      time: '1h ago',
      action: 'home'
    },
    {
      id: 3,
      type: 'mandi',
      icon: 'trending_up',
      iconBg: 'bg-secondary-fixed text-secondary',
      title: 'Soybean Mandi Bullish',
      desc: 'Latur & Akola APMC crossed ₹4,850/quintal today (+₹110).',
      time: '3h ago',
      action: 'home'
    },
    {
      id: 4,
      type: 'certificate',
      icon: 'verified',
      iconBg: 'bg-primary-fixed text-primary',
      title: 'Seed Germination Batch Verified',
      desc: 'Your Mahyco Hybrid Tomato lot #MY-902 passed 92% laboratory germination test.',
      time: 'Yesterday',
      action: 'orders'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-md max-h-[85vh] flex flex-col shadow-2xl border border-surface-container-high overflow-hidden animate-in fade-in zoom-in-95">
        <div className="p-4 bg-surface-container-low border-b border-surface-container-high flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">
              notifications
            </span>
            <h3 className="font-bold text-base text-on-surface">Agri Alerts &amp; Updates</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-3 overflow-y-auto divide-y divide-surface-container-high">
          {NOTIFICATIONS.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                onClose();
                onNavigate(n.action);
              }}
              className="py-3 px-2 flex items-start gap-3 hover:bg-surface-container-low rounded-xl transition-colors cursor-pointer"
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${n.iconBg}`}
              >
                <span className="material-symbols-outlined text-[20px]">{n.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-on-surface">{n.title}</h4>
                  <span className="text-[10px] text-on-surface-variant">{n.time}</span>
                </div>
                <p className="text-[11px] text-on-surface-variant mt-0.5 leading-snug">{n.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 bg-surface-container-low border-t border-surface-container-high">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-lg bg-surface-container-highest text-on-surface font-bold text-xs"
          >
            Close Alerts
          </button>
        </div>
      </div>
    </div>
  );
};
