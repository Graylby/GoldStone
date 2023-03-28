import {
  OnWSConnection,
  OnWSMessage,
  WSController,
  WSEmit,
} from '@midwayjs/core';
import { Inject } from '@midwayjs/decorator';
import { Context } from '@midwayjs/socketio';
import { TalkUser } from '../interface';

@WSController('/')
export class MsgController {
  users: Array<TalkUser>;

  constructor() {
    this.users = new Array<TalkUser>();
  }

  @Inject()
  ctx: Context;

  @OnWSConnection()
  async onConnMethod() {
    this.users.push({
      name: '5',
      id: '1',
    });
    console.log(`${this.users.length}个用户已连接`);
  }

  @OnWSMessage('login')
  async login(data) {
    console.log(this.ctx.id, data._value);
    console.log(`${this.users.length}个用户已连接`);
  }

  @OnWSMessage('myEvent')
  @WSEmit('myEventResult')
  async gotMessage(data1, data2, data3) {
    console.log(data1, data2, data3);
    return {
      name: 'harry',
      result: data1 + data2 + data3,
    };
  }
}
