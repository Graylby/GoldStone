import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Order } from '../entity/order';
import { Not, Repository } from 'typeorm';
import { UserPassport } from '../entity/user.passport';
import { Stuff } from '../entity/stuff';

@Provide()
export class OrderService {
  @InjectEntityModel(Order)
  orderModel: Repository<Order>;
  @InjectEntityModel(UserPassport)
  userPassportModel: Repository<UserPassport>;
  @InjectEntityModel(Stuff)
  stuffModel: Repository<Stuff>;

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

  async genOrder(myId, id, myStuff, stuff) {
    const order = new Order();
    order.initiatorId = myId;
    order.receiverId = id;
    order.stuffRId = stuff;
    order.stuffIId = myStuff;
    order.status = 0;
    order.createTime = this.formatDate(Date.now());
    order.tracking_info = '';
    return await this.orderModel.save(order);
  }

  async orderInfo(id) {
    const orders = await this.orderModel.findBy([
      { initiatorId: id, status: Not(10) },
      { receiverId: id, status: Not(10) },
    ]);
    const user = await this.userPassportModel.findOneBy({ id: id });
    const follower =
      user.followerList === '[]' ? 0 : JSON.parse(user.followerList).length;
    const following =
      user.followingList === '[]' ? 0 : JSON.parse(user.followingList).length;
    const name = user.name;
    const label = user.label;
    const arr = [];
    for (const order of orders) {
      arr.push({
        id: order.id,
        imgI: await this.stuffModel
          .findOneBy({ id: order.stuffIId })
          .then(res => res.img[0]),
        imgR: await this.stuffModel
          .findOneBy({ id: order.stuffRId })
          .then(res => res.img[0]),
        accept: !(order.status === 0 && order.receiverId === id),
      });
    }
    return {
      list: arr,
      name: name,
      label: label,
      avatar: user.avatar,
      follower: follower,
      following: following,
    };
  }

  async getOrder(id) {
    return await this.orderModel.findOneBy({ id: id });
  }

  async changeOrderStatus(id: number, status: number) {
    const order = await this.orderModel.findOneBy({ id: id });
    order.createTime = this.formatDate(order.createTime);
    order.status = status;
    return await this.orderModel.save(order);
  }

  async delOrder(id) {
    const o = await this.orderModel.findOneBy({ id: id });
    await this.orderModel.remove(o);
    return o;
  }

  async dataCollect(id: number) {
    const u = await this.userPassportModel.findOneBy({ id: id });
    u.lastLoginDate = this.formatDate(u.lastLoginDate);
    await this.userPassportModel.save(u);
  }

  async updateTime(id: number) {
    const o = await this.orderModel.findOneBy({ id: id });
    o.createTime = this.formatDate(Date.now());
    return await this.orderModel.save(o);
  }

  async badList() {
    const o = await this.orderModel.findBy({ status: 22 });
    const arr = [];
    for (const order of o) {
      const u1 = await this.userPassportModel.findOneBy({
        id: order.initiatorId,
      });
      const u2 = await this.userPassportModel.findOneBy({
        id: order.receiverId,
      });
      arr.push({
        date: this.formatDate(order.createTime).split(' ')[0],
        name: u1.name + ' ' + u2.name,
        des: '产生纠纷',
        id1: u1.id,
        id2: u2.id,
      });
    }
    return arr;
  }

  async dashboard() {
    let dayOrder, monOrder, yearUser, monUser;
    dayOrder = monOrder = yearUser = monUser = 0;
    const now = new Date();
    const year = now.getFullYear();
    const mon = now.getMonth() + 1;
    const day = now.getDate();
    const weekOrder = new Array(7).fill(0);
    const halfYearUser = new Array(6).fill(0);
    const lastday = new Date([year, mon, day - 1].join('-'));
    const lastWeek = new Date([year, mon, day - 8].join('-'));
    const lastMon = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const lastHalfYear = new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000);
    const order = await this.orderModel.find();
    const user = await this.userPassportModel.find();
    for (const o of order) {
      const time = new Date(o.createTime);
      if (time > lastday) {
        dayOrder++;
        weekOrder[0]++;
      } else if (time > lastWeek) {
        monOrder++;
        const day2 = time.getDate();
        const index = day - day2 - 1;
        weekOrder[index]++;
      } else if (time > lastMon) {
        monOrder++;
      }
    }
    for (const u of user) {
      const time = new Date(u.createTime);
      console.log(time);
      console.log(lastMon);
      console.log(lastHalfYear);
      if (time > lastMon) {
        const mon2 = time.getMonth() + 1;
        const index = mon - mon2 - 1;
        halfYearUser[index]++;
        monUser++;
      } else if (time > lastHalfYear) {
        yearUser++;
        const mon2 = time.getMonth() + 1;
        const index = mon - mon2 - 1;
        halfYearUser[index]++;
      }
    }
    return {
      dayOrder: dayOrder,
      monOrder: monOrder,
      yearUser: yearUser,
      monUser: monUser,
      weekOrder: weekOrder,
      halfYearUser: halfYearUser,
    };
  }
}
