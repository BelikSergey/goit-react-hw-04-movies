import React, { Suspense, lazy } from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import HomePage from './views/HomePage';
// import MoviesPage from './views/MoviesPage';
// import MovieDetailsPage from './views/MovieDetailsPage';
// import PageNotFound from './views/PageNotFound';
import routes from './routes';
import AppBar from './components/AppBar';

const HomePage = lazy(() =>
    import('./views/HomePage' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
    import('./views/MoviesPage' /* webpackChunkName: "movies-page" */),
);
const MovieDetailsPage = lazy(() =>
    import(
        './views/MovieDetailsPage' /* webpackChunkName: "movie-details-page" */
    ),
);

const App = () => {
    return (
        <>
            <AppBar />
            <Suspense
                fallback={
                    <Loader
                        type="ThreeDots"
                        color="#00BFFF"
                        height={200}
                        width={200}
                    />
                }
            >
                <Switch>
                    <Route path={routes.home} exact component={HomePage} />
                    <Route path={routes.movies} exact component={MoviesPage} />
                    <Route
                        path={routes.movieDetails}
                        component={MovieDetailsPage}
                    />

                    {/* <Route path='/movies/:moviesId/cast' component={Cast} /> */}
                    {/* <Route path='/movies' component={Reviews} /> */}
                    <Route component={HomePage} />
                </Switch>
            </Suspense>
            <ToastContainer position="top-left" autoClose={2000} />
        </>
    );
};

export default App;
