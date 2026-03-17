/**
 * Placeholder Images for the App
 * High-quality Unsplash images for all categories
 */

export const placeholderImages = {
  // Food & Restaurants
  food: {
    burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    pizza: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
    rice: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400',
    shawarma: 'https://images.unsplash.com/photo-1626777552726-456c5ca36c25?w=400',
    restaurant: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
  },
  
  // Supermarket
  supermarket: {
    milk: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400',
    bread: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    eggs: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400',
    cart: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400',
  },
  
  // Pharmacy
  pharmacy: {
    medicine: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    vitamins: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400',
    pills: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400',
  },
  
  // Grocery
  grocery: {
    rice: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
    oil: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
    basket: 'https://images.unsplash.com/photo-1606851096779-93d580154689?w=400',
  },
  
  // Gifts
  gifts: {
    flowers: 'https://images.unsplash.com/photo-1563241527-3004b7be0ee0?w=400',
    chocolate: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400',
    gift: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400',
  },
  
  // Electronics
  electronics: {
    headphones: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    charger: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400',
    phone: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
  },
  
  // Fashion
  fashion: {
    shirt: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400',
    shoes: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    dress: 'https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?w=400',
  },
  
  // Home
  home: {
    towels: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=400',
    pillow: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?w=400',
    decor: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400',
  },
  
  // Taxi & Transport
  taxi: {
    car: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400',
    driver: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    city: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400',
  },
  
  // Banners & Offers
  banners: {
    offer1: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600',
    offer2: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600',
    offer3: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=600',
    hero: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600',
  },
  
  // User & Profile
  user: {
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200',
    avatar2: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200',
    avatar3: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200',
  },
  
  // Categories Icons (colored backgrounds)
  categoryIcons: {
    food: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200',
    market: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200',
    pharmacy: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=200',
    grocery: 'https://images.unsplash.com/photo-1606851096779-93d580154689?w=200',
    gifts: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=200',
    electronics: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200',
    fashion: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200',
    home: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=200',
  },
};

export const getCategoryImage = (categoryName) => {
  const category = categoryName.toLowerCase();
  if (category.includes('طعام') || category.includes('مطعم')) return placeholderImages.food.restaurant;
  if (category.includes('سوبر') || category.includes('ماركت')) return placeholderImages.supermarket.cart;
  if (category.includes('صيدل')) return placeholderImages.pharmacy.medicine;
  if (category.includes('بقال')) return placeholderImages.grocery.basket;
  if (category.includes('هداي') || category.includes('ورد')) return placeholderImages.gifts.flowers;
  if (category.includes('إلكترو')) return placeholderImages.electronics.headphones;
  if (category.includes('أزياء') || category.includes('ملابس')) return placeholderImages.fashion.shirt;
  if (category.includes('منزل')) return placeholderImages.home.decor;
  return placeholderImages.food.burger;
};

export const getRandomFoodImage = () => {
  const images = Object.values(placeholderImages.food);
  return images[Math.floor(Math.random() * images.length)];
};

export const getRandomProductImage = (category) => {
  if (placeholderImages[category]) {
    const images = Object.values(placeholderImages[category]);
    return images[Math.floor(Math.random() * images.length)];
  }
  return placeholderImages.food.burger;
};
