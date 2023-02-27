import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { ChatsModule } from './chats/chats.module';
import { ChatsEntity } from './chats/chats.enity';
import { MessageModule } from './message/message.module';
import { MessageEntity } from './message/message.entity';
import { FilesModule } from './files/files.module';
import { FilesEntity } from './files/files.entity';
import { getEnvFileName } from './helpers/getEnvFileName';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // context: ({ req }) => ({ req }),
      context: async ({ req, connectionParams }) => {
        if (connectionParams) {
          return { req: { headers: { ...connectionParams } } };
        }
        return { req };
      },
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': true,
      },
      uploads: false,
      cors: {
        origin: true,
        credentials: true,
      },
    }),
    ConfigModule.forRoot({
      envFilePath: getEnvFileName(),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_NAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [UsersEntity, ChatsEntity, MessageEntity, FilesEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    AuthModule,
    ChatsModule,
    MessageModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
