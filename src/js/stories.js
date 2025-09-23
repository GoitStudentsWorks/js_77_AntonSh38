import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getFeedbacks } from './stories.api';

const cardStoryEl = document.querySelector('.swiper-wrapper-story');
let mySwiper = null;

function creatStoriesCard(events) {
  const markup = events
    .map(({ rate, description, author }) => {
      return `<div class="swiper-slide swiper-slide-story" role="listitem">
                <div class="story-card">
                 <div class="story-rating">${rate}</div>
                  <p class="story-review">${description}</p>
                  <p class="story-author">${author}</p>
                </div>
              </div>`;
    })
    .join('');

  cardStoryEl.innerHTML = markup;
}

function initSwiper() {
  mySwiper = new Swiper('.swiper-story', {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 32,

    wrapperClass: 'swiper-wrapper-story',
    slideClass: 'swiper-slide-story',

    navigation: {
      nextEl: '.story-button-next',
      prevEl: '.story-button-prev',
    },

    pagination: {
      el: '.swiper-pagination-story',
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 5,
    },

    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1440: {
        slidesPerView: 2,
      },
    },
  });

  return mySwiper;
}

async function initStories() {
  const data = await getFeedbacks();
  if (data && data.feedbacks) {
    creatStoriesCard(data.feedbacks);
    initSwiper();
  }
}
initStories();
