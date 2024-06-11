import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Theme } from "../db/entities";
import { ThemeController } from "./theme.controller";
import { ThemeService } from "./theme.service";
import { UserModule } from "src/user/user.module";

@Module({
  imports:[
    TypeOrmModule.forFeature([Theme]),
    UserModule
  ],
  controllers: [ThemeController],
  providers: [ThemeService],
  exports:[]
})
export class ThemeModule{}