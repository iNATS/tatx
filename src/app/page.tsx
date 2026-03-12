import { Navbar } from '@/components/layout/Navbar';
import { CategorySlider } from '@/components/home/CategorySlider';
import { RestaurantList } from '@/components/home/RestaurantList';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center overflow-hidden">
          <Image 
            src="https://picsum.photos/seed/hero/1200/600"
            alt="Delicious food background"
            fill
            className="object-cover brightness-[0.4]"
            priority
            data-ai-hint="delicious food"
          />
          <div className="container mx-auto px-4 relative z-10 text-white">
            <div className="max-w-2xl animate-in slide-in-from-left duration-700">
              <Badge className="mb-4 bg-primary text-white border-none font-bold px-4 py-1">
                #1 Food Delivery in Town
              </Badge>
              <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                Satisfy Your Cravings <br />
                <span className="text-primary italic">In Minutes.</span>
              </h1>
              <p className="text-xl mb-8 text-gray-200">
                Order from your favorite restaurants and track them in real-time.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="rounded-full px-8 text-lg font-bold">
                  Order Now
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8 text-lg font-bold bg-white/10 backdrop-blur text-white border-white/20 hover:bg-white/20">
                  Browse Offers
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories & Listings */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Popular Categories</h2>
              <p className="text-muted-foreground">What are you in the mood for today?</p>
            </div>
          </div>
          <CategorySlider />

          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Recommended for You</h2>
              <Button variant="link" className="text-primary font-bold">View all</Button>
            </div>
            <RestaurantList />
          </div>
        </section>

        {/* App Promo */}
        <section className="bg-primary/5 py-20 mt-12 border-y border-primary/10">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-4xl font-black mb-6">Experience the Best with Our App</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Get exclusive discounts, real-time tracking, and personalized recommendations with the FeastFast mobile app.
              </p>
              <div className="flex gap-4">
                <div className="w-40 h-12 bg-black rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80">
                  <span className="text-white text-xs font-bold">App Store</span>
                </div>
                <div className="w-40 h-12 bg-black rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80">
                  <span className="text-white text-xs font-bold">Google Play</span>
                </div>
              </div>
            </div>
            <div className="flex-1 relative h-[500px] w-full max-w-sm">
              <div className="absolute inset-0 bg-primary/20 rounded-[3rem] -rotate-6 scale-95" />
              <div className="absolute inset-0 bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 border-black">
                <Image 
                  src="https://picsum.photos/seed/phone/400/800"
                  alt="App interface"
                  fill
                  className="object-cover"
                  data-ai-hint="mobile app"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-1 mb-6">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xl">F</div>
                <span className="text-xl font-bold font-headline">FeastFast</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Making quality food accessible to everyone, everywhere. Fastest delivery guaranteed.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Explore</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">Restaurants</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Cuisines</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Nearby Me</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Offers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Contact</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li>Email: support@feastfast.com</li>
                <li>Phone: +966 800 123 456</li>
                <li>Riyadh, Saudi Arabia</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2024 FeastFast. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-primary">Twitter</Link>
              <Link href="#" className="hover:text-primary">Instagram</Link>
              <Link href="#" className="hover:text-primary">Facebook</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
