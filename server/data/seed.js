require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const img = (name) => `/images/products/${name}`;

const products = [
  {
    title: 'Classic Indigo Denim Jacket',
    slug: 'classic-indigo-denim-jacket',
    description:
      'Timeless medium-wash denim jacket with vintage-inspired stitching. Perfect layered over tees or dresses for effortless FASCO street style.',
    price: 89.99,
    originalPrice: 119.99,
    images: [img('denim-jacket.jpg'), img('denim-2.jpg')],
    category: 'MEN',
    tags: ['denim', 'jacket', 'casual', 'bestseller'],
    sizes: SIZES,
    colors: [
      { name: 'Indigo', hex: '#3F5277' },
      { name: 'Black', hex: '#1a1a1a' },
    ],
    rating: 4.7,
    reviewCount: 128,
    stock: 45,
    featured: true,
    dealOfMonth: true,
    peappyBlinders: true,
  },
  {
    title: 'Floral Midi Summer Dress',
    slug: 'floral-midi-summer-dress',
    description:
      'Lightweight floral midi dress with adjustable waist tie. Flowy silhouette for brunch dates and garden parties.',
    price: 64.5,
    originalPrice: 79.0,
    images: [img('dress.jpg'), img('dress-2.jpg')],
    category: 'WOMEN',
    tags: ['dress', 'floral', 'summer', 'new'],
    sizes: SIZES,
    colors: [
      { name: 'Rose', hex: '#E8A598' },
      { name: 'Sage', hex: '#9CAF88' },
    ],
    rating: 4.5,
    reviewCount: 86,
    stock: 60,
    featured: true,
    dealOfMonth: false,
    peappyBlinders: false,
  },
  {
    title: 'Slim Fit Chino Trousers',
    slug: 'slim-fit-chino-trousers',
    description:
      'Tailored slim chinos in stretch cotton blend. Clean lines and a refined finish for office or weekend wear.',
    price: 54.0,
    originalPrice: 68.0,
    images: [img('chinos.jpg')],
    category: 'MEN',
    tags: ['trousers', 'chino', 'smart-casual'],
    sizes: SIZES,
    colors: [
      { name: 'Khaki', hex: '#C3B091' },
      { name: 'Navy', hex: '#1B2838' },
    ],
    rating: 4.3,
    reviewCount: 52,
    stock: 80,
    featured: false,
    dealOfMonth: false,
    peappyBlinders: false,
  },
  {
    title: 'Oversized Wool Blend Coat',
    slug: 'oversized-wool-blend-coat',
    description:
      'Statement oversized coat in premium wool blend. Double-breasted front and deep pockets for cold-season layering.',
    price: 189.0,
    originalPrice: 249.0,
    images: [img('coat.jpg'), img('coat-2.jpg')],
    category: 'WOMEN',
    tags: ['coat', 'winter', 'outerwear', 'luxury'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Charcoal', hex: '#36454F' },
    ],
    rating: 4.8,
    reviewCount: 41,
    stock: 22,
    featured: true,
    dealOfMonth: true,
    peappyBlinders: false,
  },
  {
    title: 'Leather Crossbody Bag',
    slug: 'leather-crossbody-bag',
    description:
      'Minimal crossbody in full-grain leather with adjustable strap and interior card slots.',
    price: 72.0,
    originalPrice: 95.0,
    images: [img('bag.jpg')],
    category: 'ACCESSORIES',
    tags: ['bag', 'leather', 'accessories'],
    sizes: ['One Size'],
    colors: [
      { name: 'Tan', hex: '#D2B48C' },
      { name: 'Black', hex: '#0d0d0d' },
    ],
    rating: 4.6,
    reviewCount: 203,
    stock: 100,
    featured: true,
    dealOfMonth: false,
    peappyBlinders: true,
  },
  {
    title: 'Ribbed Knit Turtleneck',
    slug: 'ribbed-knit-turtleneck',
    description:
      'Soft ribbed turtleneck in merino blend. Slim fit base layer that pairs with blazers and denim.',
    price: 48.0,
    originalPrice: 58.0,
    images: [img('turtleneck.jpg')],
    category: 'WOMEN',
    tags: ['knitwear', 'basics', 'winter'],
    sizes: SIZES,
    colors: [
      { name: 'Cream', hex: '#FFFDD0' },
      { name: 'Burgundy', hex: '#800020' },
    ],
    rating: 4.4,
    reviewCount: 67,
    stock: 55,
    featured: false,
    dealOfMonth: false,
    peappyBlinders: false,
  },
  {
    title: 'White Low-Top Sneakers',
    slug: 'white-low-top-sneakers',
    description:
      'Clean white leather sneakers with cushioned sole. Everyday essential for men and women.',
    price: 98.0,
    originalPrice: 120.0,
    images: [img('sneakers.jpg')],
    category: 'FOOTWEAR',
    tags: ['sneakers', 'footwear', 'casual'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [{ name: 'White', hex: '#FFFFFF' }],
    rating: 4.9,
    reviewCount: 312,
    stock: 70,
    featured: true,
    dealOfMonth: false,
    peappyBlinders: false,
  },
  {
    title: 'Striped Linen Shirt',
    slug: 'striped-linen-shirt',
    description:
      'Breathable linen shirt with subtle vertical stripes. Relaxed fit for warm days and coastal getaways.',
    price: 59.99,
    originalPrice: 74.99,
    images: [img('shirt.jpg')],
    category: 'MEN',
    tags: ['shirt', 'linen', 'summer'],
    sizes: SIZES,
    colors: [
      { name: 'Blue Stripe', hex: '#4A6FA5' },
      { name: 'White', hex: '#F5F5F5' },
    ],
    rating: 4.2,
    reviewCount: 38,
    stock: 40,
    featured: false,
    dealOfMonth: false,
    peappyBlinders: false,
  },
  {
    title: 'High-Waist Wide Leg Jeans',
    slug: 'high-waist-wide-leg-jeans',
    description:
      'Retro-inspired wide leg jeans with high waist and light wash. Comfortable stretch denim.',
    price: 76.0,
    originalPrice: 89.0,
    images: [img('jeans.jpg')],
    category: 'WOMEN',
    tags: ['denim', 'jeans', 'trending'],
    sizes: SIZES,
    colors: [
      { name: 'Light Wash', hex: '#AEC6CF' },
      { name: 'Dark Wash', hex: '#2C3E50' },
    ],
    rating: 4.6,
    reviewCount: 91,
    stock: 48,
    featured: true,
    dealOfMonth: true,
    peappyBlinders: true,
  },
  {
    title: 'Aviator Sunglasses',
    slug: 'aviator-sunglasses',
    description:
      'UV400 aviator frames with gold metal finish and gradient lenses. FASCO signature accessory.',
    price: 45.0,
    originalPrice: 60.0,
    images: [img('sunglasses.jpg')],
    category: 'ACCESSORIES',
    tags: ['sunglasses', 'accessories', 'summer'],
    sizes: ['One Size'],
    colors: [
      { name: 'Gold', hex: '#D4AF37' },
      { name: 'Silver', hex: '#C0C0C0' },
    ],
    rating: 4.5,
    reviewCount: 144,
    stock: 120,
    featured: false,
    dealOfMonth: false,
    peappyBlinders: false,
  },
  {
    title: 'Kids Graphic Hoodie',
    slug: 'kids-graphic-hoodie',
    description:
      'Cozy cotton hoodie with playful FASCO graphic. Soft fleece lining for school and play.',
    price: 38.0,
    originalPrice: 45.0,
    images: [img('hoodie.jpg')],
    category: 'KIDS',
    tags: ['kids', 'hoodie', 'casual'],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Heather Grey', hex: '#B6B6B4' },
      { name: 'Navy', hex: '#001F3F' },
    ],
    rating: 4.7,
    reviewCount: 29,
    stock: 65,
    featured: false,
    dealOfMonth: false,
    peappyBlinders: false,
  },
  {
    title: 'Silk Blend Evening Blouse',
    slug: 'silk-blend-evening-blouse',
    description:
      'Elegant silk-blend blouse with draped neckline. Elevates tailored trousers and skirts for evening events.',
    price: 82.0,
    originalPrice: 110.0,
    images: [img('blouse.jpg')],
    category: 'WOMEN',
    tags: ['blouse', 'evening', 'silk'],
    sizes: SIZES,
    colors: [
      { name: 'Champagne', hex: '#F7E7CE' },
      { name: 'Black', hex: '#111111' },
    ],
    rating: 4.8,
    reviewCount: 56,
    stock: 30,
    featured: true,
    dealOfMonth: false,
    peappyBlinders: false,
  },
  {
    title: 'Peaky Blinders Wool Flat Cap',
    slug: 'peaky-blinders-wool-flat-cap',
    description:
      'Heritage wool flat cap inspired by vintage tailoring. Structured crown and short brim.',
    price: 42.0,
    originalPrice: 55.0,
    images: [img('cap.jpg')],
    category: 'ACCESSORIES',
    tags: ['hat', 'vintage', 'peaky-blinders'],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Herringbone', hex: '#5D5D5D' },
      { name: 'Brown', hex: '#6F4E37' },
    ],
    rating: 4.9,
    reviewCount: 77,
    stock: 90,
    featured: true,
    dealOfMonth: true,
    peappyBlinders: true,
  },
  {
    title: 'Merino Crew Neck Sweater',
    slug: 'merino-crew-neck-sweater',
    description:
      'Fine merino crew neck in classic fit. Naturally breathable for layering through transitional seasons.',
    price: 69.0,
    originalPrice: 85.0,
    images: [img('sweater.jpg')],
    category: 'MEN',
    tags: ['knitwear', 'merino', 'winter'],
    sizes: SIZES,
    colors: [
      { name: 'Forest', hex: '#228B22' },
      { name: 'Grey', hex: '#808080' },
    ],
    rating: 4.4,
    reviewCount: 63,
    stock: 50,
    featured: false,
    dealOfMonth: false,
    peappyBlinders: false,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products with local images`);

    const adminEmail = 'admin@fasco.com';
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      await User.create({
        firstName: 'FASCO',
        lastName: 'Admin',
        email: adminEmail,
        phone: '+10000000000',
        password: 'Admin@123',
      });
      console.log('Created admin user: admin@fasco.com / Admin@123');
    } else {
      console.log('Admin user already exists, skipped');
    }

    console.log('Seed completed');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
}

seed();
