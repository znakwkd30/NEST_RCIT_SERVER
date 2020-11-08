import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, PostModule, CommentModule, TestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
