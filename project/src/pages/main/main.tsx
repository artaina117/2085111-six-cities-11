import {Helmet} from 'react-helmet-async';
import {useEffect, useState} from 'react';
import Logo from '../../components/logo/logo';
import {SettingsType} from '../..';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getOffersList } from '../../store/action';

type MainProps = {
  settings: SettingsType;
};

function Main({settings}: MainProps): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState<number | undefined>(undefined);

  const dispatch = useAppDispatch();
  const hotels = useAppSelector((state) => state.offers);
  const city = useAppSelector((state) => state.city);

  useEffect(() => {
    dispatch(getOffersList());
  }, []);

  const cardClickHandler = (id: number) => {
    setSelectedOffer(id);
  };

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Main Page | 6 cities</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <OffersList hotels={hotels} city={city} cardClickHandler={cardClickHandler} />
            <div className="cities__right-section">
              <section className="cities__map map">
                {hotels.length > 0 && <Map hotels={hotels} selectedOffer={selectedOffer} />}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
