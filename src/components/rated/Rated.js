import React, { useState, useEffect } from 'react';
import './rated.css';
import PropTypes from 'prop-types';
import { Row,  Alert } from 'antd';
import Service from '../../service';
import CardMovie from '../cardMovie/CardMovie';
import SpinLoading from '../error/SpinLoading';

const Rated = ({ active, setActive }) => {

  
  const apiService = new Service();

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // const [active, setActive] = useState(false)

  


  const onError = () => {
    setLoading(false);
    setError(true);
  };

  useEffect(() => {
    apiService
      .getResourseRated()
      .then((body) => {
        setCards(body.results);
        setLoading(false);
      })
      .catch(onError);
  }, [active]);

  const onErrorOffInternet = () => (
    <Alert message="Ошибка" description="Неполадки с интернетом" type="попробуйте перезагрузить страничку" showIcon />
  );

  useEffect(() => setActive('search'));


  if (loading) return <SpinLoading/>;
  if (error) return <Alert type="error" message="ошибка в запросе и все" banner />;

  if (!navigator.onLine) return onErrorOffInternet();
  if (cards.length === 0) return <Alert type="error" message="по вашему запросу не найдено фильмов" banner />;

  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24 }} justify="center">
      {cards.map((card) => (
        <CardMovie key={card.id} card={card} />
      ))}
    </Row>
  );
};

export default Rated;

Rated.defaultProps = {
  active: '',
  setActive: () => {},
};

Rated.propTypes = {
  active: PropTypes.string,
  setActive: PropTypes.func,
};
