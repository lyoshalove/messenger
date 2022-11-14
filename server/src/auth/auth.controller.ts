import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: SignInDto) {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  registration(@Body() userDto: SignUpDto) {
    return this.authService.registration(userDto);
  }
}
