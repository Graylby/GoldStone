import { Body, Controller, Inject, Post } from '@midwayjs/decorator';
import { LoginUser, RegisterUser } from '../interface';
import { myRes } from '../util/myRes';
import { UserService } from '../service/user';
import { UserPassport } from '../entity/user.passport';
import { JwtService } from '@midwayjs/jwt';
import { RedisService } from '@midwayjs/redis';
import { Context } from 'egg';
import { StuffService } from '../service/stuff';
import { OrderService } from '../service/order';
import Client from '../util/messageClient';

@Controller('/user')
export class UserController {
  @Inject()
  res: myRes;
  @Inject()
  userService: UserService;
  @Inject()
  jwt: JwtService;
  @Inject()
  redis: RedisService;
  @Inject()
  ctx: Context;
  @Inject()
  stuffService: StuffService;
  @Inject()
  orderService: OrderService;
  @Inject()
  msgClient: Client;

  @Post('/login')
  async login(@Body() user: LoginUser) {
    const t = await this.userService.getUser(user.username);
    let data = null;
    if (user.password === t.password) {
      data = await this.jwt.sign({ id: t.id }, { expiresIn: '1d' });
      await this.redis.set(data, t.id, 'EX', 24 * 60 * 60);
      await this.orderService.dataCollect(t.id);
    } else return this.res.error('密码错误');
    return this.res.success(data, '登录成功');
  }

  @Post('/register')
  async register(@Body() user: RegisterUser) {
    console.log(user.code);
    console.log(await this.redis.get(user.username));
    if (user.code !== (await this.redis.get(user.username)))
      return this.res.error('验证码错误');
    const newUser = new UserPassport();
    newUser.username = user.username;
    newUser.password = user.password;
    newUser.name = '会员用户';
    newUser.label = '铜牌会员';
    newUser.avatar =
      'https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png';
    newUser.followingList = '[]';
    newUser.followerList = '[]';

    const t = await this.userService.saveUser(newUser);
    return this.res.success(t, '注册成功');
  }

  @Post('/follow')
  async follow(@Body() body) {
    const type = body.type;
    const t = await this.userService.getFollow(type);
    return this.res.success(t);
  }

  @Post('/follow/add')
  async followSomeOne(@Body() body) {
    const token = this.ctx.headers.authorization.split(' ')[1];
    const myId = await this.redis.get(token);
    const id = body.id;
    const t = await this.userService.follow(id, Number(myId));
    return this.res.success(t);
  }

  @Post('/follow/del')
  async unfollowSomeOne(@Body() body) {
    const token = this.ctx.headers.authorization.split(' ')[1];
    const myId = await this.redis.get(token);
    const id = body.id;
    const t = await this.userService.unfollow(id, Number(myId));
    return this.res.success(t);
  }

  @Post('/detail')
  async userDetail(@Body() body) {
    const token = this.ctx.headers.authorization.split(' ')[1];
    const myId = Number(await this.redis.get(token));
    const id = body.id;
    const stuff = await this.stuffService.findOnesStuff(id, 0);
    const u = await this.userService.findOne(id);
    const res = {
      name: u.name,
      label: u.label,
      avatar: u.avatar,
      hasFollow: JSON.parse(u.followerList).includes(Number(myId)),
      list: stuff,
    };
    return this.res.success(res);
  }

  @Post('/code')
  async getCode(@Body() body) {
    const phone = body.phone;
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += Math.floor(Math.random() * 10);
    }
    await this.msgClient.mainFun([
      phone,
      'Gray学习专用',
      'SMS_460766277',
      `{"code":"${code}"}`,
    ]);
    this.redis.set(phone, code, 'EX', 5 * 60);
    return this.res.success();
  }
}
