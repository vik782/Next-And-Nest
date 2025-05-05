import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Roles } from './roles/role.decorator';
import { Role } from './roles/role.enum';
import { RolesGuard } from './roles/role.guard';
import { LocalAuthGuard } from './local-passport/local-auth.guard';
import { Public } from './jwt-passport/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('logout')
  async logout(@Request() req) {
    console.log('Logged out');
    // Since JWT is used, the token is invalid when time has expired
    // JWT should be removed on front-end
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get('/admin/profile')
  getAdminProfile(@Request() req) {
    return req.user;
  }
}
