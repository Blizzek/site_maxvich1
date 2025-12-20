'use client';

import { useEffect, useState } from 'react';
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  area: number;
  duration: string;
  price?: number;
  imageBefore: string;
  imageAfter: string;
}

export const PortfolioSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showBefore, setShowBefore] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          setProjects(data.slice(0, 6)); // Показываем первые 6 проектов
          
          // Инициализируем состояние для каждого проекта
          const initialState: { [key: string]: boolean } = {};
          data.forEach((project: Project) => {
            initialState[project.id] = true; // По умолчанию показываем "до"
          });
          setShowBefore(initialState);
        }
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  const toggleImage = (projectId: string) => {
    setShowBefore(prev => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  if (isLoading) {
    return (
      <Section id="portfolio" className="bg-gray-50">
        <Container>
          <div className="flex flex-col gap-3 mb-10">
            <p className="text-sm font-semibold text-primary-500">Портфолио</p>
            <h2 className="heading-2">Наши работы</h2>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-500">Загрузка проектов...</p>
          </div>
        </Container>
      </Section>
    );
  }

  if (projects.length === 0) {
    return (
      <Section id="portfolio" className="bg-gray-50">
        <Container>
          <div className="flex flex-col gap-3 mb-10">
            <p className="text-sm font-semibold text-primary-500">Портфолио</p>
            <h2 className="heading-2">Наши работы</h2>
            <p className="text-gray-600 max-w-2xl">
              Скоро здесь появятся фотографии наших проектов
            </p>
          </div>
          <Card className="p-12">
            <p className="text-center text-gray-500">Проекты будут добавлены в ближайшее время</p>
          </Card>
        </Container>
      </Section>
    );
  }

  return (
    <Section id="portfolio" className="bg-gray-50">
      <Container>
        <div className="flex flex-col gap-3 mb-10">
          <p className="text-sm font-semibold text-primary-500">Портфолио</p>
          <h2 className="heading-2">Наши работы: До и После</h2>
          <p className="text-gray-600 max-w-2xl">
            Реальные проекты наших клиентов. Нажмите на карточку, чтобы увидеть результат.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card 
              key={project.id} 
              hover 
              className="overflow-hidden cursor-pointer group"
              onClick={() => toggleImage(project.id)}
            >
              <div className="relative h-64">
                <Image
                  src={showBefore[project.id] ? project.imageBefore : project.imageAfter}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {showBefore[project.id] ? 'До' : 'После'}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-sm font-medium">Нажмите, чтобы переключить</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary-600 mb-2">
                  {project.category}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
                {project.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                )}
                
                <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                  {project.area > 0 && (
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {project.area} м²
                    </span>
                  )}
                  {project.duration && (
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {project.duration}
                    </span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Button href="#contacts" size="lg">
            Обсудить ваш проект
          </Button>
        </div>
      </Container>
    </Section>
  );
};
