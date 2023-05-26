import { App, Body, Controller, Get, Inject, Post } from '@midwayjs/decorator';
import { Application as SocketApplication } from '@midwayjs/socketio/dist/interface';
import { myRes } from '../util/myRes';
import { RedisService } from '@midwayjs/redis';
import { Context } from 'egg';
import { MessageService } from '../service/message';

@Controller('/msg')
export class messageController {
  @App('socketIO')
  socketApp: SocketApplication;
  @Inject()
  res: myRes;
  @Inject()
  redis: RedisService;
  @Inject()
  ctx: Context;
  @Inject()
  msg: MessageService;

  @Post('/send')
  async sendMsg(@Body() body) {
    const token = this.ctx.headers.authorization.split(' ')[1];
    const myId = await this.redis.get(token);
    const result = await this.msg.sendMst(myId, body.id, body.msg);
    const socketId = await this.redis.get(body.id);
    const sockets = await this.socketApp.in(socketId).fetchSockets();
    const socket = sockets[0];
    socket && socket.emit('receive', body.msg);
    return this.res.success(result);
  }

  @Get('/list')
  async getList() {
    const token = this.ctx.headers.authorization.split(' ')[1];
    const id = await this.redis.get(token);
    console.log(id);
    const list = await this.msg.getOneFriends(id);
    return this.res.success(list);
  }

  @Post('/record')
  async getRecord(@Body() body) {
    const { id } = body;
    const token = this.ctx.headers.authorization.split(' ')[1];
    const myId = await this.redis.get(token);
    const list = await this.msg.getRecord(myId, id);
    return this.res.success(list);
  }

  @Post('/record2')
  async getRecord2(@Body() body) {
    const { id1, id2 } = body;
    const list = await this.msg.getRecord(id1, id2);
    return this.res.success(list);
  }

  @Post('/online')
  async online(@Body() body) {
    const { id } = body;
    const token = this.ctx.headers.authorization.split(' ')[1];
    const myId = await this.redis.get(token);
    await this.redis.set(myId, id);
  }
}
