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

                    <button class="modal-pet-btn btnfirst" type="button">Взяти додому</button>
                </div>
            </div>
        </div>
    </div>
  `,
    {
      onShow: () => {
        document.body.style.overflow = 'hidden';
      },
      onClose: () => {
        document.body.style.overflow = '';
      },
    }
  );

  instance.show();
});
