import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ChatGateway } from './chat/chat.gateway';
import { AlertGateway } from './alert/alert.gateway';
import { AlertController } from './alert/alert.controller';
import { jwtConstants } from './auth/constants';

@Module({
  imports: [
    TypeOrmModule.forRoot(), 
    ConfigModule.forRoot({
      envFilePath: [".env", ".env.development"],
      isGlobal: true,
      load: [jwtConstants]
    }), 
    UserModule, 
    PostModule,
    AuthModule
  ],
  controllers: [AppController, AlertController],
  providers: [ChatGateway, AlertGateway],
})
export class AppModule {}
