import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log('Validating username and password');

    // Finds user using username
    const user = await this.usersService.findOne(username);
    console.log('user: ', user);

    if (user) {
      const validatePassword = await bcrypt.compare(pass, user.password);
      if (!validatePassword) {
        throw new NotFoundException(
          'Incorrect login credentials, please check again your username/password',
        );
      }
      const { password, ...result } = user;
      return result;
    }
  }

  login(user: any) {
    console.log('Setting JWT');
    const payload = {
      username: user.username,
      sub: user.userId,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
