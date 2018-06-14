import './main.css';

import config from './config.js';
import app from './app.json';
import bricjs from '@csgis/bricjs-loader';

export {config};
export let run = () => bricjs(config, app.modules, app.deps);
