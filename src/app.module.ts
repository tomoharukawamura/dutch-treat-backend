import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import dbConfig from './db/config'
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ThemeModule } from './theme/theme.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot(dbConfig[process.env.MODE || 'dev']),
    AuthModule,
    UserModule,
    ThemeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
