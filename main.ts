import cron from 'node-cron';
import { runCron } from './rss-fetch/main';
import { readSettings } from './rss-fetch/general-lib/file-controller';

export const SETTINGS_PATH = './settings.json';

// run every x hour (0 < x < infinity)
cron.schedule(`0 */${Math.ceil(readSettings(SETTINGS_PATH).hourInterval)} * * *`, () => runCron());
runCron();
