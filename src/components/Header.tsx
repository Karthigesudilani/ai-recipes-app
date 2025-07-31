"use client";

import { useState } from "react";
import { ChefHat, ArrowLeft, Menu, X, BookOpen, Star, Search } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface HeaderProps {
  currentPage?: string;
  showBackButton?: boolean;
  backUrl?: string;
  favoritesCount?: number;
}

export default function Header({ 
  currentPage, 
  showBackButton = false, 
  backUrl = "/",
  favoritesCount = 0
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigationItems = [
    {
      href: "/collections",
      label: "Collections",
      icon: BookOpen,
    },
    {
      href: "/favorites",
      label: "Favorites",
      icon: Star,
      badge: favoritesCount > 0 ? favoritesCount : undefined
    },
    {
      href: "/add-ingredients",
      label: "Find Recipes",
      icon: Search,
    }
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <ChefHat className="w-8 h-8 text-orange-500" />
              <span className="text-xl font-bold text-gray-900 hidden sm:block">
                Smart Recipe Finder
              </span>
              <span className="text-lg font-bold text-gray-900 sm:hidden">
                SRF
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2.5 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 text-sm hover:text-orange-600 relative ${
                    isActive 
                      ? 'text-orange-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-orange-600 after:rounded-full' 
                      : 'text-gray-700'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="hidden lg:inline">{item.label}</span>
                  {item.badge && (
                    <span className="bg-orange-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm"
            >
              <div className="py-4 space-y-3 px-2">
                {navigationItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-semibold transition-all duration-200 ${
                        isActive 
                          ? 'text-orange-600 bg-orange-50 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-orange-600 after:rounded-full' 
                          : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="bg-orange-500 text-white text-xs rounded-full px-2.5 py-1 min-w-[22px] text-center font-bold">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
                
                {showBackButton && (
                  <Link
                    href={backUrl}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-all duration-200 bg-gray-100 text-gray-700 hover:bg-gray-200"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back</span>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
} 