import { CustomStrategy, PassportStrategy } from '@midwayjs/passport';
import { Strategy } from 'passport-http-bearer';
import { Config } from '@midwayjs/decorator';
import { httpError } from '@midwayjs/core';

@CustomStrategy()
export class JwtStrategy extends PassportStrategy(Strategy, 'bearer') {
  @Config('jwt')
  jwtConfig;

  async validate(token, done) {
    console.log(token);
    if (token !== '123456789')
      throw new httpError.InternalServerErrorError('登录过期');
    return done(null, { name: 'test' });
  }

  getStrategyOptions(): any {
    return {};
  }
}
