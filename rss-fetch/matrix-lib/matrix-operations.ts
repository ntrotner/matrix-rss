const sdk = require('matrix-js-sdk');
const {LocalStorageCryptoStore} = require('matrix-js-sdk/lib/crypto/store/localStorage-crypto-store');

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
      body: '',
      formatted_body: body
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
  return new Promise((resolve, reject) => {
    const client = sdk.createClient({
      baseUrl,
      deviceId,
      sessionStore: new sdk.WebStorageSessionStore(localStorage),
      cryptoStore: new LocalStorageCryptoStore(localStorage)
    });

    client.login('m.login.password', {user, password})
      .then(() => {
        client.initCrypto()
          .then(() => {
            client.startClient().then((_) => resolve(client));
          })
          .catch(() => reject(undefined));
      }).catch(() => reject(undefined)
      );
  });
}
