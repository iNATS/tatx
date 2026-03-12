
export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  minOrder: number;
  image: string;
  category: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export const RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'Burger Craft',
    cuisine: 'Burgers, American',
    rating: 4.8,
    deliveryTime: '25-35 min',
    minOrder: 20,
    image: 'https://picsum.photos/seed/burger/600/400',
    category: 'Burgers'
  },
  {
    id: '2',
    name: 'Pizza Romana',
    cuisine: 'Pizza, Italian',
    rating: 4.6,
    deliveryTime: '30-45 min',
    minOrder: 30,
    image: 'https://picsum.photos/seed/pizza/600/400',
    category: 'Pizza'
  },
  {
    id: '3',
    name: 'Sushi Zen',
    cuisine: 'Sushi, Japanese',
    rating: 4.9,
    deliveryTime: '35-50 min',
    minOrder: 50,
    image: 'https://picsum.photos/seed/sushi/600/400',
    category: 'Sushi'
  },
  {
    id: '4',
    name: 'Arabic Nights',
    cuisine: 'Middle Eastern, Grill',
    rating: 4.7,
    deliveryTime: '20-30 min',
    minOrder: 25,
    image: 'https://picsum.photos/seed/arabic/600/400',
    category: 'Arabic'
  },
  {
    id: '5',
    name: 'Green Bowl',
    cuisine: 'Healthy, Salad',
    rating: 4.5,
    deliveryTime: '15-25 min',
    minOrder: 15,
    image: 'https://picsum.photos/seed/salad/600/400',
    category: 'Healthy'
  },
  {
    id: '6',
    name: 'Pasta Lab',
    cuisine: 'Italian, Pasta',
    rating: 4.6,
    deliveryTime: '30-40 min',
    minOrder: 25,
    image: 'https://picsum.photos/seed/pasta/600/400',
    category: 'Italian'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    restaurantId: '1',
    name: 'The Classic Beast',
    description: 'Double beef patty, cheddar, secret sauce, caramelized onions.',
    price: 12.99,
    image: 'https://picsum.photos/seed/m1/400/300',
    category: 'Burgers'
  },
  {
    id: 'm2',
    restaurantId: '1',
    name: 'Spicy Chicken Fire',
    description: 'Crispy chicken breast, jalapeños, habanero mayo, slaw.',
    price: 10.99,
    image: 'https://picsum.photos/seed/m2/400/300',
    category: 'Burgers'
  },
  {
    id: 'm3',
    restaurantId: '1',
    name: 'Truffle Fries',
    description: 'Golden fries tossed in truffle oil and parmesan.',
    price: 5.99,
    image: 'https://picsum.photos/seed/m3/400/300',
    category: 'Sides'
  },
  {
    id: 'm4',
    restaurantId: '2',
    name: 'Margherita Dream',
    description: 'San Marzano tomatoes, fresh mozzarella, basil, olive oil.',
    price: 14.50,
    image: 'https://picsum.photos/seed/m4/400/300',
    category: 'Pizza'
  },
  {
    id: 'm5',
    restaurantId: '2',
    name: 'Spicy Salami',
    description: 'Italian pepperoni, chili honey, mozzarella.',
    price: 16.50,
    image: 'https://picsum.photos/seed/m5/400/300',
    category: 'Pizza'
  },
  {
    id: 'm6',
    restaurantId: '4',
    name: 'Mixed Grill Platter',
    description: 'Lamb chops, chicken tawook, beef kebab, grilled vegetables.',
    price: 24.00,
    image: 'https://picsum.photos/seed/m6/400/300',
    category: 'Main Courses'
  }
];
