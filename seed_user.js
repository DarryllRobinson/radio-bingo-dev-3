const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

// Seed Artist table
db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='User'", (error, table) => {
  if (error) {
    throw new Error(error);
  }

  if (table) {
    db.serialize(function() {
      let artistId;
      db.run("INSERT INTO user (id, name, picture, " +
      "campaign1, card1, campaign2, card2, " +
      "campaign3, card3, campaign4, card4, campaign5, card5) " +
      "VALUES ('twitter|50584998', 'Darryll Robinson', " +
      "'https://pbs.twimg.com/profile_images/1455086652/1f651a4e-0cef-4991-83ff-afddf98f95c6_normal.png', " +
      "'Red Bull', 1, 'MTN', 2, 'Summer', 4, 'Spring', 5, 'Levis', 6)");
      db.run("INSERT INTO user (id, name, picture, " +
      "campaign1, card1) " +
      "VALUES ('auth0|5ace0376c1a4d20ad348ca4f', 'darryll', " +
      "'https://s.gravatar.com/avatar/6d7bafa859597776b381bad14b20bb70?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fda.png', " +
      "'Summer', 3)"), function(error) {
        if (error) {
          throw new Error(error);
        }
        artistId = this.lastID;
      };
    });
  }
});
