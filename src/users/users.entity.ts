import { Field, HideField, Int, ObjectType } from '@nestjs/graphql';
import * as crypto from 'crypto';
import {
    AllowNull,
    AutoIncrement,
    BeforeCreate,
    BeforeUpdate,
    Column,
    DataType,
    Length,
    Model,
    NotEmpty,
    PrimaryKey,
    Table,
    Unique
} from 'sequelize-typescript';
import { ErrorsMap } from 'src/common/errors.const';

const DEFAULT_BYTE_SIZE = 16;
const DEFAULT_ITERATIONS = 10000;
const DEFAULT_KEY_LENGTH = 64;

@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true
})
@ObjectType()
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  @Field(() => Int)
  id: number;

  @Unique
  @Length({ min: 5, max: 30, msg: ErrorsMap.LENGTH })
  @NotEmpty({ msg: ErrorsMap.REQUIRED })
  @Column({
    type: DataType.STRING,
    unique: { name: 'unique_username_id', msg: ErrorsMap.UNIQUE }
  })
  @Field()
  username: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(45),
    unique: { name: 'unique_email_id', msg: ErrorsMap.UNIQUE },
    validate: {
      isEmail: { msg: ErrorsMap.INVALID_EMAIL },
      notEmpty: { msg: ErrorsMap.REQUIRED }
    }
  })
  @Field()
  email: string;

  @AllowNull(false)
  @Column({
    type: DataType.VIRTUAL,
    validate: {
      notEmpty: { msg: ErrorsMap.REQUIRED }
    }
  })
  @HideField()
  password: string;

  @Column
  @HideField()
  hashedPassword: string;

  @Column
  @HideField()
  salt: string;

  @BeforeCreate
  static async createPassword(user: User) {
    await user._updatePassword();
  }

  @BeforeUpdate
  static async updatePassword(user: User) {
    if (user.changed('password')) {
      await user._updatePassword();
    }
  }

  authenticate(password: string): boolean {
    return this.hashedPassword === this.encryptPassword(password);
  }

  private encryptPassword(password: string): string {
    const salt = new Buffer(this.salt, 'base64');
    return crypto
      .pbkdf2Sync(
        password,
        salt,
        DEFAULT_ITERATIONS,
        DEFAULT_KEY_LENGTH,
        'sha512'
      )
      .toString('base64');
  }

  private async makeSalt(): Promise<string> {
    return crypto.randomBytes(DEFAULT_BYTE_SIZE).toString('base64');
  }

  private async _updatePassword() {
    if (this.password) {
      this.salt = await this.makeSalt();
      this.hashedPassword = this.encryptPassword(this.password);
    }
  }
}

@ObjectType()
export class PaginatedUsers {
  rows: User[];
  @Field(() => Int)
  count: number;
}
