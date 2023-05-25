import { Body, Controller, Get, Inject, Post } from '@midwayjs/decorator';
import { Context } from 'egg';
import { myRes } from '../util/myRes';
import { StuffService } from '../service/stuff';
import { RedisService } from '@midwayjs/redis';
import { UserService } from '../service/user';

@Controller('/stuff')
export class StuffController {
  @Inject()
  ctx: Context;
  @Inject()
  res: myRes;
  @Inject()
  stuffService: StuffService;
  @Inject()
  userService: UserService;
  @Inject()
  redis: RedisService;

  @Post('/add')
  async addStuff(@Body() body) {
    const token = this.ctx.headers.authorization.split(' ')[1];
    const myId = await this.redis.get(token);
    const des = body.des;
    const tags = JSON.stringify(body.tags);
    const img = JSON.stringify(body.img);
    const t = await this.stuffService.saveStuff(des, tags, img, Number(myId));
    return this.res.success(t, '添加成功');
  }

  @Get('/all')
  async getAll() {
    const list = await this.stuffService.findAllStuff();
    return this.res.success(list, '操作成功');
  }

  @Post('/search')
  async searchStuff(@Body() body) {
    const list = await this.stuffService.findStuffByKeyWord(body.keyword);
    return this.res.success(list);
  }

  @Get('/my')
  async myStuff() {
    const token = this.ctx.headers.authorization.split(' ')[1];
    const myId = await this.redis.get(token);
    const list0 = await this.stuffService.findOnesStuff(Number(myId), 0);
    const list1 = await this.stuffService.findOnesStuff(Number(myId), 1);
    const list2 = await this.stuffService.findOnesStuff(Number(myId), 2);
    return this.res.success({
      unChange: list0,
      changing: list1,
      done: list2,
    });
  }

  @Post('/detail')
  async stuffDetail(@Body() body) {
    const token = this.ctx.headers.authorization.split(' ')[1];
    const myId = await this.redis.get(token);
    const id = Number(body.id);
    const t = await this.stuffService.getStuffInfo(id);
    const u = await this.userService.findOne(t.userId);
    const res = {
      name: u.name,
      id: u.id,
      hasFollow: JSON.parse(u.followerList).includes(Number(myId)),
      label: u.label,
      avatar: u.avatar,
      des: t.des,
      tags: t.tags,
      img: t.img,
    };
    return this.res.success(res);
  }

  @Post('/change')
  async getBothUnChangeStuff(@Body() body) {
    const token = this.ctx.headers.authorization.split(' ')[1];
    const myId = await this.redis.get(token);
    const id = body.id;
    const myList = await this.stuffService.findOnesStuff(Number(myId), 0);
    const otherList = await this.stuffService.findOnesStuff(Number(id), 0);
    return this.res.success({
      myStuff: myList,
      otherStuff: otherList,
    });
  }

  @Post('/del')
  async delStuff(@Body() body) {
    const id = body.id;
    const t = this.stuffService.delStuff(id);
    return this.res.success(t);
  }
}
