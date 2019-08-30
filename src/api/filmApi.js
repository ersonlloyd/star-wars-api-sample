import axios from 'axios'
export const fetchFilms = () => axios.get(`https://swapi.co/api/films`)