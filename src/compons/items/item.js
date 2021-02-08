import React, { useState, useEffect, useContext } from 'react';
import './item.css';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Row, Card, Image, Col, Spin, Alert, Typography, Rate } from 'antd';
import GenresContext from '../../context/context'

const Item = ({ pageProps, searchData }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const genres = useContext(GenresContext);

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  useEffect(() => {
    const getResourse = () => {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=869cb700bbfae56825fae5c59c77dd18&query=${searchData}&page=${pageProps}`
      )
        .then((res) => res.json())
        .then((body) => {
          setCards(body.results);
          setLoading(false);
        })
        .catch(onError);
    };
    getResourse();
  }, [pageProps, searchData]);

    // const getToken = () => {
    //   fetch('https://api.themoviedb.org/3/authentication/token/new?api_key=869cb700bbfae56825fae5c59c77dd18')
    //     .then((res) => res.json())
    //     .then((body) => {
    //       localStorage.setItem('request_token', body.request_token);
    //       const tokenKey = localStorage.getItem('request_token');
    //       console.log(tokenKey);
    //     });
    // };

  const getSessionGuest = () => {
    fetch(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=869cb700bbfae56825fae5c59c77dd18`)
      .then((body) => body.json())
      .then((result) => localStorage.setItem('guest_session_id', result.guest_session_id))
  }

    useEffect(() => {
      getSessionGuest();
    }, []);

  const RateMovie = (rate, id) => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/rating?api_key=869cb700bbfae56825fae5c59c77dd18&guest_session_id=${localStorage.getItem('guest_session_id')}`, {
      method: 'POST',
      body: JSON.stringify({ value: rate }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',  
      }
    }) 
      .then(response => response.json())
  }
 

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

  // const fallback = (post) => {
  //   const imgMove = `https://image.tmdb.org/t/p/w500${post}`;
  //   if (imgMove) return <Spin tip="Loading..." size="large" />;
    
  //   return <Spin tip="Loading..." size="large" />;
  // };

  function arrayGenres(arr, id) {
    const newArray = [];
    for (let j = 0; j < id.length; j++) {
      for (let i = 0; i < arr.length; i++) {
        if (id[j] === arr[i].id) newArray.push(arr[i].name)
      }
    }
    if(newArray.length === 0)  return '...'
    return newArray.join(', ');
  };

  const colorVoteAverage = (average) => {
    if (average < 3) return 'voteAverageThree voteAverage';
    if (average < 5) return 'voteAverageFive voteAverage';
    if (average < 7) return 'voteAverageSeven voteAverage';
    return 'voteAverageMax voteAverage';
  }
//   От 0 до 3 - #E90000
// От 3 до 5 - #E97E00
// От 5 до 7 - #E9D100
// Выше 7 - #66E900

  const newItem = (card) => {
    const { Text } = Typography;
    const imgMove = `https://image.tmdb.org/t/p/w500${card.poster_path}`;
    const nameMove = card.original_title;
    const dataMove = card.release_date ? format(new Date(card.release_date), 'PP') : null;
    const overviewMove = card.overview;
    const idMove = card.id;
    const voteMove = card.vote_average;
    const genresMove = card.genre_ids
    
    // const genresArray = genres.filter(elem => genresMove.includes(elem.id)).map(elem => elem.name);

    // const { Text } = Typography;
    // const imgMove = `https://image.tmdb.org/t/p/w500${card.poster_path}`; // fallback(card.poster_path);
    // const nameMove = card.original_title;
    // const dataMove = card.release_date ? format(new Date(card.release_date), 'PP') : null;
    // const overviewMove = card.overview;
    // const idMove = card.id;
    // const voteMove = card.vote_average;

    return (
      <Col sm={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 10 }} key={idMove} style={{ minWidth: 430, height: 281 }}>
        <Card style={{ width: 430, height: 281 }}>
          <Row>
            <Col span={12}>
              <Image width={183} height={241} src={imgMove} />
            </Col>
            <Col span={12}>
              <Row>
                <Col span={20}>
                  <Text strong>{nameMove}</Text>
                </Col>
                <Col span={3}>
                  <div className={colorVoteAverage(voteMove)}>
                    <Text >{voteMove}</Text>
                  </div>
                </Col>
              </Row>
              <Text disabled>{dataMove}</Text> <br />
              <Text code>{arrayGenres(genres, genresMove)}</Text>
              <br />
              <Text>{shortText(overviewMove, 125)}</Text> <br />
              <Rate allowHalf defaultValue={0} count={10} onChange={(star) => RateMovie(star, idMove)} />
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

export default Item;

Item.defaultProps = {
  pageProps: 1,
  searchData: 'avengers',
};

Item.propTypes = {
  pageProps: PropTypes.number,
  searchData: PropTypes.string,
};
