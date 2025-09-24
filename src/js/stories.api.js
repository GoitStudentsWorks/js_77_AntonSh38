import axios from 'axios';

const BASE_URL = 'https://paw-hut.b.goit.study/api';
axios.defaults.baseURL = BASE_URL;

export async function getFeedbacks() {
  try {
    const { data } = await axios.get('/feedbacks', {
      params: {
        page: 1,
        limit: 15,
      },
    });
    return data;
  } catch (error) {
    if (error.response) {
      const message =
        error.response.data?.message ||
        `Помилка сервера: ${error.response.status}`;
      throw new Error(message);
    } else if (error.request) {
      throw new Error(
        "Не вдалося з'єднатися з сервером. Перевірте інтернет-з'єднання"
      );
    } else {
      throw new Error('Помилка при відправці запиту');
    }
  }
}
