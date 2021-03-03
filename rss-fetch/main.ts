import cron from "node-cron";
import { createMatrixClient } from './matrix-lib/matrix-operations';
import { sendUpdatesFromRSS } from './rss-lib/rss-cronjob';
import { readSettings, updateTimestamp } from "./general-lib/file-controller";

const SETTINGS_PATH = '../settings.json'
let connectedClient;

/**
 * function that executes the fetch process for every server/feed
 */
async function runCron() {
  const settings = readSettings(SETTINGS_PATH);
  if (!connectedClient) connectedClient = await createMatrixClient(settings.loginUrl, settings.user, settings.password, settings.deviceId);

  Promise.all(settings.servers.map(async (server) =>
    // create client and connect to matrix
    server.rssRooms.map((room) => sendUpdatesFromRSS(connectedClient, room, settings.lastUpdate)))
  ).then(() => updateTimestamp(settings));
}

// run every x hour (0 < x < infinity)
cron.schedule(`0 */${Math.ceil(readSettings(SETTINGS_PATH).hourInterval)} * * *`, () => runCron());
runCron();
