const express = require('express');
const minicardsRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

minicardsRouter.param('minicardId', (req, res, next, minicardId) => {
  const sql = 'SELECT * FROM minicard WHERE minicard.id = $minicardId';
  const values = {$minicardId: minicardId};
  db.get(sql, values, (error, minicard) => {
    if (error) {
      next(error);
    } else if (minicard) {
      req.minicard = minicard;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

minicardsRouter.get('/', (req, res, next) => {
  db.all('SELECT * FROM minicard WHERE minicard.is_current_minicard = 1',
    (err, minicards) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({minicards: minicards, count: minicards.length});
      }
    });
});

minicardsRouter.get('/:minicardId', (req, res, next) => {
  res.status(200).json({minicard: req.minicard});
});

minicardsRouter.post('/', (req, res, next) => {
  const campaign_id = req.body.minicard.campaign_id,
        name_0 = req.body.minicard.name_0,
        artist0_1 = req.body.minicard.artist0_1,
        artist0_2 = req.body.minicard.artist0_2,
        artist0_3 = req.body.minicard.artist0_3,
        submitted_0 = req.body.minicard.submitted_0,
        submitted_time_0 = req.body.minicard.submitted_time_0,
        selected_artist_0 = req.body.minicard.selected_artist_0,
        correct_0 = req.body.minicard.correct_0,
        is_current_minicard = req.body.minicard.is_current_minicard === 0 ? 0 : 1;
  if (!campaign_id || !name_0 || !artist0_1 || !artist0_2 || !artist0_3) {
    return res.sendStatus(400);
  }

  const sql = 'INSERT INTO minicard (campaign_id, name_0, artist0_1, artist0_2, artist0_3, ' +
    'submitted_0, submitted_time_0, selected_artist_0, correct_0, ' +
      'is_current_minicard)' +
    'VALUES ($campaign_id, $name_0, $artist0_1, $artist0_2, $artist0_3, ' +
      '$submitted_0, $submitted_time_0, $selected_artist_0, $correct_0, ' +
        '$is_current_minicard)';
  const values = {
    $campaign_id: campaign_id,
    $name_0: name_0,
    $artist0_1: artist0_1,
    $artist0_2: artist0_2,
    $artist0_3: artist0_3,
    $submitted_0: submitted_0,
    $submitted_time_0: submitted_time_0,
    $selected_artist_0: selected_artist_0,
    $correct_0: correct_0,
    $is_current_minicard: is_current_minicard
  };

  db.run(sql, values, function(error) {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM minicard WHERE minicard.id = ${this.lastID}`,
        (error, minicard) => {
          res.status(201).json({minicard: minicard});
        });
    }
  });
});

minicardsRouter.put('/:minicardId', (req, res, next) => {
  const name_0 = req.body.minicard.name_0,
        campaign_name = req.body.minicard.campaign_name,
        artist0_1 = req.body.minicard.artist0_1,
        artist0_2 = req.body.minicard.artist0_2,
        artist0_3 = req.body.minicard.artist0_3,
        submitted_0 = req.body.minicard.submitted_0,
        submitted_time_0 = req.body.minicard.submitted_time_0,
        selected_artist_0 = req.body.minicard.selected_artist_0,
        correct_0 = req.body.minicard.correct_0,
        isCurrentminicard = req.body.minicard.isCurrentminicard === 0 ? 0 : 1;
  if (!name_0 || !artist0_1 || !artist0_2 || !artist0_3 || !submitted_0 || !selected_artist_0 || !correct_0 || !submitted_0 || !submitted_time_0 || !correct_0) {
    return res.sendStatus(400);
  }

  const sql = 'INSERT INTO minicard (name_0, artist0_1, artist0_2, artist0_3, ' +
    'submitted_0, submitted_time_0, selected_artist_0, correct_0, ' +
      '$isCurrentminicard)';
  const values = {
    $name_0: name_0,
    $artist0_1: artist0_1,
    $artist0_2: artist0_2,
    $artist0_3: artist0_3,
    $submitted_0: submitted_0,
    $submitted_time_0: submitted_time_0,
    $selected_artist_0: selected_artist_0,
    $correct_0: correct_0,
    $minicardId: req.params.minicardId
  };

  db.run(sql, values, (error) => {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM minicard WHERE minicard.id = ${req.params.minicardId}`,
        (error, minicard) => {
          res.status(200).json({minicard: minicard});
        });
    }
  });
});

minicardsRouter.delete('/:minicardId', (req, res, next) => {
  const sql = 'UPDATE minicard SET is_current_minicard = 0 WHERE minicard.id = $minicardId';
  const values = {$minicardId: req.params.minicardId};

  db.run(sql, values, (error) => {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM minicard WHERE minicard.id = ${req.params.minicardId}`,
        (error, minicard) => {
          res.status(200).json({minicard: minicard});
        });
    }
  });
});

module.exports = minicardsRouter;
