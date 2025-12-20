"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SERVICE_CATEGORIES } from "@/data/services";
import {
  Home,
  Paintbrush,
  Building2,
  Droplets,
  ChefHat,
  Ruler,
  Grid,
  Layers,
  Brush,
} from "lucide-react";

const iconMap = {
  home: Home,
  paintbrush: Paintbrush,
  building: Building2,
  droplet: Droplets,
  "chef-hat": ChefHat,
  ruler: Ruler,
  grid: Grid,
  layers: Layers,
  "paintbrush-2": Brush,
};

type ServiceCategoryId = (typeof SERVICE_CATEGORIES)[number]["id"];

export const ServicesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ServiceCategoryId>(SERVICE_CATEGORIES[0].id);
  const current = SERVICE_CATEGORIES.find((c) => c.id === activeTab) ?? SERVICE_CATEGORIES[0];

  return (
    <Section id="services" className="bg-gradient-to-b from-white to-gray-50">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full border border-primary-100">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-primary-600">Наши услуги</span>
            </div>
            <h2 className="heading-2">Ремонт под ключ и отдельные работы</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Выберите тип ремонта, узнайте базовые цены. Работаем по договору с гарантией 36 месяцев.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {SERVICE_CATEGORIES.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-xl border-2 px-5 py-2.5 text-sm font-bold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "border-primary-500 bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30 scale-105"
                    : "border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {current.services.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] ?? Home;
            return (
              <Card 
                key={service.id} 
                hover 
                variant="premium"
                className="h-full flex flex-col group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-50 to-orange-50 text-primary-500 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-sm font-bold text-white bg-gradient-to-r from-primary-500 to-orange-500 px-4 py-2 rounded-xl shadow-md">
                    {service.price}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">{service.title}</h3>
                <p className="text-sm text-gray-600 mb-4 flex-1">{service.description}</p>
                <div className="space-y-2 mb-4">
                  {service.features.slice(0, 4).map((feature) => (
                    <div key={feature} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-auto flex gap-3">
                  <Button className="w-full" size="sm" href="#contacts">
                    Оставить заявку
                  </Button>
                  <Button variant="outline" size="sm" className="w-full" href="#contacts">
                    Подробнее
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-10">
          <Card className="bg-gradient-to-r from-primary-500 to-accent-500 text-white">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.08em] text-white/80">Не знаете с чего начать?</p>
                <h3 className="text-2xl font-bold">Сделаем бесплатный замер и смету</h3>
                <p className="text-white/80 text-sm mt-2">
                  Выезжаем в любой район города, консультируем по материалам, рассчитываем смету за 24 часа.
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  className="bg-white text-primary-600 hover:bg-white/90"
                  size="lg"
                  href="#contacts"
                >
                  Вызвать замерщика
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  size="lg"
                  href="#contacts"
                >
                  Получить смету
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </Section>
  );
};
