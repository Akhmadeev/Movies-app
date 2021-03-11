import React, {  useContext } from 'react';
import './card.css';
import { format } from 'date-fns';
import { Card, Image, Col, Row, Typography, Rate } from 'antd';
import GenresContext from '../../context/context';
import Service from '../../Service';
import { colorVoteAverage, arrayGenres, shortText } from '../../utils';



const CardMovie = (card, rating) => {
    
  const genres = useContext(GenresContext);
  const apiService = new Service();
  const { Text } = Typography;

    const imgMove = `https://image.tmdb.org/t/p/w500${card.poster_path}`;
    const nameMove = card.original_title;
    const dataMove = card.release_date ? format(new Date(card.release_date), 'PP') : null;
    const overviewMove = card.overview;
    const idMove = card.id;
  const voteMove = card[rating];
  // const voteMove = card.vote_average;
    const genresMove = card.genre_ids;

    return (
      <Col
        className="item_card"
        sm={{ span: 24 }}
        lg={{ span: 10 }}
        xl={{ span: 10 }}
        key={idMove + nameMove}
        style={{ minWidth: 430, height: 320, marginBottom: 16, marginLeft: 10 }}
      >
        <Card style={{ width: 430, height: 320 }}>
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
              <div>
                <Text>{arrayGenres(genres, genresMove)}</Text>
              </div>
              <Text>{shortText(overviewMove, 125)}</Text> <br />
              <Rate allowHalf defaultValue={0} count={10} onChange={(star) => apiService.RateMovie(star, idMove)} />
            </Col>
          </Row>
        </Card>
      </Col>
    );
  };
export default CardMovie;