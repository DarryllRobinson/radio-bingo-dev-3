const express = require('express');
const artistsRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

artistsRouter.param('artistId', (req, res, next, artistId) => {
  const sql = 'SELECT * FROM artist WHERE artist.id = $artistId';
  const values = {$artistId: artistId};
  db.get(sql, values, (error, artist) => {
    if (error) {
      next(error);
    } else if (artist) {
      req.artist = artist;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

artistsRouter.get('/', (req, res, next) => {
  db.all('SELECT * FROM artist WHERE artist.is_current_artist = 1',
    (err, artists) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({artists: artists, count: artists.length});
      }
    });
});

artistsRouter.get('/:artistId', (req, res, next) => {
  res.status(200).json({artist: req.artist});
});

artistsRouter.post('/', (req, res, next) => {
  const name = req.body.artist.name,
        position = req.body.artist.position,
        wage = req.body.artist.wage,
        isCurrentartist = req.body.artist.isCurrentartist === 0 ? 0 : 1;
  if (!name || !position || !wage) {
    return res.sendStatus(400);
  }

  const sql = 'INSERT INTO artist (name, position, wage, is_current_artist)' +
      'VALUES ($name, $position, $wage, $isCurrentartist)';
  const values = {
    $name: name,
    $position: position,
    $wage: wage,
    $isCurrentartist: isCurrentartist
  };

  db.run(sql, values, function(error) {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM artist WHERE artist.id = ${this.lastID}`,
        (error, artist) => {
          res.status(201).json({artist: artist});
        });
    }
  });
});

artistsRouter.put('/:artistId', (req, res, next) => {
  const name = req.body.artist.name,
        position = req.body.artist.position,
        wage = req.body.artist.wage,
        isCurrentartist = req.body.artist.isCurrentartist === 0 ? 0 : 1;
  if (!name || !position || !wage) {
    return res.sendStatus(400);
  }

  const sql = 'UPDATE artist SET name = $name, position = $position, ' +
      'wage = $wage, is_current_artist = $isCurrentartist ' +
      'WHERE artist.id = $artistId';
  const values = {
    $name: name,
    $position: position,
    $wage: wage,
    $isCurrentartist: isCurrentartist,
    $artistId: req.params.artistId
  };

  db.run(sql, values, (error) => {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM artist WHERE artist.id = ${req.params.artistId}`,
        (error, artist) => {
          res.status(200).json({artist: artist});
        });
    }
  });
});

artistsRouter.delete('/:artistId', (req, res, next) => {
  const sql = 'UPDATE artist SET is_current_artist = 0 WHERE artist.id = $artistId';
  const values = {$artistId: req.params.artistId};

  db.run(sql, values, (error) => {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM artist WHERE artist.id = ${req.params.artistId}`,
        (error, artist) => {
          res.status(200).json({artist: artist});
        });
    }
  });
});

module.exports = artistsRouter;
