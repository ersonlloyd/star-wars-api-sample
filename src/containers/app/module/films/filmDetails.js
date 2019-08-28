import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import '../films/index.scss'

function FilmDetails({ match, location, history }) {
  const film = location.state.film
  console.log('characters', film.characters);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchPeople = async () => {
      const characterObjects = await Promise.all(film.characters.map( async url => {
        const result = await axios.get(url);
        return result.data
      }))
      setPeople(characterObjects)
    };

    fetchPeople();
  }, []);

  function renderTable () {
    const converted = [film]
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Release</TableCell>
            <TableCell align="right">Created</TableCell>
            <TableCell align="right">Edited</TableCell>
            <TableCell align="right">Director</TableCell>
            <TableCell align="right">Producer</TableCell>
            <TableCell align="right">Episodes</TableCell>
            <TableCell align="right">Opening Crawl</TableCell>
            <TableCell align="right">Characters</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {converted.map((row, i) => (
              <TableRow key={i}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.release_date}</TableCell>
              <TableCell align="right">{row.created}</TableCell>
              <TableCell align="right">{row.edited}</TableCell>
              <TableCell align="right">{row.director}</TableCell>
              <TableCell align="right">{row.producer}</TableCell>
              <TableCell align="right">{row.episodes_id}</TableCell>
              <TableCell align="right">{row.opening_crawl}</TableCell>
              <TableCell align="right">{people.map((item, i) => {
                return <ul key={i}>
                  <li>
                    <Tooltip title={<Fragment>{
                      <ul>
                        <li key={i}>Name:{item.name}</li>
                        <li>Created:{item.created}</li>
                        <li>Birth Year:{item.birth_year}</li>
                        <li>Eye color:{item.eye_color}</li>
                        <li>Gender:{item.gender}</li>
                        <li>Hair color:{item.hair_color}</li>
                        <li>Height:{item.height}</li>
                        <li>Mass:{item.mass}</li>
                        <li>Skin color:{item.skin_color}</li>
                      </ul>
                    }</Fragment>} placement="left-start">
                    <IconButton aria-label="info">
                    {item.name}
                    </IconButton>
                    </Tooltip>
                  </li>
                </ul>
              })}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
 
  return (
    <div>
      <div>Title: {film.title}</div>
      {film ? (
        <Fragment>
          {renderTable()}
        </Fragment>
      ) : (
        <div>Loading...</div>
      )}
      <button onClick={() => history.goBack()}>Back</button>
    </div>
  );
}

export default FilmDetails
