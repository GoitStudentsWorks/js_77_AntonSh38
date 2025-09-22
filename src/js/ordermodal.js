const modal = document.querySelector('.backdrop-order');
const closeBtn = document.querySelector('.modal-order-close');
const form = document.querySelector('.modal-form');

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

form.addEventListener('submit', e => {
  e.preventDefault();

  const nameInput = form.querySelector('[name="name"]');
  const phoneInput = form.querySelector('[name="phone"]');
  const commentInput = form.querySelector('[name="comment"]');

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!name || !phone) {
    iziToast.error({
      title: 'Помилка',
      message: "Будь ласка, заповніть ім'я та номер телефону!",
      position: 'topRight',
      timeout: 3000,
    });
    return;
  }

  console.log('Відправляємо:', { name, phone, comment: commentInput.value });

  form.reset();

  modal.style.display = 'none';

  iziToast.success({
    title: 'Успіх',
    message: 'Ваша заявка надіслана!',
    position: 'topRight',
    timeout: 3000,
  });
});
