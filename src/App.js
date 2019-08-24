import React from 'react';
import './App.css';
import { Layout } from 'antd'

import FilmContainer from './containers/app/module/films'

const App = () => {
  return (
    <Layout>
     <FilmContainer />
    </Layout>
  )
}


export default App;
