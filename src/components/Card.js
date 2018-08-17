import React, { Component } from 'react';
import './style.css';
import { FlexyFlipCard } from 'flexy-flipcards';
import Bingo from '../utils/Bingo';

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minicard: {
        name_0: "song 333",
        campaign_id: 123,
        artist0_1: "artist0_1",
        artist0_2: "artist0_2",
        artist0_3: "artist0_3",
        submitted_0: 0,
        submitted_time_0: "submitted_time_0",
        selected_artist_0: "selected_artist_0",
        correct_0: 0,
        is_current_minicard: 1
      },
      tiles: []
    };
  }

  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  componentDidMount() {
    const user_id = this.state.profile.id;

    //if (!this.checkDB(user_id)) {
      this.newCard(user_id);
      // must still check if campaign exists
      // and then check if the campaign has started
      // and then check if the campaign has ended
    //}
    //console.log('exists');
  }

  checkDB(id) {
    let exists = false;
    if (Bingo.getUser(id)) {
      exists = true;
    };
    return exists;
  }

  newCard(user) {
    const numTiles = 1;

    for (let i = 0; i < numTiles; i++) {
      Promise.all([
        this.fetchSong(),
        this.fetchArtists()])
        .then((values) => {
          this.prepTiles(values);
        })
        .then((values) => {
          if (this.state.tiles.length > 0) {
            //console.log('State: ', this.state);
            this.saveminiCard();
          }
        })
        //.then(console.log('loop'));
      }
      //this.saveCard();
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

  prepTiles(arr) {
    const tile = [];

    tile.push({
      id: arr[0].id,
      name: arr[0].name,
      artist_1: arr[0].artist,
      artist_2: arr[1][0].artist,
      artist_3: arr[1][1].artist
    });

    this.updateTiles(tile);
  }

  updateTiles(arr) {
    return new Promise((resolve, reject) => {
      this.setState(prevState => ({
        tiles: [...prevState.tiles, arr]
      }), function() {
        //console.log('State: ', this.state);
        resolve();
      });
    });
  }

  renderCards() {
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
                  <h4>Select artist</h4>
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
                    <div className="saveArtist" ref="flipper">
                      Save artist
                    </div>
                  </h4>
                </div>
              </FlexyFlipCard>

          </div>
        );
      });
    }
  }

  saveminiCard() {
    //console.log('minicard: ', this.state.minicard);
    Bingo.createminiCard(this.state.minicard).then(card => {
      //console.log('Card response: ', card);
    })
  }

  saveCard() {
    //console.log('this.state.tiles[0]: ', this.state.tiles[0]);
    Bingo.createminiCard(this.state.tiles[0]).then(card => {
      console.log('Card response: ', card);
    })
  }

  render() {
    const { profile } = this.state;

    return (
      <div className="Landing">
        <h2>{profile.nickname + String.fromCharCode(39)}s Radio Bingo Board</h2>

        <div className="tileCard">

          <div className="item-list">
            {this.renderCards()}
            </div>

        </div>

      </div>
    )
  }
}

export default Card;
