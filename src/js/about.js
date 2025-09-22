import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const data = [
  {
    id: 1,
    imageUrl: './about/mobile-photo/about-mob-p1-1x.jpg',
    text: 'Все почалося у 2015 році з кількох небайдужих людей та одного врятованого собаки. Сьогодні ми — один з найбільших притулків у регіоні, але наша мета незмінна: дати другий шанс тим, кого зрадили.',
  },
  {
    id: 2,
    imageUrl: './about/mobile-photo/about-mob-p2-1x.jpg',
    text: 'Ми рятуємо, реабілітуємо та знаходимо люблячі родини для безпритульних тварин. Наша мета — не просто дати прихисток, а й забезпечити кожному "хвостику" щасливе та повноцінне життя в новій родині.',
  },

  {
    id: 3,
    imageUrl: './about/mobile-photo/about-mob-p3-1x.jpg',
    text: `"Хатинка Лапок" — це команда професійних ветеринарів, кінологів та десятків волонтерів, які щодня вкладають свою душу та час у турботу про наших підопічних. Ми працюємо 24/7, бо їхнє життя залежить від нас.`,
  },
  {
    id: 4,
    imageUrl: './about/mobile-photo/about-mob-p4-1x.jpg',
    text: `Ми створили безпечний та комфортний простір. Кожна тварина отримує якісне харчування, своєчасну ветеринарну допомогу, проходить соціалізацію та гуляє на спеціально обладнаних майданчиках.`,
  },
  {
    id: 5,
    imageUrl: './about/mobile-photo/about-mob-p5-1x.jpg',
    text: `Ваша допомога — безцінна. Ви можете взяти тваринку додому, стати волонтером, допомогти фінансово або інформаційно. Кожен маленький внесок наближає нас до великої мети — світу без безпритульних тварин.`,
  },
];

const aboutRender = data.map(({ id, text, imageUrl }) => {
  return `
    <div class="swiper-slide about-slide">
      <picture>
        <source media="(min-width: 1440px)"
          srcset="./about/desktop-photo/about-desk-p${id}-1x.jpg 1x,
        ./about/desktop-photo/about-desk-p${id}-2x.jpg 2x">

        <source media="(min-width: 768px)"
        srcset="./about/tablet-photo/about-tab-p${id}-1x.jpg 1x,
        ./about/tablet-photo/about-tab-p${id}-2x.jpg 2x">
        
        <source media="(min-width: 320px)"
        srcset="./about/mobile-photo/about-mob-p${id}-1x.jpg 1x,
        ./about/mobile-photo/about-mob-p${id}-2x.jpg 2x"></source>

        <img src="${imageUrl}" alt="about" class="about-img"></img>
      </picture>
      <div class="about-overlay qwe">
        <p class="about-id">${text}</p>
      </div>
    </div> 
 `;
});

document.querySelector('.swiper-wrapper').innerHTML = aboutRender.join('');

const swiper = new Swiper('.swiper', {
  modules: [Navigation, Pagination, Keyboard],

  loop: false,
  slidesPerView: 1,
  spaceBetween: 30,
  keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});
