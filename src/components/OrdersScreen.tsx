import React, { useState } from 'react';
import { Order } from '../types';

interface OrdersScreenProps {
  orders: Order[];
  onNavigate: (screen: string) => void;
  onSelectOrder?: (orderId: string) => void;
  onReorder?: (order: Order) => void;
  onOpenCallDriver?: (phone: string) => void;
}

export const OrdersScreen: React.FC<OrdersScreenProps> = ({
  orders,
  onNavigate,
  onReorder,
  onOpenCallDriver
}) => {
  const [activeTab, setActiveTab] = useState<'tracking' | 'history'>('tracking');
  const [selectedOrderId, setSelectedOrderId] = useState<string>(orders[0]?.id || 'AGRI-8921-44');
  const [downloadingInvoice, setDownloadingInvoice] = useState(false);

  const activeOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  const driver = activeOrder?.driver || activeOrder?.courier || {
    name: 'Kailash Shinde',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 4.9,
    vehicle: 'Mahindra Bolero Maxi Truck (MH 15 EG 4402)',
    phone: '+91 98220 14421'
  };

  const timeline = activeOrder?.timeline || (activeOrder?.steps?.map((s) => ({
    title: s.title,
    time: s.time,
    description: s.description,
    completed: s.status === 'completed'
  })) || [
    { title: 'Order Confirmed', time: '09:30 AM', description: 'Verified OEM batch dispense.', completed: true },
    { title: 'Out for Delivery', time: '03:45 PM', description: 'Rural delivery van en route.', completed: false }
  ]);

  const deliveryAddressText = typeof activeOrder?.deliveryAddress === 'string'
    ? activeOrder.deliveryAddress
    : activeOrder?.deliveryAddress?.address
    ? `${activeOrder.deliveryAddress.address}, ${activeOrder.deliveryAddress.pincode}`
    : 'Field Gate 2, Survey 142, Dindori Road, Nashik, Maharashtra 422003';

  const orderTotal = activeOrder?.totalAmount ?? activeOrder?.pricing?.total ?? 3350;

  const handleDownloadInvoice = () => {
    setDownloadingInvoice(true);
    setTimeout(() => {
      setDownloadingInvoice(false);
      const content = `TERRAAGRI TAX INVOICE\nOrder ID: ${activeOrder?.id}\nDate: ${activeOrder?.orderDate || activeOrder?.placedDate}\nDeliver to: ${deliveryAddressText}\nTotal Amount: ₹${orderTotal}\nStatus: GST Paid`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Invoice_${activeOrder?.id}.txt`;
      a.click();
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-24 max-w-screen-md mx-auto">
      {/* Header */}
      <div className="px-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              aria-label="Back to home"
              onClick={() => onNavigate('home')}
              className="w-9 h-9 -ml-1 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
            <div>
              <h1 className="text-xl font-bold text-on-surface">Farm Delivery Dispatch</h1>
              <p className="text-xs text-on-surface-variant">
                Order <span className="font-mono font-bold text-primary">{activeOrder.id}</span>
              </p>
            </div>
          </div>

          {/* Tab Pill Selector */}
          <div className="flex bg-surface-container-low p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('tracking')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'tracking'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Live Tracking
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'history'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Past Orders ({orders.length})
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'tracking' && (
        <div className="px-4 space-y-4 pt-1">
          {/* Status Hero Banner */}
          <div className="bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-2xl p-4 shadow-md relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="bg-secondary-fixed text-on-secondary-fixed-variant text-[11px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
                  {activeOrder.status === 'out_for_delivery'
                    ? 'Out for Delivery'
                    : activeOrder.status === 'delivered'
                    ? 'Delivered'
                    : 'Dispatched'}
                </span>
                <h2 className="text-xl font-bold leading-tight mt-1">
                  Arriving Today by {activeOrder.estimatedDeliveryTime}
                </h2>
                <p className="text-xs text-on-primary-container">
                  Direct transport via Rural Cold-Chain Van to Field Gate
                </p>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-on-primary shrink-0 shadow-inner">
                <span className="material-symbols-outlined text-[28px] animate-pulse">
                  local_shipping
                </span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between text-xs">
              <span className="text-on-primary-container">Current Hub: Nashik Rural Sub-Depot</span>
              <span className="font-bold font-mono">OTP: 7421</span>
            </div>
          </div>

          {/* Stepper Tracking Flow */}
          <div className="bg-surface-container-lowest rounded-2xl p-4 border border-surface-container-high/60 shadow-xs">
            <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[18px]">
                route
              </span>
              Consignment Progress
            </h3>

            <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-container-high">
              {timeline.map((item, idx) => {
                const isDone = item.completed;
                const isCurrent = !item.completed && idx === 2; // e.g. current step

                return (
                  <div key={idx} className="relative flex items-start gap-4 pl-1">
                    {/* Circle Indicator */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ${
                        isDone
                          ? 'bg-primary text-on-primary'
                          : isCurrent
                          ? 'bg-secondary ring-4 ring-secondary/20 text-on-secondary animate-pulse'
                          : 'bg-surface-container-high text-on-surface-variant'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {isDone ? 'check' : isCurrent ? 'radio_button_checked' : 'schedule'}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4
                          className={`text-xs font-bold leading-tight ${
                            isDone || isCurrent ? 'text-on-surface' : 'text-on-surface-variant'
                          }`}
                        >
                          {item.title}
                        </h4>
                        <span className="text-[11px] text-on-surface-variant font-mono">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-on-surface-variant mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Partner Details Card */}
          <div className="bg-surface-container-lowest rounded-2xl p-4 border border-surface-container-high/60 shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider">
                Assigned Logistics Partner
              </h3>
              <span className="text-[11px] font-bold text-primary bg-surface-container-low px-2 py-0.5 rounded-full">
                TerraAgri Rural Express
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={driver.photo}
                  alt={driver.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div>
                  <h4 className="font-bold text-sm text-on-surface">{driver.name}</h4>
                  <div className="flex items-center gap-1 text-xs text-on-surface-variant mt-0.5">
                    <span
                      className="material-symbols-outlined text-[14px] text-tertiary-container"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="font-bold text-on-surface">{driver.rating}</span>
                    <span>· 420+ Farm Deliveries</span>
                  </div>
                  <p className="text-[11px] font-mono text-outline mt-0.5">
                    Vehicle: {driver.vehicle}
                  </p>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="flex items-center gap-2">
                <button
                  aria-label="Call delivery agent"
                  onClick={() =>
                    onOpenCallDriver
                      ? onOpenCallDriver(driver.phone)
                      : window.open(`tel:${driver.phone}`)
                  }
                  className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-xs hover:bg-primary-container transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined text-[20px]">call</span>
                </button>
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-xs hover:bg-secondary transition-all active:scale-95"
                  title="WhatsApp driver"
                >
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                </a>
              </div>
            </div>
          </div>

          {/* Delivery Destination (Field Address) */}
          <div className="bg-surface-container-lowest rounded-2xl p-4 border border-surface-container-high/60 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-[20px]">pin_drop</span>
              <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider">
                Farm Gate Destination
              </h3>
            </div>
            <p className="text-sm font-semibold text-on-surface">
              {deliveryAddressText}
            </p>
            <p className="text-xs text-on-surface-variant bg-surface-container-low p-2 rounded-lg">
              <strong className="text-on-surface">Field Note:</strong> Please unload near tractor shed.
              Farmer will inspect packaging seal before giving OTP.
            </p>
          </div>

          {/* Items in this Consignment */}
          <div className="bg-surface-container-lowest rounded-2xl p-4 border border-surface-container-high/60 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider">
              Items in Consignment ({activeOrder.items.length})
            </h3>

            <div className="divide-y divide-surface-container-high">
              {activeOrder.items.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-lg object-contain bg-surface-container-low p-1 shrink-0"
                    />
                    <div>
                      <h5 className="font-bold text-xs text-on-surface line-clamp-1">
                        {item.product.name}
                      </h5>
                      <span className="text-[11px] text-on-surface-variant">
                        Pack: {item.selectedPackSize} · Qty: {item.quantity}
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-sm text-on-surface shrink-0">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Bill Summary */}
            <div className="pt-2 border-t border-surface-container-high space-y-1.5 text-xs">
              <div className="flex justify-between text-on-surface-variant">
                <span>Items Subtotal</span>
                <span>₹{activeOrder.totalAmount}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Rural Agro-Transport Logistics</span>
                <span className="text-primary font-bold">FREE (Kharif Offer)</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>GST Tax Breakdown (18%)</span>
                <span>Included</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-on-surface pt-1 border-t border-surface-container-high">
                <span>Total Amount Paid</span>
                <span className="text-primary text-base font-bold">
                  ₹{activeOrder.totalAmount}
                </span>
              </div>
            </div>

            {/* Download Tax Invoice */}
            <button
              onClick={handleDownloadInvoice}
              disabled={downloadingInvoice}
              className="w-full py-2.5 rounded-xl border border-surface-container-high text-on-surface hover:bg-surface-container-low text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">
                {downloadingInvoice ? 'progress_activity' : 'receipt_long'}
              </span>
              <span>{downloadingInvoice ? 'Generating Tax Invoice...' : 'Download Official GST Invoice (PDF)'}</span>
            </button>
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="px-4 space-y-3 pt-1">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-surface-container-lowest rounded-2xl p-4 border border-surface-container-high/60 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-xs text-primary">{order.id}</span>
                  <p className="text-[11px] text-on-surface-variant">Ordered on {order.orderDate}</p>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    order.status === 'delivered'
                      ? 'bg-secondary-container text-on-secondary-container'
                      : 'bg-primary/10 text-primary'
                  }`}
                >
                  {order.status.replace(/_/g, ' ')}
                </span>
              </div>

              <div className="space-y-1.5">
                {order.items.map((it, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-on-surface truncate">
                      {it.quantity}x {it.product.name} ({it.selectedPackSize})
                    </span>
                    <span className="font-bold text-on-surface">₹{it.price * it.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-surface-container-high flex items-center justify-between">
                <span className="font-bold text-sm text-primary">₹{order.totalAmount}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedOrderId(order.id);
                      setActiveTab('tracking');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface text-xs font-bold hover:bg-surface-container-high transition-colors"
                  >
                    View Status
                  </button>
                  {onReorder && (
                    <button
                      onClick={() => onReorder(order)}
                      className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-bold hover:bg-primary-container transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">replay</span>
                      Reorder
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
