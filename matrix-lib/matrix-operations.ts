import sdk from "matrix-js-sdk";

/**
 * send html coded message to room
 * 
 * @param client 
 * @param roomId 
 * @param body 
 */
export function sendMessage(client, roomId, body) {
  client.sendHtmlMessage(roomId, "", body)
}

/**
 * creates a matrix client and connects to it
 * 
 * @param baseUrl 
 * @param accessToken 
 * @param userId 
 */
export function createMatrixClient(baseUrl: string, accessToken, userId) {
  const client = sdk.createClient({ baseUrl, accessToken, userId });

  client.startClient();
  return client;
}