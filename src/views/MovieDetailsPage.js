import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import ApiMovie from '../services/ApiMovie';

export class MovieDetailsPage extends Component {
    static propTypes = {
        id: PropTypes.number,
        backdrop_path: PropTypes.string,
        overview: PropTypes.string,
        popularity: PropTypes.number,
        poster_path: PropTypes.string,
        release_date: PropTypes.string,
        title: PropTypes.string,
    };
    state = {
        id: null,
        backdrop_path: null,
        overview: null,
        popularity: null,
        poster_path: null,
        release_date: null,
        title: null,
    };
    async componentDidMount() {
        // console.log('компонет киношки обновился');
        // console.log(this.state);
        // console.log(prevState);
        // console.log(this.props);
        // console.log(prevProps);
        try {
            const data = await ApiMovie(this.state.search, null);
            console.log(data);

            // console.log(this.state.movies);
        } catch (error) {
            toast('По вашему запросу ничего не найдено');
        }
    }

    render() {
        return (
            <div>
                <h2>один фильм</h2>
            </div>
        );
    }
}

export default MovieDetailsPage;
