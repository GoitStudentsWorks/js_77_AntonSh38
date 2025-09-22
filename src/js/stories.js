import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getFeedbacks } from './stories.api';

const cardStoryEl = document.querySelector('.swiper-wrapper-story');
const swiperContainer = document.querySelector('.swiper-story');

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
  if (!swiperContainer) {
    console.error('Swiper container not found');
    return;
  }

  const swiper = new Swiper('.swiper-story', {
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
        // spaceBetween: 24,
      },
      1440: {
        slidesPerView: 2,
        // spaceBetween: 32,
      },
    },

    on: {
      init: function (swiper) {
        updateNavButtons(swiper);
        console.log('Swiper initialized');
      },
      slideChange: function (swiper) {
        updateNavButtons(swiper);
      },
    },
  });

  return swiper;
}

function updateNavButtons(swiper) {
  const prevButton = document.querySelector('.story-button-prev');
  const nextButton = document.querySelector('.story-button-next');

  if (!prevButton || !nextButton) {
    console.error('Navigation buttons not found');
    return;
  }

  if (swiper.isBeginning) {
    prevButton.disabled = true;
    prevButton.classList.add('swiper-button-disabled');
  } else {
    prevButton.disabled = false;
    prevButton.classList.remove('swiper-button-disabled');
  }

  if (swiper.isEnd) {
    nextButton.disabled = true;
    nextButton.classList.add('swiper-button-disabled');
  } else {
    nextButton.disabled = false;
    nextButton.classList.remove('swiper-button-disabled');
  }
}

async function initStories() {
  try {
    const data = await getFeedbacks();
    if (data && data.feedbacks && data.feedbacks.length > 0) {
      creatStoriesCard(data.feedbacks);

      setTimeout(() => {
        initSwiper();
      }, 100);
    } else {
      console.error('No feedbacks data received');
    }
  } catch (error) {
    console.error('Error loading feedbacks:', error);

    creatStoriesCard(testData);
    setTimeout(() => {
      initSwiper();
    }, 100);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initStories);
} else {
  initStories();
}
