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
           '`campaign1` TEXT, ' +
           '`card1` INTEGER, ' +
           '`campaign2` TEXT, ' +
           '`card2` INTEGER, ' +
           '`campaign3` TEXT, ' +
           '`card3` INTEGER, ' +
           '`campaign4` TEXT, ' +
           '`card4` INTEGER, ' +
           '`campaign5` TEXT, ' +
           '`card5` INTEGER, ' +
           '`is_current_user` INTEGER NOT NULL DEFAULT 1, ' +
           'PRIMARY KEY(`id`) )');
});

db.serialize(function() {
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

db.serialize(function() {
  db.run('CREATE TABLE IF NOT EXISTS `Card` ( ' +
           '`id` INTEGER NOT NULL, ' +
           '`name_0` TEXT NOT NULL, ' +
           '`artist0_1` TEXT, ' +
           '`artist0_2` TEXT, ' +
           '`artist0_3` TEXT, ' +
           '`submitted_0` INTEGER NOT NULL DEFAULT 0, ' +
           '`selected_artist_0` INTEGER NOT NULL DEFAULT 0, ' +
           '`correct_0` INTEGER, ' +
           '`name_1` TEXT NOT NULL, ' +
           '`artist1_1` TEXT, ' +
           '`artist1_2` TEXT, ' +
           '`artist1_3` TEXT, ' +
           '`submitted_1` INTEGER NOT NULL DEFAULT 0, ' +
           '`selected_artist_1` INTEGER NOT NULL DEFAULT 0, ' +
           '`correct_1` INTEGER, ' +
           '`name_2` TEXT NOT NULL, ' +
           '`artist2_1` TEXT, ' +
           '`artist2_2` TEXT, ' +
           '`artist2_3` TEXT, ' +
           '`submitted_2` INTEGER NOT NULL DEFAULT 0, ' +
           '`selected_artist_2` INTEGER NOT NULL DEFAULT 0, ' +
           '`correct_2` INTEGER, ' +
           '`name_3` TEXT NOT NULL, ' +
           '`artist3_1` TEXT, ' +
           '`artist3_2` TEXT, ' +
           '`artist3_3` TEXT, ' +
           '`submitted_3` INTEGER NOT NULL DEFAULT 0, ' +
           '`selected_artist_3` INTEGER NOT NULL DEFAULT 0, ' +
           '`correct_3` INTEGER, ' +
           '`name_4` TEXT NOT NULL, ' +
           '`artist4_1` TEXT, ' +
           '`artist4_2` TEXT, ' +
           '`artist4_3` TEXT, ' +
           '`submitted_4` INTEGER NOT NULL DEFAULT 0, ' +
           '`selected_artist_4` INTEGER NOT NULL DEFAULT 0, ' +
           '`correct_4` INTEGER, ' +
           '`name_5` TEXT NOT NULL, ' +
           '`artist5_1` TEXT, ' +
           '`artist5_2` TEXT, ' +
           '`artist5_3` TEXT, ' +
           '`submitted_5` INTEGER NOT NULL DEFAULT 0, ' +
           '`selected_artist_5` INTEGER NOT NULL DEFAULT 0, ' +
           '`correct_5` INTEGER, ' +
           '`name_6` TEXT NOT NULL, ' +
           '`artist6_1` TEXT, ' +
           '`artist6_2` TEXT, ' +
           '`artist6_3` TEXT, ' +
           '`submitted_6` INTEGER NOT NULL DEFAULT 0, ' +
           '`selected_artist_6` INTEGER NOT NULL DEFAULT 0, ' +
           '`correct_6` INTEGER, ' +
           '`name_7` TEXT NOT NULL, ' +
           '`artist7_1` TEXT, ' +
           '`artist7_2` TEXT, ' +
           '`artist7_3` TEXT, ' +
           '`submitted_7` INTEGER NOT NULL DEFAULT 0, ' +
           '`selected_artist_7` INTEGER NOT NULL DEFAULT 0, ' +
           '`correct_7` INTEGER, ' +
           '`name_8` TEXT NOT NULL, ' +
           '`artist8_1` TEXT, ' +
           '`artist8_2` TEXT, ' +
           '`artist8_3` TEXT, ' +
           '`submitted_8` INTEGER NOT NULL DEFAULT 0, ' +
           '`selected_artist_8` INTEGER NOT NULL DEFAULT 0, ' +
           '`correct_8` INTEGER, ' +
           '`name_9` TEXT NOT NULL, ' +
           '`artist9_1` TEXT, ' +
           '`artist9_2` TEXT, ' +
           '`artist9_3` TEXT, ' +
           '`submitted_9` INTEGER NOT NULL DEFAULT 0, ' +
           '`selected_artist_9` INTEGER NOT NULL DEFAULT 0, ' +
           '`correct_9` INTEGER, ' +
           '`name_10` TEXT NOT NULL, ' +
           '`artist10_1` TEXT, ' +
           '`artist10_2` TEXT, ' +
           '`artist10_3` TEXT, ' +
           '`submitted_10` INTEGER NOT NULL DEFAULT 0, ' +
           '`selected_artist_10` INTEGER NOT NULL DEFAULT 0, ' +
           '`correct_10` INTEGER, ' +
           '`name_11` TEXT NOT NULL, ' +
           '`artist11_1` TEXT, ' +
           '`artist11_2` TEXT, ' +
           '`artist11_3` TEXT, ' +
           '`submitted_11` INTEGER NOT NULL DEFAULT 0, ' +
           '`selected_artist_11` INTEGER NOT NULL DEFAULT 0, ' +
           '`correct_11` INTEGER, ' +
           '`name_12` TEXT NOT NULL, ' +
           '`artist12_1` TEXT, ' +
           '`artist12_2` TEXT, ' +
           '`artist12_3` TEXT, ' +
           '`submitted_12` INTEGER NOT NULL DEFAULT 0, ' +
           '`selected_artist_12` INTEGER NOT NULL DEFAULT 0, ' +
           '`correct_12` INTEGER, ' +
           '`name_13` TEXT NOT NULL, ' +
           '`artist13_1` TEXT, ' +
           '`artist13_2` TEXT, ' +
           '`artist13_3` TEXT, ' +
           '`submitted_13` INTEGER NOT NULL DEFAULT 0, ' +
           '`selected_artist_13` INTEGER NOT NULL DEFAULT 0, ' +
           '`correct_13` INTEGER, ' +
           '`name_14` TEXT NOT NULL, ' +
           '`artist14_1` TEXT, ' +
           '`artist14_2` TEXT, ' +
           '`artist14_3` TEXT, ' +
           '`submitted_14` INTEGER NOT NULL DEFAULT 0, ' +
           '`selected_artist_14` INTEGER NOT NULL DEFAULT 0, ' +
           '`correct_14` INTEGER, ' +
           '`name_15` TEXT NOT NULL, ' +
           '`artist15_1` TEXT, ' +
           '`artist15_2` TEXT, ' +
           '`artist15_3` TEXT, ' +
           '`submitted_15` INTEGER NOT NULL DEFAULT 0, ' +
           '`selected_artist_15` INTEGER NOT NULL DEFAULT 0, ' +
           '`correct_15` INTEGER, ' +
           '`is_current_card` INTEGER NOT NULL DEFAULT 1, ' +
           'PRIMARY KEY(`id`) )');
});
