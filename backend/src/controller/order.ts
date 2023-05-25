import { Body, Controller, Get, Inject, Post } from '@midwayjs/decorator';
import { OrderService } from '../service/order';
import { myRes } from '../util/myRes';
import { Context } from 'egg';
import { RedisService } from '@midwayjs/redis';
import { StuffService } from '../service/stuff';

@Controller('/order')
export class OrderController {
  @Inject()
  order: OrderService;
  @Inject()
  stuff: StuffService;
  @Inject()
  res: myRes;
  @Inject()
  ctx: Context;
  @Inject()
  redis: RedisService;

  @Post('/generate')
  async genOrder(@Body() body) {
    const token = this.ctx.headers.authorization.split(' ')[1];
    const myId = Number(await this.redis.get(token));
    const { id, myStuff, stuff } = body;
    const t = await this.order.genOrder(myId, id, myStuff, stuff);
    if (t) await this.stuff.setStuffStatus(t.stuffIId, 1);
    return this.res.success(t);
  }

  @Get('/info')
  async getOrderInfo() {
    const token = this.ctx.headers.authorization.split(' ')[1];
    const myId = Number(await this.redis.get(token));
    const t = await this.order.orderInfo(myId);
    return this.res.success(t);
  }

  @Post('/agree')
  async agreeOrder(@Body() body) {
    const id = body.id;
    const t1 = await this.order.changeOrderStatus(id, 1);
    const t2 = await this.stuff.setStuffStatus(t1.stuffRId, 1);
    return this.res.success(t2);
  }

  @Post('/disagree')
  async disagreeOrder(@Body() body) {
    const id = body.id;
    const o = await this.order.delOrder(id);
    await this.stuff.setStuffStatus(o.stuffIId, 0);
    return this.res.success();
  }

  @Post('/accept')
  async acceptOrder(@Body() body) {
    const id = body.id;
    const token = this.ctx.headers.authorization.split(' ')[1];
    const myId = Number(await this.redis.get(token));
    const o = await this.order.getOrder(id);
    let t;
    if (myId === o.initiatorId && o.status !== 12)
      t = await this.order.changeOrderStatus(id, 11);
    else if (myId === o.receiverId && o.status !== 11)
      t = await this.order.changeOrderStatus(id, 12);
    else {
      t = await this.order.changeOrderStatus(id, 10);
      await this.stuff.setStuffStatus(o.stuffRId, 2);
      await this.stuff.setStuffStatus(o.stuffIId, 2);
      await this.order.updateTime(id);
    }
    return this.res.success(t);
  }

  @Post('/bad')
  async badOrder(@Body() body) {
    const id = body.id;
    const t1 = await this.order.changeOrderStatus(id, 22);
    // const t2 = await this.stuff.setStuffStatus(t1.receiverId, 1);
    return this.res.success(t1);
  }

  @Get('/dashboard')
  async dashboard() {
    const t = await this.order.dashboard();
    return this.res.success(t);
  }

  @Get('/badOrder')
  async bad() {
    const t = await this.order.badList();
    return this.res.success(t);
  }
}
