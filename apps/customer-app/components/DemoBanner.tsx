'use client';

import { useState } from 'react';
import { X, Info } from 'lucide-react';
import { DEMO_MODE, toggleDemoMode } from '../lib/demo-config';

export function DemoBanner() {
  const [visible, setVisible] = useState(true);

  if (!DEMO_MODE.enabled || !visible) return null;

  return (
    <div className="bg-gradient-to-r from-brand-600 to-brand-700 text-white px-4 py-3 shadow-lg">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full">
            <Info className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-sm">
              🎉 Demo Mode Active
            </p>
            <p className="text-xs text-white/90">
              Running with static demo data • No database required
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:block text-xs text-white/80">
            <span className="font-semibold">Demo Login:</span> demo@tatx.sa / demo123
          </div>
          
          <button
            onClick={() => toggleDemoMode(false)}
            className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded transition-colors"
          >
            Exit Demo
          </button>
          
          <button
            onClick={() => setVisible(false)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
