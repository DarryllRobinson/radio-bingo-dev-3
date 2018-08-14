const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

db.serialize(function() {
  db.run('CREATE TABLE IF NOT EXISTS `Song` ( ' +
           '`id` INTEGER NOT NULL, ' +
           '`name` TEXT NOT NULL, ' +
           '`artist` TEXT NOT NULL, ' +
           '`is_current_song` INTEGER NOT NULL DEFAULT 1, ' +
           'PRIMARY KEY(`id`) )');
});

db.serialize(function() {
  db.run('CREATE TABLE IF NOT EXISTS `Artist` ( ' +
           '`id` INTEGER NOT NULL, ' +
           '`artist` TEXT NOT NULL, ' +
           '`is_current_artist` INTEGER NOT NULL DEFAULT 1, ' +
           'PRIMARY KEY(`id`) )');
});
