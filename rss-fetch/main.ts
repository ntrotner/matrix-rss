import path from 'path';
import { createMatrixClient } from './matrix-lib/matrix-operations';
import { sendUpdatesFromRSS } from './rss-lib/rss-cronjob';
import { readSettings, updateTimestamp } from './general-lib/file-controller';
import { LAST_UPDATE, SETTINGS_PATH } from '../interfaces/constants';
// @ts-ignore
global.Olm = require('olm');

// set localstorage for crypto storage
global.localStorage = new (require('node-localstorage').LocalStorage)(path.join('./rss-fetch/matrix-lib/cryptoStorage'));

const settings = readSettings(SETTINGS_PATH);

let connectedClient;

/**
 * function that executes the fetch process for every server/feed
 */
export async function runCron() {
  if (!connectedClient) connectedClient = await createMatrixClient(settings.loginUrl, settings.user, settings.password, settings.deviceId);
  if (!localStorage.getItem(LAST_UPDATE)) localStorage.setItem(LAST_UPDATE, '0');

  Promise.all(settings.servers.map(async(server) =>
  // create client and connect to matrix
    server.rssRooms.map((room) => sendUpdatesFromRSS(connectedClient, room, Number(localStorage.getItem(LAST_UPDATE)))))
  ).then(() => updateTimestamp()).catch(() => console.log('Couldn\'t send RSS updates'));
}
