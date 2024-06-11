import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { ThemeService } from "./theme.service";
import { AddThemeDto, AddUsersToThemeDto } from "./theme.dto";
import { ThemeEntity } from "./theme.serializer";
import { UserService } from "src/user/user.service";
// import { AuthGuard } from "../auth/auth.guard";

// @UseGuards(AuthGuard)
@Controller('theme')
export class　ThemeController {
  constructor(
    private themeService: ThemeService,
    private userService: UserService
  ){}
  
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getTheme(
    @Query('id', ParseIntPipe) id: number,
    @Query('userId', ParseIntPipe) uid: number
  ){
    const user = await this.userService.findUser(uid)
    if(!user.id){
      return new NotFoundException(`id:${uid}のユーザーが見つかりません`)
    }
    const theme = await this.themeService.getThemeById(id)
    if(!theme.id){
      return new NotFoundException(`id:${id}のthemeが見つかりません`)
    }
    const joined = await this.themeService.checkJoined(id, uid)
    return new ThemeEntity(theme, joined)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async addTheme(@Body() addThemeDto: AddThemeDto){
    const creator = await this.userService.findUser(addThemeDto.uid)
    if(!creator.id){
      throw new NotFoundException(`id:${addThemeDto.uid}のユーザーが見つかりません`)
    }
    const result = await this.themeService.addTheme(
      addThemeDto.name,
      addThemeDto.participants,
      addThemeDto.uid
    )
    return new ThemeEntity(result, true)
  }

  @Post('add-users')
  async addUsersToTheme (@Body() addUsersToThemeDto: AddUsersToThemeDto) {
    const { uid, themeId, joiners } = addUsersToThemeDto
    const joined = await this.themeService.checkJoined(themeId, uid)
    if(!joined){
      throw new ForbiddenException()
    }
    await this.themeService.addUsers(themeId, joiners)
    return {
      status: 'OK'
    }
  }
}