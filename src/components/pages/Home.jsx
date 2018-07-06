import React, { Component } from 'react';
import { client } from '../../utils/socket';
import { Tile } from '../common/Tile';

class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      data: [],
      time: 15,
      error: true,
    }
  }

  componentDidMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
      this.setState({
        error: false,
      })
    };

    client.onerror =() => {
        console.log('Connection Error');
        this.setState({
          error: true,
        })
    };
    
    client.onmessage = (e) => {
      console.log('work');
      this.setState({
        data: JSON.parse(e.data).articles,
      });
      this.timer = setInterval(this.tick, 60 * 1000);
    };
  };

  componentWillUnmount() {
    clearInterval(this.timer);
    client.close();
  };

  tick = () => {
    this.setState({
      time: this.state.time <= 0 ? 15 : this.state.time - 1,
    });
  }

  render() {
    return (
      this.state.error ? 
        <div>
          <h3>Websocket server connection error. Please start websocket server.</h3>
        </div>
        :
        <div>
        <div className="title">
          <span>
            Remaining before update:
          </span>
          <span>&nbsp;{this.state.time} minute</span>
        </div>
        <div className="tiles">
          {this.state.data.map((value) => {
            return (
              <Tile tile={value} key={value.title} />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Home;
