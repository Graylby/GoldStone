import { App, Body, Controller, Inject, Post } from '@midwayjs/decorator';
import { JwtPassportMiddleware } from '../middleware/jwt.middleware';
import { Application as SocketApplication } from '@midwayjs/socketio';
import { Context } from 'egg';
import { myRes } from '../util/myRes';
import { RedisService } from '@midwayjs/redis';

@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;
  @Inject()
  res: myRes;
  @Inject()
  redisService: RedisService;
  @App('socketIO')
  socketApp: SocketApplication;

  @Post('/test')
  async home(@Body() data: any) {
    console.log(data);
    // this.socketApp.of('/').except(data.id).emit('receiveMsg', data);
    await this.redisService.set(data.key, data.val, 'EX', 5);
    const res = await this.redisService.get(data.key);
    return res;
  }

  @Post('/login')
  async login() {
    return this.res.success('yes', 'test');
  }

  @Post('/home', { middleware: [JwtPassportMiddleware] })
  async myHome() {
    console.log('home');
    return this.ctx.state;
  }
}
