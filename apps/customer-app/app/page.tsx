import Link from 'next/link';
import { Button } from '@tatx/ui/components/button';
import { Car, Utensils, Package } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-brand-600">
            Tatx
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/rides">
              <Button variant="ghost">Rides</Button>
            </Link>
            <Link href="/food">
              <Button variant="ghost">Food</Button>
            </Link>
            <Link href="/profile">
              <Button>Sign In</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">
            Your All-in-One Super App
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Book rides, order food, and more - all in one place
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Ride Card */}
          <Link href="/rides" className="group">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow border">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-200 transition-colors">
                <Car className="w-8 h-8 text-brand-600" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Ride</h2>
              <p className="text-gray-600">
                Book a ride to your destination with our reliable drivers
              </p>
            </div>
          </Link>

          {/* Food Card */}
          <Link href="/food" className="group">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow border">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-200 transition-colors">
                <Utensils className="w-8 h-8 text-orange-600" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Food</h2>
              <p className="text-gray-600">
                Order delicious food from your favorite restaurants
              </p>
            </div>
          </Link>

          {/* Package Card */}
          <Link href="/packages" className="group">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow border">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                <Package className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Package</h2>
              <p className="text-gray-600">
                Send packages quickly and securely across the city
              </p>
            </div>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>&copy; 2024 Tatx. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
