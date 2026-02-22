import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: 'New Arrivals', path: '/shop?filter=new' },
      { name: 'Shirts', path: '/shop/shirts' },
      { name: 'T-Shirts', path: '/shop/t-shirts' },
      { name: 'Jeans', path: '/shop/jeans' },
      { name: 'Ethnic Wear', path: '/shop/ethnic' },
      { name: 'Accessories', path: '/shop/accessories' },
    ],
    help: [
      { name: 'Track Order', path: '#' },
      { name: 'Shipping Info', path: '#' },
      { name: 'Returns & Exchanges', path: '#' },
      { name: 'Size Guide', path: '#' },
      { name: 'FAQ', path: '#' },
    ],
    company: [
      { name: 'About Us', path: '#' },
      { name: 'Careers', path: '#' },
      { name: 'Press', path: '#' },
      { name: 'Sustainability', path: '#' },
    ],
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              RASAM COLLECTIONS
            </Link>
            <p className="footer-tagline">Wear the Mood.</p>
            <p className="footer-description">
              Curated fashion for every vibe. Premium quality, timeless designs, 
              and sustainable practices for the modern wardrobe.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div className="footer-column">
            <h4 className="footer-heading">SHOP</h4>
            <ul className="footer-links">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div className="footer-column">
            <h4 className="footer-heading">HELP</h4>
            <ul className="footer-links">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="footer-column">
            <h4 className="footer-heading">COMPANY</h4>
            <ul className="footer-links">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-column">
            <h4 className="footer-heading">CONTACT</h4>
            <div className="footer-contact">
              <div className="contact-item">
                <Mail size={16} />
                <span>hello@rasam.in</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>+91 80 1234 5678</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>Bangalore, India</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="footer-newsletter">
              <h5 className="newsletter-heading">Join the Membership</h5>
              <p className="newsletter-text">
                Get early access to drops and exclusive offers.
              </p>
              <form className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-btn">
                  JOIN
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} RASAM COLLECTIONS. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <Link to="#" className="bottom-link">Privacy Policy</Link>
              <Link to="#" className="bottom-link">Terms of Service</Link>
              <Link to="#" className="bottom-link">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
