import { App, Configuration } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import { Application } from 'egg';
import { join } from 'path';
import { JwtPassportMiddleware } from './middleware/jwt.middleware';
import * as egg from '@midwayjs/web';
import * as swagger from '@midwayjs/swagger';
import * as passport from '@midwayjs/passport';
import * as jwt from '@midwayjs/jwt';
import * as orm from '@midwayjs/typeorm';
import * as socketio from '@midwayjs/socketio';
import * as redis from '@midwayjs/redis';

import { InternalFilter } from './filter/internal.filter';

@Configuration({
  imports: [egg, swagger, passport, jwt, orm, socketio, redis],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  async onReady() {
    this.app.useMiddleware(JwtPassportMiddleware);
    this.app.useFilter([InternalFilter]);
  }
}
