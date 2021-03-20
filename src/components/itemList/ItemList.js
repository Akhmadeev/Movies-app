import React, { useState, useEffect } from 'react';
import './itemList.css';
import PropTypes from 'prop-types';
import { Row, Alert, Pagination } from 'antd';
import Service from '../../service';
import CardMovie from '../cardMovie/CardMovie';
import SpinLoading from '../error/SpinLoading';

const ItemList = ({ searchData }) => {
  const apiService = new Service();

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const pageFunc = (value) => {
    setPage(value);
  };

  useEffect(() => {
    if (!searchData) return <Alert type="error" message="по вашему запросу не найдено фильмов" banner />;
    return apiService
      .getResourseApi(searchData, page)
      .then((body) => {
        setCards(body.results);
        setLoading(false);
      })
      .catch(onError);
  }, [page, searchData]);

  useEffect(() => {
    apiService.getSessionGuest().then((result) => localStorage.setItem('guest_session_id', result.guest_session_id));
  }, []);

  const onErrorOffInternet = () => (
    <Alert message="Ошибка" description="Неполадки с интернетом" type="попробуйте перезагрузить страничку" showIcon />
  );

  if (loading) return <SpinLoading/>;
  if (error) return <Alert type="error" message="ошибка в запросе и все" banner />;

  if (!navigator.onLine) return onErrorOffInternet();
  if (!searchData) return <Alert type="error" message="по вашему запросу не найдено фильмов" banner />;

  return (
    <Row gutter={{ xs: 8, sm: 16 }} justify="center">
      {cards.map((card) =>  <CardMovie key={card.id} card={card} />)}
      <Pagination
        size="small"
        className="pagination_block"
        defaultCurrent={1}
        onChange={(el) => pageFunc(el)}
        total={50}
      />
    </Row>
  );
};

export default ItemList;

ItemList.defaultProps = {
  searchData: 'avengers',
};

ItemList.propTypes = {
  searchData: PropTypes.string,
};
