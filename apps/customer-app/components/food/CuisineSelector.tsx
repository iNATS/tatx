'use client';

interface Cuisine {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
}

interface CuisineSelectorProps {
  cuisines: Cuisine[];
  selectedCuisine: string;
  onSelectCuisine: (cuisineId: string) => void;
}

export function CuisineSelector({ cuisines, selectedCuisine, onSelectCuisine }: CuisineSelectorProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {cuisines.map((cuisine) => (
        <button
          key={cuisine.id}
          onClick={() => onSelectCuisine(cuisine.id)}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCuisine === cuisine.id
              ? 'bg-brand-600 text-white shadow-md'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          <span className="mr-1">{cuisine.icon}</span>
          {cuisine.name}
        </button>
      ))}
    </div>
  );
}
