import React, { Component } from 'react';
import './style.css';
import { FlexyFlipCard } from 'flexy-flipcards';
import Bingo from '../utils/Bingo';

class Card extends Component {
  constructor(props) {
    super();

    //console.log('This happens 1st.');

    this.state = {
      loading: 'initial',
      data: '',
      card: {},
      tiles: {}
    };

  }

  componentWillMount() {

    console.log('componentWillMount');

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
  }

  componentDidMount() {

    console.log('componentDidMount');

    //console.log('This happens 3rd.');
    const numTiles = 15;
    const userId = 2;  // must figure out the actual user_id
    const campaignId = 3;   // ditto here
    const cardId = 14;   // and here
    const exists = true; // need to integrate the user table eventually

    if (!exists) {
      this.newCard(numTiles, userId, campaignId);
    };
    this.setState({ loading: 'true' });
    this.fetchCard(cardId)
    .then((card) => {
      this.setState({ tiles: card }, function() {
        this.setState({ loading: 'complete' })
        console.log('state updated: ', this.state.tiles);
      });
    });
    /*this.prepareGame(cardId)
    .then((card) => {
      this.cardIntoState(card)
      .then((msg) => {
        this.setState({ loading: 'complete' });
      });
    });*/

  }

  newCard(numTiles, userId, campaignId) {
    const promise = new Promise((resolve, reject) => {
      this.createCard(numTiles, userId, campaignId)
      .then((card) => {
        for (let i = 0; i < numTiles; i++) {
          this.createTile(card.id);
        }
        resolve(card);
      });
    });
    return promise;
  }

  createCard(numTiles, userId, campaignId) {
    const promise = new Promise((resolve, reject) => {
      const card = {
        numTiles: numTiles,
        user_id: userId,
        campaign_id: campaignId
      }
      Bingo.createCard(card).then(response => {
        resolve(response);
      });
    });
    return promise;
  }

  createTile(cardId) {
    const promise = new Promise((resolve, reject) => {
      Promise.all([
        this.fetchSong(),
        this.fetchArtists()
      ])
      .then((values) => {
        this.prepTiles(values, cardId)
      })
    });
    return promise;
  }

  fetchSong() {
    const id = Math.floor(Math.random() * 2000) + 1;
    return Bingo.getSong(id);
  }

  fetchArtists() {
    const fetchPromises = [];
    for (let j = 0; j < 2; j++) {
      const id = Math.floor(Math.random() * 10) + 1;
      fetchPromises.push(Bingo.getArtist(id));
    }
    return Promise.all(fetchPromises);
  }

  prepTiles(arr, cardId) {
    const tile = {
      song: arr[0].name,
      artist_1: arr[0].artist,
      artist_2: arr[1][0].artist,
      artist_3: arr[1][1].artist,
      card_id: cardId
    };
    //console.log('tile: ', tile);
    Bingo.createTile(tile);
  }

  prepareGame(cardId) {

    console.log('prepareGame');

    const promise = new Promise((resolve, reject) => {
      this.fetchCard(cardId)
      .then((card) => {
        console.log('calling cardIntoState');
        this.cardIntoState(card).then((response) => {
          resolve(response);
        });
      });
    });
    return promise;
  }

  fetchCard(cardId) {

    console.log('fetchCard');

    const promise = new Promise((resolve, reject) => {
      Bingo.getTiles(cardId).then(card => {
        //console.log('about to resolve fetchCard');
        resolve(card);
      });
    });
    return promise;
  }

  /*cardIntoState(card) {
    console.log('cardIntoState card: ', card);
    const promise = new Promise((resolve, reject) => {
      console.log('about to setState');
      this.setState({
        tiles: card
      }, function() {
        console.log('this.state: ', this.state);
        console.log('setState complete');
        //resolve('cardIntoState resolved');
        //resolve(card);
      });
    });
    return promise;
  }*/

  renderCards() {

    console.log('renderCards');
    console.log('loading: ', this.state.loading);

    //if (this.state.tiles.length > 0) {
    if (this.state.loading === 'complete') {
      console.log('tiles: ', this.state.tiles);
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

    console.log('render');

    const { profile } = this.state;

    if (this.state.loading === 'initial') {
      console.log('This happens 2nd - after the class is constructed. You will not see this element because React is still computing changes to the DOM.');
      return <h2>Intializing...</h2>;
    }


    if (this.state.loading === 'true') {
      //console.log('This happens 5th - when waiting for data.');
      return (
        <div className="Card">
          <h2>Preparing your bingo card - please wait one moment</h2>
        </div>
      );
    }


    /*if (this.state.loading === 'complete') {
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
    }*/

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

    //console.log('This happens 9th - after I get data.');

  }
}

export default Card;
