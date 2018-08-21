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
      tiles: []
    };

  }

  componentWillMount() {
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

    //console.log('This happens 3rd.');
    const numTiles = 16;
    const userId = 2;  // must figure out the actual user_id
    const campaignId = 3;   // ditto here

    this.newCard(numTiles, userId, campaignId)
    .then((card) => {
      this.setState({ loading: "true" }, function() {
        console.log('state: ', this.state);
      });
      //console.log('state: ', this.state);
    });
  }

  newCard(numTiles, userId, campaignId) {
    const promise = new Promise((resolve, reject) => {
      this.createCard(numTiles, userId, campaignId)
      .then((card) => {
        for (let i = 0; i < numTiles; i++) {
          this.createTile(card.id);
        }
        //console.log('card: ', card);
        resolve();
      });
    });
    //onsole.log('end of newCard');
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

  render() {
    const { profile } = this.state;

    /*if (this.state.loading === 'initial') {
      console.log('This happens 2nd - after the class is constructed. You will not see this element because React is still computing changes to the DOM.');
      return <h2>Intializing...</h2>;
    }*/


    if (this.state.loading === 'true') {
      //console.log('This happens 5th - when waiting for data.');
      return (
        <div className="Card">
          <h2>Preparing your bingo card - please wait one moment</h2>
        </div>
      );
    }


    if (this.state.loading === 'profile') {
      //console.log('This happens 6th - after profile has been updated.');
      //console.log('state: ', this.state);
      //console.log('this.state.profile.sub: ', this.state.profile.sub);
      //this.checkDB(this.state.profile.sub);
      //return <h2>Profile...</h2>;
    }

    //console.log('This happens 9th - after I get data.');
    return (
      <div className="Card">
        <h2>{profile.nickname + String.fromCharCode(39)}s Radio Bingo Board</h2>
        <div className="tileCard">
          <div className="item-list">
            {/*this.renderCards()*/}
          </div>
        </div>
       </div>
    );
  }
}

export default Card;
