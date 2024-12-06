document.addEventListener("DOMContentLoaded", () => {
    const themeToggleButton = document.getElementById("theme-toggle-button");
    const themeMenu = document.getElementById("theme-menu");
    const menuItems = document.querySelectorAll(".menu-item");
    const themeIconImg = themeToggleButton.querySelector("img"); // Находим изображение внутри кнопки

    // Функция для применения темы
    function applyTheme(theme) {
        const root = document.documentElement;
        const classList = root.classList;

        // Удаляем текущие классы темы
        classList.remove("light", "dark");

        if (theme === "system" || !theme) {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            theme = prefersDark ? "dark" : "light";
        }

        // Применяем выбранную тему
        classList.add(theme);
        root.style.colorScheme = theme;
        localStorage.setItem("theme", theme); // Сохраняем тему

        // Обновляем путь к изображению в кнопке
        updateThemeIcon(theme);
    }

    // Функция для обновления активной кнопки
    function updateActiveButton(activeButton) {
        menuItems.forEach(item => item.classList.remove("active"));
        activeButton.classList.add("active");
    }

    // Функция для позиционирования меню по центру под кнопкой
    function positionMenu() {
        const buttonRect = themeToggleButton.getBoundingClientRect();
        themeMenu.style.top = `${buttonRect.bottom}px`;
    }

    // Функция для изменения пути к изображению в кнопке
    function updateThemeIcon(theme) {
        const iconPaths = {
            light: '/images/svg/theme_light.svg',
            dark: '/images/svg/theme_dark.svg'
        };

        // Изменяем путь к изображению
        if (themeIconImg) {
            themeIconImg.src = iconPaths[theme];
        }
    }

    // Открытие/закрытие меню
    themeToggleButton.addEventListener("click", (event) => {
        event.stopPropagation(); // Останавливаем всплытие события
        const isExpanded = themeToggleButton.getAttribute("aria-expanded") === "true";
        themeToggleButton.setAttribute("aria-expanded", !isExpanded);

        if (!isExpanded) {
            positionMenu(); // Устанавливаем позицию меню перед его отображением
            themeMenu.classList.add("visible");
        } else {
            themeMenu.classList.remove("visible");
        }
    });

    // Закрытие меню при клике вне его области
    document.addEventListener("click", (event) => {
        if (!themeToggleButton.contains(event.target) && !themeMenu.contains(event.target)) {
            themeMenu.classList.remove("visible");
            themeToggleButton.setAttribute("aria-expanded", "false");
        }
    });

    // Обработка выбора темы
    menuItems.forEach((item) => {
        item.addEventListener("click", () => {
            const theme = item.id.split("-")[1]; // Получаем выбранную тему
            applyTheme(theme);
            updateActiveButton(item); // Обновляем активную кнопку
            themeMenu.classList.remove("visible");
            themeToggleButton.setAttribute("aria-expanded", "false");
        });
    });

    // Установка темы при загрузке
    const savedTheme = localStorage.getItem("theme") || "system";
    applyTheme(savedTheme);

    // Установка активной кнопки
    const activeButton = document.getElementById(`theme-${savedTheme}`);
    if (activeButton) updateActiveButton(activeButton);
});

function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('open');
}