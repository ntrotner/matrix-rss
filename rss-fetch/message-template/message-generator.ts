import fs from 'fs';
import { parse } from 'node-html-parser';
import Parser from 'rss-parser';

var path = require('path');
var path_to_html = path.join(__dirname, '../', '../', 'message-template.html');

/**
 * generates a custom html with replaced contents
 * by utilizing the template.html
 * 
 * ids are attributes of the rss feed
 * class is mandatory and set to 'parser' to get
 * every desired id. There is probably another way
 * but this was the fastest/most reliable to use
 * 
 * for example:
 * ! <h3 class="parser" id="title"></h3>  !
 * ! <p class="parser" id="content"></p> !
 * 
 * @param item
 * @param feed
 */
export function generateHTML(item: Parser.Item, feed: Parser.Output<any>) {
  try {
    console.log(path_to_html);
    
    const file = fs.readFileSync(path_to_html, 'utf8');
    const root = parse(file.toString());

    root.querySelectorAll('.parser')
      .map((val) => val.id)
      .forEach((id) => item[id] ? root.querySelector(`#${id}`).set_content(item[id]) : null);

    return root.toString();
  } catch (e) {
    console.log(e);
    return '';
  }
}

