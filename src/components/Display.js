import React, { Component } from 'react';

class Display extends Component {
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

export default Display;
