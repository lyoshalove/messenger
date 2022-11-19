import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { UsersEntity } from 'src/users/users.entity';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: SignInDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: SignUpDto) {
    const candidate = await this.usersService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, 10);
    const user = await this.usersService.createUser({
      ...userDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  async generateToken(userDto: UsersEntity) {
    return await {
      token: this.jwtService.sign({
        id: userDto.id,
        firstName: userDto.firstName,
        lastName: userDto.lastName,
        email: userDto.email,
      }),
    };
  }

  async validateUser(userDto: SignInDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({
      message: 'Неправильный email или пароль',
    });
  }
}
