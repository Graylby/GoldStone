import { MidwayAppInfo, MidwayConfig } from '@midwayjs/core';

export default (appInfo: MidwayAppInfo) => {
  return {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1669204393046_880',
    egg: {
      port: 7001,
    },
    jwt: {
      secret: 'a2`ex.FHU?_V',
      expiresIn: '1m',
    },
    passport: {
      session: false,
    },
    typeorm: {
      dataSource: {
        default: {
          type: 'mysql',
          host: '82.156.23.40',
          port: 3306,
          username: 'gold_stone',
          password: 'Zc2skAEyLrmLaJff',
          database: 'gold_stone',
          synchronize: false, // 如果第一次使用，不存在表，有同步的需求可以写 true
          logging: false,
          entities: '/entity',
        },
      },
    },
    // security: {
    //   csrf: false,
    // },
    socketIO: {
      path: '/socketIo',
      transports: ['polling', 'websocket'],
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    },
  } as MidwayConfig;
};
