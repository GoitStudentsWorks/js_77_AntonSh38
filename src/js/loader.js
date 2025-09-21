const loadeEl = document.querySelector('.loader');

export function showLoader() {
  loadeEl.classList.remove('is-hidden');
}

export function hideLoader() {
  loadeEl.classList.add('is-hidden');
}
