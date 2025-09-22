import { getCategories, getAnimalsList } from './pets.api';

const petsNavEl = document.querySelector('.pets-nav');
const petsCardList = document.querySelector('.pets-card-list');
const petsBtnMoreEl = document.querySelector('.pets-btn-more');

let page = 1;
let limit = 8;
let category = null;
let total = 0;

getCategories().then(categories => {
  console.log(categories);
  const markupCategories = categories
    .map(
      category =>
        `<li class="pets-nav-item" data-id="${category._id}">${category.name}</li>`
    )
    .join('');

  petsNavEl.insertAdjacentHTML('beforeend', markupCategories);
});

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

loadAnimals();

petsBtnMoreEl.addEventListener('click', () => {
  page += 1;
  loadAnimals();
});

function loadAnimals() {
  getAnimalsList(page, limit, category).then(response => {
    renderPetsList(response.animals);
    total = response.total;
  });
}

function renderPetsList(pets) {
  const markupPets = pets
    .map(
      pet => `
        <li class="pets-card-items">
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
