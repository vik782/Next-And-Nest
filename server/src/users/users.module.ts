import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'schemas/users.schema';
import { Profile, ProfileSchema } from 'schemas/profile.schema';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      `${process.env.MONGO_DB_1}`,
    ),
    MongooseModule.forFeature(
      [{ name: Profile.name, schema: ProfileSchema }],
      `${process.env.MONGO_DB_2}`,
    ),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
