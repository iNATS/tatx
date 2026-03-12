'use client';

import { useState } from 'react';
import { Card, CardContent } from '@tatx/ui/card';
import { Checkbox } from '@tatx/ui/checkbox';
import { Label } from '@tatx/ui/label';

interface Modifier {
  id: string;
  name: string;
  nameAr: string;
  price: number;
}

interface ModifierSelectorProps {
  modifiers: Modifier[];
  onModifiersChange: (selectedModifiers: Modifier[]) => void;
}

export function ModifierSelector({ modifiers, onModifiersChange }: ModifierSelectorProps) {
  const [selectedModifiers, setSelectedModifiers] = useState<Modifier[]>([]);

  const handleToggle = (modifier: Modifier) => {
    const newModifiers = selectedModifiers.some((m) => m.id === modifier.id)
      ? selectedModifiers.filter((m) => m.id !== modifier.id)
      : [...selectedModifiers, modifier];

    setSelectedModifiers(newModifiers);
    onModifiersChange(newModifiers);
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <h4 className="font-semibold text-gray-900 mb-3">Add-ons & Extras</h4>
        {modifiers.map((modifier) => (
          <div key={modifier.id} className="flex items-center gap-3">
            <Checkbox
              id={modifier.id}
              checked={selectedModifiers.some((m) => m.id === modifier.id)}
              onCheckedChange={() => handleToggle(modifier)}
            />
            <Label htmlFor={modifier.id} className="flex-1 cursor-pointer">
              <span className="text-sm text-gray-900">{modifier.name}</span>
              <span className="text-xs text-gray-500 ml-2">{modifier.nameAr}</span>
            </Label>
            <span className="text-sm font-medium text-gray-900">+{modifier.price.toFixed(2)} SAR</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
