import React, { Fragment } from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

function ToolTip(props) {
  console.log(props.props, 'toottop')
  return (
    <ul>
      <li>
        <Tooltip title={<Fragment>{
          <ul>
            <li>Name:{props.props.name}</li>
            <li>Created:{props.props.created}</li>
            <li>Birth Year:{props.props.birth_year}</li>
            <li>Eye color:{props.props.eye_color}</li>
            <li>Gender:{props.props.gender}</li>
            <li>Hair color:{props.props.hair_color}</li>
            <li>Height:{props.props.height}</li>
            <li>Mass:{props.props.mass}</li>
            <li>Skin color:{props.props.skin_color}</li>
          </ul>
        }</Fragment>} placement="left-start">
        <IconButton aria-label="info">
        {props.props.name}
        </IconButton>
        </Tooltip>
      </li>
   </ul>
  )
}

export default ToolTip