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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-transparent backdrop-blur-md shadow-lg"
          : "bg-transparent"
      )}
    >
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Логотип */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              <span className="text-primary-500">Rem</span>
              <span
                className={cn(
                  "transition-colors",
                  isScrolled ? "text-gray-900" : "text-white"
                )}
              >
                -Maxvich
              </span>
            </div>
          </Link>

          {/* Навигация десктоп */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary-500",
                  isScrolled ? "text-gray-800" : "text-white drop-shadow"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Кнопки действий */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button
              variant={isScrolled ? "ghost" : "ghost"}
              size="sm"
              href={CONTACT_INFO.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(isScrolled ? "text-gray-800" : "text-white drop-shadow")}
            >
              <MessageCircle className="w-4 h-4" />
              Задать вопрос
            </Button>
            <Button
              variant={isScrolled ? "outline" : "outline"}
              size="sm"
              href={CONTACT_INFO.phone ? `tel:${CONTACT_INFO.phone}` : "#contacts"}
              className={cn(isScrolled ? "border-gray-300 text-gray-800" : "border-white text-white drop-shadow")}
            >
              <Phone className="w-4 h-4" />
              Позвонить
            </Button>
            <Button
              size="sm"
              href="#prices"
              className={cn("shadow-md", isScrolled ? "bg-primary-500 text-white" : "bg-primary-500 text-white")}
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
              <X className={cn("w-6 h-6", isScrolled ? "text-gray-900" : "text-white")} />
            ) : (
              <Menu className={cn("w-6 h-6", isScrolled ? "text-gray-900" : "text-white")} />
            )}
          </button>
        </div>

        {/* Мобильное меню */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-md">
            <nav className="flex flex-col space-y-4">
              {NAVIGATION_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-primary-500 transition-colors px-4 py-2"
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
                  Задать вопрос
                </Button>
                <Button size="sm" className="w-full" href="#prices">
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
