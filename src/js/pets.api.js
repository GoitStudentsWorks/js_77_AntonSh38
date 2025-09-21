import axios from 'axios';

export async function getCategories() {
  const BASE_URL = 'https://paw-hut.b.goit.study/api/categories';

  const response = await axios.get(BASE_URL);
  return response.data;
}

export async function getAnimalsList(page, limit, categoryId) {
  const BASE_URL = 'https://paw-hut.b.goit.study/api/animals';

  const response = await axios.get(BASE_URL, {
    params: {
      page,
      limit,
      categoryId,
    },
  });
  return response.data;
}
