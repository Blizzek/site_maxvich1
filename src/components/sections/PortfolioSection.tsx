import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "lucide-react";

const portfolioItems = [
  {
    id: 1,
    title: "Квартира 72 м²",
    location: "Нижний Новгород, ЖК Академический",
    scope: "Ремонт под ключ",
    status: "Фото добавим после загрузки",
  },
  {
    id: 2,
    title: "Дом 180 м²",
    location: "Борский район",
    scope: "Капитальный ремонт",
    status: "Готовим фото до/после",
  },
  {
    id: 3,
    title: "Ванная 6 м²",
    location: "Нижний Новгород, Сормово",
    scope: "Ремонт ванной",
    status: "Ожидаем материалы от клиента",
  },
  {
    id: 4,
    title: "Кухня 14 м²",
    location: "Нижний Новгород, Советский район",
    scope: "Обновление кухни",
    status: "Фото будет добавлено",
  },
];

export const PortfolioSection: React.FC = () => {
  return (
    <Section id="portfolio" className="bg-gray-50">
      <Container>
        <div className="flex flex-col gap-3 mb-10">
          <p className="text-sm font-semibold text-primary-500">Портфолио</p>
          <h2 className="heading-2">Реальные объекты — фото в процессе загрузки</h2>
          <p className="text-gray-600 max-w-2xl">
            Добавим фото до/после, как только получим материалы. Уже сейчас можем показать готовые кейсы при личном общении.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <Card key={item.id} hover className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-50" />
              <div className="relative flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-primary-600">
                  <Badge className="w-4 h-4" />
                  {item.scope}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.location}</p>
                <div className="rounded-lg border border-dashed border-gray-200 bg-white/60 p-3 text-sm text-gray-500">
                  {item.status}
                </div>
                <div className="flex gap-3 mt-2">
                  <Button size="sm" href="#contacts">
                    Запросить кейс
                  </Button>
                  <Button variant="outline" size="sm" href="#contacts">
                    Обсудить проект
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
};
