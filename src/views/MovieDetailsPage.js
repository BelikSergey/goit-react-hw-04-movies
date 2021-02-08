import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import ApiMovie from '../services/ApiMovie';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import axios from 'axios';

export class MovieDetailsPage extends Component {
    static propTypes = {
        id: PropTypes.number,
        overview: PropTypes.string,
        popularity: PropTypes.number,
        poster_path: PropTypes.string,
        release_date: PropTypes.string,
        title: PropTypes.string,
        genres: PropTypes.array,
    };
    state = {
        id: null,
        // backdrop_path: null,
        overview: null,
        popularity: null,
        poster_path: '',
        release_date: null,
        title: null,
        genres: null,
        status: 'idle',
    };
    // async componentWillMount() {
    //     this.setState({ status: 'pending' });
    //     console.log('компонет киношки замаунтился');
    //     // console.log(this.state);
    //     // console.log(prevState);
    //     console.log(this.props);
    //     // console.log(prevProps);
    //     try {
    //         const data = await ApiMovie('', this.props.match.params.moviesId);
    //         // const images = await axios(`https://api.themoviedb.org/3/movie/${this.props.match.params.moviesId}?api_key=b773f7fc24e17c36f44f2809307ea6ec`);
    //         // console.log(data.data);
    //         // console.log(images);
    //         this.setState({...data.data});
    //     } catch (error) {
    //         toast('По вашему запросу ничего не найдено');
    //     }
    //     this.setState({ status: 'idle' });
    // }

    async componentDidMount() {
        this.setState({ status: 'pending' });
        console.log('компонет киношки замаунтился');
        // console.log(this.state);
        // console.log(prevState);
        // console.log(this.props);
        // console.log(prevProps);
        try {
            const data = await ApiMovie('', this.props.match.params.moviesId);
            this.setState({ ...data.data });
            //     console.log(`https://image.tmdb.org/t/p/w300${this.state.poster_path}`);
            //  const images = await axios(`https://image.tmdb.org/t/p/w300${this.state.poster_path}`);
            //  this.setState({imageSrc: images });
            //  // console.log(data.data);
            //     console.log(this.state.imageSrc);
        } catch (error) {
            toast('По вашему запросу ничего не найдено');
        }
        this.setState({ status: 'idle' });
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('киношка обновилась');
    }
    componentWillUnmount() {
        console.log('компонент одной киношки размонтирован');
    }

    render() {
        const {
            status,
            poster_path,
            overview,
            popularity,
            title,
            genres,
            release_date,
            id,
        } = this.state;
        return (
            <>
                {status === 'pending' && (
                    <Loader
                        type="ThreeDots"
                        color="#00BFFF"
                        height={80}
                        width={80}
                    />
                )}
                {status === 'idle' && (
                    <article>
                        <div>
                            {poster_path && (
                                <img
                                    src={`https://image.tmdb.org/t/p/w300${poster_path}`}
                                    alt={`${title} movie poster`}
                                />
                            )}
                        </div>
                        <div>
                            <h2>{title}</h2>
                            <p>Popularity : {popularity}</p>
                            <h3>Overview</h3>
                            <p>{overview}</p>
                            <h3>Genres</h3>
                            {genres && (
                                <ul>
                                    {genres.map(genr => (
                                        <li key={genr.id}>{genr.name}</li>
                                    ))}
                                </ul>
                            )}
                            <p>Release date :{release_date}</p>
                        </div>
                        <div>
                            <p>Additional information</p>
                            <ul>
                                <li>
                                    <Link to={`${this.props.match.url}/cast`}>
                                        Cast
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={`${this.props.match.url}/reviews`}
                                    >
                                        Reviews
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </article>
                )}
            </>
        );
    }
}

export default MovieDetailsPage;
