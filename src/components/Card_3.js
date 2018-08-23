import React, { Component } from 'react';
import './style.css';
import { FlexyFlipCard } from 'flexy-flipcards';
import Bingo from '../utils/Bingo';

class Card extends Component {
  constructor(props) {
    super();

    console.log('constructor - This happens 1st.');

    this.state = {
      loading: 'initial',
      data: '',
      card: {},
      tiles: {}
    };

  }

  componentWillMount() {

    console.log('componentWillMount - This happens 2nd.');

    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({
          profile,
          loading: 'profile'
        });
      });
    } else {
      this.setState({ profile: userProfile });
    }


      this.getStuffReady();
  }

  /*componentDidMount() {

    console.log('componentDidMount - This happens 5th.');

    const cardId = 14;

    this.setState({ loading: 'true' });
    this.fetchCard(cardId)
    .then((card) => {
      console.log('componentDidMount - This happens 9th.');
      this.setState({ tiles: card }, function() {
        this.setState({ loading: 'complete' })
      });
    });
  }*/

  getStuffReady() {

    console.log('getStuffReady - This happens 5th.');

    const cardId = 14;

    this.setState({ loading: 'true' });
    this.fetchCard(cardId)
    .then((card) => {
      console.log('getStuffReady - This happens 9th.');
      this.setState({ tiles: card }, function() {
        this.setState({ loading: 'complete' })
      });
    });
  }

  fetchCard(cardId) {

    const promise = new Promise((resolve, reject) => {
      Bingo.getTiles(cardId).then(card => {
        console.log('fetchCard - This happens 8th (after Bingo.getTiles).');
        resolve(card);
      });
    });

    console.log('fetchCard - This happens 6th.');
    return promise;
  }

  renderCards() {

    console.log('renderCards');

    if (this.state.tiles.length > 0) {
      return this.state.tiles.map(tile => {
        return (
          <div
            className="item"
            key={tile[0].id}>
              <FlexyFlipCard
                  frontBackgroundColor="#000034"
                  backBackgroundColor="#000034"
              >
                <div ref="flipper">
                  <h3>{tile[0].name}</h3>
                  <br />
                  <button className="select">Select artist</button>
                </div>

                <div>
                  <h4>
                    <input type="radio"
                      name="artist1"
                      value={tile[0].artist_1}
                    />
                    {tile[0].artist_1}
                    <br />
                    <br />
                    <input type="radio"
                      name="artist2"
                      value={tile[0].artist_2}
                    />
                    {tile[0].artist_2}
                    <br />
                    <br />
                    <input type="radio"
                      name="artist3"
                      value={tile[0].artist_3}
                    />
                    {tile[0].artist_3}
                    <br />
                    <br />
                    <div ref="flipper">
                      <button className="select"
                        onClick={this.submitArtist}>
                        Save artist
                      </button>
                    </div>
                  </h4>
                </div>
              </FlexyFlipCard>

          </div>
        );
      });
    }
  }

  render() {

    console.log('render - This happens 3rd - after componentWillMount');

    const { profile } = this.state;

    if (this.state.loading === 'initial') {
      console.log('render - This happens 4th - after the class is constructed.');
      return <h2>Intializing...</h2>;
    }


    if (this.state.loading === 'true') {
      console.log('render - This happens 7th - when waiting for data.');
      return (
        <div className="Card">
          <h2>Preparing your bingo card - please wait one moment</h2>
        </div>
      );
    }


    //if (this.state.loading === 'complete') {
      console.log('render - This happens when???');
      return (
        <div className="Card">
          <h2>{profile.nickname + String.fromCharCode(39)}s Radio Bingo Board</h2>
          <div className="tileCard">
            <div className="item-list">
              {this.renderCards()}
            </div>
          </div>
         </div>
      );
  //  }

    /*console.log('render - This happens 8th - after I get data.');
    return (
      <div className="Card">
        Blank space
       </div>
    );*/
  }
}

export default Card;
