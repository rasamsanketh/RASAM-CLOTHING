import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, Heart, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { getCartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'SHOP', path: '/shop' },
    { name: 'NEW', path: '/shop?filter=new' },
    { name: 'SHIRTS', path: '/shop/shirts' },
    { name: 'T-SHIRTS', path: '/shop/t-shirts' },
    { name: 'JEANS', path: '/shop/jeans' },
    { name: 'ETHNIC', path: '/shop/ethnic' },
  ];

  const isActive = (path: string) => {
    if (path === '/shop') return location.pathname === '/shop' && !location.search;
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <>
      <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Logo */}
          <Link to="/" className="nav-logo">
            RASAM COLLECTIONS
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-links desktop-only">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="nav-actions">
            {/* Search */}
            <form onSubmit={handleSearch} className="search-form desktop-only">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">
                <Search size={18} />
              </button>
            </form>

            {/* Wishlist */}
            <Link to="/wishlist" className="nav-action-btn desktop-only">
              <Heart size={20} />
            </Link>

            {/* User */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="nav-action-btn">
                  <User size={20} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="user-dropdown">
                  <div className="user-info">
                    <p className="user-name">{user?.name}</p>
                    <p className="user-email">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/wishlist')}>
                    <Heart size={16} className="mr-2" /> Wishlist
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <X size={16} className="mr-2" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login" className="nav-action-btn">
                <User size={20} />
              </Link>
            )}

            {/* Cart */}
            <Link to="/cart" className="nav-action-btn cart-btn">
              <ShoppingBag size={20} />
              {getCartCount() > 0 && (
                <span className="cart-badge">{getCartCount()}</span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="nav-action-btn mobile-only"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <form onSubmit={handleSearch} className="mobile-search">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mobile-search-input"
            />
            <button type="submit" className="mobile-search-btn">
              <Search size={20} />
            </button>
          </form>

          <div className="mobile-nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mobile-menu-footer">
            <Link to="/wishlist" className="mobile-menu-item" onClick={() => setIsMobileMenuOpen(false)}>
              <Heart size={20} /> Wishlist
            </Link>
            {!isAuthenticated && (
              <Link to="/login" className="mobile-menu-item" onClick={() => setIsMobileMenuOpen(false)}>
                <User size={20} /> Login / Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
