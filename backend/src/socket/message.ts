import { OnWSConnection, OnWSMessage, WSController, WSEmit } from '@midwayjs/core';
import { Inject } from '@midwayjs/decorator';
import { Context } from '@midwayjs/socketio'; // import { TalkUser } from '../interface';

// import { TalkUser } from '../interface';

@WSController()
export class MsgController {
  @Inject()
  ctx: Context;

  @OnWSConnection()
  async onConnMethod() {
    console.log('客户端连接，id：', this.ctx.id);
    console.log(this.ctx.rooms);
  }

  @OnWSMessage('login')
  @WSEmit('getLoginId')
  async login() {
    return this.ctx.id;
  }

  @OnWSMessage('myEvent')
  // @WSEmit('myEventResult')
  async gotMessage(data1, data2, data3) {
    console.log(data1, data2, data3);
    this.ctx.emit('myEventResult', 'harry');
  }

  @OnWSMessage('sendMsg')
  async getMsg(recId, msg) {
    console.log(recId, msg);
    this.ctx.emit('receiveMsg', msg);
  }
}
