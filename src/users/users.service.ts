import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { ErrorsMap } from 'src/common/errors.const';

import { UserDto } from './users.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private sequelize: Sequelize
  ) {}

  async create(userDto: UserDto): Promise<User> {
    return this.userModel.create(userDto, { raw: true });
  }

  async update(id: number, userDto: UserDto): Promise<User> {
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
