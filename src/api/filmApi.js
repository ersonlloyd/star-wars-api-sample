import axios from 'axios'
const BASE_URL = 'https://swapi.co/api'

export const fetchFilms = () => axios.get(`https://swapi.co/api/films`)