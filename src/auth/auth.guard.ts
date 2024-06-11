import { CanActivate, Injectable, ExecutionContext, InternalServerErrorException } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService
  ){}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { status } = await this.authService.login(request)
    if(status !== 'OK'){
      throw new InternalServerErrorException()
    }
    return true
  }
}