import { ISettings } from '../interfaces/rss.interface';
import { createMatrixClient } from './matrix-lib/matrix-operations';
import { send_updates_from_rss } from './rss-lib/rss-cronjob';
var fs = require('fs');
const cron = require('node-cron');

const settings: ISettings = require('../settings.json');

/**
 * function that executes the fetch process for every server/feed
 */
function run_cron() {

  settings.servers.forEach((server) => {
    // create client and connect to matrix
    const client = createMatrixClient(server.url, settings.accessToken, settings.userId);

    Promise.all(server.rssRooms.map((room) => send_updates_from_rss(client, room, settings.lastUpdate)))
      .then((_) => {
        settings.lastUpdate = new Date().getTime();
        fs.writeFile('../settings.json', JSON.stringify(settings), () => { });
      });
  });
}

// check that interval isn't smaller/equal to 0
const interval = settings.hourInterval <= 0 ? 1 : settings.hourInterval;

// run every x hour (0 < x < infinity)
cron.schedule(`0 */${Math.ceil(interval)} * * *`, () => run_cron());

run_cron();
