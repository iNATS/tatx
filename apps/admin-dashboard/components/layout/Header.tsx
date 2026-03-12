'use client';

import React from 'react';
import Link from 'next/link';
import { Bell, Search, Menu, User, LogOut, Moon, Sun, Settings, HelpCircle } from 'lucide-react';
import { Button } from '@tatx/ui/components/button';
import { Input } from '@tatx/ui/components/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@tatx/ui/components/dropdown-menu';
import { Badge } from '@tatx/ui/components/badge';
import { cn } from '@tatx/ui/src/utils/cn';

interface HeaderProps {
  onMenuClick?: () => void;
  className?: string;
}

export function Header({ onMenuClick, className }: HeaderProps) {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [unreadCount, setUnreadCount] = React.useState(3);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className={cn(
      'bg-white border-b fixed top-0 left-0 right-0 z-50 h-16 shadow-sm',
      className
    )}>
      <div className="container mx-auto px-4 h-full flex items-center justify-between gap-4">
        {/* Left Section - Logo & Menu */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
                Tatx Admin
              </h1>
              <p className="text-xs text-gray-500">Super-App Platform</p>
            </div>
          </Link>
        </div>

        {/* Center Section - Search */}
        <div className={cn(
          'flex-1 max-w-xl transition-all duration-300',
          isSearchOpen ? 'max-w-2xl' : 'max-w-md'
        )}>
          <div className={cn(
            'relative transition-all duration-300',
            isSearchOpen ? 'scale-105' : 'scale-100'
          )}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search users, rides, orders..."
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
              onFocus={() => setIsSearchOpen(true)}
              onBlur={() => setIsSearchOpen(false)}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1">
              <kbd className="px-2 py-0.5 text-xs bg-white border rounded-md text-gray-400">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-2">
          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="hidden sm:flex hover:bg-gray-100"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </Button>

          {/* Help Button */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:flex hover:bg-gray-100"
            aria-label="Help"
          >
            <HelpCircle className="w-5 h-5" />
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover:bg-gray-100"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 flex items-center justify-center text-xs font-medium text-white bg-error-500 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                Notifications
                {unreadCount > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {unreadCount} new
                  </Badge>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                  <div className="flex items-center gap-2 w-full">
                    <div className="w-2 h-2 bg-brand-500 rounded-full" />
                    <div className="font-medium">New driver application</div>
                  </div>
                  <div className="text-sm text-gray-500 ml-4">
                    Ahmed Mohammed applied for driver verification
                  </div>
                  <div className="text-xs text-gray-400 ml-4 mt-1">5 min ago</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                  <div className="flex items-center gap-2 w-full">
                    <div className="w-2 h-2 bg-brand-500 rounded-full" />
                    <div className="font-medium">Restaurant approval pending</div>
                  </div>
                  <div className="text-sm text-gray-500 ml-4">
                    Al Baik Restaurant submitted documents
                  </div>
                  <div className="text-xs text-gray-400 ml-4 mt-1">15 min ago</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                  <div className="flex items-center gap-2 w-full">
                    <div className="w-2 h-2 bg-error-500 rounded-full" />
                    <div className="font-medium">Payment dispute</div>
                  </div>
                  <div className="text-sm text-gray-500 ml-4">
                    Customer disputed ride payment #RD-2024-001
                  </div>
                  <div className="text-xs text-gray-400 ml-4 mt-1">1 hour ago</div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-brand-600 cursor-pointer font-medium">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 hover:bg-gray-100">
                <div className="w-8 h-8 bg-gradient-to-br from-brand-100 to-brand-200 rounded-full flex items-center justify-center">
                  <User className="w-4 h-5 text-brand-600" />
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium">Admin User</div>
                  <div className="text-xs text-gray-500">Super Admin</div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-gray-500">admin@tatx.sa</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <HelpCircle className="w-4 h-4 mr-2" />
                Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-error-600 cursor-pointer">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
