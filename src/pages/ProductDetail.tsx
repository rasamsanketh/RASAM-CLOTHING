import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Heart, Share2, ShoppingBag, Truck, RotateCcw, Shield, Check } from 'lucide-react';
import { getProductById, products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  
  const product = id ? getProductById(id) : undefined;
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0]);
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="product-not-found">
        <h1>Product Not Found</h1>
        <p>The product you're looking for doesn't exist.</p>
        <Link to="/shop" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select size and color');
      return;
    }

    setIsAddingToCart(true);
    
    // Simulate adding to cart
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addToCart(product, quantity, selectedSize, selectedColor);
    toast.success(`${product.name} added to cart!`);
    setIsAddingToCart(false);
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    navigate('/cart');
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="product-detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/shop">Shop</Link>
        <span>/</span>
        <Link to={`/shop/${product.category}`}>{product.category}</Link>
        <span>/</span>
        <span className="current">{product.name}</span>
      </div>

      {/* Product Main */}
      <div className="product-main">
        {/* Images */}
        <div className="product-images">
          <div className="main-image">
            <img src={product.images[activeImage]} alt={product.name} />
            {product.isNew && <span className="badge new">NEW</span>}
            {product.isLimited && <span className="badge limited">LIMITED</span>}
          </div>
          {product.images.length > 1 && (
            <div className="thumbnail-grid">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  className={activeImage === index ? 'active' : ''}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={img} alt={`${product.name} ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="product-info">
          <div className="product-header">
            <h1 className="product-title">{product.name}</h1>
            <div className="product-rating">
              <span className="stars">{'★'.repeat(Math.floor(product.rating))}</span>
              <span className="rating-text">{product.rating} ({product.reviews} reviews)</span>
            </div>
            <div className="product-price">
              <span className="current-price">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="original-price">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="discount">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>
          </div>

          <p className="product-description">{product.description}</p>

          {/* Color Selection */}
          <div className="selection-group">
            <label>COLOR: <span>{selectedColor}</span></label>
            <div className="color-options">
              {product.colors.map(color => (
                <button
                  key={color}
                  className={selectedColor === color ? 'active' : ''}
                  onClick={() => setSelectedColor(color)}
                  title={color}
                >
                  <span 
                    className="color-swatch" 
                    style={{ 
                      backgroundColor: color.toLowerCase(),
                      border: ['white', 'beige', 'cream'].includes(color.toLowerCase()) ? '1px solid #ddd' : 'none'
                    }}
                  />
                  {selectedColor === color && <Check size={12} />}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="selection-group">
            <label>SIZE: <span>{selectedSize}</span></label>
            <div className="size-options">
              {product.sizes.map(size => (
                <button
                  key={size}
                  className={selectedSize === size ? 'active' : ''}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <Link to="#" className="size-guide">Size Guide</Link>
          </div>

          {/* Quantity */}
          <div className="selection-group">
            <label>QUANTITY</label>
            <div className="quantity-selector">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          {/* Actions */}
          <div className="product-actions">
            <button
              className="btn-primary btn-add-cart"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              {isAddingToCart ? (
                'ADDING...'
              ) : isInCart(product.id) ? (
                <><Check size={18} /> ADDED TO CART</>
              ) : (
                <><ShoppingBag size={18} /> ADD TO CART</>
              )}
            </button>
            <button className="btn-secondary btn-buy-now" onClick={handleBuyNow}>
              BUY NOW
            </button>
          </div>

          {/* Secondary Actions */}
          <div className="secondary-actions">
            <button 
              className={`action-btn ${isWishlisted ? 'active' : ''}`}
              onClick={toggleWishlist}
            >
              <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
              {isWishlisted ? 'WISHLISTED' : 'ADD TO WISHLIST'}
            </button>
            <button className="action-btn">
              <Share2 size={18} /> SHARE
            </button>
          </div>

          {/* Features */}
          <div className="product-features">
            <div className="feature">
              <Truck size={20} />
              <span>Free shipping over ₹3,500</span>
            </div>
            <div className="feature">
              <RotateCcw size={20} />
              <span>Easy 30-day returns</span>
            </div>
            <div className="feature">
              <Shield size={20} />
              <span>Secure checkout</span>
            </div>
          </div>

          {/* Accordions */}
          <Accordion type="multiple" className="product-accordions">
            <AccordionItem value="description">
              <AccordionTrigger>DESCRIPTION</AccordionTrigger>
              <AccordionContent>
                <p>{product.description}</p>
                <ul className="feature-list">
                  {product.features.map((feature, index) => (
                    <li key={index}><Check size={14} /> {feature}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="shipping">
              <AccordionTrigger>SHIPPING & RETURNS</AccordionTrigger>
              <AccordionContent>
                <p>
                  Free standard shipping on all orders over ₹3,500. Orders are processed 
                  within 1-2 business days and delivered within 5-7 business days.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Not satisfied? Return within 30 days for a full refund. Items must be 
                  unworn with original tags attached.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="reviews">
              <AccordionTrigger>REVIEWS ({product.reviews})</AccordionTrigger>
              <AccordionContent>
                <div className="reviews-summary">
                  <div className="rating-big">{product.rating}</div>
                  <div className="rating-stars">
                    <span className="stars">{'★'.repeat(Math.floor(product.rating))}</span>
                    <span>Based on {product.reviews} reviews</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="related-products">
          <h2 className="section-title">YOU MAY ALSO LIKE</h2>
          <div className="related-grid">
            {relatedProducts.map(related => (
              <Link key={related.id} to={`/product/${related.id}`} className="related-card">
                <div className="related-image">
                  <img src={related.image} alt={related.name} />
                </div>
                <div className="related-info">
                  <h3>{related.name}</h3>
                  <p>₹{related.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
