import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';

import { ConfigService } from '../config/config.service';
import { User } from '../users/user.entity';
import { UserInput } from '../users/users.input';
import { UsersService } from '../users/users.service';
import { AuthPayload } from './auth-payload.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async login(email: string, password: string): Promise<AuthPayload> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new BadRequestException();
    }

    if (!user.authenticate(password)) {
      throw new BadRequestException();
    }

    const authPayload = this.createToken(user.id);

    return { ...authPayload, user };
  }

  async validate({ id }): Promise<User> {
    return await this.usersService.findById(id);
  }

  createToken(id: number): Pick<AuthPayload, 'expires' | 'token'> {
    const expires = moment()
      .add(this.configService.tokenExpirationTime, 's')
      .toISOString();

    const token = this.jwtService.sign(
      { id },
      {
        expiresIn: this.configService.tokenExpirationTime
      }
    );

    return { token, expires };
  }

  async register(userDto: UserInput) {
    const user = await this.usersService.create(userDto);
    const authPayload = await this.createToken(user.id);
    return {
      ...authPayload,
      user
    };
  }
}
