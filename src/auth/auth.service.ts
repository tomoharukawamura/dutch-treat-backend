import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ){}

  hashing(password: string){
    const salt = bcrypt.genSaltSync()
    return bcrypt.hashSync(password, salt)
  }

  async login(@Req() request: Request) {
    const jwtToken = this.extractTokenFromHeader(request)
    if(!jwtToken){
      throw new UnauthorizedException()
    }
    try {
      const payload = await this.jwtService.verifyAsync(jwtToken, {
        secret: process.env.SECRET_KEY
      }) as {
        id: number,
        name: string
      }
      const { id, name } = payload
      const user = await this.userService.findUserByIdAndName(id, name)
      request.body['uid'] = id
      if(!user){
        throw new UnauthorizedException()
      }
      return {
        status: 'OK',
        user
      }
    } catch {
      throw new UnauthorizedException()
    }
  }

  private extractTokenFromHeader(request: Request):string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async issueJWTToken(id: number, name: string): Promise<string> {
    return await this.jwtService.signAsync({
      sub: id,
      name
    })
  }

  async comparePassword(input: string, hashedPass: string) {
    return await bcrypt.compare(input, hashedPass)
  }
}
