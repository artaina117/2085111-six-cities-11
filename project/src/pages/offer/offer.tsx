import { Helmet } from 'react-helmet-async';
import Logo from '../../components/logo/logo';
import CommentForm from '../../components/comment-form/comment-form';
import CommentsList from '../../components/comments-list/comments-list';
import Map from '../../components/map/map';
import PlaceCard from '../../components/offers-list/place-card/place-card';
import { comments } from '../../mocks/comments';
import { nearbyHotels } from '../../mocks/nearby-hotels';
import { Hotel } from '../../types/hotel';
import { сalculateRating, capitalizeFirstLetter } from '../../utils/index';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { fetchCurrentOfferAction } from '../../store/api-actions';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Header from '../../components/header/header';
import { MAX_AMOUNT_OF_PHOTOS } from '../../utils/const';

function Offer(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const currentOfferId = Number(id);

  useEffect(() => {
    dispatch(fetchCurrentOfferAction(currentOfferId));
  }, [currentOfferId, dispatch]);

  const currentHotel = useAppSelector((state) => state.currentOffer);
  const { isPremium, title, isFavorite, rating, bedrooms, maxAdults, type, price, goods, description, host, images } = currentHotel;

  return (
    <div className="page">
      <Helmet>
        <title>Hotel Page | 6 cities</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <Header />
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images?.slice(0, MAX_AMOUNT_OF_PHOTOS).map((image) => (
                <div className="property__image-wrapper" key={image}>
                  <img className="property__image" src={image} alt={title} />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium &&
                <div className="property__mark">
                  <span>Premium</span>
                </div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className={cn('property__bookmark-button', 'button', { 'property__bookmark-button--active': isFavorite })} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: `${сalculateRating(rating)}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {capitalizeFirstLetter(type)}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} {bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} {maxAdults > 1 ? 'adults' : 'adult'}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((good) => (
                    <li className="property__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={cn('property__avatar-wrapper', 'user__avatar-wrapper', { 'property__avatar-wrapper--pro': host.isPro })}>
                    <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                  {host.isPro &&
                    <span className="property__user-status">
                      Pro
                    </span>}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
                <CommentsList comments={comments} />
                <CommentForm />
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map hotels={nearbyHotels} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearbyHotels.map((nearbyHotel: Hotel) => <PlaceCard hotel={nearbyHotel} key={nearbyHotel.id} />)}
            </div>
          </section>
        </div>
      </main>

    </div>
  );
}

export default Offer;
