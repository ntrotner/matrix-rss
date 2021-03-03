import cron from "node-cron";
import path from "path";
import { createMatrixClient } from './matrix-lib/matrix-operations';
import { sendUpdatesFromRSS } from './rss-lib/rss-cronjob';
import { readSettings, updateTimestamp } from "./general-lib/file-controller";
import { LAST_UPDATE } from "../interfaces/constants";

// set localstorage for crypto storage
global.localStorage = new (require('node-localstorage').LocalStorage)(path.join('./matrix-lib/cryptoStorage'));

const SETTINGS_PATH = '../settings.json'
const settings = readSettings(SETTINGS_PATH);

let connectedClient;

/**
 * function that executes the fetch process for every server/feed
 */
async function runCron() {
  if (!connectedClient) connectedClient = await createMatrixClient(settings.loginUrl, settings.user, settings.password, settings.deviceId);
  if (!localStorage.getItem(LAST_UPDATE)) localStorage.setItem(LAST_UPDATE, '0');

  Promise.all(settings.servers.map(async (server) =>
    // create client and connect to matrix
    server.rssRooms.map((room) => sendUpdatesFromRSS(connectedClient, room, Number(localStorage.getItem(LAST_UPDATE)))))
  ).then(() => updateTimestamp());
}

// run every x hour (0 < x < infinity)
cron.schedule(`0 */${Math.ceil(readSettings(SETTINGS_PATH).hourInterval)} * * *`, () => runCron());
runCron();
