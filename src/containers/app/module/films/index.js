import React, { useState, useEffect } from "react"

import { fetchFilms } from "../../../../../src/api/filmApi"
import Notification from "../../../../utils/notification"

function FilmList() {
  const [films, setFilms] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFilms()
      .then(({ data }) => {
        console.log(data.results);
        setFilms(data.results);
      })
      .catch(error => console.error("Error", error));
  }, []);

  const handleFavorite = film => {
    const favoritedFilms = JSON.parse(localStorage.getItem("favorites")) || {};
    Notification.show({
      type: 'success',
      message: 'Success'
    })

    if (isFavorited(film)) {
      delete favoritedFilms[film.title];
      setFavorites(favorites.filter(favorite => favorite !== film.title));
    } else {
      favoritedFilms[film.title] = film;
      setFavorites([...favorites, film.title]);
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

  const displayableFilms = [...favoriteFilms, ...unfavoriteFilms];
  return (
    <div className="content">
      <h2>Star Wars Films: </h2>
      <div className="films">
        {displayableFilms.map(film => (
          <div key={film.title}>
            <ul>
              <li>Title: {film.title}</li>
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

export default FilmList;