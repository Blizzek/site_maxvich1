"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ADVANTAGES } from "@/data/constants";
import { Award, Shield, Ruler, Wallet } from "lucide-react";

const iconMap = {
  award: Award,
  shield: Shield,
  ruler: Ruler,
  wallet: Wallet,
};

export const AdvantagesSection: React.FC = () => {
  return (
    <Section className="bg-gray-50">
      <Container>
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-4">
            Почему выбирают{" "}
            <span className="text-primary-500">именно нас</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Мы ценим ваше время и деньги. Поэтому предлагаем лучшие условия
            для вашего ремонта
          </p>
        </div>

        {/* Сетка преимуществ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ADVANTAGES.map((advantage) => {
            const Icon = iconMap[advantage.icon as keyof typeof iconMap];
            return (
              <Card key={advantage.id} hover className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-50 rounded-full flex items-center justify-center">
                  <Icon className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {advantage.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {advantage.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Дополнительные преимущества */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-500 mb-2">
              500+
            </div>
            <div className="text-gray-600">Выполненных объектов</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-500 mb-2">
              98%
            </div>
            <div className="text-gray-600">Довольных клиентов</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-500 mb-2">
              24/7
            </div>
            <div className="text-gray-600">Поддержка клиентов</div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
