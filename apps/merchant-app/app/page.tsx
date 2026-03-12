import { Button } from '@tatx/ui/components/button';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-brand-600">Tatx Merchant</h1>
          <Button>Manage Menu</Button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Today's Orders</h2>
            <p className="text-4xl font-bold text-brand-600">0</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Revenue</h2>
            <p className="text-4xl font-bold text-green-600">$0.00</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Rating</h2>
            <p className="text-4xl font-bold text-yellow-500">0.0</p>
          </div>
        </div>
      </main>
    </div>
  );
}
