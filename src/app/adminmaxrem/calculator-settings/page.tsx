'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

interface CalculatorConfig {
  basePrice: {
    косметический: number;
    дизайнерский: number;
    капитальный: number;
  };
  objectType: {
    квартира: number;
    офис: number;
    дом: number;
  };
  buildingType: {
    новостройка: number;
    вторичка: number;
  };
  bathroomPrice: number;
  additionalServices: {
    электрика: {
      type: string;
      price: number;
    };
    теплыйПол: {
      type: string;
      price: number;
    };
    сантехника: {
      type: string;
      price: number;
    };
    перепланировка: {
      type: string;
      price: number;
    };
  };
  currency: string;
  version: string;
  lastUpdated: string;
}

export default function CalculatorSettingsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [config, setConfig] = useState<CalculatorConfig | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token === 'authenticated') {
      setIsAuthenticated(true);
      loadConfig();
    } else {
      router.push('/adminmaxrem');
    }
    setIsLoading(false);
  }, [router]);

  const loadConfig = async () => {
    try {
      const response = await fetch('/api/calculator-config');
      if (response.ok) {
        const data = await response.json();
        setConfig(data);
      }
    } catch (error) {
      console.error('Error loading config:', error);
    }
  };

  const handleSave = async () => {
    if (!config) return;

    setIsSaving(true);
    try {
      const response = await fetch('/api/calculator-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (response.ok) {
        alert('Настройки успешно сохранены!');
      } else {
        alert('Ошибка при сохранении настроек');
      }
    } catch (error) {
      console.error('Error saving config:', error);
      alert('Ошибка при сохранении настроек');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (!confirm('Вернуть настройки по умолчанию? Все изменения будут потеряны.')) return;

    try {
      const response = await fetch('/api/calculator-config', {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        setConfig(data.config);
        alert('Настройки сброшены к значениям по умолчанию');
      }
    } catch (error) {
      console.error('Error resetting config:', error);
      alert('Ошибка при сбросе настроек');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/adminmaxrem');
  };

  const updateValue = (path: string[], value: number) => {
    if (!config) return;

    const newConfig = JSON.parse(JSON.stringify(config));
    let current: any = newConfig;
    
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    
    current[path[path.length - 1]] = value;
    setConfig(newConfig);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Загрузка...</div>
      </div>
    );
  }

  if (!isAuthenticated || !config) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <Container>
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Настройки калькулятора</h1>
              <p className="text-sm text-gray-600 mt-1">Управление ценами и коэффициентами</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => router.push('/adminmaxrem/dashboard')} variant="outline">
                Назад
              </Button>
              <Button onClick={handleLogout} variant="outline">
                Выйти
              </Button>
            </div>
          </div>
        </Container>
      </header>

      <main className="py-10">
        <Container>
          <div className="space-y-6">
            {/* Базовые цены */}
            <Card>
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Базовая цена за м²</h2>
                <p className="text-sm text-gray-600 mt-1">Цена зависит от типа отделки</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Косметический ремонт (₽/м²)
                    </label>
                    <Input
                      type="number"
                      value={config.basePrice.косметический}
                      onChange={(e) => updateValue(['basePrice', 'косметический'], Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Дизайнерский ремонт (₽/м²)
                    </label>
                    <Input
                      type="number"
                      value={config.basePrice.дизайнерский}
                      onChange={(e) => updateValue(['basePrice', 'дизайнерский'], Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Капитальный ремонт (₽/м²)
                    </label>
                    <Input
                      type="number"
                      value={config.basePrice.капитальный}
                      onChange={(e) => updateValue(['basePrice', 'капитальный'], Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Коэффициенты типа объекта */}
            <Card>
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Коэффициенты типа объекта</h2>
                <p className="text-sm text-gray-600 mt-1">Умножается на базовую цену</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Квартира (коэф.)
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      value={config.objectType.квартира}
                      onChange={(e) => updateValue(['objectType', 'квартира'], Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Офис (коэф.)
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      value={config.objectType.офис}
                      onChange={(e) => updateValue(['objectType', 'офис'], Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Дом (коэф.)
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      value={config.objectType.дом}
                      onChange={(e) => updateValue(['objectType', 'дом'], Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Коэффициенты типа здания */}
            <Card>
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Коэффициенты типа здания</h2>
                <p className="text-sm text-gray-600 mt-1">Умножается на базовую цену</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Новостройка (коэф.)
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      value={config.buildingType.новостройка}
                      onChange={(e) => updateValue(['buildingType', 'новостройка'], Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Вторичка (коэф.)
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      value={config.buildingType.вторичка}
                      onChange={(e) => updateValue(['buildingType', 'вторичка'], Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Санузлы */}
            <Card>
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Санузлы</h2>
                <p className="text-sm text-gray-600 mt-1">Фиксированная цена за каждый санузел</p>
              </div>
              <div className="p-6">
                <div className="max-w-xs">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Цена за санузел (₽)
                  </label>
                  <Input
                    type="number"
                    value={config.bathroomPrice}
                    onChange={(e) => updateValue(['bathroomPrice'], Number(e.target.value))}
                  />
                </div>
              </div>
            </Card>

            {/* Дополнительные услуги */}
            <Card>
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Дополнительные услуги</h2>
                <p className="text-sm text-gray-600 mt-1">Цены за дополнительные работы</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Электрика (₽/м²)
                    </label>
                    <Input
                      type="number"
                      value={config.additionalServices.электрика.price}
                      onChange={(e) => updateValue(['additionalServices', 'электрика', 'price'], Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Теплый пол (₽/м²)
                    </label>
                    <Input
                      type="number"
                      value={config.additionalServices.теплыйПол.price}
                      onChange={(e) => updateValue(['additionalServices', 'теплыйПол', 'price'], Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Сантехника (₽/м²)
                    </label>
                    <Input
                      type="number"
                      value={config.additionalServices.сантехника.price}
                      onChange={(e) => updateValue(['additionalServices', 'сантехника', 'price'], Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Перепланировка (₽)
                    </label>
                    <Input
                      type="number"
                      value={config.additionalServices.перепланировка.price}
                      onChange={(e) => updateValue(['additionalServices', 'перепланировка', 'price'], Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Кнопки действий */}
            <div className="flex justify-between items-center">
              <Button
                onClick={handleReset}
                variant="outline"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Сбросить к умолчанию
              </Button>
              <div className="flex gap-3">
                <Button onClick={() => router.back()} variant="outline">
                  Отмена
                </Button>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? 'Сохранение...' : 'Сохранить изменения'}
                </Button>
              </div>
            </div>

            {/* Информация */}
            {config.lastUpdated && (
              <Card className="p-4 bg-blue-50 border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Последнее обновление:</strong>{' '}
                  {new Date(config.lastUpdated).toLocaleString('ru-RU')}
                </p>
              </Card>
            )}
          </div>
        </Container>
      </main>
    </div>
  );
}
