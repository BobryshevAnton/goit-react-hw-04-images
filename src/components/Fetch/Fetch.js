import axios from 'axios';

const API_KEY = '32040937-f5067777972aaaf890ed94a62';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getImages = async (searchQuery, page) => {
  const { data } = await axios.get(
    `?q=${searchQuery}&page=${page}&image_type=photo&orientation=horizontal&per_page=12&key=${API_KEY}`
  );
  return data;
};
