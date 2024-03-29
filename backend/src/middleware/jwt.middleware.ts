import { Middleware } from '@midwayjs/core';
import { AuthenticateOptions, PassportMiddleware } from '@midwayjs/passport';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { Context } from '@midwayjs/web';

@Middleware()
export class JwtPassportMiddleware extends PassportMiddleware(JwtStrategy) {
  getAuthenticateOptions(): Promise<AuthenticateOptions> | AuthenticateOptions {
    return {};
  }

  ignore(ctx: Context): boolean {
    return (
      ctx.path === '/user/login' ||
      ctx.path === '/user/register' ||
      ctx.path === '/user/code' ||
      ctx.path === '/test' ||
      ctx.path === '/upload/img'
    );
  }
}
