import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

function FilmDetails({ match, location, history }) {
  const [film, setFilm] = useState("");

  useEffect(() => {
    const fetchFilm = async () => {
      const film = await axios.get(location.state.url);
      setFilm(film.data);
    };

    fetchFilm();
  }, [location.state.url]);
  console.log(film, 'details')

  return (
    <div>
      <div>Movie Detail Page Params: {match.params.slug}</div>
      {film ? (
        <Fragment>
          <div>Title: {film.title}</div>
          <div>Episode: {film.episode_id}</div>
        </Fragment>
      ) : (
        <div>Loading...</div>
      )}
      <button onClick={() => history.goBack()}>Back</button>
    </div>
  );
}

export default FilmDetails
