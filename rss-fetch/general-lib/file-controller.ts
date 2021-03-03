import { ISettings } from "../../interfaces/rss.interface";
import fs from 'fs';
import { HTMLElement, parse } from "node-html-parser";

/**
 * get settings file
 */
export function readSettings(pathToSettings: string): ISettings {
  const loadedSettings = JSON.parse(fs.readFileSync(pathToSettings, 'utf8')) as ISettings;
  loadedSettings.hourInterval = loadedSettings.hourInterval <= 0 ? 1 : loadedSettings.hourInterval;
  return loadedSettings
}

/**
 * update timestamp of settings file
 *
 * @param settings
 */
export function updateTimestamp(settings: ISettings): void {
  settings.lastUpdate = new Date().getTime();
  fs.writeFile('../settings.json', JSON.stringify(settings), () => 0);
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