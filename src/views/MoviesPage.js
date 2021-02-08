import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Searchbar from '../components/SearchMovie';
import ApiMovie from '../services/ApiMovie';

class MoviesPage extends Component {
    state = {
        search: '',
        movies: [],
        status: 'idle',
    };
    async componentDidUpdate(prevProps, prevState) {
        // console.log('компонет киношки обновился');
        // console.log(this.state);
        // console.log(prevState);
        // console.log(this.props);
        // console.log(prevProps);
        const prev = prevState.search;
        const next = this.state.search;
        if (prev !== next) {
            this.setState({ status: 'pending' });
            try {
                const data = await ApiMovie(this.state.search, null);
                // console.log(data);
                this.setState({
                    movies: data.data.results,
                });
                // console.log(this.state.movies);
            } catch (error) {
                toast.error('Опаньки Приплыли! Попробуйте позже!', {
                    autoClose: false,
                    position: 'top-center',
                });
            }
            if (this.state.movies.length !== 0) {
                this.setState({ status: 'resolved' });
            } else {
                this.setState({ status: 'idle' });
                toast('По вашему запросу ничего не найдено');
            }
        }
    }
    reset = () => {
        this.setState = {
            search: '',
            movies: [],
            status: 'idle',
        };
    };
    componentWillUnmount() {
        // console.log('компонент список фильмов поиска размонтирован');
        this.reset();
    }
    handleSearchFormSubmit = search => {
        // console.log(search);
        this.setState({ search });
    };
    render() {
        const { movies, status } = this.state;
        return (
            <>
                <div>
                    <Searchbar onSubmitForm={this.handleSearchFormSubmit} />
                </div>
                {status === 'pending' && (
                    <Loader
                        type="ThreeDots"
                        color="#00BFFF"
                        height={80}
                        width={80}
                    />
                )}
                {status === 'resolved' && (
                    <ul>
                        {movies.map(film => (
                            <li key={film.id}>
                                <Link to={`movies/${film.id}`}>
                                    {film.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </>
        );
    }
}

export default MoviesPage;
