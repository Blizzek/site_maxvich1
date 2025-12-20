"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Phone, Calculator, Send, CheckCircle2, Award, Shield } from "lucide-react";
import { CONTACT_INFO } from "@/data/constants";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-center bg-cover" style={{ backgroundImage: "url('/images/IfDg_EWMM8dWrGmRcn5gagMj3eKDHYri7jCsjV7UQpFJ9lyttghVtcEyoJkGiBs.jpg')" }}>
      {/* Тёмный оверлей поверх фото */}
      <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />
      {/* Современный фоновый паттерн */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(255, 255, 255) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Анимированные градиентные сферы */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-br from-primary-500/30 to-orange-500/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-secondary-500/25 to-blue-500/25 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse-glow"></div>
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center py-24">
          {/* Левая часть - контент */}
          <div className="text-white space-y-8">
            {/* Бейдж */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-500/20 to-orange-500/20 rounded-full border border-primary-500/30 backdrop-blur-sm">
              <Award className="w-4 h-4 text-primary-400" />
              <span className="text-primary-300 text-sm font-semibold">
                Профессиональный ремонт с 2016 года
              </span>
            </div>

            {/* Заголовок */}
            <div className="space-y-4">
              <h1 className="heading-1 text-white leading-tight">
                Ремонт квартир{" "}
                <span className="gradient-text block mt-2">
                  под ключ в Нижнем Новгороде
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl font-light leading-relaxed">
                Превратим вашу квартиру в пространство мечты. Гарантия качества,
                прозрачные цены, соблюдение сроков.
              </p>
            </div>

            {/* Ключевые преимущества в сетке */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { icon: Award, text: "Опыт более 8 лет" },
                { icon: Shield, text: "Гарантия 36 месяцев" },
                { icon: CheckCircle2, text: "Бесплатный замер" },
                { icon: CheckCircle2, text: "От 650₽/м²" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/20 to-orange-500/20 flex items-center justify-center border border-primary-500/30 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-5 h-5 text-primary-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-300">{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTA кнопки */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button variant="premium" size="xl" href="#calculator" className="group">
                  <Calculator className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <div className="flex flex-col items-start">
                    <span>Рассчитать стоимость</span>
                    <span className="text-xs opacity-90">за 30 секунд</span>
                  </div>
                </Button>
                <Button
                  size="xl"
                  className="bg-white/10 text-white hover:bg-white/20"
                  href="#contacts"
                >
                  <Send className="w-5 h-5" />
                  Оставить заявку
                </Button>
            </div>
            
            {/* Контакт */}
            <div className="flex items-center gap-4 pt-2">
              <Button 
                variant="ghost" 
                size="lg" 
                className="bg-white/5 hover:bg-white/10 text-white border border-white/20" 
                href={`tel:${CONTACT_INFO.phone}`}
              >
                <Phone className="w-5 h-5" />
                {CONTACT_INFO.phone}
              </Button>
            </div>

            {/* Статистика */}
            <div className="flex items-center gap-8 pt-6 border-t border-white/10">
              {[
                { value: "500+", label: "Проектов" },
                { value: "4.9", label: "Рейтинг" },
                { value: "8+", label: "Лет опыта" },
              ].map((stat, index) => (
                <div key={index} className="group cursor-default">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1 group-hover:text-primary-400 transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Правая часть - интерактивная 3D карточка */}
          <div className="relative lg:block hidden">
            {/* Главная карточка с портфолио */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-500 group">
              {/* Фоновое изображение (заглушка) */}
              <div className="aspect-[4/5] bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 flex items-center justify-center relative">
                {/* Сетка паттерна */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: '50px 50px'
                }}></div>
                
                {/* Центральный контент */}
                <div className="text-center text-white z-10 p-8">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-500/30 to-secondary-500/30 flex items-center justify-center border-4 border-white/20 backdrop-blur-sm">
                    <svg
                      className="w-16 h-16 text-white"
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
                  <h3 className="text-2xl font-bold mb-2">Портфолио работ</h3>
                  <p className="text-gray-300">Примеры наших проектов</p>
                </div>
                
                {/* Декоративные элементы */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary-500/40 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-secondary-500/40 to-transparent rounded-full blur-3xl"></div>
              </div>
              
              {/* Оверлей при наведении */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Плавающие карточки-преимущества */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-5 max-w-xs animate-float border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
                  <CheckCircle2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">Гарантия качества</div>
                  <div className="text-sm text-gray-600 font-medium">36 месяцев на работы</div>
                </div>
              </div>
            </div>
            
            {/* Вторая плавающая карточка */}
            <div className="absolute -top-6 -right-6 bg-gradient-to-br from-primary-500 to-orange-600 rounded-2xl shadow-2xl p-5 animate-float border border-orange-400/50" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="text-white">
                  <div className="font-bold text-lg">8+ лет</div>
                  <div className="text-sm opacity-90">На рынке</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Индикатор прокрутки */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs font-medium">Листайте вниз</span>
          <svg
            className="w-6 h-6"
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
      </div>
    </section>
  );
};
