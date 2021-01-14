import React from 'react';
import { format } from 'date-fns';
import { Row, Image, Card, Col, Typography, Rate} from 'antd';

export default class Item extends React.Component {

  state = {
    imgMove: null,
    nameMove: null,
    dataMove: null,
    overviewMove: null,
    genreMove: null,
    voteAverageMove: null
  };

  componentDidMount() {
    fetch('https://api.themoviedb.org/3/movie/561?api_key=869cb700bbfae56825fae5c59c77dd18')
      .then(response => response.json())
      .then(data => {
        this.setState({
          imgMove: `https://image.tmdb.org/t/p/w500/${data.poster_path}`,
          nameMove: data.title,
          dataMove: format(new Date(data.release_date), "PP"),
          overviewMove: this.cutText(data.overview, 135),
          genreMove: data.genres[0].name,
          voteAverageMove: data.vote_average,
        })
      })
  }
 
  cutText(text, leng){
    while(leng <= text.length) {
      if(text[leng + 1] === ' ') break;
      }    
    return `${text.substring(0, leng)}...`;
}
  
    render() {
      const { Text } = Typography;
      const { nameMove, dataMove, overviewMove, genreMove, imgMove, voteAverageMove } = this.state;

      return (
        
        <Card style={{ width: 454, height: 281 }}>
          <Row>
            <Col span={12}>
              <Image
                width={183}
                height={241}
                src={imgMove}/>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={20}><Text strong>{nameMove}</Text></Col>
                <Col span={4}><Text type="warning">{voteAverageMove} </Text></Col>
              </Row>
              <Text disabled>{dataMove}</Text> <br/>
              <Text code>{genreMove}</Text><br/>
              <Text>{overviewMove}</Text> <br/>
              <Rate defaultValue={voteAverageMove} count={10} />
            </Col>
          </Row>
        </Card>
        )
    }
}

newItem = () => {
  const { obj } = this.state;
  console.log(this.state);
  obj.forEach(element => {
      
    const { Text } = Typography;

    console.log(element);
   
    return (
      <Card style={{ width: 454, height: 281 }} id={element.id}>
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