import { EggPlugin } from 'egg';

export default {
  security: {
    csrf: false,
  },
  // static: false,
  // package: 'await-stream-ready',
} as EggPlugin;
