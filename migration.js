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

db.serialize(function() {
  db.run('CREATE TABLE IF NOT EXISTS `User` ( ' +
           '`id` TEXT NOT NULL, ' +
           '`name` TEXT NOT NULL, ' +
           '`picture` TEXT NOT NULL, ' +
           '`song_0` TEXT NOT NULL, ' +
           '`artist_0` TEXT NOT NULL, ' +
           '`artist_0_1` TEXT NOT NULL, ' +
           '`artist_0_2` TEXT NOT NULL, ' +
           '`selected_artist_0` TEXT NOT NULL, ' +
           '`submitted_0` INTEGER NOT NULL DEFAULT 0, ' +
           '`correct_0` INTEGER, ' +
           '`song_1` TEXT NOT NULL, ' +
           '`artist_1` TEXT NOT NULL, ' +
           '`artist_1_1` TEXT NOT NULL, ' +
           '`artist_1_2` TEXT NOT NULL, ' +
           '`selected_artist_1` TEXT NOT NULL, ' +
           '`submitted_1` INTEGER NOT NULL DEFAULT 0, ' +
           '`correct_1` INTEGER, ' +
           '`is_current_user` INTEGER NOT NULL DEFAULT 1, ' +
           'PRIMARY KEY(`id`) )');
});
