import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { RestLink } from "apollo-link-rest";
import { ApolloProvider } from '@apollo/react-hooks'


import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const restLink = new RestLink({
  uri: 'https://swapi.co/api/',
  headers: {
    "Content-Type": "application/json"
  }
})

console.log(restLink)

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <div><h2>My Star Wars API</h2></div>
    <App />
  </ApolloProvider>
, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
