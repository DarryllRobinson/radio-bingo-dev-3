const express = require('express');
const apiRouter = express.Router();
const songsRouter = require('./songs.js');
const artistsRouter = require('./artists.js');
const usersRouter = require('./users.js');
const cardsRouter = require('./cards.js');
const tilesRouter = require('./tiles.js');
const minicardsRouter = require('./minicards.js');
const campaignsRouter = require('./campaigns.js');

apiRouter.use('/songs', songsRouter);
apiRouter.use('/artists', artistsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/cards', cardsRouter);
apiRouter.use('/tiles', tilesRouter);
apiRouter.use('/minicards', minicardsRouter);
apiRouter.use('/campaigns', campaignsRouter);




const employeesRouter = require('./employees.js');
const timesheetsRouter = require('./timesheets.js');
const menusRouter = require('./menus.js');
const menuitemsRouter = require('./menu-items.js');

apiRouter.use('/employees', employeesRouter);
apiRouter.use('timesheets', timesheetsRouter);
apiRouter.use('/menus', menusRouter);
apiRouter.use('/menu-items', menuitemsRouter);

module.exports = apiRouter;
