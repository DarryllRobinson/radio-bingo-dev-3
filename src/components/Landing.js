import React, { Component } from 'react';
import './style.css';
import { FlexyFlipCard } from 'flexy-flipcards';

import Bingo from '../utils/Bingo';

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tiles: []
    };
  }

  componentDidMount() {

    const numTiles = 16;

    for (let i = 0; i < numTiles; i++) {
      Promise.all([
        this.fetchSong(),
        this.fetchArtists()])
        .then((values) => {
          this.prepTiles(values);
        });
      }

      //this.fetchProfile();

  }

  fetchProfile() {
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

  renderFront() {
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

  render() {

    return (
      <div className="Landing">
        <h2>Your Radio Bingo Board</h2>

        <div className="tileCard">

          <div className="item-list">
            {this.renderFront()}
            </div>

        </div>

      </div>
    )
  }
}

export default Landing;
