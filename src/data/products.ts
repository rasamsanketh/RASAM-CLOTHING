export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory: string;
  image: string;
  images: string[];
  sizes: string[];
  colors: string[];
  description: string;
  features: string[];
  inStock: boolean;
  isNew?: boolean;
  isLimited?: boolean;
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  // New Arrivals
  {
    id: 'na-001',
    name: 'Relaxed Linen Shirt',
    price: 2499,
    category: 'shirts',
    subcategory: 'casual',
    image: '/images/newarrival_01.jpg',
    images: ['/images/newarrival_01.jpg', '/images/styleedit_01.jpg'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Beige', 'White', 'Navy'],
    description: 'Crafted from premium European linen, this relaxed-fit shirt offers breathability and effortless style. Perfect for warm days and layered looks.',
    features: ['100% European Linen', 'Relaxed Fit', 'Button-down Collar', 'Chest Pocket'],
    inStock: true,
    isNew: true,
    rating: 4.8,
    reviews: 124
  },
  {
    id: 'na-002',
    name: 'Graphic Box Tee',
    price: 1299,
    category: 't-shirts',
    subcategory: 'graphic',
    image: '/images/newarrival_02.jpg',
    images: ['/images/newarrival_02.jpg', '/images/essentials_01.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Gray'],
    description: 'Oversized boxy fit t-shirt featuring our exclusive abstract graphic print. Made from heavyweight cotton for a premium feel.',
    features: ['100% Cotton', 'Oversized Fit', 'Exclusive Print', 'Heavyweight 240gsm'],
    inStock: true,
    isNew: true,
    rating: 4.6,
    reviews: 89
  },
  {
    id: 'na-003',
    name: 'Tapered Cargo Pants',
    price: 2799,
    category: 'jeans',
    subcategory: 'cargo',
    image: '/images/newarrival_03.jpg',
    images: ['/images/newarrival_03.jpg', '/images/essentials_02.jpg'],
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Olive', 'Khaki', 'Black'],
    description: 'Modern tapered cargo pants with multiple utility pockets. Combines functionality with contemporary streetwear aesthetics.',
    features: ['Cotton Twill', 'Tapered Fit', '6 Pockets', 'Adjustable Cuffs'],
    inStock: true,
    isNew: true,
    rating: 4.7,
    reviews: 156
  },
  // Shirts
  {
    id: 'sh-001',
    name: 'Oxford Cotton Shirt',
    price: 2299,
    category: 'shirts',
    subcategory: 'formal',
    image: '/images/essentials_03.jpg',
    images: ['/images/essentials_03.jpg', '/images/styleedit_01.jpg'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Light Blue', 'White', 'Pink'],
    description: 'Classic Oxford shirt crafted from premium cotton. A wardrobe essential that transitions seamlessly from office to evening.',
    features: ['100% Cotton Oxford', 'Regular Fit', 'Button-down Collar', 'Mother of Pearl Buttons'],
    inStock: true,
    rating: 4.9,
    reviews: 312
  },
  {
    id: 'sh-002',
    name: 'Minimal Shirt',
    price: 2199,
    category: 'shirts',
    subcategory: 'casual',
    image: '/images/styleedit_01.jpg',
    images: ['/images/styleedit_01.jpg', '/images/essentials_03.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Beige', 'Sage'],
    description: 'Clean minimal shirt with hidden button placket and refined collar. Perfect for modern minimalist aesthetics.',
    features: ['Premium Cotton Poplin', 'Slim Fit', 'Hidden Placket', 'French Cuffs'],
    inStock: true,
    rating: 4.7,
    reviews: 198
  },
  // T-Shirts
  {
    id: 'ts-001',
    name: 'Classic Tee',
    price: 999,
    category: 't-shirts',
    subcategory: 'basic',
    image: '/images/essentials_01.jpg',
    images: ['/images/essentials_01.jpg', '/images/newarrival_02.jpg'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Gray', 'Navy'],
    description: 'The perfect everyday tee. Soft, durable, and designed to maintain its shape wash after wash.',
    features: ['100% Organic Cotton', 'Regular Fit', 'Reinforced Seams', 'Pre-shrunk'],
    inStock: true,
    rating: 4.8,
    reviews: 567
  },
  {
    id: 'ts-002',
    name: 'Premium Graphic Tee',
    price: 1499,
    category: 't-shirts',
    subcategory: 'graphic',
    image: '/images/newarrival_02.jpg',
    images: ['/images/newarrival_02.jpg', '/images/essentials_01.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White'],
    description: 'Limited edition graphic tee featuring collaborative artwork. Screen printed for lasting quality.',
    features: ['Heavyweight Cotton', 'Oversized Fit', 'Screen Printed', 'Limited Edition'],
    inStock: true,
    isLimited: true,
    rating: 4.9,
    reviews: 234
  },
  // Jeans
  {
    id: 'jn-001',
    name: 'Straight Jean',
    price: 2799,
    category: 'jeans',
    subcategory: 'straight',
    image: '/images/denim_product_01.jpg',
    images: ['/images/denim_product_01.jpg', '/images/denim_lifestyle.jpg'],
    sizes: ['28', '30', '32', '34', '36', '38'],
    colors: ['Light Wash', 'Medium Wash', 'Dark Wash'],
    description: 'Classic straight leg jeans with authentic vintage wash. Crafted from premium stretch denim for all-day comfort.',
    features: ['98% Cotton 2% Elastane', 'Straight Fit', 'Vintage Wash', '5-Pocket Styling'],
    inStock: true,
    rating: 4.7,
    reviews: 423
  },
  {
    id: 'jn-002',
    name: 'Relaxed Jean',
    price: 2599,
    category: 'jeans',
    subcategory: 'relaxed',
    image: '/images/styleedit_02.jpg',
    images: ['/images/styleedit_02.jpg', '/images/denim_product_01.jpg'],
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Vintage Blue', 'Black', 'Gray'],
    description: 'Relaxed fit jeans with a contemporary silhouette. Roomy through the thigh with a slight taper at the ankle.',
    features: ['100% Cotton Denim', 'Relaxed Fit', 'Raw Hem', 'Button Fly'],
    inStock: true,
    rating: 4.6,
    reviews: 289
  },
  {
    id: 'jn-003',
    name: 'Denim Jacket',
    price: 3299,
    category: 'jackets',
    subcategory: 'denim',
    image: '/images/denim_product_02.jpg',
    images: ['/images/denim_product_02.jpg', '/images/denim_lifestyle.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Vintage Wash', 'Dark Indigo', 'Black'],
    description: 'Iconic denim jacket with classic trucker styling. A timeless layering piece that gets better with age.',
    features: ['14oz Denim', 'Regular Fit', 'Button Front', 'Chest Pockets'],
    inStock: true,
    rating: 4.8,
    reviews: 356
  },
  // Ethnic
  {
    id: 'et-001',
    name: 'Embroidered Kurta',
    price: 3499,
    category: 'ethnic',
    subcategory: 'kurta',
    image: '/images/category_ethnic.jpg',
    images: ['/images/category_ethnic.jpg', '/images/limited_stack_03.jpg'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy', 'Maroon', 'Olive'],
    description: 'Handcrafted kurta with intricate embroidery. Perfect for festive occasions and celebrations.',
    features: ['Cotton Silk Blend', 'Regular Fit', 'Hand Embroidery', 'Mandarin Collar'],
    inStock: true,
    rating: 4.9,
    reviews: 178
  },
  // Jackets
  {
    id: 'jk-001',
    name: 'Leather Jacket',
    price: 8999,
    category: 'jackets',
    subcategory: 'leather',
    image: '/images/category_jackets.jpg',
    images: ['/images/category_jackets.jpg', '/images/limited_stack_02.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Brown', 'Black'],
    description: 'Premium genuine leather jacket with classic biker styling. A lifetime investment piece.',
    features: ['Genuine Leather', 'Slim Fit', 'Quilted Lining', 'YKK Zippers'],
    inStock: true,
    isLimited: true,
    rating: 4.9,
    reviews: 89
  },
  // Chinos
  {
    id: 'ch-001',
    name: 'Slim Chino',
    price: 1899,
    category: 'jeans',
    subcategory: 'chinos',
    image: '/images/essentials_02.jpg',
    images: ['/images/essentials_02.jpg', '/images/newarrival_03.jpg'],
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Khaki', 'Navy', 'Olive', 'Black'],
    description: 'Versatile slim chinos that bridge the gap between casual and formal. Soft cotton twill with a refined finish.',
    features: ['98% Cotton 2% Elastane', 'Slim Fit', 'Flat Front', 'Zip Fly'],
    inStock: true,
    rating: 4.7,
    reviews: 445
  },
  // Limited Edition
  {
    id: 'le-001',
    name: 'Dragon Embroidery Jacket',
    price: 12999,
    originalPrice: 15999,
    category: 'jackets',
    subcategory: 'limited',
    image: '/images/limited_stack_02.jpg',
    images: ['/images/limited_stack_02.jpg', '/images/limited_stack_01.jpg'],
    sizes: ['M', 'L', 'XL'],
    colors: ['Black/Gold'],
    description: 'Ultra-limited edition jacket featuring intricate dragon embroidery. Only 50 pieces worldwide.',
    features: ['Velvet Base', 'Gold Thread Embroidery', 'Limited to 50', 'Numbered Certificate'],
    inStock: true,
    isLimited: true,
    rating: 5.0,
    reviews: 12
  },
  {
    id: 'le-002',
    name: 'Heritage Silk Shirt',
    price: 7999,
    category: 'shirts',
    subcategory: 'limited',
    image: '/images/limited_stack_03.jpg',
    images: ['/images/limited_stack_03.jpg', '/images/limited_stack_01.jpg'],
    sizes: ['S', 'M', 'L'],
    colors: ['Multi'],
    description: 'Heritage-inspired silk shirt with baroque print. A statement piece for the discerning collector.',
    features: ['Pure Silk', 'Relaxed Fit', 'Digital Print', 'Limited Run'],
    inStock: true,
    isLimited: true,
    rating: 4.9,
    reviews: 8
  }
];

export const categories = [
  { id: 'shirts', name: 'Shirts', image: '/images/category_shirts.jpg', count: 45 },
  { id: 't-shirts', name: 'T-Shirts', image: '/images/category_tshirts.jpg', count: 68 },
  { id: 'jeans', name: 'Jeans', image: '/images/category_jeans.jpg', count: 52 },
  { id: 'ethnic', name: 'Ethnic', image: '/images/category_ethnic.jpg', count: 34 },
  { id: 'jackets', name: 'Jackets', image: '/images/category_jackets.jpg', count: 28 },
  { id: 'accessories', name: 'Accessories', image: '/images/category_accessories.jpg', count: 41 }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(p => p.category === category);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(p => p.isNew);
};

export const getLimitedEdition = (): Product[] => {
  return products.filter(p => p.isLimited);
};

export const getTrendingProducts = (): Product[] => {
  return products.filter(p => p.rating >= 4.8).slice(0, 6);
};
