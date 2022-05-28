import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '26811540-175833433f46e4c27f0a8055d',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export const fetchPhotos = async (q, page = 1) => {
  const { data } = await instance.get('/', {
    params: {
      q,
      page,
    },
  });
  return data;
};
