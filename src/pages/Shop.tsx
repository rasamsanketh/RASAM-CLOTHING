import { useState, useMemo } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Filter, Grid3X3, LayoutList, ChevronDown, X, ShoppingBag, Heart } from 'lucide-react';
import { products, categories, getNewArrivals, getLimitedEdition } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function Shop() {
  const { category } = useParams<{ category?: string }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';
  const filterParam = searchParams.get('filter') || '';
  
  const { addToCart } = useCart();
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Get all unique sizes and colors
  const allSizes = useMemo(() => {
    const sizes = new Set<string>();
    products.forEach(p => p.sizes.forEach(s => sizes.add(s)));
    return Array.from(sizes).sort();
  }, []);

  const allColors = useMemo(() => {
    const colors = new Set<string>();
    products.forEach(p => p.colors.forEach(c => colors.add(c)));
    return Array.from(colors).sort();
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (category) {
      result = result.filter(p => p.category === category);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    // Filter by special filters
    if (filterParam === 'new') {
      result = getNewArrivals();
    } else if (filterParam === 'limited') {
      result = getLimitedEdition();
    } else if (filterParam === 'sale') {
      result = result.filter(p => p.originalPrice);
    }

    // Filter by sizes
    if (selectedSizes.length > 0) {
      result = result.filter(p => p.sizes.some(s => selectedSizes.includes(s)));
    }

    // Filter by colors
    if (selectedColors.length > 0) {
      result = result.filter(p => p.colors.some(c => selectedColors.includes(c)));
    }

    // Filter by price
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [category, searchQuery, filterParam, selectedSizes, selectedColors, priceRange, sortBy]);

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const isInWishlist = prev.includes(productId);
      if (isInWishlist) {
        toast.success('Removed from wishlist');
        return prev.filter(id => id !== productId);
      } else {
        toast.success('Added to wishlist');
        return [...prev, productId];
      }
    });
  };

  const handleQuickAdd = (product: typeof products[0]) => {
    addToCart(product, 1, product.sizes[0], product.colors[0]);
    toast.success(`${product.name} added to cart!`);
  };

  const clearFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 20000]);
  };

  const activeFiltersCount = selectedSizes.length + selectedColors.length + 
    (priceRange[0] > 0 || priceRange[1] < 20000 ? 1 : 0);

  const getPageTitle = () => {
    if (searchQuery) return `Search: "${searchQuery}"`;
    if (filterParam === 'new') return 'New Arrivals';
    if (filterParam === 'limited') return 'Limited Edition';
    if (filterParam === 'sale') return 'Sale';
    if (category) {
      const cat = categories.find(c => c.id === category);
      return cat?.name || category;
    }
    return 'All Products';
  };

  return (
    <div className="shop-page">
      {/* Shop Header */}
      <div className="shop-header">
        <div className="shop-header-content">
          <h1 className="shop-title">{getPageTitle()}</h1>
          <p className="shop-count">{filteredProducts.length} products</p>
        </div>
      </div>

      {/* Shop Controls */}
      <div className="shop-controls">
        <div className="shop-controls-content">
          {/* Filter Button */}
          <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DialogTrigger asChild>
              <button className="filter-btn">
                <Filter size={18} />
                FILTERS
                {activeFiltersCount > 0 && (
                  <span className="filter-badge">{activeFiltersCount}</span>
                )}
              </button>
            </DialogTrigger>
            <DialogContent className="filter-dialog">
              <DialogHeader>
                <DialogTitle>Filters</DialogTitle>
              </DialogHeader>
              <div className="filter-content">
                <Accordion type="multiple" defaultValue={['sizes', 'colors']}>
                  <AccordionItem value="sizes">
                    <AccordionTrigger>SIZES</AccordionTrigger>
                    <AccordionContent>
                      <div className="filter-options">
                        {allSizes.map(size => (
                          <label key={size} className="filter-option">
                            <input
                              type="checkbox"
                              checked={selectedSizes.includes(size)}
                              onChange={() => toggleSize(size)}
                            />
                            <span>{size}</span>
                          </label>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="colors">
                    <AccordionTrigger>COLORS</AccordionTrigger>
                    <AccordionContent>
                      <div className="filter-options">
                        {allColors.map(color => (
                          <label key={color} className="filter-option">
                            <input
                              type="checkbox"
                              checked={selectedColors.includes(color)}
                              onChange={() => toggleColor(color)}
                            />
                            <span>{color}</span>
                          </label>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="price">
                    <AccordionTrigger>PRICE RANGE</AccordionTrigger>
                    <AccordionContent>
                      <div className="price-range">
                        <div className="price-inputs">
                          <input
                            type="number"
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                            placeholder="Min"
                          />
                          <span>to</span>
                          <input
                            type="number"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                            placeholder="Max"
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {activeFiltersCount > 0 && (
                  <button className="clear-filters" onClick={clearFilters}>
                    <X size={16} /> Clear all filters
                  </button>
                )}
              </div>
            </DialogContent>
          </Dialog>

          {/* Sort */}
          <div className="sort-dropdown">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="featured">Sort by: Featured</option>
              <option value="newest">Sort by: Newest</option>
              <option value="price-low">Sort by: Price (Low to High)</option>
              <option value="price-high">Sort by: Price (High to Low)</option>
              <option value="rating">Sort by: Rating</option>
            </select>
            <ChevronDown size={16} className="sort-icon" />
          </div>

          {/* View Mode */}
          <div className="view-toggle">
            <button
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 size={18} />
            </button>
            <button
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
            >
              <LayoutList size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="active-filters">
          <div className="active-filters-content">
            {selectedSizes.map(size => (
              <span key={size} className="filter-tag">
                Size: {size}
                <button onClick={() => toggleSize(size)}><X size={12} /></button>
              </span>
            ))}
            {selectedColors.map(color => (
              <span key={color} className="filter-tag">
                Color: {color}
                <button onClick={() => toggleColor(color)}><X size={12} /></button>
              </span>
            ))}
            {(priceRange[0] > 0 || priceRange[1] < 20000) && (
              <span className="filter-tag">
                Price: ₹{priceRange[0]} - ₹{priceRange[1]}
                <button onClick={() => setPriceRange([0, 20000])}><X size={12} /></button>
              </span>
            )}
            <button className="clear-all" onClick={clearFilters}>
              Clear all
            </button>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className={`products-container ${viewMode}`}>
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <p>No products found</p>
            <button onClick={clearFilters} className="btn-secondary">
              Clear filters
            </button>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                  {product.isNew && <span className="badge new">NEW</span>}
                  {product.isLimited && <span className="badge limited">LIMITED</span>}
                  {product.originalPrice && (
                    <span className="badge sale">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </span>
                  )}
                </Link>
                <button
                  className={`wishlist-btn ${wishlist.includes(product.id) ? 'active' : ''}`}
                  onClick={() => toggleWishlist(product.id)}
                >
                  <Heart size={18} fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} />
                </button>
                <button
                  className="quick-add-btn"
                  onClick={() => handleQuickAdd(product)}
                >
                  <ShoppingBag size={16} /> QUICK ADD
                </button>
              </div>
              <div className="product-info">
                <Link to={`/product/${product.id}`}>
                  <h3 className="product-name">{product.name}</h3>
                </Link>
                <div className="product-price">
                  <span className="current-price">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="original-price">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="product-rating">
                  <span className="stars">{'★'.repeat(Math.floor(product.rating))}</span>
                  <span className="rating-count">({product.reviews})</span>
                </div>
                {viewMode === 'list' && (
                  <p className="product-description">{product.description}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
