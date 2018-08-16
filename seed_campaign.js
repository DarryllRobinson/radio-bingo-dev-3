const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

// Seed Artist table
db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Campaign'", (error, table) => {
  if (error) {
    throw new Error(error);
  }

  if (table) {
    db.serialize(function() {
      let artistId;
      db.run("INSERT INTO campaign (campaign_name, organisation, " +
      "start_date, end_date) " +
      "VALUES ('Red Bull', '94.7', '2018-08-01', '2018-08-31')");
      db.run("INSERT INTO campaign (campaign_name, organisation, " +
      "start_date, end_date) " +
      "VALUES ('MTN', 'HotFM', '2018-08-01', '2018-08-31')");
      db.run("INSERT INTO campaign (campaign_name, organisation, " +
      "start_date, end_date) " +
      "VALUES ('Summer', '702', '2018-08-01', '2018-08-31')");
      db.run("INSERT INTO campaign (campaign_name, organisation, " +
      "start_date, end_date) " +
      "VALUES ('Spring', 'Classic FM', '2018-08-01', '2018-08-31')");
      db.run("INSERT INTO campaign (campaign_name, organisation, " +
      "start_date, end_date) " +
      "VALUES ('Levis', '94.7', '2018-08-01', '2018-08-31')"), function(error) {
        if (error) {
          throw new Error(error);
        }
        artistId = this.lastID;
      };
    });
  }
});
