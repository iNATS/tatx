'use client';

import React from 'react';
import { Card, CardContent } from '@tatx/ui/components/card';
import { Button } from '@tatx/ui/components/button';
import { Badge } from '@tatx/ui/components/badge';
import {
  Home,
  Building2,
  Star,
  MapPin,
  Edit2,
  Trash2,
  Navigation,
} from 'lucide-react';
import { cn } from '@tatx/ui/utils/cn';
import type { SavedAddress, SavedAddressesProps } from '@/types/ride-booking';

/**
 * SavedAddresses Component
 * Displays a list of saved addresses (Home, Work, Favorites) with icons
 */
export function SavedAddresses({
  addresses,
  onSelect,
  onEdit,
  onDelete,
}: SavedAddressesProps) {
  const getIcon = (icon: string) => {
    switch (icon) {
      case 'home':
        return <Home className="h-5 w-5" />;
      case 'work':
        return <Building2 className="h-5 w-5" />;
      case 'star':
        return <Star className="h-5 w-5" />;
      default:
        return <MapPin className="h-5 w-5" />;
    }
  };

  const getIconColor = (icon: string) => {
    switch (icon) {
      case 'home':
        return 'text-brand-600 bg-brand-100';
      case 'work':
        return 'text-purple-600 bg-purple-100';
      case 'star':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (addresses.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
          <MapPin className="h-6 w-6 text-gray-400" />
        </div>
        <p className="text-gray-600 font-medium">No saved addresses</p>
        <p className="text-gray-400 text-sm mt-1">
          Save your favorite locations for quick access
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {addresses.map((address) => (
        <Card
          key={address.id}
          className={cn(
            'group hover:border-brand-300 hover:shadow-md transition-all duration-200',
            'cursor-pointer'
          )}
          onClick={() => onSelect(address)}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div
                className={cn(
                  'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center',
                  getIconColor(address.icon)
                )}
              >
                {getIcon(address.icon)}
              </div>

              {/* Address Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">
                    {address.label}
                  </h3>
                  {address.isDefault && (
                    <Badge
                      variant="secondary"
                      className="text-xs bg-brand-100 text-brand-700"
                    >
                      Default
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-500 truncate mt-0.5">
                  {address.address}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {onEdit && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500 hover:text-brand-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(address);
                    }}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500 hover:text-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(address);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500 hover:text-brand-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(address);
                  }}
                >
                  <Navigation className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

/**
 * QuickAddressButton Component
 * Compact button for quick address selection
 */
export function QuickAddressButton({
  address,
  onClick,
}: {
  address: SavedAddress;
  onClick: () => void;
}) {
  const getIcon = (icon: string) => {
    switch (icon) {
      case 'home':
        return <Home className="h-4 w-4" />;
      case 'work':
        return <Building2 className="h-4 w-4" />;
      case 'star':
        return <Star className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  const getButtonStyle = (icon: string) => {
    switch (icon) {
      case 'home':
        return 'bg-brand-50 text-brand-700 hover:bg-brand-100 border-brand-200';
      case 'work':
        return 'bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200';
      case 'star':
        return 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border-yellow-200';
      default:
        return 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200';
    }
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium',
        'transition-colors hover:shadow-sm',
        getButtonStyle(address.icon)
      )}
    >
      {getIcon(address.icon)}
      <span>{address.label}</span>
    </button>
  );
}

export default SavedAddresses;
