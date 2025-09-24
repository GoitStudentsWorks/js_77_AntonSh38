import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import * as basicLightbox from 'basiclightbox';

export function openOrderModal() {
  const modalTemplate = document.querySelector('.backdrop-order').innerHTML;

  const instance = basicLightbox.create(modalTemplate, {
    onShow: instance => {
      const modalElement = instance.element();
      const form = modalElement.querySelector('.modal-form');
      const closeBtn = modalElement.querySelector('.modal-order-close');

      // Закриття по кнопці
      closeBtn.addEventListener('click', () => instance.close());

      // Обробка ESC
      function onEscClose(e) {
        if (e.key === 'Escape') {
          instance.close();
        }
      }

      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onEscClose);

      // Видалення стилів при закритті
      instance.element().addEventListener('basiclightbox:close', () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', onEscClose);
      });

      // Обробка відправки форми
      form.addEventListener('submit', async e => {
        e.preventDefault();

        const nameInput = form.querySelector('[name="name"]');
        const phoneInput = form.querySelector('[name="phone"]');
        const commentInput = form.querySelector('[name="comment"]');

        // Очистити попередні помилки
        nameInput.classList.remove('error');
        phoneInput.classList.remove('error');

        const nameL = nameInput.value.trim();
        const phoneL = phoneInput.value.trim();
        const commentL = commentInput.value.trim();

        // Перевірка
        if (!nameL || !phoneL) {
          if (!nameL) nameInput.classList.add('error');
          if (!phoneL) phoneInput.classList.add('error');

          iziToast.error({
            message: "Будь ласка, заповніть ім'я та номер телефону!",
            position: 'topRight',
            timeout: 3000,
            zindex: 999999,
            appendTo: document.body,
          });
          return;
        }

        // Надсилання даних

        const { name, phone, comment } = e.target.elements;
        const formData = {
          name: name.value,
          phone: phone.value,
          comment: comment.value,
        };

        try {
          const response = await axios.post(
            'https://paw-hut.b.goit.study/api/orders',
            formData
          );

          const orderData = response.data;

          console.log('orderData :>>', orderData);

          e.target.reset();
        } catch (error) {}

        // Очистка
        form.reset();

        iziToast.success({
          title: 'Успіх',
          message: 'Ваша заявка надіслана!',
          position: 'topRight',
          timeout: 3000,
          zindex: 999999,
          appendTo: document.body,
        });

        instance.close();
      });

      // Вилучення помилок при введенні
      form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', () => {
          if (input.value.trim()) {
            input.classList.remove('error');
          }
        });
      });
    },
    onClose: () => {
      document.body.style.overflow = '';
    },
  });

  instance.show();
}
