import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

import { BaseEntityService } from '../common/base/base-entity.service';
import { User } from './user.entity';
import { UsersFilterInput } from './users-filter.input';
import { UsersDto } from './users.dto';

@Injectable()
export class UsersService extends BaseEntityService<
  User,
  UsersDto,
  UsersFilterInput
> {
  constructor(
    @InjectModel(User)
    model: typeof User,
    sequelize: Sequelize
  ) {
    super(model, sequelize);
  }

  async findByEmail(email: string): Promise<User> {
    return this.model.findOne({ where: { email } });
  }
}
