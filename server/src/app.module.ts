import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-passport/jwt-auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users/users.controller';
import { AuthController } from './auth/auth.controller';
import { UsersModule } from './users/users.module';
import { ProfileController } from './profile/profile.controller';
import { ProfileService } from './profile/profile.service';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USER}:${encodeURIComponent(process.env.MONGO_PASS as string)}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority&appName=${process.env.MONGO_APP_NAME}`,
      {
        dbName: `${process.env.MONGO_DB_1}`,
        connectionName: `${process.env.MONGO_DB_1}`,
      },
    ),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USER}:${encodeURIComponent(process.env.MONGO_PASS as string)}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority&appName=${process.env.MONGO_APP_NAME}`,
      {
        dbName: `${process.env.MONGO_DB_2}`,
        connectionName: `${process.env.MONGO_DB_2}`,
      },
    ),
    AuthModule,
    UsersModule,
    ProfileModule,
  ],
  controllers: [
    AppController,
    AuthController,
    UsersController,
    ProfileController,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AppService,
    ProfileService,
  ],
})
export class AppModule {}
