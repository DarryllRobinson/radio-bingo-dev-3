import React, { Component } from 'react';
import './style.css';
import { FlexyFlipCard } from 'flexy-flipcards';

import Bingo from '../utils/Bingo';

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tiles: []
    };
  }

  componentDidMount() {
  }

  render() {

    return (
      <div className="Landing">
        <h2>{/*this.getUserInfo()*/} Radio Bingo Board</h2>

        <div className="tileCard">

          <div className="item-list">
            {/*this.renderFront()*/}
            </div>

        </div>

      </div>
    )
  }
}

export default Card;
