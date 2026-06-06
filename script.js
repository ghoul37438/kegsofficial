document.addEventListener('DOMContentLoaded', () => {
    // === 1. КОНФИГУРАЦИЯ ПРОЕКТА ===
    // Текст в кавычках автоматически заменит заглушки на ВСЕХ страницах сайта
    const projectName = "KEGS (Ваш текст тут)"; 

    // === 2. СПИСОК АДМИНИСТРАЦИИ ===
    // Здесь вы можете легко добавлять, удалять или изменять ники.
    // Скины (головы) загрузятся автоматически. Цвет можно задать в формате HEX (#)
    const ADMINS_LIST = [
        { nickname: "MrBeast", role: "Создатель проекта", color: "#ff3333" },
        { nickname: "Notch", role: "Главный Разработчик", color: "#ffcc00" },
        { nickname: "Dream", role: "Тех. Администратор", color: "#33ccff" },
        { nickname: "kegs_player", role: "Модератор", color: "#5cff5c" }
    ];

    // === 3. АВТОМАТИЧЕСКАЯ ПОДСТАНОВКА ИМЕНИ И ГОДА ===
    const projectSpan = document.getElementById('project-name');
    if (projectSpan) projectSpan.textContent = projectName;

    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // === 4. ОБРАБОТКА СТРАНИЦЫ АДМИНИСТРАЦИИ ===
    const adminsGrid = document.getElementById('admins-grid');
    if (adminsGrid) {
        adminsGrid.innerHTML = ''; // Очищаем текст начальной загрузки

        ADMINS_LIST.forEach(admin => {
            const adminCard = document.createElement('div');
            adminCard.className = 'admin-card';
            
            // Используем бесплатный Mojang API для получения скинов по никам
            const avatarUrl = `https://ashcon.app{admin.nickname}`;

            adminCard.innerHTML = `
                <div class="admin-avatar">
                    <img src="${avatarUrl}" alt="${admin.nickname}" onerror="this.src='https://crafatar.com'">
                </div>
                <div class="admin-info">
                    <div class="admin-nickname">${admin.nickname}</div>
                    <div class="admin-role" style="color: ${admin.color};">${admin.role}</div>
                </div>
            `;
            adminsGrid.appendChild(adminCard);
        });
    }

    // === 5. ЛОГИКА КОПИРОВАНИЯ IP АДРЕСОВ ===
    const cards = document.querySelectorAll('.server-card');
    const toast = document.getElementById('toast');
    let timer;

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const ip = card.getAttribute('data-ip');
            navigator.clipboard.writeText(ip).then(() => {
                if (toast) {
                    toast.style.opacity = '1';
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        toast.style.opacity = '0';
                    }, 2000);
                }
            }).catch(err => {
                console.error('Ошибка копирования IP: ', err);
            });
        });
    });
});
    // === 6. ПРОКРУТКА МЕНЮ МЫШКОЙ (CLICK AND DRAG) ===
    const slider = document.querySelector('.horizontal-menu');
    if (slider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('grabbing');
            // Запоминаем начальную точку клика мыши
            startX = e.pageX - slider.offsetLeft;
            // Запоминаем, насколько меню уже было прокручено
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('grabbing');
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('grabbing');
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return; // Если кнопка мыши не зажата, ничего не делаем
            e.preventDefault();
            // Считаем, на сколько пикселей сдвинулась мышь
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 1.5; // Число 1.5 отвечает за скорость прокрутки
            slider.scrollLeft = scrollLeft - walk;
        });
    }
