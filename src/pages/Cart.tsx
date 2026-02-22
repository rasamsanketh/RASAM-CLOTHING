import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Truck, Shield, RotateCcw } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = getCartTotal();
  const shipping = subtotal > 3500 ? 0 : 149;
  const discount = promoCode.toLowerCase() === 'rasam10' ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success('Order placed successfully!');
    clearCart();
    navigate('/');
  };

  const applyPromo = () => {
    if (promoCode.toLowerCase() === 'rasam10') {
      toast.success('Promo code applied! 10% off');
    } else {
      toast.error('Invalid promo code');
    }
  };

  if (items.length === 0) {
    return (
      <div className="cart-page empty">
        <div className="empty-cart">
          <ShoppingBag size={64} className="empty-icon" />
          <h1>YOUR CART IS EMPTY</h1>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/shop" className="btn-primary">
            START SHOPPING <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>SHOPPING CART ({items.length} items)</h1>
      </div>

      <div className="cart-content">
        {/* Cart Items */}
        <div className="cart-items">
          {items.map((item) => (
            <div key={`${item.product.id}-${item.size}-${item.color}`} className="cart-item">
              <Link to={`/product/${item.product.id}`} className="item-image">
                <img src={item.product.image} alt={item.product.name} />
              </Link>
              
              <div className="item-details">
                <Link to={`/product/${item.product.id}`}>
                  <h3 className="item-name">{item.product.name}</h3>
                </Link>
                <p className="item-variant">
                  {item.color} / {item.size}
                </p>
                <p className="item-price">₹{item.product.price.toLocaleString()}</p>
                
                <div className="item-actions">
                  <div className="quantity-selector">
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    >
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                      <Plus size={14} />
                    </button>
                  </div>
                  
                  <button 
                    className="remove-btn"
                    onClick={() => {
                      removeFromCart(item.product.id);
                      toast.success('Item removed from cart');
                    }}
                  >
                    <Trash2 size={16} /> REMOVE
                  </button>
                </div>
              </div>
              
              <div className="item-total">
                ₹{(item.product.price * item.quantity).toLocaleString()}
              </div>
            </div>
          ))}
          
          <div className="cart-actions">
            <Link to="/shop" className="btn-text">
              ← CONTINUE SHOPPING
            </Link>
            <button 
              className="btn-text danger"
              onClick={() => {
                clearCart();
                toast.success('Cart cleared');
              }}
            >
              CLEAR CART
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h2>ORDER SUMMARY</h2>
          
          {/* Promo Code */}
          <div className="promo-code">
            <input
              type="text"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button onClick={applyPromo}>APPLY</button>
          </div>
          
          {/* Summary Details */}
          <div className="summary-details">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
            </div>
            {discount > 0 && (
              <div className="summary-row discount">
                <span>Discount (RASAM10)</span>
                <span>-₹{discount.toLocaleString()}</span>
              </div>
            )}
            <div className="summary-row total">
              <span>TOTAL</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>
          
          {/* Checkout Button */}
          <button 
            className="btn-primary btn-checkout"
            onClick={handleCheckout}
            disabled={isCheckingOut}
          >
            {isCheckingOut ? (
              'PROCESSING...'
            ) : (
              <>
                PROCEED TO CHECKOUT <ArrowRight size={18} />
              </>
            )}
          </button>
          
          {/* Features */}
          <div className="summary-features">
            <div className="feature">
              <Truck size={18} />
              <span>Free shipping over ₹3,500</span>
            </div>
            <div className="feature">
              <RotateCcw size={18} />
              <span>30-day easy returns</span>
            </div>
            <div className="feature">
              <Shield size={18} />
              <span>Secure checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
