import { MidwayAppInfo, MidwayConfig } from '@midwayjs/core';

export default (appInfo: MidwayAppInfo) => {
  return {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1669204393046_880',
    egg: {
      port: 7001,
    },
    upload: {
      // mode: UploadMode, 默认为file，即上传到服务器临时目录，可以配置为 stream
      mode: 'file',
      // fileSize: string, 最大上传文件大小，默认为 10mb
      fileSize: '10mb',
      // whitelist: string[]，文件扩展名白名单
      whitelist: null,
      // tmpdir: string，上传的文件临时存储路径
      tmpdir: '/www/wwwroot/gold.gray7.top/img',
      // cleanTimeout: number，上传的文件在临时目录中多久之后自动删除，默认为 5 分钟
      cleanTimeout: 0,
      // base64: boolean，设置原始body是否是base64格式，默认为false，一般用于腾讯云的兼容
      base64: false,
      // 仅在匹配路径到 /api/upload 的时候去解析 body 中的文件信息
      // match: /\/api\/upload/,
    },
    security: {
      csrf: false,
    },
    jwt: {
      secret: 'a2`ex.FHU?_V',
      expiresIn: '1d',
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
    redis: {
      client: {
        port: 6379,
        host: '82.156.23.40',
        password: '<CW5]c-yABI',
        db: 0,
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
