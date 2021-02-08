import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import axios from 'axios';
import ApiMovie from '../services/ApiMovie';

// curl --request GET \
//   --url 'https://api.themoviedb.org/4/list/1' \
//   --header 'Authorization: Bearer <<access_token>>' \
//   --header 'Content-Type: application/json;charset=utf-8'

export default class HomePage extends Component {
    state = {
        movies: [],
    };
    async componentDidMount() {
        const response = await ApiMovie();
        // console.log(response);
        this.setState({ movies: response.data.results });
        // console.log(this.state.movies);
    }

    render() {
        const { movies } = this.state;
        // console.log(this.props.match.url);
        // const {match}=this.props;

        return (
            <>
                <h2>Trending today </h2>
                <ul>
                    {movies.map(film => (
                        <li key={film.id}>
                            <Link to={`movies/${film.id}`}>{film.title}</Link>
                        </li>
                    ))}
                </ul>
            </>
        );
    }
}
