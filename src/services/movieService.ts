import axios from 'axios';

const API_URL = 'https://www.omdbapi.com/';
const API_KEY = '5eec5adc';

export const getMovies = async (searchTerm: string) => {
  try {
    const response = await axios.get(`${API_URL}?s=${searchTerm}&apikey=${API_KEY}`);
    if (response.data.Error) {
      throw new Error(response.data.Error);
    }
    return response.data.Search;
  } catch (error: any) {
    if (error && error.response && error.response.data && error.response.data.Error) {
        throw new Error(error.response.data.Error);
    } else {
        throw new Error("Error al obtener listado. Intente nuevamente");
    }
  }
};
