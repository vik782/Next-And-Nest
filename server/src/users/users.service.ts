import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from 'schemas/profile.schema';
import { User } from 'schemas/users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name, `${process.env.MONGO_DB_1}`)
    private userModel: Model<User>,
    @InjectModel(Profile.name, `${process.env.MONGO_DB_2}`)
    private profileModel: Model<Profile>,
  ) {}

  async findOne(username: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username: username });
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find({}, 'username role');
  }

  async insertUser(user: User): Promise<any> {
    const salt = Number(process.env.BCRYPT_SALT);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const payload: User = {
      username: user.username,
      password: hashedPassword,
      role: user.role,
    };
    const newUser = await this.userModel.insertOne(payload);
  }

  async insertProfile(profile: Profile, username: string): Promise<any> {
    try {
      const userSearch = await this.userModel.findOne({ username });
      if (!userSearch) {
        throw new Error('Username not found');
      }
      const payload = {
        user_id: userSearch._id,
        first_name: profile.first_name,
        last_name: profile.last_name,
        address: profile.address,
        phone_number: profile.phone_number,
        phone_country_code: profile.phone_country_code,
      };

      const newProfile = await this.profileModel.insertOne(payload);
      console.log({ newProfile });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
