import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getFeedbacks } from './stories.api';
import { showLoader, hideLoader } from './loader';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const cardStoryEl = document.querySelector('.swiper-wrapper-story');
let mySwiper = null;

function createStarRating(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  let starsHTML = '';

  // Повні зірки
  for (let i = 0; i < fullStars; i++) {
    starsHTML +=
      '<svg class="star filled"><use href="./public/icon/sprite.svg#icon-icon-star-filled"></use></svg>';
  }

  // Половина зірки
  if (hasHalfStar) {
    starsHTML +=
      '<svg class="star half-filled"><use href="./public/icon/sprite.svg#icon-icon-star-filled"></use></svg>';
  }

  // Порожні зірки
  for (let i = 0; i < emptyStars; i++) {
    starsHTML +=
      '<svg class="star"><use href="./public/icon/sprite.svg#icon-icon-star-outline"></use></svg>';
  }

  return `<div class="star-rating">${starsHTML}</div>`;
}
function creatStoriesCard(events) {
  const markup = events
    .map(({ rate, description, author }) => {
      return `<div class="swiper-slide swiper-slide-story" role="listitem">
                <div class="story-card">
                 <div class="story-rating"> ${createStarRating(rate)}</div>
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
function showError(message) {
  iziToast.error({
    title: 'Помилка',
    message: message,
    position: 'topRight',
    timeout: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    progressBar: true,
  });
}

async function initStories() {
  try {
    showLoader();

    const data = await getFeedbacks();

    if (data && data.feedbacks && data.feedbacks.length > 0) {
      if (data.feedbacks.length < 3) {
        showError('Недостатньо відгуків для відображення');
        return;
      }

      creatStoriesCard(data.feedbacks);
      initSwiper();
    } else {
      showError('Не вдалося завантажити відгуки');
    }
  } catch (error) {
    showError('Сталася помилка при завантаженні відгуків');
    console.error('Stories error:', error);
  } finally {
    hideLoader();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initStories);
} else {
  initStories();
}
