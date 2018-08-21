const express = require('express');
const tilesRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

tilesRouter.param('tileId', (req, res, next, tileId) => {
  const sql = 'SELECT * FROM tile WHERE tile.id = $tileId';
  const values = {$tileId: tileId};
  db.get(sql, values, (error, tile) => {
    if (error) {
      next(error);
    } else if (tile) {
      req.tile = tile;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

tilesRouter.get('/', (req, res, next) => {
  db.all('SELECT * FROM tile',
    (err, tiles) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({tiles: tiles, count: tiles.length});
      }
    });
});

tilesRouter.get('/:tileId', (req, res, next) => {
  res.status(200).json({tile: req.tile});
});

tilesRouter.post('/', (req, res, next) => {
  const song = req.body.tile.song,
        artist_1 = req.body.tile.artist_1,
        artist_2 = req.body.tile.artist_2,
        artist_3 = req.body.tile.artist_3,
        submitted = req.body.tile.submitted,
        submitted_artist = req.body.tile.submitted_artist,
        submitted_time = req.body.tile.submitted_time,
        correct = req.body.tile.correct,
        card_id = req.body.tile.card_id;
  if (!song || !artist_1 || !artist_2 || !artist_3 || !card_id) {
    return res.sendStatus(400);
  }

  const sql = 'INSERT INTO tile (song, artist_1, artist_2, artist_3, card_id)' +
      'VALUES ($song, $artist_1, $artist_2,  $artist_3,  $card_id)';
  const values = {
    $song: song,
    $artist_1: artist_1,
    $artist_2: artist_2,
    $artist_3: artist_3,
    $card_id: card_id
  };

  db.run(sql, values, function(error) {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM tile WHERE tile.id = ${this.lastID}`,
        (error, tile) => {
          res.status(201).json({tile: tile});
        });
    }
  });
});

module.exports = tilesRouter;
