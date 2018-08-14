const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

// Seed Artist table
db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Artist'", (error, table) => {
  if (error) {
    throw new Error(error);
  }

  if (table) {
    db.serialize(function() {
      let artistId;
      db.run("INSERT INTO artist (artist) VALUES ('ABBA')");
      db.run("INSERT INTO artist (artist) VALUES ('Adam Levine')");
      db.run("INSERT INTO artist (artist) VALUES ('The Beach Boys')");
      db.run("INSERT INTO artist (artist) VALUES ('The Beatles')");
      db.run("INSERT INTO artist (artist) VALUES ('Betty Wand, Marni Nixon & Natalie Wood')");
      db.run("INSERT INTO artist (artist) VALUES ('Bob Seger & The Silver Bullet Band')");
      db.run("INSERT INTO artist (artist) VALUES ('Bournemouth Symphony Orchestra & Paavo Berglund')");
      db.run("INSERT INTO artist (artist) VALUES ('bruce springsteen')");
      db.run("INSERT INTO artist (artist) VALUES ('The Chainsmokers & Coldplay')");
      db.run("INSERT INTO artist (artist) VALUES ('Charli XCX')"), function(error) {
                if (error) {
                  throw new Error(error);
                }
                artistId = this.lastID;
              };
            });
          }
        });
