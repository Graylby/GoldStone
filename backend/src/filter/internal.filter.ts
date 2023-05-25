import { Catch, httpError, MidwayHttpError } from '@midwayjs/core';
import { Context } from 'egg';

@Catch(httpError.InternalServerErrorError)
export class InternalFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    return {
      code: 400,
      msg: err.message,
    };
  }
}
