import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Message } from '../entity/message';
import { Repository } from 'typeorm';
import { UserPassport } from '../entity/user.passport';

@Provide()
export class MessageService {
  @InjectEntityModel(Message)
  msgModel: Repository<Message>;
  @InjectEntityModel(UserPassport)
  userModel: Repository<UserPassport>;

  async getOneFriends(id) {
    const list = await this.msgModel.find({
      where: [{ senderId: id }, { receiverId: id }],
    });
    const map = new Map();
    for (const msg of list) {
      const otherId =
        msg.senderId === Number(id) ? msg.receiverId : msg.senderId;
      const unique = id + '-' + otherId;
      msg.time = this.formatDate(msg.time);
      // const unique = [msg.senderId, msg.receiverId]
      //   .sort((a, b) => a - b)
      //   .join('-');
      const myMsg = Object.assign(msg);
      myMsg.userId = otherId;
      delete myMsg.senderId;
      delete myMsg.receiverId;
      const userInfo = await this.userModel.findOneBy({ id: otherId });
      myMsg.avatar = userInfo.avatar;
      myMsg.name = userInfo.name;
      if (!map.has(unique)) map.set(unique, myMsg);
      else {
        const old = map.get(unique);
        if (Date.parse(myMsg.time) > Date.parse(old.time)) {
          map.set(unique, myMsg);
        }
      }
    }
    return [...map.values()].sort(
      (a, b) => Date.parse(b.time) - Date.parse(a.time)
    );
  }

  async getRecord(id1, id2) {
    const list = await this.msgModel.find({
      where: [
        { senderId: id1, receiverId: id2 },
        { senderId: id2, receiverId: id1 },
      ],
      order: {
        time: 'asc',
      },
    });
    return list.map(v => {
      return {
        id: v.id,
        date: v.time,
        isMe: v.senderId === Number(id1),
        msg: v.content,
      };
    });
  }

  async sendMst(myId, id, msg) {
    const date = this.formatDate(Date.now());
    const myMsg = new Message();
    myMsg.content = msg;
    myMsg.time = String(date);
    myMsg.senderId = myId;
    myMsg.receiverId = id;
    return await this.msgModel.save(myMsg);
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
