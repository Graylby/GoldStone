import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { UserPassport } from '../entity/user.passport';
import { Repository } from 'typeorm';
import { InternalServerErrorError } from '@midwayjs/core/dist/error/http';

@Provide()
export class UserService {
  @InjectEntityModel(UserPassport)
  userModel: Repository<UserPassport>;

  async getUser(username: string) {
    const option = {
      where: { username: username },
    };
    const user = await this.userModel.findOne(option);
    if (user === null) throw new InternalServerErrorError('用户名未注册');
    else return user;
  }

  async saveUser(user: UserPassport) {
    const res = await this.userModel.save(user);
    console.log(res);
    return res;
  }
}
