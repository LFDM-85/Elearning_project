import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

require('dotenv').config();

const URL = process.env.DATABASE_URL;

@Module({
  imports: [MongooseModule.forRoot(URL), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
