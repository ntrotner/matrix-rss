// @ts-ignore
global.Olm = require('olm');
import path from "path";

const sdk = require('matrix-js-sdk')
const {LocalStorageCryptoStore} = require('matrix-js-sdk/lib/crypto/store/localStorage-crypto-store');

// set localstorage for crypto storage
global.localStorage = new (require('node-localstorage').LocalStorage)(path.join('./matrix-lib/cryptoStorage'));

/**
 * send html coded message to room
 *
 * @param client
 * @param roomId
 * @param body
 */
export function sendMessage(client, roomId, body): void {
  client.sendEvent(
    roomId,
    'm.room.message',
    {
      msgtype: 'm.text',
      format: 'org.matrix.custom.html',
      body: "",
      formatted_body: body,
    },
    ''
  );
}

/**
 * creates a matrix client and connects to server
 *
 * @param baseUrl
 * @param user
 * @param password
 * @param deviceId
 */
export async function createMatrixClient(baseUrl: string, user: string, password: string, deviceId: string) {
  return new Promise((res, rej) => {
    const client = sdk.createClient({
      baseUrl,
      deviceId,
      sessionStore: new sdk.WebStorageSessionStore(global.localStorage),
      cryptoStore: new LocalStorageCryptoStore(global.localStorage),
    });

    client.login("m.login.password", {user, password})
      .then(() => {
        client.initCrypto()
          .then(() => {
            client.startClient().then((_) => res(client));
          })
          .catch(() => rej(undefined));
      })
  });

}