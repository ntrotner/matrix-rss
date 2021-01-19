import Parser from 'rss-parser';
import { generateHTML } from '../message-template/message-generator';
let parser = new Parser();


/**
 * returns string that are generated with the rss content
 * 
 * @param url
 * @param lastUpdate unix timestamp
 * @param name
 */
export function get_rss_feed(url: string, lastUpdate: number, name: string) {
  return parser.parseURL(url).then((feed) => {
    let final_message = `\n<h2>${name}<h2>\n`;

    let filteredItems = feed.items.filter((feedRss) => new Date(feedRss.pubDate).getTime() > lastUpdate);

    if (filteredItems.length === 0) return false;

    filteredItems.forEach(item => final_message += generateHTML(item, feed));

    return final_message;
  });
}