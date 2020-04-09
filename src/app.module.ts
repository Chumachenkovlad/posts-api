import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';

import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: ConfigService
    }),
    PostsModule,
    UsersModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
