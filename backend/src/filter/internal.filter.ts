import { Catch, httpError, MidwayHttpError } from '@midwayjs/core';
import { Context } from 'egg';

@Catch(httpError.InternalServerErrorError)
export class InternalFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    console.log(ctx);
    return {
      code: 400,
      msg: err.message,
    };
  }
}
