import {Link} from 'react-router-dom';
import {Hotel} from '../../../types/hotel';
import {capitalizeFirstLetter} from '../../../utils/index';
import {AppRoute, MAX_RATING} from '../../../utils/const';

const nonExistentId = -1;

type PlaceCardProps = {
  hotel: Hotel;
  cardClickHandler: (id: number) => void;
}

function PlaceCard({hotel, cardClickHandler}: PlaceCardProps): JSX.Element {
  const {price, type, title, isPremium, isFavorite, rating, id} = hotel;
  const bookmarkButtonClasses = `place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`;
  const ratingPersent = (Math.round(rating) / MAX_RATING) * 100;
  const capitalizedType = capitalizeFirstLetter(type);

  return (
    <article className="cities__card place-card" onMouseEnter={() => cardClickHandler(id)} onMouseLeave={() => cardClickHandler(nonExistentId)}>
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src="img/apartment-01.jpg" width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={bookmarkButtonClasses} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${ratingPersent}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Room}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalizedType}</p>
      </div>
    </article>
  );
}

export default PlaceCard;