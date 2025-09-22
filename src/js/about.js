import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const data = [
  {
    id: 1,
    imageUrl: '../img/about/mobile-photo/mobile1x-photo1.jpg',
    text: 'Все почалося у 2015 році з кількох небайдужих людей та одного врятованого собаки. Сьогодні ми — один з найбільших притулків у регіоні, але наша мета незмінна: дати другий шанс тим, кого зрадили.',
  },
  {
    id: 2,
    imageUrl: '../img/about/mobile-photo/mobile1x-photo2.jpg',
    text: 'Ми рятуємо, реабілітуємо та знаходимо люблячі родини для безпритульних тварин. Наша мета — не просто дати прихисток, а й забезпечити кожному "хвостику" щасливе та повноцінне життя в новій родині.',
  },

  {
    id: 3,
    text: `"Хатинка Лапок" — це команда професійних ветеринарів, кінологів та десятків волонтерів, які щодня вкладають свою душу та час у турботу про наших підопічних. Ми працюємо 24/7, бо їхнє життя залежить від нас.`,
    imageUrl: '../img/about/mobile-photo/mobile1x-photo3.jpg',
  },
  {
    id: 4,
    text: `Ми створили безпечний та комфортний простір. Кожна тварина отримує якісне харчування, своєчасну ветеринарну допомогу, проходить соціалізацію та гуляє на спеціально обладнаних майданчиках.`,
    imageUrl: '../img/about/mobile-photo/mobile1x-photo4.jpg',
  },
  {
    id: 5,
    text: `Ваша допомога — безцінна. Ви можете взяти тваринку додому, стати волонтером, допомогти фінансово або інформаційно. Кожен маленький внесок наближає нас до великої мети — світу без безпритульних тварин.`,
    imageUrl: '../img/about/mobile-photo/mobile1x-photo5.jpg',
  },
];

const aboutRender = data.map(({ id, text, imageUrl }) => {
  return `
   <div class="swiper-slide about-slide">
    <picture>
      <!-- десктоп -->
      <source media="(min-width: 1440px)" srcset="../img/about/desktop-photo/desktop1x-photo${id}.jpg 1x,
       ../img/about/desktop-photo/desktop2x-photo${id}.jpg 2x">
      <!-- планшет -->
      <source media="(min-width: 768px)" srcset="../img/about/tablet-photo/tablet1x-photo${id}.jpg 1x,
      ../img/about/tablet-photo/tablet2x-photo${id}.jpg 2x">
      <!-- мобілка -->
      <img src="${imageUrl}" alt="about" class="about-img">
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
