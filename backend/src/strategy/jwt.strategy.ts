import { CustomStrategy, PassportStrategy } from '@midwayjs/passport';
import { Strategy } from 'passport-http-bearer';
import { Inject } from '@midwayjs/decorator';
import { httpError } from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';

@CustomStrategy()
export class JwtStrategy extends PassportStrategy(Strategy, 'bearer') {
  @Inject()
  jwt: JwtService;

  async validate(token, done) {
    try {
      await this.jwt.verify(token);
      const payload = this.jwt.decode(token);
      return done(null, payload);
    } catch (e) {
      const msg = e.message === 'jwt expired' ? '登录过期' : 'token格式错误';
      throw new httpError.InternalServerErrorError(msg);
    }
  }

  getStrategyOptions(): any {
    return {};
  }
}
