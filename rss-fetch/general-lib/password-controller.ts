import fs from 'fs';

const htpasswd = require('htpasswd-js');

/**
 * read input credentials and check if they match the .htpasswd file
 *
 * @param username
 * @param password
 */
export function readCredentials(username: String, password: String): Promise<boolean> {
  return htpasswd.authenticate({
    username,
    password,
    data: fs.readFileSync('./bot.htpasswd', 'utf8')
  });
}
