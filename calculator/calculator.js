/**
 * Калькулятор стоимости ремонта
 * Основной модуль с логикой расчета и инициализацией
 */

class RepairCalculator {
  constructor(containerId, config = CALCULATOR_CONFIG) {
    this.containerId = containerId;
    this.config = config;
    this.container = null;
    this.form = null;
    this.resultBlock = null;
    this.shouldScrollToResult = false;
  }

  /**
   * Инициализация калькулятора
   */
  init() {
    this.container = document.getElementById(this.containerId);
    
    if (!this.container) {
      console.error(`Контейнер с ID "${this.containerId}" не найден`);
      return;
    }

    // Вставляем HTML
    this.container.innerHTML = getCalculatorHTML();

    // Находим элементы
    this.form = document.getElementById('calculatorForm');
    this.resultBlock = document.getElementById('calculatorResult');

    // Добавляем обработчики
    this.attachEventListeners();

    console.log('Калькулятор ремонта инициализирован');
  }

  /**
   * Добавление обработчиков событий
   */
  attachEventListeners() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.shouldScrollToResult = true;
        this.calculatePrice();
      });

      // Автоматический пересчет при изменении любого поля
      this.form.addEventListener('change', () => {
        if (this.resultBlock.style.display !== 'none') {
          this.calculatePrice();
        }
      });

      this.form.addEventListener('input', (e) => {
        if (e.target.type === 'number' && this.resultBlock.style.display !== 'none') {
          this.calculatePrice();
        }
      });
    }
  }

  /**
   * Получение данных формы
   */
  getFormData() {
    const formData = new FormData(this.form);
    
    return {
      area: parseFloat(formData.get('area')) || 0,
      objectType: formData.get('objectType'),
      buildingType: formData.get('buildingType'),
      bathrooms: parseInt(formData.get('bathrooms')) || 0,
      finishType: formData.get('finishType'),
      electrical: formData.get('electrical') === 'on',
      heating: formData.get('heating') === 'on',
      plumbing: formData.get('plumbing') === 'on',
      replanning: formData.get('replanning') === 'on',
      ceiling: formData.get('ceiling') === 'on',
      designProject: formData.get('designProject') === 'on'
    };
  }

  /**
   * Расчет стоимости
   */
  calculatePrice() {
    const data = this.getFormData();
    
    if (data.area <= 0) {
      alert('Пожалуйста, укажите площадь помещения');
      return;
    }

    const breakdown = [];
    let totalPrice = 0;

    // 1. Базовая стоимость (площадь × базовая цена за м2)
    const basePrice = this.config.basePrice[data.finishType] || 0;
    const baseCost = data.area * basePrice;
    breakdown.push({
      label: `Базовая стоимость (${data.finishType}, ${data.area} м²)`,
      value: baseCost
    });
    totalPrice += baseCost;

    // 2. Коэффициент типа объекта
    const objectCoeff = this.config.objectType[data.objectType] || 1.0;
    if (objectCoeff !== 1.0) {
      const objectExtra = baseCost * (objectCoeff - 1);
      breakdown.push({
        label: `Надбавка за тип объекта (${data.objectType})`,
        value: objectExtra
      });
      totalPrice += objectExtra;
    }

    // 3. Коэффициент типа здания
    const buildingCoeff = this.config.buildingType[data.buildingType] || 1.0;
    if (buildingCoeff !== 1.0) {
      const buildingExtra = baseCost * objectCoeff * (buildingCoeff - 1);
      breakdown.push({
        label: `Надбавка за тип здания (${data.buildingType})`,
        value: buildingExtra
      });
      totalPrice += buildingExtra;
    }

    // 4. Санузлы
    if (data.bathrooms > 0) {
      const bathroomCost = data.bathrooms * this.config.bathroomPrice;
      breakdown.push({
        label: `Санузлы (${data.bathrooms} шт.)`,
        value: bathroomCost
      });
      totalPrice += bathroomCost;
    }

    // 5. Дополнительные услуги
    const services = [
      { key: 'electrical', name: 'электрика', enabled: data.electrical },
      { key: 'heating', name: 'теплыйПол', enabled: data.heating },
      { key: 'plumbing', name: 'сантехника', enabled: data.plumbing },
      { key: 'replanning', name: 'перепланировка', enabled: data.replanning },
      { key: 'ceiling', name: 'натяжнойПотолок', enabled: data.ceiling },
      { key: 'designProject', name: 'дизайнПроект', enabled: data.designProject }
    ];

    services.forEach(service => {
      if (service.enabled) {
        const serviceConfig = this.config.additionalServices[service.name];
        let serviceCost = 0;

        if (serviceConfig.type === 'perSquareMeter') {
          serviceCost = data.area * serviceConfig.price;
        } else if (serviceConfig.type === 'fixed') {
          serviceCost = serviceConfig.price;
        }

        if (serviceCost > 0) {
          breakdown.push({
            label: this.getServiceLabel(service.name, serviceConfig.type, data.area),
            value: serviceCost
          });
          totalPrice += serviceCost;
        }
      }
    });

    // Отображаем результат
    this.displayResult(breakdown, totalPrice);
  }

  /**
   * Получение метки для услуги
   */
  getServiceLabel(serviceName, type, area) {
    const labels = {
      'электрика': 'Электрика',
      'теплыйПол': 'Теплый пол',
      'сантехника': 'Сантехника',
      'перепланировка': 'Перепланировка',
      'натяжнойПотолок': 'Натяжной потолок',
      'дизайнПроект': 'Дизайн-проект'
    };

    const label = labels[serviceName] || serviceName;
    
    if (type === 'perSquareMeter') {
      return `${label} (${area} м²)`;
    }
    
    return label;
  }

  /**
   * Форматирование числа в валюту
   */
  formatCurrency(value) {
    return new Intl.NumberFormat('ru-RU', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(Math.round(value)) + ' ' + this.config.currency;
  }

  /**
   * Отображение результата
   */
  displayResult(breakdown, totalPrice) {
    const breakdownHTML = breakdown.map(item => `
      <div class="breakdown-item">
        <span class="breakdown-label">${item.label}</span>
        <span class="breakdown-value">${this.formatCurrency(item.value)}</span>
      </div>
    `).join('');

    const breakdownContainer = document.getElementById('resultBreakdown');
    const totalPriceElement = document.getElementById('totalPrice');

    if (breakdownContainer) {
      breakdownContainer.innerHTML = breakdownHTML;
    }

    if (totalPriceElement) {
      totalPriceElement.textContent = this.formatCurrency(totalPrice);
    }

    // Показываем блок результата
    if (this.resultBlock) {
      this.resultBlock.style.display = 'block';
      
      // Прокручиваем к результату только при первом расчете (после нажатия кнопки)
      if (this.shouldScrollToResult) {
        setTimeout(() => {
          this.resultBlock.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
        this.shouldScrollToResult = false;
      }
    }
  }

  /**
   * Обновление конфигурации цен (для админ-панели)
   */
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    console.log('Конфигурация обновлена', this.config);
    
    // Пересчитываем, если уже есть результат
    if (this.resultBlock && this.resultBlock.style.display !== 'none') {
      this.calculatePrice();
    }
  }

  /**
   * Получение текущей конфигурации
   */
  getConfig() {
    return this.config;
  }
}

/**
 * Функция для быстрой инициализации калькулятора
 * @param {string} containerId - ID контейнера для калькулятора
 * @param {object} customConfig - Пользовательская конфигурация (опционально)
 * @returns {RepairCalculator} - Экземпляр калькулятора
 */
function initRepairCalculator(containerId, customConfig = null) {
  const config = customConfig || CALCULATOR_CONFIG;
  const calculator = new RepairCalculator(containerId, config);
  calculator.init();
  return calculator;
}

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { RepairCalculator, initRepairCalculator };
}
