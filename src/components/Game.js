import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FlexyFlipCard } from 'flexy-flipcards';
import './style.css';

import Expresso from '../utils/Expresso';
import Bingo from '../utils/Bingo';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      menus: [],
      card: {},
      tiles: {}
    };
  }

  componentDidMount() {

    Bingo.getTiles().then(tiles => {
      if (tiles.length) {
        const sortedTiles = this.sortItemNames(tiles, 'song');
        this.setState({tiles: sortedTiles}, function() {
          console.log('getTiles tiles: ', this.state.tiles);
        });
      }
    });

    Expresso.getMenus().then(menus => {
      if (menus.length) {
        const sortedMenus = this.sortItemNames(menus, 'title');
        this.setState({menus: sortedMenus});
      }
    });

    Expresso.getEmployees().then(employees => {
      if (employees.length) {
        const sortedEmployees = this.sortItemNames(employees, 'name');
        this.setState({employees: sortedEmployees});
      }
    });
  }

  sortItemNames(items, field) {
    return items.sort((item1, item2) => {
      if (item2[field].toLowerCase() < item1[field].toLowerCase()) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  xxxrenderTiles() {
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

  renderTiles() {
    return this.state.tiles.map(tile => {
      console.log('tiles: ', this.state.tiles);
      return (
        <Link to={`/tiles/${tile.id}`}
           className="item"
           key={tile.id}>
          <h3>{tile.song}</h3>
        </Link>
      );
    });
  }

  renderMenus() {
    return this.state.menus.map(menu => {
      return (
        <Link to={`/menus/${menu.id}`}
           className="item"
           key={menu.id}>
          <h3>{menu.title}</h3>
        </Link>
      );
    });
  }

  renderEmployees() {
    return this.state.employees.map(employee => {
      return (
        <Link to={`/employees/${employee.id}`}
           className="item"
           key={employee.id}>
           <h3>{employee.name}</h3>
        </Link>
      );
    });
  }

  render() {
    return (
      <div className="Landing">
        <h2>MANAGE TILES</h2>
        <div className="menu item-list">
          {/*this.renderTiles()*/}
          {console.log('tiles: ', this.state.tiles)}
        </div>
        <h2>MANAGE MENUS</h2>
        <div className="menu item-list">
          {this.renderMenus()}
          {console.log('menus: ', this.state.menus)}
        </div>
        <Link to="/menus/new" className="button">ADD</Link>
        <h2>MANAGE EMPLOYEES</h2>
        <div className="employee item-list">
          {this.renderEmployees()}
        </div>
        <Link to="/employees/new" className="button">ADD</Link>
      </div>
    );
  }
}

export default Game;
