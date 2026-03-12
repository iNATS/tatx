'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Input } from '@tatx/ui/components/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@tatx/ui/components/popover';
import { ScrollArea } from '@tatx/ui/components/scroll-area';
import { Badge } from '@tatx/ui/components/badge';
import {
  MapPin,
  Search,
  Clock,
  Star,
  Home,
  Building2,
  X,
  Loader2,
} from 'lucide-react';
import { cn } from '@tatx/ui/utils/cn';
import type { LocationSuggestion, LocationSearchProps } from '@/types/ride-booking';
import type { Location } from '@tatx/types';

/**
 * LocationSearch Component
 * Search input for pickup/dropoff locations with autocomplete functionality
 */
export function LocationSearch({
  label,
  placeholder = 'Search for a location',
  value,
  onChange,
  recentLocations = [],
  savedLocations = [],
  disabled = false,
  icon,
}: LocationSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Mock geocoding function - replace with actual API call
  const searchLocations = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);

    // Simulate API call with debounce
    try {
      // In production, replace with actual geocoding API
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Mock suggestions
      const mockSuggestions: LocationSuggestion[] = [
        {
          id: `addr-${Date.now()}-1`,
          address: `${searchQuery}, Downtown District`,
          name: searchQuery,
          latitude: 25.2048 + Math.random() * 0.01,
          longitude: 55.2708 + Math.random() * 0.01,
          type: 'address',
        },
        {
          id: `addr-${Date.now()}-2`,
          address: `${searchQuery} Street, Business Bay`,
          name: `${searchQuery} Street`,
          latitude: 25.1872 + Math.random() * 0.01,
          longitude: 55.2674 + Math.random() * 0.01,
          type: 'address',
        },
        {
          id: `addr-${Date.now()}-3`,
          address: `${searchQuery} Avenue, Marina`,
          name: `${searchQuery} Avenue`,
          latitude: 25.0805 + Math.random() * 0.01,
          longitude: 55.1396 + Math.random() * 0.01,
          type: 'place',
        },
      ];

      setSuggestions(mockSuggestions);
    } catch (error) {
      console.error('Error searching locations:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (query.trim().length >= 2) {
      debounceRef.current = setTimeout(() => {
        searchLocations(query);
      }, 300);
    } else {
      setSuggestions([]);
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, searchLocations]);

  const handleSelectLocation = useCallback(
    (suggestion: LocationSuggestion) => {
      const location: Location = {
        address: suggestion.address,
        latitude: suggestion.latitude,
        longitude: suggestion.longitude,
        name: suggestion.name || suggestion.address,
      };
      onChange(location);
      setQuery(suggestion.name || suggestion.address);
      setIsOpen(false);
    },
    [onChange]
  );

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setQuery('');
      onChange(null);
      setSuggestions([]);
      inputRef.current?.focus();
    },
    [onChange]
  );

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
  }, []);

  const handleFocus = useCallback(() => {
    setIsOpen(true);
  }, []);

  const getIconForLocation = (suggestion: LocationSuggestion) => {
    if (suggestion.savedLabel === 'Home') {
      return <Home className="h-4 w-4 text-brand-600" />;
    }
    if (suggestion.savedLabel === 'Work') {
      return <Building2 className="h-4 w-4 text-brand-600" />;
    }
    if (suggestion.type === 'saved') {
      return <Star className="h-4 w-4 text-yellow-500" />;
    }
    return <MapPin className="h-4 w-4 text-gray-400" />;
  };

  const renderLocationItem = (suggestion: LocationSuggestion) => (
    <button
      key={suggestion.id}
      onClick={() => handleSelectLocation(suggestion)}
      className={cn(
        'w-full flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left',
        'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-1'
      )}
    >
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
          suggestion.type === 'saved' ? 'bg-yellow-100' : 'bg-gray-100'
        )}
      >
        {getIconForLocation(suggestion)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 truncate">
          {suggestion.name || suggestion.address}
        </p>
        <p className="text-sm text-gray-500 truncate">{suggestion.address}</p>
        {suggestion.savedLabel && (
          <Badge variant="secondary" className="mt-1 text-xs">
            {suggestion.savedLabel}
          </Badge>
        )}
      </div>
    </button>
  );

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon || <MapPin className="h-5 w-5" />}
            </div>
            <Input
              ref={inputRef}
              type="text"
              placeholder={placeholder}
              value={query || value?.address || ''}
              onChange={handleInputChange}
              onFocus={handleFocus}
              disabled={disabled}
              className={cn(
                'pl-10 pr-10 h-12 text-base',
                'focus:ring-2 focus:ring-brand-500 focus:border-brand-500'
              )}
            />
            {query && (
              <button
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-[calc(100vw-2rem)] sm:w-96 p-0"
          align="start"
          sideOffset={8}
        >
          <ScrollArea className="max-h-[300px]">
            {/* Recent Locations */}
            {!query && recentLocations.length > 0 && (
              <div className="border-b">
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Recent
                  </span>
                </div>
                {recentLocations.map((location) => renderLocationItem(location))}
              </div>
            )}

            {/* Saved Locations */}
            {!query && savedLocations.length > 0 && (
              <div className="border-b">
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Saved
                  </span>
                </div>
                {savedLocations.map((location) => renderLocationItem(location))}
              </div>
            )}

            {/* Search Results */}
            {isLoading && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-brand-600" />
              </div>
            )}

            {!isLoading && suggestions.length > 0 && (
              <div>
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50">
                  <Search className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Suggestions
                  </span>
                </div>
                {suggestions.map((suggestion) => renderLocationItem(suggestion))}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && query && suggestions.length === 0 && (
              <div className="text-center py-8">
                <Search className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">
                  No locations found for &quot;{query}&quot;
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Try a different search term
                </p>
              </div>
            )}

            {/* Initial State */}
            {!query &&
              recentLocations.length === 0 &&
              savedLocations.length === 0 && (
                <div className="text-center py-8">
                  <MapPin className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">
                    Search for a pickup or dropoff location
                  </p>
                </div>
              )}
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default LocationSearch;
