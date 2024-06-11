import { Transform, Type } from "class-transformer"

class UserInvitation {
  theme: {
    id: number
    name: string
  }
}

class JoinTheme {
  id: number
  name: string
  startAt: Date
  endsAt: Date
}

export class GetUserEntity {
  id: number
  address: string
  name: string

  @Type(() => JoinTheme)
  join: JoinTheme[]

  @Type(() => UserInvitation)
  @Transform(({ value }) => {
    const { theme: { id, string } } = value
    return {  id, string }
  })
  invitation: UserInvitation[]

  constructor(partial: Partial<GetUserEntity>){
    Object.assign(this, partial)
  }
}