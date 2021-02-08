import {
    Route,
    NavLink,
    Switch,
} from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import { ToastContainer } from 'react-toastify';
import HomePage from './views/HomePage';
import MoviesPage from './views/MoviesPage';
import MovieDetailsPage from './views/MovieDetailsPage';
import PageNotFound from './views/PageNotFound';

const App = () => {
    return (
        <>
            <ul>
                <li>
                    <NavLink exact to="/">
                        HOME
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/movies">MOVIE</NavLink>{' '}
                </li>
            </ul>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/movies" exact component={MoviesPage} />
                <Route path="/movies/:moviesId" component={MovieDetailsPage} />

                {/* <Route path='/movies/:moviesId/cast' component={Cast} /> */}
                {/* <Route path='/movies' component={Reviews} /> */}
                <Route component={PageNotFound} />
            </Switch>
            <ToastContainer position="top-left" autoClose={2000} />
        </>
    );
};

export default App;
