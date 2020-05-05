import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { ConfigModule } from '../config/config.module';
import { UsersModule } from '../users/users.module';
import { ConfigService } from './../config/config.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.jwtSecret
      }),
      inject: [ConfigService]
    }),
    ConfigModule
  ],
  providers: [AuthService, JwtStrategy, AuthResolver]
})
export class AuthModule {}
