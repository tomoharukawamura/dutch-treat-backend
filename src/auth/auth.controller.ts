import { 
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './auth.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Post()
  async login(@Req() request: Request) {
    const { status } = await this.authService.login(request)
    return status
  }

  @Post('signin')
  async signin(@Body() signinDto: SigninDto) {
    const { address, password } = signinDto
    const { password: hash, id, name } = await this.userService.fetshHashedPasswordByAddress(address)
    const isMatched = await this.authService.comparePassword(password, hash)
    if(!isMatched){
      throw new UnauthorizedException()
    }
    const token = await this.authService.issueJWTToken(id, name)
    return {
      token
    }
  }

  @Post('signup')
  async signup(@Body() addUserDto: SignupDto) {
    const { name: bodyName, address, password } = addUserDto
    const hashedPassword = this.authService.hashing(password)
    const newUser = await this.userService.addUser(address, hashedPassword, bodyName)
    const { id, name } = newUser
    const token = await this.authService.issueJWTToken(id, name)
    return {
      token
    }
  }
}
