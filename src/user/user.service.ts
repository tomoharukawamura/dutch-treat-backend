import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../db/entities";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private user: Repository<User>
  ){}

  async findUser(id: number){
    const user = await this.user.findOne({
      relations: {
        join: true
      },
      where: {
        id
      },
      select: {
        id: true,
        address: true,
        name: true,
        join: {
          id: true,
          name: true,
          startAt: true,
          endsAt: true
        }
      },
    })
    return user
  }

  async addUser(name: string, password: string, address: string){
    return await this.user.save({ name, password, address })
  }

  async findUserByIdAndName(id: number, name: string){
    return await this.user.findOneBy({ id, name })
  }

  async fetshHashedPasswordByAddress(address: string) {
    const user = await this.user.findOneBy({ address })
    if(!user){
      throw new UnauthorizedException()
    }
    const { password, id, name } = user
    return {
      password,
      id,
      name
    }
  }

  async getUserNamesByIds(ids: number[]){
    return await this.user.find({
      where: ids.map(id => ({ id })),
      select: {
        id: true,
        name: true,
      }
    })
  }
}