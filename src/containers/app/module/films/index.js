import React, { useState, useEffect } from "react"
import { withRouter } from 'react-router-dom'

import { fetchFilms } from "../../../../../src/api/filmApi"
import Swal from 'sweetalert2'
import axios from 'axios'

function FilmList(props) {
  const [films, setFilms] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState([]);

  useEffect(() => {
    fetchFilms()
      .then(({ data }) => {
        setFilms(data.results);
      })
      .catch(error => console.error("Error", error));
  }, []);

  const handleFavorite = film => {
    const favoritedFilms = JSON.parse(localStorage.getItem("favorites")) || {};

    if (isFavorited(film)) {
      delete favoritedFilms[film.title];
      setFavorites(favorites.filter(favorite => favorite !== film.title));
    } else {
      favoritedFilms[film.title] = film;
      setFavorites([...favorites, film.title]);
      Swal.fire({
        title: 'Success!',
        type: 'success',
        confirmButtonText: 'OK'
      })
    }

    localStorage.setItem("favorites", JSON.stringify(favoritedFilms));
  };

  const isFavorited = ({ title }) =>
    favorites.find(favorite => favorite === title);

  const favoriteFilms = films.filter(film => {
    return favorites.includes(film.title);
  });

  const unfavoriteFilms = films.filter(film => {
    return !favorites.includes(film.title);
  });

  const handleSearch = e => {
    setSearchValue(e.target.value)
  }

  const search = e => {
    axios.get(`https://swapi.co/api/films/?search=${searchValue}`)
      .then(({ data }) => {
        setFilms(data.results);
      })
      .catch(error => console.error("Error", error));
  }


  const displayableFilms = [...favoriteFilms, ...unfavoriteFilms];
  const { history } = props
  const linkTo = route => history.push(route)

  return (
    <div className="content">
      <h2>Star Wars Films: </h2>
      <form className="search-films" onSubmit={search}>
        <input onChange={handleSearch} />
        <button type='submit'>Search</button>
      </form>
      <div className="films">
        {displayableFilms.map(film => (
          <div key={film.title}>
            <ul>
              <a href='#' onClick={() => linkTo(film)}>Title: {film.title}</a>
              <li>Episode: {film.episode_id}</li>
              <li>
                <button onClick={() => handleFavorite(film)}>
                  {isFavorited(film) ? "Unfavorite" : "Favorite"}
                </button>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default withRouter(FilmList)