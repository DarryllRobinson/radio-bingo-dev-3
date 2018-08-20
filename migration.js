const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

db.serialize(function() {
  db.run('CREATE TABLE IF NOT EXISTS `Song` ( ' +
    '`id` INTEGER NOT NULL, ' +
     '`name` TEXT NOT NULL, ' +
     '`artist` TEXT NOT NULL, ' +
     'PRIMARY KEY(`id`) )');

  db.run('CREATE TABLE IF NOT EXISTS `Artist` ( ' +
    '`id` INTEGER NOT NULL, ' +
    '`artist` TEXT NOT NULL, ' +
    'PRIMARY KEY(`id`) )');

  db.run('CREATE TABLE IF NOT EXISTS `User` ( ' +
    '`id` TEXT NOT NULL, ' +
    '`name` TEXT NOT NULL, ' +
    '`picture` TEXT NOT NULL, ' +
    '`campaign_id` INTEGER, ' +
    '`campaign` TEXT, ' +
    '`is_current_user` INTEGER NOT NULL DEFAULT 1, ' +
    'PRIMARY KEY(`id`), ' +
    'FOREIGN KEY(`campaign_id`) REFERENCES `Campaign`(`id`) )');

  db.run('CREATE TABLE IF NOT EXISTS `Tile` ( ' +
    '`id` INTEGER NOT NULL, ' +
    '`song` TEXT NOT NULL, ' +
    '`artist_1` TEXT NOT NULL, ' +
    '`artist_2` TEXT NOT NULL, ' +
    '`artist_3` TEXT NOT NULL, ' +
    '`submitted` INTEGER NOT NULL DEFAULT 0, ' +
    '`submitted_artist` TEXT, ' +
    '`submitted_time` TEXT, ' +
    '`correct` INTEGER NOT NULL DEFAULT 0, ' +
    '`card_id` INTEGER NOT NULL, ' +
    'PRIMARY KEY(`id`), ' +
    'FOREIGN KEY(`card_id`) REFERENCES `Card`(`id`) )');

  db.run('CREATE TABLE IF NOT EXISTS `Card` ( ' +
    '`id` INTEGER NOT NULL, ' +
    '`numTiles` INTEGER NOT NULL, ' +
    '`user_id` INTEGER NOT NULL, ' +
    'PRIMARY KEY(`id`), ' +
    'FOREIGN KEY(`user_id`) REFERENCES `User`(`id`) )');

db.run('CREATE TABLE IF NOT EXISTS `Campaign` ( ' +
    '`id` INTEGER NOT NULL, ' +
    '`campaign_name` TEXT NOT NULL, ' +
    '`organisation` TEXT NOT NULL, ' +
    '`start_date` TEXT NOT NULL, ' +
    '`end_date` TEXT NOT NULL, ' +
    '`num_contestants` INTEGER NOT NULL DEFAULT 0, ' +
    '`is_current_campaign` INTEGER NOT NULL DEFAULT 1, ' +
    'PRIMARY KEY(`id`) )');
});
