
//----------------- МЕНЮ БУРГЕР--------------------//
const menu = document.getElementById('menu');

menu.addEventListener('click', function(evt) {
    evt.stopPropagation();
    const navigation = document.getElementById('navigation');
    navigation.classList.toggle('active'); 
    
    // Анимация кнопки бургер
    const lines = this.getElementsByClassName('line');
    lines[0].classList.toggle('line1'); 
    lines[1].classList.toggle('line2'); 
    lines[2].classList.toggle('line3'); 
    lines[3].classList.toggle('line4'); 
});

//------------------ОТКРЫТИЕ ВИДО РАБОТ------------------//

// Получаем все элементы .jobs-wrap
const jobWraps = document.querySelectorAll('.jobs-wrap');

jobWraps.forEach(wrap => {
  wrap.addEventListener('click', () => {
    // Находим родительский элемент li.jobs-item
    const jobItem = wrap.closest('.jobs-item');
    if (!jobItem) return;

    // Находим внутри него элемент .jobs-content
    const content = jobItem.querySelector('.jobs-content');
    if (!content) return;

    // Переключаем класс active для изменения размера
    content.classList.toggle('active');
  });
});

//---------------------СЛАЙДЕР ВСЕХ ГАЛЛЕРЕЙ--------------//

document.addEventListener('DOMContentLoaded', () => {
  // Для каждой галереи инициализируем слайдер
  document.querySelectorAll('.jobs-gallery').forEach(gallery => {
    const photosContainer = gallery.querySelector('.jobs-photos');
    const images = photosContainer.querySelectorAll('img');
    const totalSlides = images.length;
    let currentIndex = 0;

    // Устанавливаем CSS-переменную для ширины
    photosContainer.style.setProperty('--total-slides', totalSlides);

    // Функция обновления слайдера
    function updateSlider() {
      const translateX = -currentIndex * (100 / totalSlides);
      photosContainer.style.transform = `translateX(${translateX}%)`;
    }

    // Функция для следующего слайда
    function nextSlide() {
      if (totalSlides > 1) { // Только если больше одного
        currentIndex = (currentIndex + 1) % totalSlides; // Циклическое
        updateSlider();
      }
    }

    // Функция для предыдущего слайда
    function prevSlide() {
      if (totalSlides > 1) {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Циклическое
        updateSlider();
      }
    }

    // Кнопки prev/next
    const prevBtn = gallery.querySelector('.gallery-controls--prev');
    const nextBtn = gallery.querySelector('.gallery-controls--next');
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Модальное окно
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close');

    images.forEach(img => {
      img.addEventListener('click', () => {
        modal.style.display = 'flex'; // Показываем модал
        modalImg.src = img.src; // Устанавливаем изображение
      });
    });

    // Закрытие модала
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) { // Клик вне изображения
        modal.style.display = 'none';
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        modal.style.display = 'none';
      }
    });

    // Свайпы для мобильных
    let startX = 0;
    let endX = 0;

    photosContainer.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    photosContainer.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;
      const threshold = 50; // Минимальное расстояние для свайпа

      if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
          nextSlide(); // Свайп влево -> next
        } else {
          prevSlide(); // Свайп вправо -> prev
        }
      }
    });

    // Опционально: предотвращаем вертикальный скролл во время горизонтального свайпа
    photosContainer.addEventListener('touchmove', (e) => {
      // e.preventDefault(); // Раскомментируй, если нужно заблокировать скролл
    });

    // Инициализация
    updateSlider();
  });
});

//------------------------СЛАЙДЕР ДЛЯ ОТЗЫВОВ------------------//

document.addEventListener('DOMContentLoaded', () => {
  // Для каждой секции отзывов инициализируем слайдер
  document.querySelectorAll('.feedback-wrap').forEach(wrap => {
    const list = wrap.querySelector('.feedback-list');
    const items = list.querySelectorAll('.feedback-item');
    const totalItems = items.length;
    let currentIndex = 0;

    // Устанавливаем CSS-переменную для ширины
    list.style.setProperty('--total-items', totalItems);

    // Функция обновления слайдера
    function updateSlider() {
      const translateX = -currentIndex * (100 / totalItems);
      list.style.transform = `translateX(${translateX}%)`;
    }

    // Функция для следующего отзыва
    function nextItem() {
      if (totalItems > 1) { // Только если больше одного
        currentIndex = (currentIndex + 1) % totalItems; // Циклическое
        updateSlider();
      }
    }

    // Функция для предыдущего отзыва
    function prevItem() {
      if (totalItems > 1) {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems; // Циклическое
        updateSlider();
      }
    }

    // Кнопки prev/next
    const prevBtn = wrap.querySelector('.feedback-controls--prev');
    const nextBtn = wrap.querySelector('.feedback-controls--next');
    if (prevBtn) prevBtn.addEventListener('click', prevItem);
    if (nextBtn) nextBtn.addEventListener('click', nextItem);

    // Свайпы для мобильных (на контейнере list)
    let startX = 0;
    let endX = 0;

    list.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    list.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;
      const threshold = 50; // Минимальное расстояние для свайпа

      if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
          nextItem(); // Свайп влево -> следующий
        } else {
          prevItem(); // Свайп вправо -> предыдущий
        }
      }
    });

    // Опционально: предотвращаем вертикальный скролл во время свайпа
    // list.addEventListener('touchmove', (e) => { e.preventDefault(); });

    // Инициализация
    updateSlider();
  });
});