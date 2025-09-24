import { getCategories, getAnimalsList } from './pets.api';
import './petmodal';
import { showLoader } from './loader';
import { hideLoader } from './loader';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const petsNavEl = document.querySelector('.pets-nav');
const petsCardList = document.querySelector('.pets-card-list');
const petsBtnMoreEl = document.querySelector('.pets-btn-more');

let page = 1;
let limit = window.innerWidth < 1440 ? 8 : 9;
let category = null;
let total = 0;

loadCategories();
loadAnimals();

petsNavEl.addEventListener('click', event => {
  if (event.target.nodeName !== 'LI') {
    return;
  }

  for (const element of event.target.parentElement.children) {
    element.classList.remove('active');
  }

  event.target.classList.add('active');
  category = event.target.getAttribute('data-id');

  petsCardList.innerHTML = '';
  page = 1;
  loadAnimals();
});

petsBtnMoreEl.addEventListener('click', () => {
  page += 1;
  loadAnimals();
  petsBtnMoreEl.blur();
});

async function loadCategories() {
  try {
    const categories = await getCategories();
    const markupCategories = categories
      .map(
        category =>
          `<li class="pets-nav-item" data-id="${category._id}">${category.name}</li>`
      )
      .join('');

    petsNavEl.insertAdjacentHTML('beforeend', markupCategories);
  } catch (error) {
    iziToast.error({
      title: '',
      message:
        'Наші пухнастики сперечаються, хто буде в якій категорії 😸. Повернемо їх незабаром!',
      position: 'topRight',
    });
  }
}

async function loadAnimals() {
  try {
    showLoader();
    const response = await getAnimalsList(page, limit, category);

    renderPetsList(response.animals);
    total = response.totalItems;
    togglePetsBtn();
  } catch (error) {
    iziToast.error({
      title: '',
      message:
        'Ой! Наші пухнастики сховалися 🐾. Спробуйте оновити сторінку або поверніться пізніше.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

function togglePetsBtn() {
  if (total <= page * limit) {
    petsBtnMoreEl.classList.add('hide-pets-btn');
  } else {
    petsBtnMoreEl.classList.remove('hide-pets-btn');
  }
}

function renderPetsList(pets) {
  const markupPets = pets
    .map(
      pet => `
        <li class="pets-card-items" data-animal="${encodeURIComponent(
          JSON.stringify(pet)
        )}">
        <div class="pets-card-top">
        <img src="${pet.image}" class="pets-icons" alt="${
        pet.shortDescription
      }"/>
          <span class="pets-species">${pet.species}</span>
          <span class="pets-name">${pet.name}</span>
          <ul class="pets-filter-list">
            ${pet.categories
              .map(
                category =>
                  `<li class="pets-filter-items">${category.name}</li>`
              )
              .join('')}
          </ul>
        </div>
          
          <div class="pets-card-bottom">
           <div class="pets-special-group">
            <span>${pet.age}</span>
            <span>${pet.gender}</span>
          </div>
          <p class="pets-behavior">${pet.behavior}</p>
          <button class="pets-btn-info btnsecond" type="button">Дізнатись більше</button>
          </div>
         
        </li>
      `
    )
    .join('');

  petsCardList.insertAdjacentHTML('beforeend', markupPets);
}
