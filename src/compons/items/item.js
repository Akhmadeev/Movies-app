import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Row, Card, Image, Col, Spin, Alert, Typography, Rate} from 'antd';

export default class Items extends Component {

state = {
  cards: [],
  loading: true,
  error: false
};

 componentDidMount() {
  const { pageProps, searchData } = this.props;

  this.getResourse(`https://api.themoviedb.org/3/search/movie?api_key=869cb700bbfae56825fae5c59c77dd18&query=${searchData}&page=${pageProps}`)
  .then(array => this.setState({
    cards: array.results,
    loading: false
  }))
  .catch(this.onError);
}

componentDidUpdate(prevProps) {
  const { pageProps, searchData } = this.props;
  if(pageProps !== prevProps.pageProps || searchData !== prevProps.searchData) {
    if(searchData) {
      this.getResourse(`https://api.themoviedb.org/3/search/movie?api_key=869cb700bbfae56825fae5c59c77dd18&query=${searchData}&page=${pageProps}`)
  .then(array => this.setState({
    cards: array.results,
    loading: false
  }))
  .catch(this.onError);
    }
    if(searchData === null) {
      <Alert type="error" message="Выберите фильм" banner />
    }
  }
}

componentWillUnmount() {
  
  const { searchData, pageProps } = this.props;
  if(!searchData) {
    this.getResourse(`https://api.themoviedb.org/3/search/movie?api_key=869cb700bbfae56825fae5c59c77dd18&query=${' '}&page=${pageProps}`)
  .then(array => this.setState({
    cards: array.results,
    loading: false
  }))
  .catch(this.onError);
  }
  
}

onError = () => {
  this.setState({
    loading: false,
    error: true
  });
}

onErrorOffInternet() {
  return (
    <Alert
      message="Ошибка"
      description="Не поладки с интернетом"
      type="попробуйте перезагрузить страничку"
      showIcon
    />
  )
}

getResourse = async (url) => {
  const res = await fetch(url);
  const body = await res.json();
  return body
}

spinLoading() {
  return (
    <Spin tip="Loading..." size="large">
      <Alert
        message="one secons please"
        description="Further details about the context of this alert."
        type="info"
      />
    </Spin>)
}

shortText(longText, maxLength) {
  const dots = '...'
  const pos = longText.indexOf(" ", maxLength);
  return (pos === -1 ? longText : longText.substr(0, pos) + dots)
}

newItem(card) {

  const { Text } = Typography;
  const imgMove = `https://image.tmdb.org/t/p/w500${card.poster_path}`;
  const nameMove = card.original_title;
  const dataMove = card.release_date ? format(new Date(card.release_date), "PP") : null;
  const overviewMove = card.overview;
  const idMove = card.id;
  const voteMove = card.vote_average;

  return (
    <Col sm={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 10 }} key={idMove} style={{ minWidth: 430, height: 281 }}>
      <Card style={{ width: 430, height: 281 }}>
        <Row >
          <Col span={12}>
            <Image
              width={183}
              height={241}
              src={imgMove}/>
          </Col>
          <Col span={12}>
            <Row >
              <Col span={20}><Text strong>{nameMove}</Text></Col>
              <Col span={3}><Text type="warning">{voteMove} </Text></Col>
            </Row>
            <Text disabled>{dataMove}</Text> <br/>
            <Text code>drama</Text><br/>
            <Text>{this.shortText(overviewMove, 125)}</Text> <br/>
            <Rate allowHalf defaultValue={voteMove} count={10} />
          </Col>
        </Row>
      </Card>
    </Col>
  )
}

  render() {
    const {cards, loading, error} = this.state;

    if(loading) return this.spinLoading();
    if(error) return <Alert type="error" message="ошибка в запросе и все" banner />;

    if (!navigator.onLine) return this.onErrorOffInternet();
    if(cards.length === 0) return <Alert type="error" message="по вашему запросу не найдено фильмов" banner />;

    return (
      <Row gutter={{xs: 8, sm: 16, md: 24}} justify="center"> 
        {cards.map(card => (this.newItem(card)))}
      </Row>
    )
  }
}

Items.defaultProps = {
  pageProps: 1,
  searchData: 'avengers'
}

Items.propTypes = {
  pageProps: PropTypes.number,
  searchData: PropTypes.string
}