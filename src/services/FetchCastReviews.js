import axios from 'axios';

const FetchCastReviews = (movieId = null, fetch = '') => {
    const apiKey = 'b773f7fc24e17c36f44f2809307ea6ec';
    const fetchByIdCastReviews = 'https://api.themoviedb.org/3/movie/';
    return axios.get(
        `${fetchByIdCastReviews}${movieId}/${fetch}?api_key=${apiKey}`,
    );
};

export default FetchCastReviews;
