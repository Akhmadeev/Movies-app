import React, { Component } from 'react';
import { Row, Image, Card, Col, Typography, Rate} from 'antd';

export default class Item extends Component {

state = {
  obj: null,
}

  apiRequest = fetch(`https://api.themoviedb.org/3/search/movie?api_key=869cb700bbfae56825fae5c59c77dd18&query=${'harry'}`)
      .then(response => response.json())
      .then(data => {
        console.log(data.results)
        this.setState({
          obj: data.results,
        })
      })

  newItem = () => {
    const { obj } = this.state;
    console.log(this.state);
    obj.forEach(element => {
        
      const { Text } = Typography;

      console.log(element)
     
      return (
        <Card style={{ width: 454, height: 281 }}>
          <Row>
            <Col span={12}>
              <Image
                width={183}
                height={241}
                src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`}/>
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
  }

    render() {
      return (
        <div>
          {this.apiRequest.newItem}
        </div>
      )
    }
}