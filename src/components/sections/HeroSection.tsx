"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Phone, Calculator, Send } from "lucide-react";
import { CONTACT_INFO } from "@/data/constants";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Фоновая анимация */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-20">
          {/* Левая часть - текст и кнопки */}
          <div className="text-white">
            <div className="inline-block px-4 py-2 bg-primary-500/20 rounded-full mb-6 backdrop-blur-sm">
              <span className="text-primary-400 text-sm font-semibold">
                ✨ Профессиональный ремонт с 2016 года
              </span>
            </div>

            <h1 className="heading-1 mb-6 text-white">
              Ремонт квартир под ключ{" "}
              <span className="gradient-text block mt-2">
                в Нижнем Новгороде
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Превратим вашу квартиру в пространство мечты. Гарантия качества,
              прозрачные цены, соблюдение сроков.
            </p>

            {/* Преимущества в строку */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className="text-sm text-gray-300">Опыт более 8 лет</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className="text-sm text-gray-300">Гарантия 36 месяцев</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className="text-sm text-gray-300">Бесплатный замер</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className="text-sm text-gray-300">От 650₽/м²</span>
              </div>
            </div>

            {/* CTA кнопки */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group">
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                Оставить заявку
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                href="#calculator"
              >
                <Calculator className="w-5 h-5" />
                Рассчитать стоимость
              </Button>
              <a href={`tel:${CONTACT_INFO.phone}`}>
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  <Phone className="w-5 h-5" />
                  Позвонить
                </Button>
              </a>
            </div>

            {/* Дополнительная информация */}
            <div className="mt-8 flex items-center space-x-6 text-sm text-gray-400">
              <div>
                <div className="text-2xl font-bold text-white">500+</div>
                <div>Выполненных проектов</div>
              </div>
              <div className="w-px h-12 bg-gray-700"></div>
              <div>
                <div className="text-2xl font-bold text-white">4.9</div>
                <div>Средний рейтинг</div>
              </div>
              <div className="w-px h-12 bg-gray-700"></div>
              <div>
                <div className="text-2xl font-bold text-white">8+</div>
                <div>Лет опыта</div>
              </div>
            </div>
          </div>

          {/* Правая часть - изображение */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Заглушка для фото */}
              <div className="aspect-square bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center backdrop-blur-sm border border-white/10">
                <div className="text-center text-white">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                    <svg
                      className="w-16 h-16"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold">Фото владельца</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Здесь будет ваше фото
                  </p>
                </div>
              </div>

              {/* Декоративные элементы */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-500 rounded-full blur-2xl opacity-50"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent-500 rounded-full blur-2xl opacity-50"></div>
            </div>

            {/* Плавающая карточка */}
            <div className="absolute bottom-8 -left-8 bg-white rounded-xl shadow-2xl p-4 max-w-xs hidden lg:block">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    Гарантия качества
                  </div>
                  <div className="text-sm text-gray-600">36 месяцев</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Индикатор прокрутки */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white opacity-50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};
