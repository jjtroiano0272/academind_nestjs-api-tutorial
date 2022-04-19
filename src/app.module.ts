import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

// require('dotenv').config();
const dotenv = require("dotenv");
@Module({
  imports: [
    // Imports previously used for bookmarks/users API
    // ConfigModule.forRoot({
    //   isGlobal: true
    // }),
    // AuthModule,
    // UserModule,
    // BookmarkModule,
    // PrismaModule,
    ProductsModule,
    // TODO: how to read these from env file
    MongooseModule.forRoot(process.env.DB_URI)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
