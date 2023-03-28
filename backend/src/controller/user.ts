import { Body, Controller, Inject, Post } from '@midwayjs/decorator';
import { LoginUser, RegisterUser } from '../interface';
import { myRes } from '../util/myRes';
import { UserService } from '../service/user';
import { UserPassport } from '../entity/user.passport';
import { JwtService } from '@midwayjs/jwt';

@Controller('/user')
export class UserController {
  @Inject()
  res: myRes;
  @Inject()
  userService: UserService;
  @Inject()
  jwt: JwtService;

  @Post('/login')
  async login(@Body() user: LoginUser) {
    const t = await this.userService.getUser(user.username);
    let data = null;
    if (user.password === t.password) {
      data = await this.jwt.sign({ id: t.id }, { expiresIn: '5m' });
    } else return this.res.error('密码错误');
    return this.res.success(data, '登录成功');
  }

  @Post('/register')
  async register(@Body() user: RegisterUser) {
    const newUser = new UserPassport();
    newUser.username = user.username;
    newUser.password = user.password;
    newUser.name = '会员用户';
    const t = await this.userService.saveUser(newUser);
    return this.res.success(t, '注册成功');
  }
}
