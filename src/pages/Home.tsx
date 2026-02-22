import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { products, categories, getNewArrivals } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { addToCart } = useCart();
  const heroRef = useRef<HTMLDivElement>(null);
  const newArrivalsRef = useRef<HTMLDivElement>(null);
  const trendingRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const styleEditRef = useRef<HTMLDivElement>(null);
  const denimRef = useRef<HTMLDivElement>(null);
  const limitedRef = useRef<HTMLDivElement>(null);
  const accessoriesRef = useRef<HTMLDivElement>(null);
  const membershipRef = useRef<HTMLDivElement>(null);

  const newArrivals = getNewArrivals();

  const handleQuickAdd = (product: typeof products[0]) => {
    addToCart(product, 1, product.sizes[0], product.colors[0]);
    toast.success(`${product.name} added to cart!`);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      const heroTl = gsap.timeline();
      heroTl
        .from('.hero-portrait', {
          opacity: 0,
          x: '-12vw',
          scale: 0.98,
          duration: 1.1,
          ease: 'power2.out'
        })
        .from('.hero-title-word', {
          opacity: 0,
          y: 40,
          rotateX: 25,
          duration: 0.8,
          stagger: 0.06,
          ease: 'power2.out'
        }, '-=0.7')
        .from('.hero-subtitle', {
          opacity: 0,
          y: 24,
          duration: 0.6,
          ease: 'power2.out'
        }, '-=0.4')
        .from('.hero-cta', {
          opacity: 0,
          y: 24,
          duration: 0.6,
          ease: 'power2.out'
        }, '-=0.3');

      // Hero Scroll Exit
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress > 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.hero-title-group', {
              x: `${exitProgress * 18}vw`,
              opacity: 1 - exitProgress * 0.75
            });
            gsap.set('.hero-portrait', {
              x: `${-exitProgress * 18}vw`,
              scale: 1 - exitProgress * 0.04,
              opacity: 1 - exitProgress * 0.65
            });
          }
        }
      });

      // Statement Banner
      gsap.from('.statement-text', {
        scrollTrigger: {
          trigger: '.statement-section',
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1
        },
        opacity: 0,
        y: 40
      });

      gsap.from('.category-chip', {
        scrollTrigger: {
          trigger: '.statement-section',
          start: 'top 70%',
          end: 'top 40%',
          scrub: 1
        },
        opacity: 0,
        y: 30,
        scale: 0.98,
        stagger: 0.08
      });

      // New Arrivals Section
      ScrollTrigger.create({
        trigger: newArrivalsRef.current,
        start: 'top top',
        end: '+=140%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress <= 0.3) {
            const enterProgress = progress / 0.3;
            gsap.set('.na-title', {
              x: `${-20 + enterProgress * 20}vw`,
              opacity: enterProgress
            });
            gsap.set('.na-card', {
              y: `${100 - enterProgress * 100}vh`,
              opacity: enterProgress,
              scale: 0.96 + enterProgress * 0.04,
              stagger: 0.06
            });
          } else if (progress > 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.na-card', {
              y: `${-exitProgress * 40}vh`,
              opacity: 1 - exitProgress * 0.75
            });
            gsap.set('.na-title', {
              x: `${-exitProgress * 10}vw`,
              opacity: 1 - exitProgress * 0.8
            });
          }
        }
      });

      // Trending Section
      ScrollTrigger.create({
        trigger: trendingRef.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress <= 0.3) {
            const enterProgress = progress / 0.3;
            gsap.set('.trend-left', {
              x: `${-60 + enterProgress * 60}vw`,
              opacity: enterProgress
            });
            gsap.set('.trend-top-center', {
              y: `${-60 + enterProgress * 60}vh`,
              opacity: enterProgress
            });
            gsap.set('.trend-top-right', {
              x: `${60 - enterProgress * 60}vw`,
              opacity: enterProgress
            });
            gsap.set('.trend-title', {
              y: `${40 - enterProgress * 40}vh`,
              opacity: enterProgress
            });
          } else if (progress > 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.trend-left', {
              x: `${-exitProgress * 18}vw`,
              opacity: 1 - exitProgress * 0.7
            });
            gsap.set('.trend-top-right, .trend-top-center', {
              x: `${exitProgress * 18}vw`,
              opacity: 1 - exitProgress * 0.7
            });
            gsap.set('.trend-title', {
              y: `${exitProgress * 18}vh`,
              opacity: 1 - exitProgress
            });
          }
        }
      });

      // Categories Section
      gsap.from('.cat-title', {
        scrollTrigger: {
          trigger: categoriesRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1
        },
        opacity: 0,
        x: '-10vw'
      });

      gsap.from('.cat-tile', {
        scrollTrigger: {
          trigger: categoriesRef.current,
          start: 'top 70%',
          end: 'top 30%',
          scrub: 1
        },
        opacity: 0,
        y: '18vh',
        scale: 0.98,
        stagger: 0.1
      });

      // Style Edit Section
      ScrollTrigger.create({
        trigger: styleEditRef.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress <= 0.3) {
            const enterProgress = progress / 0.3;
            gsap.set('.se-title', {
              x: `${60 - enterProgress * 60}vw`,
              opacity: enterProgress
            });
            gsap.set('.se-card', {
              y: `${80 - enterProgress * 80}vh`,
              opacity: enterProgress,
              scale: 0.97 + enterProgress * 0.03
            });
          } else if (progress > 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.se-title', {
              x: `${-exitProgress * 20}vw`,
              opacity: 1 - exitProgress * 0.75
            });
            gsap.set('.se-card', {
              x: `${exitProgress * 20}vw`,
              opacity: 1 - exitProgress * 0.75
            });
          }
        }
      });

      // Denim Section
      ScrollTrigger.create({
        trigger: denimRef.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress <= 0.3) {
            const enterProgress = progress / 0.3;
            gsap.set('.denim-image', {
              x: `${-70 + enterProgress * 70}vw`,
              opacity: enterProgress
            });
            gsap.set('.denim-title', {
              x: `${40 - enterProgress * 40}vw`,
              opacity: enterProgress
            });
            gsap.set('.denim-card', {
              x: `${60 - enterProgress * 60}vw`,
              opacity: enterProgress,
              scale: 0.98 + enterProgress * 0.02
            });
          } else if (progress > 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.denim-image', {
              x: `${-exitProgress * 18}vw`,
              opacity: 1 - exitProgress
            });
            gsap.set('.denim-right', {
              x: `${exitProgress * 18}vw`,
              opacity: 1 - exitProgress
            });
          }
        }
      });

      // Limited Edition Section
      ScrollTrigger.create({
        trigger: limitedRef.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress <= 0.3) {
            const enterProgress = progress / 0.3;
            gsap.set('.limited-stack', {
              x: `${-60 + enterProgress * 60}vw`,
              opacity: enterProgress
            });
            gsap.set('.limited-title', {
              x: `${60 - enterProgress * 60}vw`,
              opacity: enterProgress
            });
            gsap.set('.limited-text', {
              y: `${12 - enterProgress * 12}vh`,
              opacity: enterProgress
            });
          } else if (progress > 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.limited-stack', {
              y: `${exitProgress * 30}vh`,
              opacity: 1 - exitProgress
            });
            gsap.set('.limited-text-group', {
              y: `${-exitProgress * 20}vh`,
              opacity: 1 - exitProgress
            });
          }
        }
      });

      // Accessories Section
      ScrollTrigger.create({
        trigger: accessoriesRef.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress <= 0.3) {
            const enterProgress = progress / 0.3;
            gsap.set('.acc-card-left', {
              x: `${-70 + enterProgress * 70}vw`,
              opacity: enterProgress
            });
            gsap.set('.acc-card-right', {
              x: `${70 - enterProgress * 70}vw`,
              opacity: enterProgress
            });
            gsap.set('.acc-title', {
              scale: 0.9 + enterProgress * 0.1,
              opacity: enterProgress
            });
          } else if (progress > 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.acc-card', {
              y: `${-exitProgress * 24}vh`,
              opacity: 1 - exitProgress
            });
            gsap.set('.acc-title', {
              y: `${exitProgress * 12}vh`,
              opacity: 1 - exitProgress
            });
          }
        }
      });

      // Membership Section
      ScrollTrigger.create({
        trigger: membershipRef.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress <= 0.3) {
            const enterProgress = progress / 0.3;
            gsap.set('.mem-image', {
              x: `${-70 + enterProgress * 70}vw`,
              opacity: enterProgress
            });
            gsap.set('.mem-title', {
              x: `${40 - enterProgress * 40}vw`,
              opacity: enterProgress
            });
            gsap.set('.mem-form', {
              y: `${10 - enterProgress * 10}vh`,
              opacity: enterProgress
            });
          } else if (progress > 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.mem-image', {
              x: `${-exitProgress * 18}vw`,
              opacity: 1 - exitProgress
            });
            gsap.set('.mem-right', {
              x: `${exitProgress * 18}vw`,
              opacity: 1 - exitProgress
            });
          }
        }
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="home">
      {/* Section 1: Hero */}
      <section ref={heroRef} className="section hero-section">
        <div className="hero-content">
          <div className="hero-portrait">
            <img src="/images/hero_portrait.jpg" alt="RASAM COLLECTIONS" />
          </div>
          <div className="hero-right">
            <span className="hero-label">NEW SEASON DROP</span>
            <div className="hero-title-group">
              <h1 className="hero-title">
                <span className="hero-title-word">WEAR</span>
                <span className="hero-title-word">THE</span>
                <span className="hero-title-word">MOOD</span>
              </h1>
            </div>
            <p className="hero-subtitle">
              Curated fits for every vibe. Minimal effort, maximum presence.
            </p>
            <div className="hero-cta">
              <Link to="/shop" className="btn-primary">
                EXPLORE THE DROP <ArrowRight size={18} />
              </Link>
              <Link to="/shop" className="btn-text">
                VIEW LOOKBOOK
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Statement Banner */}
      <section className="section statement-section">
        <div className="statement-content">
          <p className="statement-text">
            Rasam is a mood—crafted for the days you want to be seen.
          </p>
          <div className="category-chips">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/shop/${cat.id}`}
                className="category-chip"
              >
                {cat.name.toUpperCase()}
              </Link>
            ))}
            <Link to="/shop?filter=sale" className="category-chip sale">
              SALE
            </Link>
          </div>
        </div>
      </section>

      {/* Section 3: New Arrivals */}
      <section ref={newArrivalsRef} className="section new-arrivals-section">
        <div className="na-content">
          <h2 className="na-title">NEW ARRIVALS</h2>
          <div className="na-grid">
            {newArrivals.map((product, index) => (
              <div key={product.id} className="na-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <Link to={`/product/${product.id}`} className="na-card-image">
                  <img src={product.image} alt={product.name} />
                  <button
                    className="quick-add-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      handleQuickAdd(product);
                    }}
                  >
                    <ShoppingBag size={16} /> QUICK ADD
                  </button>
                </Link>
                <div className="na-card-info">
                  <h3>{product.name}</h3>
                  <p className="na-card-price">₹{product.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Trending Now */}
      <section ref={trendingRef} className="section trending-section">
        <div className="trending-content">
          <div className="trending-collage">
            <div className="trend-left">
              <img src="/images/trending_left.jpg" alt="Trending" />
            </div>
            <div className="trend-top-center">
              <img src="/images/trending_top_center.jpg" alt="Trending" />
            </div>
            <div className="trend-top-right">
              <img src="/images/trending_top_right.jpg" alt="Trending" />
            </div>
          </div>
          <div className="trending-text">
            <h2 className="trend-title">
              <span>TRENDING</span>
              <span>NOW</span>
            </h2>
            <p className="trend-desc">
              The fits people are wearing right now—tagged by the community.
            </p>
            <Link to="/shop" className="btn-secondary">
              SHOP THE FEED
            </Link>
          </div>
        </div>
      </section>

      {/* Section 5: Shop the Collection */}
      <section ref={categoriesRef} className="section categories-section">
        <div className="categories-content">
          <h2 className="cat-title">SHOP THE COLLECTION</h2>
          <div className="categories-grid">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/shop/${cat.id}`}
                className="cat-tile"
              >
                <img src={cat.image} alt={cat.name} />
                <div className="cat-tile-overlay">
                  <span className="cat-tile-name">{cat.name}</span>
                  <span className="cat-tile-count">{cat.count} items</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Style Edit */}
      <section ref={styleEditRef} className="section style-edit-section">
        <div className="style-edit-content">
          <h2 className="se-title">
            <span>STYLE</span>
            <span>EDIT</span>
          </h2>
          <div className="se-grid">
            <div className="se-card">
              <Link to="/product/sh-002">
                <img src="/images/styleedit_01.jpg" alt="Minimal Shirt" />
                <div className="se-card-info">
                  <h3>Minimal Shirt</h3>
                  <p>₹2,199</p>
                </div>
              </Link>
            </div>
            <div className="se-card">
              <Link to="/product/jn-002">
                <img src="/images/styleedit_02.jpg" alt="Relaxed Jean" />
                <div className="se-card-info">
                  <h3>Relaxed Jean</h3>
                  <p>₹2,599</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Denim Drop */}
      <section ref={denimRef} className="section denim-section">
        <div className="denim-content">
          <div className="denim-image">
            <img src="/images/denim_lifestyle.jpg" alt="Denim Drop" />
          </div>
          <div className="denim-right">
            <h2 className="denim-title">
              <span>DENIM</span>
              <span>DROP</span>
            </h2>
            <Link to="/shop/jeans" className="view-all-link">VIEW ALL DENIM</Link>
            <div className="denim-products">
              <div className="denim-card">
                <Link to="/product/jn-001">
                  <img src="/images/denim_product_01.jpg" alt="Straight Jean" />
                  <div className="denim-card-info">
                    <h3>Straight Jean</h3>
                    <p>₹2,799</p>
                  </div>
                </Link>
              </div>
              <div className="denim-card">
                <Link to="/product/jn-003">
                  <img src="/images/denim_product_02.jpg" alt="Denim Jacket" />
                  <div className="denim-card-info">
                    <h3>Denim Jacket</h3>
                    <p>₹3,299</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Essentials */}
      <section className="section essentials-section">
        <div className="essentials-content">
          <h2 className="ess-title">ESSENTIALS</h2>
          <div className="ess-grid">
            {products.filter(p => ['ts-001', 'ch-001', 'sh-001'].includes(p.id)).map((product) => (
              <div key={product.id} className="ess-card">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                  <div className="ess-card-info">
                    <h3>{product.name}</h3>
                    <p>₹{product.price.toLocaleString()}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: Limited Edition */}
      <section ref={limitedRef} className="section limited-section">
        <div className="limited-content">
          <div className="limited-stack">
            <div className="stack-card stack-back">
              <img src="/images/limited_stack_01.jpg" alt="Limited" />
            </div>
            <div className="stack-card stack-mid">
              <img src="/images/limited_stack_02.jpg" alt="Limited" />
            </div>
            <div className="stack-card stack-front">
              <img src="/images/limited_stack_03.jpg" alt="Limited" />
            </div>
          </div>
          <div className="limited-text-group">
            <h2 className="limited-title">
              <span>LIMITED</span>
              <span>EDITION</span>
            </h2>
            <p className="limited-text">
              Small batches. Bold details. Once they're gone, they're gone.
            </p>
            <Link to="/shop?filter=limited" className="btn-primary">
              SHOP LIMITED DROP
            </Link>
            <p className="limited-note">Free shipping on orders above ₹3,500.</p>
          </div>
        </div>
      </section>

      {/* Section 10: Accessories */}
      <section ref={accessoriesRef} className="section accessories-section">
        <div className="accessories-content">
          <div className="acc-card acc-card-left">
            <Link to="/shop/accessories">
              <img src="/images/accessories_left.jpg" alt="Caps & Bags" />
              <div className="acc-card-overlay">
                <span>Caps & Bags</span>
              </div>
            </Link>
          </div>
          <div className="acc-card acc-card-right">
            <Link to="/shop/accessories">
              <img src="/images/accessories_right.jpg" alt="Belts & Wallets" />
              <div className="acc-card-overlay">
                <span>Belts & Wallets</span>
              </div>
            </Link>
          </div>
          <h2 className="acc-title">ACCESSORIES</h2>
        </div>
      </section>

      {/* Section 11: Customer Love */}
      <section className="section reviews-section">
        <div className="reviews-content">
          <h2 className="reviews-title">CUSTOMER LOVE</h2>
          <div className="reviews-grid">
            <div className="review-image-large">
              <img src="/images/review_collage_01.jpg" alt="Customer" />
            </div>
            <div className="review-image-small">
              <img src="/images/review_collage_02.jpg" alt="Customer" />
            </div>
            <div className="review-quote">
              <p className="quote-text">
                "The fit is perfect. The fabric feels premium. I keep coming back."
              </p>
              <p className="quote-author">— Aryan, Bangalore</p>
              <Link to="#" className="btn-text">
                READ REVIEWS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 12: Membership */}
      <section ref={membershipRef} className="section membership-section">
        <div className="membership-content">
          <div className="mem-image">
            <img src="/images/membership_lifestyle.jpg" alt="Membership" />
          </div>
          <div className="mem-right">
            <h2 className="mem-title">
              <span>JOIN THE</span>
              <span>MEMBERSHIP</span>
            </h2>
            <p className="mem-subtitle">
              Early access, members-only drops, and birthday perks.
            </p>
            <form className="mem-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="mem-input"
              />
              <button type="submit" className="btn-primary">
                GET EARLY ACCESS
              </button>
            </form>
            <div className="mem-benefits">
              <span className="benefit-chip">FREE SHIPPING</span>
              <span className="benefit-chip">EXCLUSIVE DROPS</span>
              <span className="benefit-chip">BIRTHDAY OFFER</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
