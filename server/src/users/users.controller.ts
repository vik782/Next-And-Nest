import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/auth/jwt-passport/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Get('find-all')
  async findAll(@Request() req) {
    return this.usersService.findAll();
  }

  @Public()
  @Post('insert-user')
  async insertOne(@Request() req, @Body() body) {
    const user = req.body;
    return this.usersService.insertUser(user);
  }

  @Public()
  @Post('insert-profile')
  async insertProfile(@Request() req, @Body() body) {
    const profile = req.body;
    const username = req.body.username;
    return this.usersService.insertProfile(profile, username);
  }
}
