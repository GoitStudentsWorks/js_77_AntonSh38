import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const basePath = window.location.hostname.includes('github.io')
  ? '/project_team_js2'
  : '';

const data = [
  {
    id: 1,
    imageUrl: `${basePath}/img/about/mobile-photo/mobile1x-photo1.jpg`,
    text: 'Все почалося у 2015 році з кількох небайдужих людей та одного врятованого собаки. Сьогодні ми — один з найбільших притулків у регіоні, але наша мета незмінна: дати другий шанс тим, кого зрадили..',
  },
  {
    id: 2,
    imageUrl: `${basePath}/img/about/mobile-photo/mobile1x-photo2.jpg`,
    text: 'Ми рятуємо, реабілітуємо та знаходимо люблячі родини для безпритульних тварин. Наша мета — не просто дати прихисток, а й забезпечити кожному "хвостику" щасливе та повноцінне життя в новій родині.',
  },

  {
    id: 3,
    imageUrl: `${basePath}/img/about/mobile-photo/mobile1x-photo3.jpg`,
    text: `"Хатинка Лапок" — це команда професійних ветеринарів, кінологів та десятків волонтерів, які щодня вкладають свою душу та час у турботу про наших підопічних. Ми працюємо 24/7, бо їхнє життя залежить від нас.`,
  },
  {
    id: 4,
    imageUrl: `${basePath}/img/about/mobile-photo/mobile1x-photo4.jpg`,
    text: `Ми створили безпечний та комфортний простір. Кожна тварина отримує якісне харчування, своєчасну ветеринарну допомогу, проходить соціалізацію та гуляє на спеціально обладнаних майданчиках.`,
  },
  {
    id: 5,
    imageUrl: `${basePath}/img/about/mobile-photo/mobile1x-photo5.jpg`,
    text: `Ваша допомога — безцінна. Ви можете взяти тваринку додому, стати волонтером, допомогти фінансово або інформаційно. Кожен маленький внесок наближає нас до великої мети — світу без безпритульних тварин.`,
  },
];

const aboutRender = data.map(({ id, text, imageUrl }) => {
  return `
   <div class="swiper-slide about-slide">
    <picture>
      <!-- десктоп -->
      <source media="(min-width: 1440px)" srcset="${basePath}/img/about/desktop-photo/desktop1x-photo${id}.jpg 1x,
      ${basePath}/img/about/desktop-photo/desktop2x-photo${id}.jpg 2x">
      <!-- планшет -->
      <source media="(min-width: 768px)" srcset="${basePath}/img/about/tablet-photo/tablet1x-photo${id}.jpg 1x,
      ${basePath}/src/img/about/tablet-photo/tablet2x-photo${id}.jpg 2x">
      <!-- мобілка -->
      <source media="(min-width: 320px)" srcset="${basePath}/img/about/mobile-photo/mobile1x-photo${id}.jpg 1x,
       ${basePath}/img/about/mobile-photo/mobile2x-photo${id}.jpg 2x">
      <img src="${imageUrl}" alt="about" class="about-img"></img>;
    </picture>
    <div class="about-overlay qwe">
      <p class="about-id">${text}</p>
    </div>
  </div>  
  `;
});

document.querySelector('.swiper-wrapper').innerHTML = aboutRender.join('');

const swiper = new Swiper('.swiper', {
  modules: [Navigation, Pagination],

  loop: false,
  slidesPerView: 1,
  spaceBetween: 30,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});
