import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

require('dotenv').config();

const URL = process.env.DATABASE_URL;

@Module({
  imports: [MongooseModule.forRoot(URL), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
