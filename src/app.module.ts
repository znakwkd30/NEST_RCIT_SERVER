import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(), 
    ConfigModule.forRoot({ envFilePath: [".env", ".env.development"], isGlobal: true }), 
    UserModule, 
    PostModule, 
    CommentModule, 
    AuthModule
  ],
  controllers: [AppController],
})
export class AppModule {}
