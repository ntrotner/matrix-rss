# RSS Bot
This bot allows one to get RSS feed messages through the Matrix messenger protocol.

## Requirements
- `npm`
- `npx`
- `node`

## How to Run
- Matrix GUI
  - Create user account on a server and add user id and 
  [access token](https://webapps.stackexchange.com/questions/131056/how-to-get-an-access-token-for-riot-matrix) 
  to the `settings.json`
  - Create or join a room with that account
  - Be sure that this room isn't encrypted, as the current version can't handle it
- settings.json
  - Set the sync interval to rerun every x hours
  - Add a server and room url
  - In the "emitter" array one can add as many RSS emitter as desired 
    (There are some predefined ones, but they are just for reference)
- Run
  - Default: `cd rss-fetch && npm install && npm start`
  - ~~Build and run with docker: `docker build -t rssbot .` `docker run -d -v /path/to/Matrix-RSS-Feed/:/matrix rssbot`~~


### Optional
- One can also emit different RSS feeds to other rooms by adding an object to "rssRooms"
- Customize the messages you receive by editing the `message-template.html`, as see in the "Template" section.

### Note
On the first time every fetched RSS feed will be sent to you.
The next ones will only include new ones.

## Template
Available RSS attributes that are used as id in the template:
- "title"
- "categories"
- "content
- "contentSnippet
- "creator"
- "enclosure"
- "guid"
- "isoDate"
- "link"
- "pubDate"

### Example
The first two will be filled with title and creator (if exists in the RSS). 
The third one won't be filled, as the class isn't mentioned.
```html
<h2 class="parser" id="title"></h2>
<p class="parser" id="creator"></p>
<h3 id="link">Text<h3>
```

## TODO
- Docker support
- Make it possible to use rooms with encryption (as it is a core feature of Matrix)
- Find a way to close the connection of the client after every messsage is sent
- Default template improvements
- General testing for cross server usage