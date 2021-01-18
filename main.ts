import { createMatrixClient } from './matrix-lib/matrix-operations';
import { send_updates_from_rss } from './rss-lib/rss-cronjob';

var fs = require('fs');

const cron = require('node-cron');
const settings = require('./settings.json');

async function run_cron() {
  // create client and connect to matrix
  const client = createMatrixClient(settings.url, settings.accessToken, settings.userId);

  for (const room of settings.rssRooms) {
    await send_updates_from_rss(client, room, settings.lastUpdate);
  }
  settings.lastUpdate = new Date().getTime();
  fs.writeFile('settings.json', JSON.stringify(settings), () => { });
}

// run every hour
cron.schedule('0 * * * *', async function () {
  run_cron();
});

run_cron();
