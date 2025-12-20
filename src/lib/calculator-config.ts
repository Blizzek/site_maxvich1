import fs from 'fs';
import path from 'path';

const CONFIG_PATH = path.join(process.cwd(), 'data', 'calculator-config.json');

export interface CalculatorConfig {
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
      type: 'perSquareMeter' | 'fixed';
      price: number;
    };
    теплыйПол: {
      type: 'perSquareMeter' | 'fixed';
      price: number;
    };
    сантехника: {
      type: 'perSquareMeter' | 'fixed';
      price: number;
    };
    перепланировка: {
      type: 'perSquareMeter' | 'fixed';
      price: number;
    };
  };
  currency: string;
  version: string;
  lastUpdated: string;
}

const DEFAULT_CONFIG: CalculatorConfig = {
  basePrice: {
    косметический: 5000,
    дизайнерский: 12000,
    капитальный: 20000,
  },
  objectType: {
    квартира: 1.0,
    офис: 1.2,
    дом: 1.3,
  },
  buildingType: {
    новостройка: 1.0,
    вторичка: 1.15,
  },
  bathroomPrice: 80000,
  additionalServices: {
    электрика: {
      type: 'perSquareMeter',
      price: 2000,
    },
    теплыйПол: {
      type: 'perSquareMeter',
      price: 3500,
    },
    сантехника: {
      type: 'perSquareMeter',
      price: 1500,
    },
    перепланировка: {
      type: 'fixed',
      price: 150000,
    },
  },
  currency: '₽',
  version: '1.0.0',
  lastUpdated: new Date().toISOString(),
};

// Инициализация конфига
function initConfig() {
  const dir = path.dirname(CONFIG_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(CONFIG_PATH)) {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(DEFAULT_CONFIG, null, 2));
  }
}

// Получить конфигурацию
export function getCalculatorConfig(): CalculatorConfig {
  initConfig();
  const data = fs.readFileSync(CONFIG_PATH, 'utf-8');
  return JSON.parse(data);
}

// Обновить конфигурацию
export function updateCalculatorConfig(config: Partial<CalculatorConfig>): CalculatorConfig {
  initConfig();
  const currentConfig = getCalculatorConfig();
  
  const updatedConfig: CalculatorConfig = {
    ...currentConfig,
    ...config,
    lastUpdated: new Date().toISOString(),
  };
  
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(updatedConfig, null, 2));
  
  return updatedConfig;
}

// Сбросить к настройкам по умолчанию
export function resetCalculatorConfig(): CalculatorConfig {
  const config = {
    ...DEFAULT_CONFIG,
    lastUpdated: new Date().toISOString(),
  };
  
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
  
  return config;
}
