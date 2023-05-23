import { Body, Controller, Inject, Post } from '@midwayjs/decorator';
import { Context } from 'egg';
import { myRes } from '../util/myRes';
import { StuffService } from '../service/stuff';

@Controller('/stuff')
export class StuffController {
  @Inject()
  ctx: Context;
  @Inject()
  res: myRes;
  @Inject()
  stuffService: StuffService;

  @Post('/add')
  async addStuff(@Body() body) {
    console.log(body);
    const des = body.des;
    const tags = JSON.stringify(body.tags);
    const img = JSON.stringify(body.img);
    const t = await this.stuffService.saveStuff(des, tags, img);
    return this.res.success(t, '添加成功');
  }
}
