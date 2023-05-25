import { Controller, Files, Inject, Post } from '@midwayjs/core';
import { myRes } from '../util/myRes';
import { Context } from 'egg';

@Controller('/upload')
export class UploaderController {
  @Inject()
  res: myRes;
  @Inject()
  ctx: Context;

  @Post('/img')
  async imgUpload(@Files() files) {
    const name =
      'http://gold.gray7.top/img/upload_' + files[0].data.split('_')[1];
    console.log(files[0].data.split('_'));
    return this.res.success({ url: name });
  }
}
