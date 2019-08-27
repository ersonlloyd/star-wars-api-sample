import React from "react";

const FilmDetail = ({ match }) => (
  <div>Movie Detail Page Params: {match.params.id}</div>
);

export default FilmDetail;
