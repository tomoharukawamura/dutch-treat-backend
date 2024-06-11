import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length 
} from 'class-validator'

export class SignupDto {
  @IsString()
  name: string

  @IsEmail()
  address: string

  @IsNotEmpty()
  @Length(6)
  password: string
}

export class SigninDto {
  @IsEmail()
  address: string

  @IsNotEmpty()
  @Length(6)
  password: string
}