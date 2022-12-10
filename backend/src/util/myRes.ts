import { MyResponse } from '../interface';
import { Provide } from '@midwayjs/decorator';

@Provide()
export class myRes {
  success(data?: any, msg?: string) {
    const res: MyResponse = {
      code: 200,
      msg: msg !== undefined ? msg : 'success',
      data: data !== undefined ? data : null,
    };
    return res;
  }

  error(err?: string) {
    const res: MyResponse = {
      code: 400,
      msg: err !== undefined ? err : 'error',
      data: null,
    };
    return res;
  }
}
