import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const petsCardList = document.querySelector('.pets-card-list');

petsCardList.addEventListener('click', event => {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }

  const animalCardEl = event.target.closest('.pets-card-items');

  const animal = JSON.parse(
    decodeURIComponent(animalCardEl.getAttribute('data-animal'))
  );

  const instance = basicLightbox.create(
    `
    <div class="pets-modal modal">
        <div class="pets-container-modal modal-container">
          <div>
            <button type="button" class="modal-pet-btn-close">
              <svg class="modal-pet-svg" height="24" width="24">
                <use href="./icon/sprite.svg#icon-icon-close"></use>
              </svg>
            </button>
          </div>
          <div class="pets-wrapper-modal">
              <img src="${animal.image}" class="pets-icons-modal" alt="${animal.shortDescription}"/>
          </div>
          <div class="pets-wrapper-modal">
            <div class="modal-pet-info">
                <span class="modal-pet-info-species">${animal.species}</span>
                <span class="modal-pet-info-name">${animal.name}</span>
                <div class="modal-pet-info-special-group">
                    <span>${animal.age}</span>
                    <span>${animal.gender}</span>
                </div>
            </div>
            <div class="modal-pet-description">
              <div class="modal-pet-description-item">
                  <span class="modal-pet-title">Опис:</span>
                  <p class="modal-pet-text">${animal.description}</p>
              </div>
              <div class="modal-pet-description-item">
                  <span class="modal-pet-title">Здоров’я:</span>
                  <p class="modal-pet-text">${animal.healthStatus}</p>
              </div>
              <div class="modal-pet-description-item">
                  <span class="modal-pet-title">Поведінка:</span>
                  <p class="modal-pet-text">${animal.behavior}</p>
              </div>

              <button class="modal-pet-btn btnfirst" data-id="${animal._id}" type="button">Взяти додому</button>
            </div>
          </div>
        </div>
    </div>
  `,
    {
      closable: true,
      onShow: instance => {
        instance
          .element()
          .querySelector('.modal-pet-btn-close')
          .addEventListener('click', () => instance.close());

        document.body.style.overflow = 'hidden';

        document.addEventListener('keydown', onEscClose);
      },
      onClose: () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', onEscClose);
      },
    }
  );

  function onEscClose(e) {
    if (e.key === 'Escape') {
      instance.close();
    }
  }

  instance.show();
});
