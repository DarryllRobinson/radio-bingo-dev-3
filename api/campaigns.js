const express = require('express');
const campaignsRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

campaignsRouter.param('campaignId', (req, res, next, campaignId) => {
  const sql = 'SELECT * FROM campaign WHERE campaign.id = $campaignId';
  const values = {$campaignId: campaignId};
  db.get(sql, values, (error, campaign) => {
    if (error) {
      next(error);
    } else if (campaign) {
      req.campaign = campaign;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

campaignsRouter.get('/', (req, res, next) => {
  db.all('SELECT * FROM campaign WHERE campaign.is_current_campaign = 1',
    (err, campaigns) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({campaigns: campaigns, count: campaigns.length});
      }
    });
});

campaignsRouter.get('/:campaignId', (req, res, next) => {
  res.status(200).json({campaign: req.campaign});
});

campaignsRouter.post('/', (req, res, next) => {
  const campaign_name = req.body.campaign.campaign_name,
        organisation = req.body.campaign.organisation,
        start_date = req.body.campaign.start_date,
        end_date = req.body.campaign.end_date,
        num_contestants = req.body.campaign.num_contestants,
        isCurrentcampaign = req.body.campaign.isCurrentcampaign === 0 ? 0 : 1;
  if (!campaign_name || !organisation || !start_date || !end_date || !num_contestants) {
    return res.sendStatus(400);
  }

  const sql = 'INSERT INTO campaign (campaign_name, organisation, start_date, end_date, num_contestants)' +
      'VALUES ($campaign_name, $organisation, $start_date, $end_date, $num_contestants, $isCurrentcampaign)';
  const values = {
    $campaign_name: campaign_name,
    $organisation: organisation,
    $start_date: start_date,
    $end_date: end_date,
    $num_contestants: num_contestants,
    $isCurrentcampaign: isCurrentcampaign
  };

  db.run(sql, values, function(error) {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM campaign WHERE campaign.id = ${this.lastID}`,
        (error, campaign) => {
          res.status(201).json({campaign: campaign});
        });
    }
  });
});

campaignsRouter.put('/:campaignId', (req, res, next) => {
  const campaign_name = req.body.campaign.campaign_name,
        organisation = req.body.campaign.organisation,
        start_date = req.body.campaign.start_date,
        end_date = req.body.campaign.end_date,
        num_contestants = req.body.campaign.num_contestants,
        isCurrentcampaign = req.body.campaign.isCurrentcampaign === 0 ? 0 : 1;
  if (!campaign_name || !organisation || !start_date || !end_date || !num_contestants) {
    return res.sendStatus(400);
  }

  const sql = 'INSERT INTO campaign (campaign_name, organisation, start_date, end_date, num_contestants)' +
      'VALUES ($campaign_name, $organisation, $start_date, $end_date, $num_contestants, $isCurrentcampaign)';
  const values = {
    $campaign_name: campaign_name,
    $organisation: organisation,
    $start_date: start_date,
    $end_date: end_date,
    $num_contestants: num_contestants,
    $isCurrentcampaign: isCurrentcampaign
  };

  db.run(sql, values, (error) => {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM campaign WHERE campaign.id = ${req.params.campaignId}`,
        (error, campaign) => {
          res.status(200).json({campaign: campaign});
        });
    }
  });
});

campaignsRouter.delete('/:campaignId', (req, res, next) => {
  const sql = 'UPDATE campaign SET is_current_campaign = 0 WHERE campaign.id = $campaignId';
  const values = {$campaignId: req.params.campaignId};

  db.run(sql, values, (error) => {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM campaign WHERE campaign.id = ${req.params.campaignId}`,
        (error, campaign) => {
          res.status(200).json({campaign: campaign});
        });
    }
  });
});

module.exports = campaignsRouter;
