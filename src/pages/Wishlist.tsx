import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';

export default function Wishlist() {
  const { addToCart } = useCart();
  const [wishlistItems, setWishlistItems] = useState<string[]>(['na-001', 'na-002', 'jn-001', 'et-001']);

  const wishlistProducts = products.filter(p => wishlistItems.includes(p.id));

  const removeFromWishlist = (productId: string) => {
    setWishlistItems(prev => prev.filter(id => id !== productId));
    toast.success('Removed from wishlist');
  };

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product, 1, product.sizes[0], product.colors[0]);
    toast.success(`${product.name} added to cart!`);
  };

  const moveAllToCart = () => {
    wishlistProducts.forEach(product => {
      addToCart(product, 1, product.sizes[0], product.colors[0]);
    });
    toast.success('All items added to cart!');
    setWishlistItems([]);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page empty">
        <div className="empty-wishlist">
          <Heart size={64} className="empty-icon" />
          <h1>YOUR WISHLIST IS EMPTY</h1>
          <p>Save items you love to your wishlist and they'll be here waiting.</p>
          <Link to="/shop" className="btn-primary">
            EXPLORE PRODUCTS <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h1>MY WISHLIST ({wishlistItems.length} items)</h1>
        <button className="btn-secondary" onClick={moveAllToCart}>
          <ShoppingBag size={18} /> MOVE ALL TO CART
        </button>
      </div>

      <div className="wishlist-grid">
        {wishlistProducts.map((product) => (
          <div key={product.id} className="wishlist-card">
            <div className="wishlist-image">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} />
                {product.isNew && <span className="badge new">NEW</span>}
                {product.isLimited && <span className="badge limited">LIMITED</span>}
              </Link>
              <button
                className="remove-btn"
                onClick={() => removeFromWishlist(product.id)}
              >
                <Trash2 size={16} />
              </button>
            </div>
            
            <div className="wishlist-info">
              <Link to={`/product/${product.id}`}>
                <h3 className="wishlist-name">{product.name}</h3>
              </Link>
              
              <div className="wishlist-price">
                <span className="current-price">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="original-price">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              
              <div className="wishlist-rating">
                <span className="stars">{'★'.repeat(Math.floor(product.rating))}</span>
                <span className="rating-count">({product.reviews})</span>
              </div>
              
              <button
                className="btn-primary btn-add"
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingBag size={16} /> ADD TO CART
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
