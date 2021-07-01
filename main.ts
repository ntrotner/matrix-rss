import cron from 'node-cron';
import { SETTINGS_PATH } from './interfaces/constants';
import { runCron } from './rss-fetch/main';
import { readSettings } from './rss-fetch/general-lib/file-controller';

// run every x hour (0 < x < infinity)
cron.schedule(`0 */${Math.ceil(readSettings(SETTINGS_PATH).hourInterval)} * * *`, () => runCron());
runCron();
