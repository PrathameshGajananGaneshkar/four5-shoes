import { Product, ProductCategory } from '../types';

export const BRAND_INFO = {
  name: '45 Shoes',
  shortName: '45',
  domain: '45shoes.com',
  businessName: '45 Shoes (FOUR5)',
  location: 'Chikhli, Buldhana, Maharashtra, India',
  cityState: 'Chikhli, Maharashtra',
  tagline: 'THE NEXT MOVE.',
  secondaryTagline: 'Brand 45 Premium Footwear. Bold Attitude.',
  heroHeadline: '45 SHOES',
  heroStatement: 'Step Into Your Legacy.',
  heroSupportingText: 'Exclusive 45 Footwear designed for those who move differently.',
  phone: '+91 8237301612',
  phoneDisplay: '+91 8237301612',
  whatsapp: '918668720597',
  whatsappDisplay: '+91 8668720597',
  email: 'hello@four5shoes.com',
  address: 'Chikhli, Buldhana, Maharashtra, India',
  whatsappDefaultMsg: 'Hello 45 Shoes, I would like to know more about your footwear collection.',
  priceRange: '₹2,299 – ₹3,499',
  shippingThreshold: 1999,
};

export const CATEGORIES_DATA: {
  name: ProductCategory;
  slug: string;
  count: number;
  image: string;
  tagline: string;
}[] = [
  {
    name: 'Sneakers',
    slug: 'sneakers',
    count: 14,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80',
    tagline: 'Street-ready 45 silhouettes designed with sharp lines & impact foam.',
  },
  {
    name: 'Sports Shoes',
    slug: 'sports-shoes',
    count: 12,
    image: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800&auto=format&fit=crop&q=80',
    tagline: 'Multi-sport 45 cross-trainers built for explosive speed & stability.',
  },
  {
    name: 'Running Shoes',
    slug: 'running-shoes',
    count: 10,
    image: '/shoe2-clean.png',
    tagline: 'Featherlight 45 stride response with energy-rebounding midsoles.',
  },
  {
    name: 'Casual Shoes',
    slug: 'casual-shoes',
    count: 8,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&auto=format&fit=crop&q=80',
    tagline: 'Effortless all-day 45 silhouettes crafted for everyday confidence.',
  },
  {
    name: 'Lifestyle Footwear',
    slug: 'lifestyle-footwear',
    count: 11,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80',
    tagline: 'Contemporary 45 athletic luxury crafted for the modern mover.',
  },
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'four5-velocity-runner',
    name: '45 Velocity Runner',
    subtitle: 'High-Response Cushioned Running Footwear',
    category: 'Running Shoes',
    gender: 'Men',
    price: 2999,
    originalPrice: 4299,
    rating: 4.9,
    reviewCount: 184,
    description:
      'Engineered for maximum kinetic rebound, the 45 Velocity Runner merges our featherlight Pro-Mesh aerocore with a dual-density shock absorption midsole. Designed in Chikhli to conquer Indian urban roads, tracks, and everyday sprints.',
    story:
      'We prototyped the 45 Velocity Runner over 14 months to deliver the holy grail of Indian running: extreme breathability during humid summers, unbreakable traction on damp monsoon roads, and a bold 45 brand aesthetic.',
    features: [
      'Kinetic-Foam™ dual-density high energy return midsole',
      'Engineered 3D hyper-breathable Jacquard mesh upper',
      'Carbon-flex heel stabilization cup for zero ankle slip',
      'All-terrain hexagonal rubber grip pattern',
      'Ultra-plush OrthoStep moisture-wicking anti-odor footbed',
    ],
    specs: {
      weight: '238g (Size UK 8)',
      upperMaterial: 'Ventilated Engineered Knit & TPU Film',
      midsole: 'Proprietary Kinetic-Foam EVA',
      soleGrip: 'High-Abrasion Hexa-Grip Compound',
      origin: 'Designed & Engineered in Chikhli, Maharashtra',
    },
    isNewArrival: true,
    isBestSeller: true,
    isFeatured: true,
    colors: [
      {
        name: 'FOUR5 Drop Edition (Black / Orange)',
        hex: '#FF4800',
        image: '/shoe2-clean.png',
        gallery: [
          '/shoe2-clean.png',
        ],
      },
      {
        name: 'Triple Stealth Onyx',
        hex: '#18181B',
        image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=900&auto=format&fit=crop&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=900&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Chalk White / Steel',
        hex: '#E4E4E7',
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=900&auto=format&fit=crop&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=900&auto=format&fit=crop&q=80',
        ],
      },
    ],
    availableSizes: [6, 7, 8, 9, 10, 11],
    inStock: true,
    reviews: [
      {
        id: 'r1',
        author: 'Rohit Deshmukh',
        location: 'Pune, Maharashtra',
        rating: 5,
        date: '2 days ago',
        comment: 'The cushioning is top-tier. Ran a 10k in these straight out of the box with zero blisters. Proud to wear an Indian brand with this level of finishing!',
        verified: true,
      },
      {
        id: 'r2',
        author: 'Aakash Verma',
        location: 'Nagpur, Maharashtra',
        rating: 5,
        date: '1 week ago',
        comment: 'Insanely light and the orange accent looks electric in person. Fits true to UK size 9.',
        verified: true,
      },
    ],
  },
  {
    id: 'four5-street-pro',
    name: '45 Street Pro Sneaker',
    subtitle: 'Everyday Urban Court Sneaker',
    category: 'Sneakers',
    gender: 'Men',
    price: 2499,
    originalPrice: 3599,
    rating: 4.8,
    reviewCount: 142,
    description:
      'Bold monochrome attitude for the metropolitan streetscape. Built with abrasion-resistant matte leather overlays, perforated breathability zones, and a low-profile cupsole stamped with the official 45 emblem.',
    story:
      'Designed for people who transition seamlessly from college and workspace to nightlife. The 45 Street Pro is minimalist yet commanding, giving you effortless styling with denim, cargo pants, or shorts.',
    features: [
      'Premium vegan micro-fiber leather upper with reinforced stitching',
      'Perforated toe-box for 360-degree heat dissipation',
      'Vulcanized low-profile rubber cupsole with pivot points',
      'Memory cushion sockliner that molds to your arch',
      'Subtle debossed 45 branding on tongue & lateral heel',
    ],
    specs: {
      weight: '310g (Size UK 8)',
      upperMaterial: 'Vegan Matte Leather & Suede Trim',
      midsole: 'Cushioned EVA Core',
      soleGrip: 'Full Perimeter Herringbone Tread',
      origin: 'Chikhli Design Studio, Maharashtra',
    },
    isNewArrival: false,
    isBestSeller: true,
    isFeatured: true,
    colors: [
      {
        name: 'Monochrome Pitch Black',
        hex: '#111113',
        image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=900&auto=format&fit=crop&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=900&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Clean Pure White',
        hex: '#FFFFFF',
        image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=900&auto=format&fit=crop&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop&q=80',
        ],
      },
    ],
    availableSizes: [6, 7, 8, 9, 10, 11],
    inStock: true,
    reviews: [
      {
        id: 'r3',
        author: 'Siddharth Patil',
        location: 'Mumbai, Maharashtra',
        rating: 5,
        date: '3 days ago',
        comment: 'Super clean design. Build quality easily rivals sneakers that cost twice as much.',
        verified: true,
      },
    ],
  },
  {
    id: 'four5-urban-x',
    name: '45 Urban X Sneaker',
    subtitle: 'Architectural Hybrid Lifestyle Silhouette',
    category: 'Lifestyle Footwear',
    gender: 'Unisex',
    price: 3499,
    originalPrice: 4999,
    rating: 4.9,
    reviewCount: 96,
    description:
      'Where high-concept modern geometry meets plush all-day athletic support. Sculpted multi-layered sidewalls, speed-lacing toggles, and premium textures create an unmistakable 45 silhouette.',
    story:
      'The 45 Urban X represents the future forward vision of brand 45. Crafted for trendsetters who make statements without shouting. Made with premium imported non-crease fabrics and high-durability composites.',
    features: [
      'Futuristic sculpted geometric midsole with flex-grooves',
      'Dual-texture ripstop and bonded tech panels with 45 logo mark',
      'Quick-cinch speed lacing lock system',
      'Ergonomic padded heel collar with pull-tab',
      'Reflective 3M nighttime accents for safety & style',
    ],
    specs: {
      weight: '295g (Size UK 8)',
      upperMaterial: 'Tech Ripstop & Hydrophobic Synthetic Overlays',
      midsole: 'Sculpted CloudWave Foam',
      soleGrip: 'Multi-directional lugged rubber',
      origin: 'Chikhli, Maharashtra',
    },
    isNewArrival: true,
    isBestSeller: false,
    isFeatured: true,
    colors: [
      {
        name: 'Desert Sand / Obsidian',
        hex: '#D1C7BD',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=900&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Storm Grey / Infrared',
        hex: '#6B7280',
        image: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=900&auto=format&fit=crop&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop&q=80',
        ],
      },
    ],
    availableSizes: [6, 7, 8, 9, 10, 11],
    inStock: true,
    reviews: [
      {
        id: 'r4',
        author: 'Pooja Kadam',
        location: 'Nashik, Maharashtra',
        rating: 5,
        date: '5 days ago',
        comment: 'Get compliments every single time I wear these to gym or cafes. Incredibly comfortable.',
        verified: true,
      },
    ],
  },
  {
    id: 'four5-apex-trainer',
    name: '45 Apex Gym Trainer',
    subtitle: 'Cross-Training & Gym Performance Shoe',
    category: 'Sports Shoes',
    gender: 'Men',
    price: 3199,
    originalPrice: 4499,
    rating: 4.8,
    reviewCount: 118,
    description:
      'Built for heavy deadlifts, high-intensity intervals, and lateral stability. The 45 Apex Trainer features a wide, planted base with lateral outriggers to lock your foot in during rigorous training.',
    story:
      'Gym-goers in India often struggle with shoes that are either too squishy for lifting or too stiff for cardio. The 45 Apex Trainer solves this with a firm heel base and a flexible forefoot stamped with the 45 mark.',
    features: [
      'Firm flat heel geometry with 4mm drop for stable heavy lifts',
      'Lateral TPU wrap prevents rollover during sharp cuts',
      'Tear-resistant ballistic mesh with welded friction guards',
      'High-friction sticky rubber outsole for barbell & turf grip',
      'Reinforced lace eyelets with dynamic midfoot webbing',
    ],
    specs: {
      weight: '320g (Size UK 8)',
      upperMaterial: 'Ballistic Breathable Mesh with TPU cage',
      midsole: 'High-Density StabiFlex Core',
      soleGrip: 'Non-marking Gym Grip Gum Compound',
      origin: 'Chikhli, Maharashtra',
    },
    isNewArrival: false,
    isBestSeller: true,
    isFeatured: true,
    colors: [
      {
        name: 'Volt Neon / Carbon',
        hex: '#CCFF00',
        image: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=900&auto=format&fit=crop&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=900&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Battleship Slate',
        hex: '#374151',
        image: 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=900&auto=format&fit=crop&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=900&auto=format&fit=crop&q=80',
        ],
      },
    ],
    availableSizes: [7, 8, 9, 10, 11],
    inStock: true,
    reviews: [
      {
        id: 'r5',
        author: 'Vikram Shinde',
        location: 'Aurangabad, Maharashtra',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Perfect for functional training and heavy squats. Rock solid stability.',
        verified: true,
      },
    ],
  },
  {
    id: 'four5-legacy-sneaker',
    name: '45 Legacy Court Sneaker',
    subtitle: 'Timeless Heritage Court Silhouette',
    category: 'Casual Shoes',
    gender: 'Women',
    price: 2799,
    originalPrice: 3999,
    rating: 4.9,
    reviewCount: 153,
    description:
      'Step into timeless minimalism. Inspired by classic court heritage, elevated with ultra-soft pebble vegan leather, sculpted foam lining, and hand-finished stitch accents featuring the 45 signature badge.',
    story:
      'Our tribute to foundational design. The 45 Legacy Sneaker is made to be worn with literally everything in your closet. Minimalist, premium, and durable enough to withstand daily Indian city life.',
    features: [
      'Pebble-grain premium vegan leather with soft-touch finish',
      'Dual-density OrthoComfort insole with arch support',
      'Reinforced stitched welt along the entire perimeter',
      'Subtle golden 45 foil stamp on the heel badge',
      'Non-slip diamond tread gum rubber outsole',
    ],
    specs: {
      weight: '280g (Size UK 7)',
      upperMaterial: 'Pebble Vegan Leather',
      midsole: 'SoftFlex Molded Core',
      soleGrip: 'Diamond-tread natural gum rubber',
      origin: 'Chikhli, Maharashtra',
    },
    isNewArrival: false,
    isBestSeller: true,
    isFeatured: true,
    colors: [
      {
        name: 'Vintage Bone / Crisp White',
        hex: '#F4F4F5',
        image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=900&auto=format&fit=crop&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=900&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Rose Blush / White',
        hex: '#FBCFE8',
        image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=900&auto=format&fit=crop&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=900&auto=format&fit=crop&q=80',
        ],
      },
    ],
    availableSizes: [5, 6, 7, 8, 9, 10],
    inStock: true,
    reviews: [
      {
        id: 'r6',
        author: 'Ananya Joshi',
        location: 'Thane, Maharashtra',
        rating: 5,
        date: '4 days ago',
        comment: 'So lightweight and elegant! Zero break-in period required. I wear them every single day to work.',
        verified: true,
      },
    ],
  },
  {
    id: 'four5-motion-runner',
    name: '45 Motion Runner',
    subtitle: 'Featherlight Active Daily Trainer',
    category: 'Running Shoes',
    gender: 'Women',
    price: 2299,
    originalPrice: 3199,
    rating: 4.7,
    reviewCount: 88,
    description:
      'Glides with your natural stride. Engineered with our Seamless Sock-Knit weave, official 45 branding, and ultra-resilient CloudPuff foam, making every step effortless.',
    story:
      'Created for early morning walkers, joggers, and active everyday multitaskers. Slipping it on feels like a second skin with supportive bounce.',
    features: [
      'One-piece seamless elastic knit collar for instant slip-on',
      'CloudPuff ultralight foam cushioning for pillowy impact',
      'Anatomical flex grooves allowing natural foot roll',
      'Reflective 45 heel pull-tab',
      'Washable and fast-drying construction',
    ],
    specs: {
      weight: '210g (Size UK 6)',
      upperMaterial: 'High-Stretch Sock Knit',
      midsole: 'CloudPuff EVA',
      soleGrip: 'Zonal Rubber Traction Pods',
      origin: 'Chikhli, Maharashtra',
    },
    isNewArrival: true,
    isBestSeller: false,
    isFeatured: true,
    colors: [
      {
        name: 'Arctic Frost / Lilac',
        hex: '#DDD6FE',
        image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=900&auto=format&fit=crop&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1539185441755-769473a23570?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=900&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Onyx Black / Glow',
        hex: '#18181B',
        image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=900&auto=format&fit=crop&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=900&auto=format&fit=crop&q=80',
        ],
      },
    ],
    availableSizes: [5, 6, 7, 8, 9],
    inStock: true,
    reviews: [
      {
        id: 'r7',
        author: 'Neha Sawant',
        location: 'Nagpur, Maharashtra',
        rating: 5,
        date: '1 week ago',
        comment: 'I walk 8,000 steps daily and my feet never hurt now. Amazing quality!',
        verified: true,
      },
    ],
  },
];

export const PRODUCTS = PRODUCTS_DATA;
