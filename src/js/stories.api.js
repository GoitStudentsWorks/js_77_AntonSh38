import axios from 'axios';

const BASE_URL = 'https://paw-hut.b.goit.study/api';
axios.defaults.baseURL = BASE_URL;

export async function getFeedbacks(page, limit) {
  try {
    const { data } = await axios.get('/feedbacks', {
      params: {
        page: 1,
        limit: 15,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}
