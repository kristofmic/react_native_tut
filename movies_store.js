var
  REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

var
  fetch = require('fetch'),
  moviesStore;

moviesStore = {
  fetchMovies
};

module.exports = moviesStore;

function fetchMovies() {
  return fetch(REQUEST_URL)
    .then((res) => {
      return res.json();
    });
}