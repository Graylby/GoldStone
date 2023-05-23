import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Stuff } from '../entity/stuff';
import { Repository } from 'typeorm';

@Provide()
export class StuffService {
  @InjectEntityModel(Stuff)
  stuffModel: Repository<Stuff>;

  async saveStuff(des: string, tags: string, img: string) {
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
    stuff.userId = 1;
    return await this.stuffModel.save(stuff);
  }
}
