import React, { Component } from 'react';
import './style.css';
import { FlexyFlipCard } from 'flexy-flipcards';
import Bingo from '../utils/Bingo';

class Card extends Component {
  constructor(props) {
    super();

    console.log('This happens 1st.');

    this.state = {
      loading: 'initial',
      data: ''
    };

  }

  loadData() {
    var promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('This happens 6th (after 3 seconds).');
        resolve('This is my data.');
      }, 3000);
    });

    console.log('This happens 4th.');

    return promise;
  }

  componentDidMount() {

    console.log('This happens 3rd.');

    this.setState({ loading: 'true' });
    this.loadData()
    .then((data) => {
      console.log('This happens 7th.');
      this.setState({
        data: data,
        loading: 'false'
      });
    });
  }

  render() {

    if (this.state.loading === 'initial') {
      console.log('This happens 2nd - after the class is constructed. You will not see this element because React is still computing changes to the DOM.');
      return <h2>Intializing...</h2>;
    }


    if (this.state.loading === 'true') {
      console.log('This happens 5th - when waiting for data.');
      return <h2>Loading...</h2>;
    }

    console.log('This happens 8th - after I get data.');
    return (
      <div>
        <p>Got some data!</p>
        <p>{this.state.data}</p>
       </div>
    );
  }
}

export default Card;
