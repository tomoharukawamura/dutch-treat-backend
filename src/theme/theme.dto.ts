import {
  IsArray,
  IsInt,
  IsString
} from "class-validator";
import { IsNumberArray } from "src/utils/array.validator";

export class AddThemeDto {
  //theme作成者
  @IsInt()
  uid: number

  @IsString()
  name: string

  //作成者以外
  @IsNumberArray()
  participants: number[]
}

export class AddUsersToThemeDto {
  @IsInt()
  uid: number

  @IsInt()
  themeId: number

  @IsNumberArray()
  joiners: number[]
}