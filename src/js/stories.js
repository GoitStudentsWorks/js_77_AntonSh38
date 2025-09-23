import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getFeedbacks } from './stories.api';

import 'rateyo/lib/cjs/rateyo.css';
import RateYo from 'rateyo';

const cardStoryEl = document.querySelector('.swiper-wrapper-story');
let mySwiper = null;

function creatStoriesCard(events) {
  const markup = events
    .map(({ rate, description, author }) => {
      return `<div class="swiper-slide swiper-slide-story" role="listitem">
                <div class="story-card">
                 <div class="story-rating" data-rate="${rate}"></div>
                  <p class="story-review">${description}</p>
                  <p class="story-author">${author}</p>
                </div>
              </div>`;
    })
    .join('');

  cardStoryEl.innerHTML = markup;
}

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

function renderStars() {
  const ratings = document.querySelectorAll('.story-rating');

  if (!ratings || ratings.length === 0) return;

  ratings.forEach(el => {
    if (el.classList.contains('jq-ry-container')) return;

    const raw = el.dataset.rate;

    let rate = Number(String(raw).replace(',', '.'));

    if (Number.isNaN(rate)) rate = 0;
    if (rate < 0) rate = 0;
    if (rate > 5) rate = 5;

    try {
      new RateYo(el, {
        rating: rate,
        starWidth: '24px',
        halfStar: true,
        precision: 2,
        readOnly: true,
        normalFill: '#E0E0E0',
        ratedFill: '#F6C200',
        spacing: '6px',
      });

      el.setAttribute('role', 'img');
      el.setAttribute('aria-label', `Рейтинг ${rate} з 5`);
    } catch (err) {
      console.error('❌ RateYo init failed', el, err);
    }
  });
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
    renderStars();
    initSwiper();
  }
}
initStories();
