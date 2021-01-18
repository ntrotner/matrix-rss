import Parser from 'rss-parser';
import { generateHTML } from '../htmltemplate/generateText';
let parser = new Parser();


/**
 * returns array with strings that are generated with the rss content
 * 
 * @param url
 * @param lastUpdate unix timestamp
 * @param name
 */
export function get_rss_feed(url: string, lastUpdate: number, name: string) {
  return parser.parseURL(url).then((feed) => {
    let finalString = `\n<h2>${name}<h2>\n`;
    let filteredItems = feed.items.filter((feedRss) => {
      let feedDate;
      feedDate = feedRss.pubDate ? feedRss.pubDate : undefined;

      feedDate = new Date(feedDate);
      return feedDate.getTime() > lastUpdate;
    })
    if (filteredItems.length === 0) return false;

    filteredItems.forEach(item => {
      finalString += generateHTML(item, feed);
    });

    return finalString;
  });
}