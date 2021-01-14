import React, { Component } from 'react';
import { format } from 'date-fns';
import { Row, Card, Image, Col, Typography, Rate} from 'antd';


export default class Items extends Component {

state = {
  cards: [],
};

componentDidMount() {
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=869cb700bbfae56825fae5c59c77dd18&query=${'return'}`)
  .then(response => response.json())
  .then(array => this.setState({cards: array.results}))
  .catch(this.onError);
}

onError = () => {

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
  const dataMove = format(new Date(card.release_date), "PP");
  const overviewMove = card.overview;
  const idMove = card.id;
  const voteMove = card.vote_average;

  return (
    <Col md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 10 }} key={idMove} style={{ minWidth: 454, height: 281 }}>
      <Card style={{ width: 454, height: 281 }}>
        <Row >
          <Col span={12}>
            <Image
              width={183}
              height={241}
              src={imgMove}/>
          </Col>
          <Col span={12}>
            <Row gutter={[8]}>
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
    const {cards} = this.state;
    return (
      <Row gutter={[25, 25]} justify='center'> 
        {cards.map(card => (this.newItem(card)))}
      </Row>
    )
  }
}
