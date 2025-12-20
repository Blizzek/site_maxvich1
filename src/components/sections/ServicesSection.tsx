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
    <Section id="services" className="bg-white">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <p className="text-sm font-semibold text-primary-500">Наши услуги</p>
            <h2 className="heading-2 mb-3">Ремонт под ключ и отдельные работы</h2>
            <p className="text-gray-600 max-w-2xl">
              Быстрый старт: выберите тип ремонта, узнайте базовые цены и оставьте заявку. Работаем по договору, даем гарантию 36 месяцев.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {SERVICE_CATEGORIES.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "border-primary-500 bg-primary-50 text-primary-600 shadow-sm"
                    : "border-gray-200 text-gray-600 hover:border-primary-200 hover:text-primary-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {current.services.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] ?? Home;
            return (
              <Card key={service.id} hover className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-500 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                    {service.price}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
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

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
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

          <Card className="h-full flex flex-col justify-between">
            <div>
              <p className="text-sm font-semibold text-primary-500">Калькулятор стоимости</p>
              <h3 className="text-xl font-bold text-gray-900 mt-2">Разработчик 2 подключает расчёт</h3>
              <p className="text-sm text-gray-600 mt-2">
                Мы уже подготовили раздел. Калькулятор стоимости реализует Разработчик 2 — после этого клиенты смогут считать цену онлайн.
              </p>
            </div>
            <Button className="mt-6" href="#calculator">
              Получить расчёт
            </Button>
          </Card>
        </div>
      </Container>
    </Section>
  );
};
