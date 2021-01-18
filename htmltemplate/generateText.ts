import fs from 'fs';
import { parse } from 'node-html-parser';

import Parser from 'rss-parser';

var path = require('path');
var pathToHTML = path.join(__dirname, 'template.html');

/**
 * generates a custom html with replaced content
 * by utilizing the template.html
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
    const file = fs.readFileSync(pathToHTML, 'utf8');
    const root = parse(file.toString());

    root.querySelectorAll('.parser').map((val) => val.id).forEach((id) => {
      if (item[id]) {
        root.querySelector(`#${id}`).set_content(item[id]);
      }
    });

    return root.toString();
  } catch (e) {
    console.log(e);
    return '';
  }
}

