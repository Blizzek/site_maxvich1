// Счётчик
let counter = 0;
const counterDisplay = document.getElementById('counter');
const incrementBtn = document.getElementById('incrementBtn');
const decrementBtn = document.getElementById('decrementBtn');
const resetBtn = document.getElementById('resetBtn');

function updateCounter() {
    counterDisplay.textContent = counter;
    counterDisplay.style.transform = 'scale(1.2)';
    setTimeout(() => {
        counterDisplay.style.transform = 'scale(1)';
    }, 200);
}

incrementBtn.addEventListener('click', () => {
    counter++;
    updateCounter();
});

decrementBtn.addEventListener('click', () => {
    counter--;
    updateCounter();
});

resetBtn.addEventListener('click', () => {
    counter = 0;
    updateCounter();
});

// Список задач
const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');

// Загрузка задач из localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
            <span class="todo-text">${todo.text}</span>
            <button class="delete-btn">Удалить</button>
        `;
        
        const checkbox = li.querySelector('.todo-checkbox');
        checkbox.addEventListener('change', () => {
            todos[index].completed = checkbox.checked;
            saveTodos();
            renderTodos();
        });
        
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        });
        
        todoList.appendChild(li);
    });
}

function addTodo() {
    const text = todoInput.value.trim();
    if (text) {
        todos.push({ text, completed: false });
        saveTodos();
        renderTodos();
        todoInput.value = '';
    }
}

addTodoBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Переключение темы
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

// Инициализация
renderTodos();

// Приветственное сообщение
console.log('Сайт успешно загружен! 🚀');

// Модальное окно калькулятора
const calculatorModal = document.getElementById('calculatorModal');
const openCalculatorBtn = document.getElementById('openCalculatorBtn');
const closeModalBtn = document.querySelector('.close-modal');
const calculatorContainer = document.getElementById('calculatorContainer');
let calculatorInstance = null;

// Открытие модального окна
openCalculatorBtn.addEventListener('click', () => {
    // Инициализируем калькулятор при первом открытии
    if (!calculatorInstance) {
        calculatorInstance = initRepairCalculator('calculatorContainer');
    }
    calculatorModal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
});

// Закрытие модального окна по кнопке X
closeModalBtn.addEventListener('click', () => {
    calculatorModal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Разблокируем прокрутку
});

// Закрытие модального окна по клику вне его (только на сам фон)
calculatorModal.addEventListener('click', (e) => {
    if (e.target === calculatorModal) {
        calculatorModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Закрытие модального окна по нажатию Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && calculatorModal.classList.contains('show')) {
        calculatorModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});
