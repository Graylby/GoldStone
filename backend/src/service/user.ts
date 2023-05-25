import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { UserPassport } from '../entity/user.passport';
import { Repository } from 'typeorm';
import { InternalServerErrorError } from '@midwayjs/core/dist/error/http';
import { Context } from 'egg';
import { RedisService } from '@midwayjs/redis';

@Provide()
export class UserService {
  @InjectEntityModel(UserPassport)
  userModel: Repository<UserPassport>;
  @Inject()
  ctx: Context;
  @Inject()
  redis: RedisService;

  async getUser(username: string) {
    const option = {
      where: { username: username },
    };
    const user = await this.userModel.findOne(option);
    if (user === null) throw new InternalServerErrorError('用户名未注册');
    return user;
  }

  async saveUser(user: UserPassport) {
    const res = await this.userModel.save(user);
    return res;
  }

  async getFollow(type: string) {
    const token = this.ctx.headers.authorization.split(' ')[1];
    const myId = await this.redis.get(token);
    const t = await this.userModel.findOneBy({ id: Number(myId) });
    let list;
    const arr = [];
    if (type === 'fans') {
      list = JSON.parse(t.followerList);
    } else {
      list = JSON.parse(t.followingList);
    }
    for (const id of list) {
      const u = await this.userModel.findOneBy({ id: id });
      arr.push({
        name: u.name,
        avatar: u.avatar,
      });
    }
    return arr;
  }

  async findOne(id: number) {
    return await this.userModel.findOneBy({ id: id });
  }

  async follow(hostId: number, id: number) {
    const u = await this.userModel.findOneBy({ id: hostId });
    const u2 = await this.userModel.findOneBy({ id: id });
    const list = JSON.parse(u.followerList);
    const list2 = JSON.parse(u.followingList);
    list.push(id);
    list2.push(hostId);
    u.followerList = JSON.stringify(list);
    u2.followingList = JSON.stringify(list2);
    u.createTime = this.formatDate(u.createTime);
    u2.createTime = this.formatDate(u2.createTime);
    u.lastLoginDate = this.formatDate(Date.now());
    u2.lastLoginDate = this.formatDate(Date.now());
    await this.userModel.save(u);
    await this.userModel.save(u2);
  }

  async unfollow(hostId: number, id: number) {
    const u = await this.userModel.findOneBy({ id: hostId });
    const u2 = await this.userModel.findOneBy({ id: id });
    const list = JSON.parse(u.followerList);
    const list2 = JSON.parse(u.followingList);
    list.splice(list.indexOf(id), 1);
    list2.splice(list2.indexOf(hostId), 1);
    u.followerList = JSON.stringify(list);
    u2.followingList = JSON.stringify(list2);
    u.createTime = this.formatDate(u.createTime);
    u2.createTime = this.formatDate(u2.createTime);
    u.lastLoginDate = this.formatDate(Date.now());
    u2.lastLoginDate = this.formatDate(Date.now());
    await this.userModel.save(u);
    await this.userModel.save(u2);
  }

  formatDate(date) {
    const myDate = new Date(date);
    let res = '';
    res += myDate.getFullYear() + '-';
    res += myDate.getMonth() + 1 + '-';
    res += myDate.getDate() + ' ';
    res += myDate.getHours() + ':';
    res += myDate.getMinutes() + ':';
    res += myDate.getSeconds();
    return res;
  }
}
