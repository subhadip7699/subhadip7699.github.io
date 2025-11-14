
const openBtn = document.getElementById('menu-open-button');
const closeBtn = document.getElementById('menu-close-button');


openBtn.addEventListener('click', () => {
  document.body.classList.add('show-mobile-menu');
});

closeBtn.addEventListener('click', () => {
  document.body.classList.remove('show-mobile-menu');
});


const swiper = new Swiper('.slider-container', {
  direction: 'horizontal',
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  breakpoints: {
    0: {
      slidesPerView: 1
    },
    768: {
      slidesPerView: 2
    },
    1024: {
      slidesPerView: 3
    }
  }
});

const navLinks = document.querySelectorAll('.nav-item a');

if (openBtn && closeBtn) {
  openBtn.addEventListener('click', () => {
    document.body.classList.add('show-mobile-menu');
  });

  closeBtn.addEventListener('click', () => {
    document.body.classList.remove('show-mobile-menu');
  });
}


navLinks.forEach(link => {
  link.addEventListener('click', () => {
    document.body.classList.remove('show-mobile-menu');
  });
});


