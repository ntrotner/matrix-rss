import Parser from 'rss-parser';
import { generateHTML } from '../message-template/message-generator';

const parser = new Parser();


/**
 * returns string that are generated with the rss content
 *
 * @param url
 * @param lastUpdate unix timestamp
 * @param name
 */
export function getRSSFeed(url: string, lastUpdate: number, name: string) {
  return parser.parseURL(url)
    .then((feed) => {
      let finalMessage = `\n<h2>${name}<h2>\n`;
      const filteredItems = feed.items.filter((feedRss) => new Date(feedRss.pubDate).getTime() > lastUpdate);

      if (filteredItems.length === 0) return false;

      filteredItems.forEach(item => finalMessage += generateHTML(item, feed));
      return finalMessage;
    });
}