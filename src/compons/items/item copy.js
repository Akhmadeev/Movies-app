import React, { Component } from 'react';
import { Row, Card, Col, Typography, Rate} from 'antd';

export default class Item extends Component {

state = {
  array: null,
}

newItem = this.state.array.map((element) => {

  const { Text } = Typography;
  return (
    <Card style={{ width: 454, height: 281 }} id={element.id}>
      <Row>
        <Col span={12}>
          <h1>POrtak</h1>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={20}><Text strong>Xyi</Text></Col>
            <Col span={4}><Text type="warning">voteAverageMove </Text></Col>
          </Row>
          <Text disabled>dataMove</Text> <br/>
          <Text code>genreMove</Text><br/>
          <Text>overviewMove</Text> <br/>
          <Rate defaultValue={8} count={10} />
        </Col>
      </Row>
    </Card>
  )
})

componentDidMount() {
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=869cb700bbfae56825fae5c59c77dd18&query=${'harry'}`)
  .then(response => response.json())
  .then(data => {
    console.log(data.results);
    this.setState({
      array: data.results,
    })
  })
}
    render() {
      return (
        <div>
          {this.newItem}
        </div>
      )
    }
}