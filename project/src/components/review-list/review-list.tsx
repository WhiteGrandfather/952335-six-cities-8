import React, {
  useEffect,
  useState
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';

import ReviewItem from '../review-item/review-item';
import {
  ReviewsListProps,
  maxId
} from './types';
import {getReviews} from '../../store/property-data/selector';
import {
  fetchReviewAction,
  loadReviewsAction
} from '../../services/api-actions';

function ReviewList({
  itemId,
  isLoggedIn,
}: ReviewsListProps):JSX.Element {
  const MAX_REVIEWS = 10;
  const MIN_REVIEW_CHARACTERS = 5;

  let maxKey: maxId = 100;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  let reviews: JSX.Element[] | null = null;

  const dispatch = useDispatch();

  const reviewsList = useSelector(getReviews);

  useEffect(()=>{
    dispatch(loadReviewsAction(itemId));
  },[]);

  // создает список отзывов
  if (reviewsList.length > 0) {
    reviews = reviewsList
      .slice()
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getDate()) //Сортировка по дате
      .map((review) => <ReviewItem review={review} key={maxKey++}/>);

    if (reviews.length > MAX_REVIEWS) {
      reviews.length = MAX_REVIEWS;
    }
  }

  const reviewForm = (
    <form className="reviews__form form" method="post"
      onSubmit={(evt) => {
        evt.preventDefault();
        if (rating > 0 && comment.length > 0) {
          // onReviewSubmit(rating, message);
          dispatch(fetchReviewAction(itemId, {rating, comment}));
          setRating(0);
          setComment('');
        }
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden"
          name="rating"
          value="5"
          id="5-stars"
          type="radio"
          checked={rating === 5}
          onChange={()=>setRating(5)}
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
        <input className="form__rating-input visually-hidden"
          name="rating"
          value="4"
          id="4-stars"
          type="radio"
          checked={rating === 4}
          onChange={()=>setRating(4)}
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden"
          name="rating"
          value="3"
          id="3-stars"
          type="radio"
          checked={rating === 3}
          onChange={()=>setRating(3)}
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden"
          name="rating"
          value="2"
          id="2-stars"
          type="radio"
          checked={rating === 2}
          onChange={()=>setRating(2)}
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden"
          name="rating"
          value="1"
          id="1-star"
          type="radio"
          checked={rating === 1}
          onChange={()=>setRating(1)}
        />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={(el)=>setComment(el.target.value)}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and
        describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button"
          type="submit"
          disabled={!(rating > 0 && comment.length >= MIN_REVIEW_CHARACTERS)}
        >
        Submit
        </button>
      </div>
    </form>);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot;
        <span className="reviews__amount">{reviewsList.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews}
      </ul>
      {isLoggedIn && reviewForm}
    </section>
  );
}

export default ReviewList;
