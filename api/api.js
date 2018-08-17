const express = require('express');
const apiRouter = express.Router();
const songsRouter = require('./songs.js');
const artistsRouter = require('./artists.js');
const usersRouter = require('./users.js');
const cardsRouter = require('./cards.js');
const minicardsRouter = require('./minicards.js');
const campaignsRouter = require('./campaigns.js');

apiRouter.use('/songs', songsRouter);
apiRouter.use('/artists', artistsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/cards', cardsRouter);
apiRouter.use('/minicards', minicardsRouter);
apiRouter.use('/campaigns', campaignsRouter);

module.exports = apiRouter;
