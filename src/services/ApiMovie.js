import axios from 'axios';

// const KEY= 'b773f7fc24e17c36f44f2809307ea6ec';
// const KEY4='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzczZjdmYzI0ZTE3YzM2ZjQ0ZjI4MDkzMDdlYTZlYyIsInN1YiI6IjYwMWVjNzc3YWJmOGUyMDA0MWMwNDYyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j1_GQypfMjc_1JSdYXz4i2oLj84KOaSsjFRCJ5UkBL4'
// https://api.themoviedb.org/3/movie/550?api_key=b773f7fc24e17c36f44f2809307ea6ec

const ApiMovie = (searchValue = '', movieId = null) => {
    const apiKey = 'b773f7fc24e17c36f44f2809307ea6ec';
    const baseUrl = 'https://api.themoviedb.org/3/trending/movie/day';
    const searchUrl = 'https://api.themoviedb.org/3/search/movie';
    const searchById = 'https://api.themoviedb.org/3/find/';
    if (searchValue.length !== 0) {
        console.log('пришла строка поиска');
        return axios.get(`${searchUrl}?api_key=${apiKey}&query=${searchValue}`);
    } else if (movieId) {
        console.log('запрос на фильм по id');
        return axios.get(`${searchById}?api_key=${apiKey}`);
    } else {
        console.log('axios по умолчанию, запрос популярных фильмов');
        return axios.get(`${baseUrl}?api_key=${apiKey}`);
    }
};

export default ApiMovie;
