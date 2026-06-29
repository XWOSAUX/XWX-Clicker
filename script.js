const divChislo = document.getElementById('divChislo');
const btnAdd = document.getElementById('btnClick');
const btnReset = document.getElementById('btnReset');
const btnDizain = document.getElementById('btnDizain');
const divMenu = document.getElementById('divMenu');

const UpgradeShop = document.getElementById('divUpgradeShop');

let odin = 0;
let clickMultiplier = 1; // Сила одного клика

btnAdd.addEventListener('click', () => {
    odin += clickMultiplier;
    divChislo.textContent = odin;

    if (odin === 10) {
    UpgradeShop.classList.remove('hidden');
    }
    
    // Добавляем класс для анимации
    divChislo.classList.add('chislo-jump');
    
    // Убираем класс через 150 мс, чтобы можно было кликнуть снова
    setTimeout(() => {
        divChislo.classList.remove('chislo-jump');
    }, 150);
});

btnReset.addEventListener('click', () => {
    odin = 0;
    divChislo.textContent = odin;
});


// Элементы модального окна
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.querySelector('.modal-close');
const settingsBtn = document.getElementById('btnSettings'); // моя шестерёнка
const btnWidth = document.getElementById('btnUpWidth');
const btnDownWidth = document.getElementById('btnDownWidth');
const btnResetWidth = document.getElementById('btnResetWidth');

// Открыть окно
settingsBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'block';
});

// Закрыть по крестику
modalClose.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
});

// Закрыть по клику на фон (затемнитель)
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.style.display = 'none';
    }
});


// Увеличение
btnWidth.addEventListener('click', () => {
    let current = parseFloat(getComputedStyle(divMenu).width);
    let newWidth = current + 100;
    divMenu.style.width = newWidth + 'px';
});

// Уменьшение
btnDownWidth.addEventListener('click', () => {
    let current = parseFloat(getComputedStyle(divMenu).width);
    let newWidth = current - 100;
    if (newWidth >= 100) { // минимальная ширина 100px
        divMenu.style.width = newWidth + 'px';
    } else {
        divMenu.style.width = '230px'; // чтобы не ушло в 0
    }
});


// Кнопка Сброса настроек ширины
let originalWidth = divMenu.offsetWidth + 'px'; //чтоб запомнить изначальную

btnResetWidth.addEventListener('click', () => {
    divMenu.style.width = originalWidth;
})




// Магазин апгрейдов
const notification = document.getElementById('notification');
let notificationTimer; // <-- добавили эту строку

function showNotification(text) {
    // Очищаем старый таймер, если он был
    clearTimeout(notificationTimer);
    
    // Убираем класс show на миг, чтобы анимация перезапустилась
    notification.classList.remove('show');
    
    // Маленькая хитрость: даём браузеру перерисовать страницу
    void notification.offsetWidth;
    
    // Ставим новый текст и показываем
    notification.textContent = text;
    notification.classList.add('show');
    
    // Запоминаем id нового таймера
    notificationTimer = setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Все кнопки и их параметры в одном месте
const shopUpgrades = {
    btnShopOne: {
        cost: 20,
        bought: false,
        label: '?',
        desc: '+$1 / 10 сек',
        action: function() {
            setInterval(() => {
                odin++;
                divChislo.textContent = odin;
                divChislo.classList.add('chislo-jump');
                setTimeout(() => divChislo.classList.remove('chislo-jump'), 150);
            }, 10000);
        }
    },
    btnShopTwo: {
        cost: 50,
        bought: false,
        label: '?',
        desc: 'Автокликер (+$1/сек)',
        action: function() {
            setInterval(() => {
                odin++;
                divChislo.textContent = odin;
                divChislo.classList.add('chislo-jump');
                setTimeout(() => divChislo.classList.remove('chislo-jump'), 150);
            }, 1000);
        }
    },
    btnShopThree: {
        cost: 200,
        bought: false,
        label: '?',
        desc: '+$5 / 5 сек',
        action: function() {
            setInterval(() => {
                odin += 5;
                divChislo.textContent = odin;
                divChislo.classList.add('chislo-jump');
                setTimeout(() => divChislo.classList.remove('chislo-jump'), 150);
            }, 5000);
        }
    },
    btnShopFour: {
        cost: 320,
        bought: false,
        label: '?',
        desc: 'Клик +$2',
        action: function() {
            // Просто меняем глобальную переменную силы клика
            clickMultiplier = 2;
        }
    },
    btnShopFive: {
        cost: 500,
        bought: false,
        label: '?',
        desc: '+$50 / 10 сек',
        action: function() {
            setInterval(() => {
                odin += 50;
                divChislo.textContent = odin;
                divChislo.classList.add('chislo-jump');
                setTimeout(() => divChislo.classList.remove('chislo-jump'), 150);
            }, 10000);
        }
    }
};



// Основной цикл
for (const [btnId, data] of Object.entries(shopUpgrades)) {
    const btn = document.getElementById(btnId);
    if (!btn) continue;

    // --- Наведение мыши ---
    btn.addEventListener('mouseenter', () => {
        if (data.bought) return; // уже куплено — ничего не меняем
        btn.textContent = `Unblocking requires ${data.cost}$`;
        btn.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        btn.style.color = 'white';
    });
    btn.addEventListener('mouseleave', () => {
        if (data.bought) return; // уже куплено — оставляем описание эффекта
        btn.textContent = data.label; // вмексто "?"
        btn.style.backgroundColor = '';
        btn.style.color = '';
    });

    // --- Клик (покупка) ---
    btn.addEventListener('click', () => {
        if (data.bought) {
            showNotification('Это улучшение уже куплено!');
            return;
        }
        if (odin < data.cost) {
            showNotification(`Недостаточно средств! Нужно ${data.cost}$.`);
            return;
        }

        // Покупаем
        odin -= data.cost;
        divChislo.textContent = odin;
        data.bought = true;

        // Внешний вид после покупки
        btn.textContent = data.desc;  // ставим описание эффекта
        btn.style.cursor = 'default';
        btn.style.backgroundColor = ''; // убираем затемнение, если оно было
        btn.style.color = '';           // возвращаем обычный цвет текста

        showNotification(`Улучшение куплено! Потрачено -${data.cost}$.`);

        // Запускаем эффект апгрейда, если он есть
        if (data.action) {
            data.action();
        }
    });
}


// ========== СМЕНА ТЕМ ==========
const btnDarkBlue = document.querySelector('.btn_style_1');
const btnDark = document.querySelector('.btn_style_2');
const btnLight = document.querySelector('.btn_style_3');

btnDarkBlue.addEventListener('click', () => {
    document.documentElement.removeAttribute('data-theme');
});
btnDark.addEventListener('click', () => {
    document.documentElement.setAttribute('data-theme', 'dark');
});
btnLight.addEventListener('click', () => {
    document.documentElement.setAttribute('data-theme', 'light');
});