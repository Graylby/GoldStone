import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Stuff } from '../entity/stuff';
import { Like, Not, Repository } from 'typeorm';

@Provide()
export class StuffService {
  @InjectEntityModel(Stuff)
  stuffModel: Repository<Stuff>;

  async saveStuff(des: string, tags: string, img: string, myId: number) {
    let date = '';
    const now = new Date();
    date += now.getFullYear() + '-';
    date += now.getMonth() + 1 + '-';
    date += now.getDate() + ' ';
    date += now.getHours() + ':';
    date += now.getMinutes() + ':';
    date += now.getSeconds();
    const stuff = new Stuff();
    stuff.des = des;
    stuff.tags = tags;
    stuff.status = 0;
    stuff.img = img;
    stuff.viewCount = '0';
    stuff.createTime = date;
    stuff.userId = myId;
    return await this.stuffModel.save(stuff);
  }

  async findAllStuff() {
    return await this.stuffModel.findBy({ status: Not(0) });
  }

  async getStuffInfo(id: number) {
    return await this.stuffModel.findOneBy({ id: id });
  }

  async findStuffByKeyWord(keyword: string) {
    return await this.stuffModel.find({
      where: [{ des: Like(`%${keyword}%`), tags: Like(`%${keyword}%`) }],
    });
  }

  async findOnesStuff(id: number, status: number) {
    return await this.stuffModel.findBy({ userId: id, status: status });
  }

  async setStuffStatus(id: number, status: number) {
    const stuff = await this.stuffModel.findOneBy({ id: id });
    stuff.status = status;
    let date = '';
    const now = new Date(stuff.createTime);
    date += now.getFullYear() + '-';
    date += now.getMonth() + 1 + '-';
    date += now.getDate() + ' ';
    date += now.getHours() + ':';
    date += now.getMinutes() + ':';
    date += now.getSeconds();
    stuff.createTime = date;
    stuff.tags = JSON.stringify(stuff.tags);
    stuff.img = JSON.stringify(stuff.img);
    return await this.stuffModel.save(stuff);
  }

  async delStuff(id: number) {
    return await this.stuffModel.delete(id);
  }
}
