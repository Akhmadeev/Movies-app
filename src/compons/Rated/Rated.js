import React, { useState, useEffect, useContext } from 'react';
import './rated.css';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Row, Card, Image, Col, Spin, Alert, Typography, Rate } from 'antd';
import GenresContext from '../../context/context';
import Service from '../../Service';

const Rated = ({ active, setActive }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // const [active, setActive] = useState(false)

  const genres = useContext(GenresContext);

  const { Text } = Typography;

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  useEffect(() => {
    Service.getResourseRated(setCards, setLoading, onError);
  }, [active]);

  function arrayGenres(arr, id) {
    const newArray = [];
    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < arr.length; i++) {
        if (id[j] === arr[i].id) newArray.push(arr[i].name);
      }
    }
    if (newArray.length === 0) return '...';
    return newArray.map((elem) => (
      <Text key={elem + id} code>
        {elem}
      </Text>
    ));
  }

  const colorVoteAverage = (average) => {
    if (average < 3) return 'voteAverageThree voteAverage';
    if (average < 5) return 'voteAverageFive voteAverage';
    if (average < 7) return 'voteAverageSeven voteAverage';
    return 'voteAverageMax voteAverage';
  };

  const onErrorOffInternet = () => (
    <Alert message="Ошибка" description="Неполадки с интернетом" type="попробуйте перезагрузить страничку" showIcon />
  );

  function spinLoading() {
    return (
      <Spin tip="Loading..." size="large">
        <Alert message="one secons please" description="Further details about the context of this alert." type="info" />
      </Spin>
    );
  }

  const shortText = (longText, maxLength) => {
    const dots = '...';
    const pos = longText.indexOf(' ', maxLength);
    return pos === -1 ? longText : longText.substr(0, pos) + dots;
  };

  useEffect(() => setActive(false));

  const newItem = (card) => {
    const imgMove = `https://image.tmdb.org/t/p/w500${card.poster_path}`;
    const nameMove = card.original_title;
    const dataMove = card.release_date ? format(new Date(card.release_date), 'PP') : null;
    const overviewMove = card.overview;
    const idMove = card.id;
    const voteMove = card.rating;
    const genresMove = card.genre_ids;

    return (
      <Col
        className="item_card"
        sm={{ span: 24 }}
        lg={{ span: 12 }}
        xl={{ span: 10 }}
        key={idMove}
        style={{ minWidth: 430, height: 281 }}
      >
        <Card style={{ width: 430, height: 281 }}>
          <Row>
            <Col span={12}>
              <Image style={{ width: 183, height: 241 }} src={imgMove} />
            </Col>
            <Col span={12}>
              <Row>
                <Col span={20}>
                  <Text strong>{nameMove}</Text>
                </Col>
                <Col span={3}>
                  <div className={colorVoteAverage(voteMove)}>
                    <Text>{voteMove}</Text>
                  </div>
                </Col>
              </Row>
              <Text disabled>{dataMove}</Text> <br />
              <div> {arrayGenres(genres, genresMove)} </div>
              <Text>{shortText(overviewMove, 125)}</Text> <br />
              <Rate allowHalf defaultValue={voteMove} count={10} onChange={(star) => Service.RateMovie(star, idMove)} />
            </Col>
          </Row>
        </Card>
      </Col>
    );
  };

  if (loading) return spinLoading();
  if (error) return <Alert type="error" message="ошибка в запросе и все" banner />;

  if (!navigator.onLine) return onErrorOffInternet();
  if (cards.length === 0) return <Alert type="error" message="по вашему запросу не найдено фильмов" banner />;

  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24 }} justify="center">
      {cards.map((card) => newItem(card))}
    </Row>
  );
};

export default Rated;

Rated.defaultProps = {
  active: true,
  setActive: () => {},
};

Rated.propTypes = {
  active: PropTypes.bool,
  setActive: PropTypes.func,
};
