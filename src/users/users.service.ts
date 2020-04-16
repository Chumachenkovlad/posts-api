import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

import { ErrorsMap } from '../common/const/errors.const';
import { User } from './user.entity';
import { UsersDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private sequelize: Sequelize
  ) {}

  async create(userDto: UsersDto): Promise<User> {
    return this.userModel.create(userDto, { raw: true });
  }

  async update(id: number, userDto: UsersDto): Promise<User> {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException(ErrorsMap.USER_NOT_FOUND);
    }

    await this.sequelize.transaction(async transaction => {
      await user.set(userDto).save({ transaction });
    });

    return this.findById(id);
  }

  async findById(id: number): Promise<User> {
    return this.userModel.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ where: { email } });
  }

  async findAll(): Promise<User> {
    const users = await this.userModel.findAndCountAll({
      raw: true
    });

    return users;
  }
}
