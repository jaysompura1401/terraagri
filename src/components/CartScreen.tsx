import React, { useState } from 'react';
import { CartItem, Product } from '../types';

interface CartScreenProps {
  cart: CartItem[];
  onUpdateQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onPlaceOrder: (details: {
    address: string;
    paymentMethod: string;
    total: number;
  }) => void;
  onNavigate: (screen: string) => void;
  onSelectProduct: (p: Product) => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  cart,
  onUpdateQty,
  onRemoveItem,
  onPlaceOrder,
  onNavigate,
  onSelectProduct
}) => {
  const [promoCode, setPromoCode] = useState('KHARIF35');
  const [appliedPromo, setAppliedPromo] = useState<string | null>('KHARIF35');
  const [promoError, setPromoError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'kcc'>('upi');
  const [address, setAddress] = useState(
    'Field Gate 2, Survey 142, Dindori Road, Nashik, Maharashtra - 422003'
  );
  const [isOrdering, setIsOrdering] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.price ?? item.product.price) * item.quantity, 0);
  const discount = appliedPromo === 'KHARIF35' ? Math.round(subtotal * 0.15) : appliedPromo === 'KISAN100' ? 100 : 0;
  const deliveryFee = subtotal > 1000 ? 0 : 80;
  const grandTotal = Math.max(0, subtotal - discount + deliveryFee);

  const handleApplyPromo = () => {
    setPromoError(null);
    if (promoCode.trim().toUpperCase() === 'KHARIF35') {
      setAppliedPromo('KHARIF35');
    } else if (promoCode.trim().toUpperCase() === 'KISAN100') {
      setAppliedPromo('KISAN100');
    } else {
      setPromoError('Invalid coupon. Try KHARIF35 or KISAN100 for verified seasonal discount.');
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsOrdering(true);
    setTimeout(() => {
      setIsOrdering(false);
      onPlaceOrder({
        address,
        paymentMethod,
        total: grandTotal
      });
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center pb-28 pt-24 max-w-screen-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant mb-3">
          <span className="material-symbols-outlined text-[40px]">shopping_basket</span>
        </div>
        <h2 className="text-xl font-bold text-on-surface">Your Agro-Cart is Empty</h2>
        <p className="text-xs text-on-surface-variant max-w-xs mt-1">
          Explore certified hybrid seeds, fertilizers, and plant protection formulations.
        </p>
        <button
          onClick={() => onNavigate('categories')}
          className="mt-5 px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-xs hover:bg-primary-container transition-all"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-32 pt-24 max-w-screen-md mx-auto px-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-on-surface">Farm Gate Agro Cart</h1>
          <p className="text-xs text-on-surface-variant">
            {cart.length} item{cart.length > 1 ? 's' : ''} ready for rural delivery
          </p>
        </div>
        <button
          onClick={() => onNavigate('categories')}
          className="text-xs font-bold text-primary hover:underline"
        >
          + Add more items
        </button>
      </div>

      {/* Cart Items List */}
      <div className="space-y-3">
        {cart.map((item) => (
          <div
            key={`${item.product.id}-${item.selectedPackSize}`}
            className="bg-surface-container-lowest rounded-2xl p-3.5 border border-surface-container-high/60 shadow-xs flex gap-3"
          >
            <img
              src={item.product.images[0]}
              alt={item.product.name}
              onClick={() => onSelectProduct(item.product)}
              className="w-20 h-20 rounded-xl object-contain bg-surface-container-low p-1.5 cursor-pointer shrink-0"
            />
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-1">
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase">
                      {item.product.brand}
                    </span>
                    <h3
                      onClick={() => onSelectProduct(item.product)}
                      className="font-bold text-sm text-on-surface line-clamp-1 cursor-pointer hover:text-primary"
                    >
                      {item.product.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="text-outline hover:text-error transition-colors p-1"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Pack: <span className="font-semibold text-on-surface">{item.selectedPackSize}</span>
                </p>
              </div>

              <div className="flex items-center justify-between mt-2 pt-1 border-t border-surface-container-high/40">
                <span className="font-bold text-base text-primary">
                  ₹{(item.price ?? item.product.price) * item.quantity}
                </span>

                {/* Stepper */}
                <div className="flex items-center bg-surface-container-low rounded-lg p-0.5 border border-surface-container-high">
                  <button
                    onClick={() => onUpdateQty(item.product.id, -1)}
                    className="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-surface-container rounded"
                  >
                    <span className="material-symbols-outlined text-[16px]">remove</span>
                  </button>
                  <span className="w-6 text-center text-xs font-bold text-on-surface">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQty(item.product.id, 1)}
                    className="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-surface-container rounded"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Promo Coupon Section */}
      <div className="bg-surface-container-lowest rounded-2xl p-3.5 border border-surface-container-high/60 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-secondary text-[20px]">local_offer</span>
          <h3 className="font-bold text-xs text-on-surface uppercase tracking-wider">
            Seasonal Discount Coupon
          </h3>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            placeholder="Enter Coupon (e.g. KHARIF35)"
            className="flex-1 px-3 py-2 text-xs rounded-xl border border-surface-container-high font-mono uppercase bg-surface-container-low text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            onClick={handleApplyPromo}
            className="px-4 py-2 bg-secondary text-on-secondary hover:bg-primary font-bold text-xs rounded-xl transition-colors shadow-xs"
          >
            Apply
          </button>
        </div>
        {promoError && (
          <p className="text-[11px] text-error font-semibold mt-1.5 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">error</span>
            {promoError}
          </p>
        )}
        {appliedPromo && !promoError && (
          <p className="text-[11px] text-primary font-semibold mt-1.5 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">check_circle</span>
            Coupon {appliedPromo} applied: Saving ₹{discount}!
          </p>
        )}
      </div>

      {/* Delivery Farm Location */}
      <div className="bg-surface-container-lowest rounded-2xl p-3.5 border border-surface-container-high/60 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">pin_drop</span>
            <h3 className="font-bold text-xs text-on-surface uppercase tracking-wider">
              Farm Gate Delivery Point
            </h3>
          </div>
          <span className="text-[11px] font-bold text-primary">Standard Route</span>
        </div>
        <textarea
          rows={2}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2.5 text-xs rounded-xl border border-surface-container-high bg-surface-container-low text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <p className="text-[11px] text-on-surface-variant">
          Vehicle access verified for tractor / 3-wheeler rural trucks.
        </p>
      </div>

      {/* Payment Method Selector */}
      <div className="bg-surface-container-lowest rounded-2xl p-3.5 border border-surface-container-high/60 shadow-xs space-y-2.5">
        <h3 className="font-bold text-xs text-on-surface uppercase tracking-wider">
          Payment Method
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setPaymentMethod('upi')}
            className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
              paymentMethod === 'upi'
                ? 'border-primary bg-primary/5 text-primary font-bold ring-1 ring-primary'
                : 'border-surface-container-high bg-surface-container-low text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
            <span className="text-xs">UPI / GPay</span>
            <span className="text-[9px] text-on-surface-variant">Instant 0% Fee</span>
          </button>

          <button
            onClick={() => setPaymentMethod('cod')}
            className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
              paymentMethod === 'cod'
                ? 'border-primary bg-primary/5 text-primary font-bold ring-1 ring-primary'
                : 'border-surface-container-high bg-surface-container-low text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">payments</span>
            <span className="text-xs">Farm Gate Cash</span>
            <span className="text-[9px] text-on-surface-variant">Pay on Delivery</span>
          </button>

          <button
            onClick={() => setPaymentMethod('kcc')}
            className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
              paymentMethod === 'kcc'
                ? 'border-primary bg-primary/5 text-primary font-bold ring-1 ring-primary'
                : 'border-surface-container-high bg-surface-container-low text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">credit_card</span>
            <span className="text-xs">Kisan Card (KCC)</span>
            <span className="text-[9px] text-on-surface-variant">Govt DBT Subsidized</span>
          </button>
        </div>
      </div>

      {/* Bill Breakdown */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 border border-surface-container-high/60 shadow-xs space-y-2 text-xs">
        <h3 className="font-bold text-xs text-on-surface uppercase tracking-wider mb-1">
          Price Details
        </h3>
        <div className="flex justify-between text-on-surface-variant">
          <span>Items Total</span>
          <span>₹{subtotal}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-primary font-semibold">
            <span>Kharif Discount</span>
            <span>- ₹{discount}</span>
          </div>
        )}
        <div className="flex justify-between text-on-surface-variant">
          <span>Delivery Logistics</span>
          <span className={deliveryFee === 0 ? 'text-primary font-bold' : ''}>
            {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
          </span>
        </div>
        <div className="flex justify-between text-base font-bold text-on-surface pt-2 border-t border-surface-container-high">
          <span>Final Payable</span>
          <span className="text-primary text-xl font-bold">₹{grandTotal}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        disabled={isOrdering}
        className="w-full py-3.5 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-bold text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
      >
        <span className="material-symbols-outlined text-[20px]">
          {isOrdering ? 'progress_activity' : 'verified'}
        </span>
        <span>
          {isOrdering
            ? 'Transmitting Order to Rural Hub...'
            : `Confirm & Place Order (₹${grandTotal})`}
        </span>
      </button>
    </div>
  );
};
