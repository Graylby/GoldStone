import { Controller, Get, Inject, Post } from '@midwayjs/decorator';
import { JwtPassportMiddleware } from '../middleware/jwt.middleware';
import { Context } from 'egg';
import { myRes } from '../util/myRes';

@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;
  @Inject()
  res: myRes;

  @Get('/')
  async home() {
    return 'Hello Midwayjs!';
  }

  @Post('/login')
  async login() {
    return this.res.success('yes', 'test');
  }

  @Post('/home', { middleware: [JwtPassportMiddleware] })
  async myHome() {
    console.log('home');
    return this.ctx.state;
  }
}
