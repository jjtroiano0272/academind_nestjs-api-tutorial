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

require('dotenv').config();
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
    // MongooseModule.forRoot('mongodb+srv://jjtroiano0272:oWfoJ1R7dCGpz04C@cluster0.pkm8b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    MongooseModule.forRoot(`${process.env.DB_HOST}${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pkm8b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
