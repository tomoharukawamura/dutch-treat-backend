import {
  Controller,
  Get,
  ParseIntPipe,
  Query
} from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService
  ){}

  @Get()
  async getUserbyId(
    @Query('id', ParseIntPipe) id: number
  ){
    return await this.userService.findUser(id)
  }
}