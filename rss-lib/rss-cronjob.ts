import { rss_room } from "../interfaces/rss.interface";
import { sendMessage } from "../matrix-lib/matrix-operations";
import { get_rss_feed } from "./rss-handler";

/**
 * request rss feed and send new items to room
 * 
 * @param client 
 * @param to_fetch 
 * @param lastUpdated 
 */
export async function send_updates_from_rss(client: any, to_fetch: rss_room, lastUpdated: number) {
  return new Promise((res, rej) => {
    // if synced then proceed
    client.once('sync', async (state, _, __) => {
      if (state != 'PREPARED') {
        console.error("CAN'T CONNECT TO MATRIX");
        rej('Failed');
        return;
      }

      for (const rss_info of to_fetch.emitter) {
        try {
          let resp = await get_rss_feed(rss_info.url, lastUpdated, rss_info.name);
          if (resp) {
            sendMessage(client, to_fetch.roomURL, resp);
          }
        } catch { }
      }
    });
    res('Done');
  })
}