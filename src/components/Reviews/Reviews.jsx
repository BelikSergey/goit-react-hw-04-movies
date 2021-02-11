import React, { Component } from 'react';
import FetchCastReviews from '../../services/FetchCastReviews';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default class Reviews extends Component {
    state = {
        reviews: [],
    };
    async componentDidMount() {
        // console.log('компонент ревью замаунтился');
        const reviews = 'reviews';
        try {
            const data = await FetchCastReviews(
                Number(this.props.movieId),
                reviews,
            );
            this.setState({ reviews: data.data.results });
        } catch (error) {
            return toast.error(
                `С запросом что-то пошло не так!!!! Перезагрузите страницу и попробуйте снова `,
            );
        }
    }

    render() {
        const { reviews } = this.state;
        if (reviews.length !== 0) {
            return (
                <ul>
                    {reviews.map(el => {
                        return (
                            <li key={el.id}>
                                <h3>{el.author}</h3>
                                <p>{el.content}</p>
                            </li>
                        );
                    })}
                </ul>
            );
        } else return <h2>We dont have any reviews for this movie</h2>;
    }
}
