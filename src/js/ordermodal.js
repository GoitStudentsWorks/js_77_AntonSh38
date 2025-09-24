import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import * as basicLightbox from 'basiclightbox';

export function openOrderModal() {
  const modalElement = document.querySelector('.backdrop-order').innerHTML;
  const instance = basicLightbox.create(modalElement, {
    onShow: instance => {
      instance
        .element()
        .querySelector('.modal-order-close')
        .addEventListener('click', () => instance.close());

      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onEscClose);
    },
    onClose: instance => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onEscClose);
    },
  });

  function onEscClose(e) {
    if (e.key === 'Escape') {
      instance.close();
    }
  }

  instance.show();
}

const modal = document.querySelector('.backdrop-order');
const closeBtn = document.querySelector('.modal-order-close');
const form = document.querySelector('.modal-form');

// Функція скидання форми та помилок
function resetForm() {
  form.reset();
  form.querySelectorAll('.error').forEach(input => {
    input.classList.remove('error');
  });
}

// Закриття модального вікна
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.classList.remove('modal-open'); // Розблокування скролу
  resetForm();
});

// Обробка форми
form.addEventListener('submit', e => {
  e.preventDefault();

  const nameInput = form.querySelector('[name="name"]');
  const phoneInput = form.querySelector('[name="phone"]');
  const commentInput = form.querySelector('[name="comment"]');

  // Знімаємо старі помилки
  nameInput.classList.remove('error');
  phoneInput.classList.remove('error');

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  // Перевірка обов'язкових полів
  if (!name || !phone) {
    if (!name) nameInput.classList.add('error');
    if (!phone) phoneInput.classList.add('error');

    iziToast.error({
      message: "Будь ласка, заповніть ім'я та номер телефону!",
      position: 'topRight',
      timeout: 3000,
      zindex: 999999,
      appendTo: document.body,
    });
    return;
  }

  console.log('Відправляємо:', {
    name,
    phone,
    comment: commentInput.value,
  });

  resetForm();
  modal.style.display = 'none';
  document.body.classList.remove('modal-open');

  iziToast.success({
    title: 'Успіх',
    message: 'Ваша заявка надіслана!',
    position: 'topRight',
    timeout: 3000,
    zindex: 999999,
    appendTo: document.body,
  });
});

// Видалення червоної рамки при введенні
form.querySelectorAll('input, textarea').forEach(input => {
  input.addEventListener('input', () => {
    if (input.value.trim()) {
      input.classList.remove('error');
    }
  });
});
