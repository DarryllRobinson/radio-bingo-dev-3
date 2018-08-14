const express = require('express');
const apiRouter = express.Router();
const songsRouter = require('./songs.js');
const artistsRouter = require('./artists.js');

apiRouter.use('/songs', songsRouter);
apiRouter.use('/artists', artistsRouter);

module.exports = apiRouter;
