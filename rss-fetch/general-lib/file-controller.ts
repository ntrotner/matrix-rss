import { ISettings } from '../../interfaces/rss.interface';
import fs from 'fs';
import { HTMLElement, parse } from 'node-html-parser';
import { LAST_UPDATE } from '../../interfaces/constants';

/**
 * get settings file
 *
 * @param pathToSettings
 */
export function readSettings(pathToSettings: string): ISettings {
  const loadedSettings = JSON.parse(fs.readFileSync(pathToSettings, 'utf8')) as ISettings;
  loadedSettings.hourInterval = loadedSettings.hourInterval <= 0 ? 1 : loadedSettings.hourInterval;
  return loadedSettings;
}

/**
 * update timestamp and return if it was successful
 */
export function updateTimestamp(): boolean {
  try {
    localStorage.setItem(LAST_UPDATE, String(new Date().getTime()));
    return true;
  } catch {
    return false;
  }
}

/**
 * read HTML file for template generation
 *
 * @param pathToHTML
 */
export function loadHTMLFile(pathToHTML: string): HTMLElement {
  const file = fs.readFileSync(pathToHTML, 'utf8');
  return parse(file.toString());
}
