import { Controller, Fields, Files, Inject, Post } from '@midwayjs/core';
import { myRes } from '../util/myRes';
import { UserService } from '../service/user';

@Controller('/api')
export class UploaderController {
  @Inject()
  res: myRes;
  @Inject()
  userService: UserService;
  @Inject()
  ctx;

  @Post('/upload')
  async imgUpload(@Files() files, @Fields() fields) {
    console.log(files);
    console.log(fields);
    return this.res.success(files);
  }
}
