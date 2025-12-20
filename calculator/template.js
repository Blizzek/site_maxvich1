/**
 * Модуль калькулятора стоимости ремонта
 * Возвращает HTML-шаблон калькулятора
 */

function getCalculatorHTML() {
  return `
    <div class="repair-calculator" id="repairCalculator">
      <div class="calculator-header">
        <h2 class="calculator-title">Калькулятор стоимости ремонта</h2>
        <p class="calculator-subtitle">Рассчитайте примерную стоимость вашего ремонта</p>
      </div>

      <form class="calculator-form" id="calculatorForm">
        <!-- Площадь -->
        <div class="form-group">
          <label for="area" class="form-label">
            Площадь помещения (м²) <span class="required">*</span>
          </label>
          <input 
            type="number" 
            id="area" 
            name="area" 
            class="form-input" 
            placeholder="Введите площадь"
            min="1"
            required
          />
        </div>

        <!-- Тип объекта -->
        <div class="form-group">
          <label class="form-label">
            Тип объекта <span class="required">*</span>
          </label>
          <div class="radio-group">
            <label class="radio-label">
              <input type="radio" name="objectType" value="квартира" checked />
              <span>Квартира</span>
            </label>
            <label class="radio-label">
              <input type="radio" name="objectType" value="офис" />
              <span>Офис</span>
            </label>
            <label class="radio-label">
              <input type="radio" name="objectType" value="дом" />
              <span>Дом</span>
            </label>
          </div>
        </div>

        <!-- Тип здания -->
        <div class="form-group">
          <label class="form-label">
            Тип здания <span class="required">*</span>
          </label>
          <div class="radio-group">
            <label class="radio-label">
              <input type="radio" name="buildingType" value="новостройка" checked />
              <span>Новостройка</span>
            </label>
            <label class="radio-label">
              <input type="radio" name="buildingType" value="вторичка" />
              <span>Вторичка</span>
            </label>
          </div>
        </div>

        <!-- Количество санузлов -->
        <div class="form-group">
          <label for="bathrooms" class="form-label">
            Количество санузлов <span class="required">*</span>
          </label>
          <input 
            type="number" 
            id="bathrooms" 
            name="bathrooms" 
            class="form-input" 
            placeholder="Введите количество"
            min="0"
            value="1"
            required
          />
        </div>

        <!-- Тип отделки -->
        <div class="form-group">
          <label class="form-label">
            Тип отделки <span class="required">*</span>
          </label>
          <div class="radio-group">
            <label class="radio-label">
              <input type="radio" name="finishType" value="косметический" checked />
              <span>Косметический</span>
            </label>
            <label class="radio-label">
              <input type="radio" name="finishType" value="дизайнерский" />
              <span>Дизайнерский</span>
            </label>
            <label class="radio-label">
              <input type="radio" name="finishType" value="капитальный" />
              <span>Капитальный</span>
            </label>
          </div>
        </div>

        <!-- Дополнительные услуги -->
        <div class="form-group">
          <label class="form-label">Дополнительные услуги</label>
          <div class="checkbox-group">
            <label class="checkbox-label">
              <input type="checkbox" name="electrical" id="electrical" />
              <span>Электрика</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" name="heating" id="heating" />
              <span>Теплый пол</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" name="plumbing" id="plumbing" />
              <span>Сантехника</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" name="replanning" id="replanning" />
              <span>Перепланировка</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" name="ceiling" id="ceiling" />
              <span>Натяжной потолок</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" name="designProject" id="designProject" />
              <span>Дизайн-проект</span>
            </label>
          </div>
        </div>

        <!-- Кнопка расчета -->
        <button type="submit" class="calculate-btn">
          Рассчитать стоимость
        </button>
      </form>

      <!-- Результат -->
      <div class="calculator-result" id="calculatorResult" style="display: none;">
        <div class="result-header">
          <h3 class="result-title">Результат расчета</h3>
        </div>
        <div class="result-breakdown" id="resultBreakdown"></div>
        <div class="result-total">
          <span class="result-total-label">Итоговая стоимость:</span>
          <span class="result-total-value" id="totalPrice">0 ₽</span>
        </div>
        <p class="result-note">
          * Указанная стоимость является предварительной. Точная цена определяется после осмотра объекта.
        </p>
      </div>
    </div>
  `;
}

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getCalculatorHTML };
}
