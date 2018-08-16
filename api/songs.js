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
        position = req.body.song.position,
        wage = req.body.song.wage,
        isCurrentsong = req.body.song.isCurrentsong === 0 ? 0 : 1;
  if (!name || !position || !wage) {
    return res.sendStatus(400);
  }

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
