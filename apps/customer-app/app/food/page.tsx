'use client';

import { useState } from 'react';
import { Search, Filter, Star, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Button } from '@tatx/ui/button';
import { Input } from '@tatx/ui/input';
import { Card, CardContent } from '@tatx/ui/card';
import { Badge } from '@tatx/ui/badge';
import { RestaurantCard } from '../../components/food/RestaurantCard';
import { RestaurantFilters } from '../../components/food/RestaurantFilters';
import { CuisineSelector } from '../../components/food/CuisineSelector';

// Mock data - will be replaced with API calls
const MOCK_RESTAURANTS = [
  {
    id: '1',
    name: 'Al-Baik',
    nameAr: 'البيك',
    cuisine: ['Fast Food', 'Arabic'],
    rating: 4.5,
    totalReviews: 1250,
    deliveryTime: 30,
    deliveryFee: 3.99,
    minOrder: 15.0,
    image: '/images/restaurants/al-baik.jpg',
    isFeatured: true,
    badges: ['POPULAR', 'FAST_DELIVERY'],
    distance: 2.5,
  },
  {
    id: '2',
    name: 'Herfy',
    nameAr: 'هرفي',
    cuisine: ['Fast Food', 'Burgers'],
    rating: 4.3,
    totalReviews: 890,
    deliveryTime: 25,
    deliveryFee: 2.99,
    minOrder: 10.0,
    image: '/images/restaurants/herfy.jpg',
    isFeatured: false,
    badges: ['NEW'],
    distance: 1.8,
  },
  {
    id: '3',
    name: 'Al Tazaj',
    nameAr: 'الطازج',
    cuisine: ['Arabic', 'Grilled'],
    rating: 4.6,
    totalReviews: 2100,
    deliveryTime: 35,
    deliveryFee: 4.99,
    minOrder: 20.0,
    image: '/images/restaurants/al-tazaj.jpg',
    isFeatured: true,
    badges: ['POPULAR'],
    distance: 3.2,
  },
];

const CUISINES = [
  { id: 'all', name: 'All', nameAr: 'الكل', icon: '🍽️' },
  { id: 'arabic', name: 'Arabic', nameAr: 'عربي', icon: '🥙' },
  { id: 'fast-food', name: 'Fast Food', nameAr: 'وجبات سريعة', icon: '🍔' },
  { id: 'pizza', name: 'Pizza', nameAr: 'بيتزا', icon: '🍕' },
  { id: 'asian', name: 'Asian', nameAr: 'آسيوي', icon: '🍜' },
  { id: 'burgers', name: 'Burgers', nameAr: 'برجر', icon: '🍔' },
  { id: 'chicken', name: 'Chicken', nameAr: 'دجاج', icon: '🍗' },
  { id: 'desserts', name: 'Desserts', nameAr: 'حلويات', icon: '🍰' },
];

export default function FoodPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minRating: 0,
    maxDeliveryTime: 60,
    maxDeliveryFee: 10,
  });

  const filteredRestaurants = MOCK_RESTAURANTS.filter((restaurant) => {
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCuisine = selectedCuisine === 'all' || restaurant.cuisine.some((c) => c.toLowerCase().includes(selectedCuisine));
    const matchesRating = restaurant.rating >= filters.minRating;
    const matchesDeliveryTime = restaurant.deliveryTime <= filters.maxDeliveryTime;
    const matchesDeliveryFee = restaurant.deliveryFee <= filters.maxDeliveryFee;

    return matchesSearch && matchesCuisine && matchesRating && matchesDeliveryTime && matchesDeliveryFee;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Food Delivery</h1>
              <p className="text-sm text-gray-500">Order from your favorite restaurants</p>
            </div>
            <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-5 w-5" />
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search restaurants or cuisines..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Cuisine Selector */}
          <div className="mt-4">
            <CuisineSelector
              cuisines={CUISINES}
              selectedCuisine={selectedCuisine}
              onSelectCuisine={setSelectedCuisine}
            />
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="border-t bg-gray-50">
            <RestaurantFilters filters={filters} onFiltersChange={setFilters} />
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {filteredRestaurants.length} restaurants found
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select className="text-sm border-none bg-transparent font-medium focus:outline-none">
              <option>Recommended</option>
              <option>Rating</option>
              <option>Delivery Time</option>
              <option>Distance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Restaurant Grid */}
      <div className="container mx-auto px-4 pb-8">
        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No restaurants found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
