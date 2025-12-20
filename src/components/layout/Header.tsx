"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { NAVIGATION_LINKS, CONTACT_INFO } from "@/data/constants";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        "bg-white/70 backdrop-blur-2xl shadow-sm",
        isScrolled && "bg-white/90 shadow-md border-b border-gray-100"
      )}
    >
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Логотип */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="text-2xl font-extrabold">
              <span className="text-primary-500 transition-all duration-300 group-hover:text-primary-600">Rem</span>
              <span className="text-secondary-900 font-extrabold transition-all duration-300 group-hover:text-secondary-800">
                -Maxvich
              </span>
            </div>
          </Link>

          {/* Навигация десктоп */}
          <nav className="hidden lg:flex items-center space-x-1">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-primary-600 transition-all duration-300 rounded-lg hover:bg-primary-50 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary-500 group-hover:w-3/4 transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Кнопки действий */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button
              variant="secondary"
              size="sm"
              href={CONTACT_INFO.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow"
            >
              <MessageCircle className="w-4 h-4" />
              Telegram
            </Button>
            <Button
              variant="outline"
              size="sm"
              href={CONTACT_INFO.phone ? `tel:${CONTACT_INFO.phone}` : "#contacts"}
              className="border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50"
            >
              <Phone className="w-4 h-4" />
              Позвонить
            </Button>
            <Button
              variant="premium"
              size="sm"
              href="#calculator"
              className="font-bold"
            >
              Рассчитать стоимость
            </Button>
          </div>

          {/* Мобильное меню кнопка */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-secondary-900 transition-colors" />
            ) : (
              <Menu className="w-6 h-6 text-secondary-900 transition-colors" />
            )}
          </button>
        </div>

        {/* Мобильное меню */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 bg-white/98 backdrop-blur-lg">
            <nav className="flex flex-col space-y-4">
              {NAVIGATION_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-secondary-700 hover:text-primary-600 transition-colors px-4 py-2 font-medium"
                  onClick={handleLinkClick}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 px-4 pt-4 border-t border-gray-200">
                <Button variant="outline" size="sm" className="w-full" href={CONTACT_INFO.phone ? `tel:${CONTACT_INFO.phone}` : "#contacts"}>
                  <Phone className="w-4 h-4" />
                  Позвонить
                </Button>
                <Button size="sm" className="w-full" href={CONTACT_INFO.telegram} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4" />
                  Telegram
                </Button>
                <Button size="sm" className="w-full bg-primary-500 text-white hover:bg-primary-600" href="#calculator">
                  Рассчитать стоимость
                </Button>
              </div>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
};
