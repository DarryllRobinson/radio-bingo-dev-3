const express = require('express');
const apiRouter = express.Router();
const songsRouter = require('./songs.js');
const artistsRouter = require('./artists.js');
const usersRouter = require('./users.js');

apiRouter.use('/songs', songsRouter);
apiRouter.use('/artists', artistsRouter);
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
