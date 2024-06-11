import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Theme, User } from "../db/entities";
import { Repository } from "typeorm";
import { UserService } from "src/user/user.service";

@Injectable()
export class ThemeService {
  constructor(
    @InjectRepository(Theme) private theme: Repository<Theme>,
    private userService: UserService,
  ){}

  async getThemeById(id: number){
    return await this.theme.findOne({
      select:{
        id: true,
        name: true,
        startAt: true,
        endsAt: true,
        members: { 
          id: true,
          name: true
        },
        transactions: {
          id: true,
          title: true
        },
        result: {
          id: true,
          amount: true,
          creditor: {
            id: true
          },
          debtor: {
            id: true
          }
        }
      },
      relations: {
        members: true,
        transactions: true,
        result: true,
      },
      where: {
        id
      }
    })
  }

  async checkJoined (themeId: number, userId: number) {
    return await this.theme.existsBy({
      id: themeId,
      members: {
        id: userId
      }
    })
  }

  async addTheme(name: string, participants: number[], creatorId: number){
    try {
      const creatorUserInstance = new User()
      creatorUserInstance.id = creatorId
      return await this.theme.save({
        name,
        members: [creatorId, ...participants].map(pid => {
          const user = new User()
          user.id = pid
          return user
        }),
        creator: creatorUserInstance
      })
    } catch {
      throw new InternalServerErrorException()
    }
  }

  async getUsersInTheme(thId: number) {
    const result = await this.theme.findOne({
      where: {
        id: thId
      },
      relations: {
        members: true
      },
      select: {
        id: true,
        members: {
          id: true
        }
      }
    })
    if(!result.id){
      throw new NotFoundException()
    }
    return result.members.map(m => m.id)
  }

  async addUsers(themeId: number, users: number[]){
    const alreadyExistMembers = await this.getUsersInTheme(themeId)
    const updateData = await this.userService.getUserNamesByIds([...new Set(alreadyExistMembers.concat(users))])
    try {
      return await this.theme.update(themeId, {
        members: updateData
      })
    } catch {
      throw new InternalServerErrorException()
    }
  }
}