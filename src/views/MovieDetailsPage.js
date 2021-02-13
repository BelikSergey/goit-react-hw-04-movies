import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import ApiMovie from '../services/ApiMovie';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Cast from '../components/Cast';
import Reviews from '../components/Reviews';
import routes from '../routes';
import s from './MovieDetailsPage.module.css';

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

    async componentDidMount() {
        // console.log('компонент фильм замаунтился');
        // console.log(this.props);
        this.setState({ status: 'pending' });
        try {
            const data = await ApiMovie('', this.props.match.params.moviesId);
            this.setState({ ...data.data });
        } catch (error) {
            toast('По вашему запросу ничего не найдено');
        }
        this.setState({ status: 'idle' });
    }
    handleGoBack = () => {
        const { location, history } = this.props;
        history.push(location?.state?.from || routes.home);
        // this.props(location.state.search)
    };

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
        const { match } = this.props;
        // console.log(this.props);
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
                        <button
                            className="button"
                            type="button"
                            onClick={this.handleGoBack}
                        >
                            Go Back
                        </button>
                        <div className={s.MovieCard}>
                            <div className={s.Image}>
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
                        </div>
                        <div>
                            <p>Additional information</p>
                            <ul>
                                <li>
                                    <Link to={`${match.url}/cast`}>Cast</Link>
                                </li>
                                <li>
                                    <Link to={`${match.url}/reviews`}>
                                        Reviews
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <Route
                            path={routes.cast}
                            render={props => {
                                return <Cast {...props} movieId={id} />;
                            }}
                        />
                        <Route
                            path={routes.reviews}
                            render={props => {
                                return <Reviews {...props} movieId={id} />;
                            }}
                        />
                    </article>
                )}
            </>
        );
    }
}

export default withRouter(MovieDetailsPage);
