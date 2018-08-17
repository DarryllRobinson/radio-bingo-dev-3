const express = require('express');
const songsRouter = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

songsRouter.param('songId', (req, res, next, songId) => {
  const sql = 'SELECT * FROM song WHERE song.id = $songId';
  const values = {$songId: songId};
  db.get(sql, values, (error, song) => {
    if (error) {
      next(error);
    } else if (song) {
      req.song = song;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

songsRouter.get('/', (req, res, next) => {
  db.all('SELECT * FROM song WHERE song.is_current_song = 1',
    (err, songs) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({songs: songs, count: songs.length});
      }
    });
});

songsRouter.get('/:songId', (req, res, next) => {
  res.status(200).json({song: req.song});
});

songsRouter.post('/', (req, res, next) => {
  const name = req.body.song.name,
    artist = req.body.song.artist,
    isCurrentsong = req.body.song.isCurrentsong === 0 ? 0 : 1;
  if (!name || !artist) {
    return res.sendStatus(400);
  }
   const sql = 'INSERT INTO song (name, artist, is_current_song)' +
      'VALUES ($name, $artist, $isCurrentsong)';
  const values = {
    $name: name,
    $artist: artist,
    $isCurrentsong: isCurrentsong
  };
   db.run(sql, values, function(error) {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM song WHERE song.id = ${this.lastID}`,
        (error, song) => {
          res.status(201).json({song: song});
        });
    }
  });
});
 songsRouter.put('/:songId', (req, res, next) => {
   const name = req.body.song.name,
     artist = req.body.song.artist,
     isCurrentsong = req.body.song.isCurrentsong === 0 ? 0 : 1;
   if (!name || !artist) {
     return res.sendStatus(400);
  }
   const sql = 'UPDATE song SET name = $name, artist = $artist, ' +
      'is_current_song = $isCurrentsong ' +
      'WHERE song.id = $songId';
  const values = {
    $name: name,
    $artist: artist,
    $isCurrentsong: isCurrentsong,
    $songId: req.params.songId
  };
   db.run(sql, values, (error) => {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM song WHERE song.id = ${req.params.songId}`,
        (error, song) => {
          res.status(200).json({song: song});
        });
    }
  });
});
 songsRouter.delete('/:songId', (req, res, next) => {
  const sql = 'UPDATE song SET is_current_song = 0 WHERE song.id = $songId';
  const values = {$songId: req.params.songId};
   db.run(sql, values, (error) => {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM song WHERE song.id = ${req.params.songId}`,
        (error, song) => {
          res.status(200).json({song: song});
        });
    }
  });
});
 module.exports = songsRouter;
