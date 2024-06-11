import { Transform, Type } from 'class-transformer'

class IdInstance {
  id: number
}

class ThemeUser extends IdInstance {
  name: string
}

class ThemeTransaction extends IdInstance {
  title: string
}

class ThemeResult extends IdInstance {
  amount: number
  creditor: IdInstance
  debtor: IdInstance
}

export class ThemeEntity {
  id: number
  name: string
  startAt: Date
  endsAt: Date
  editable: boolean

  @Transform(({ value }) => value.id)
  creator: ThemeUser

  @Type(() => ThemeUser)
  members: ThemeUser[]

  @Type(() => ThemeTransaction)
  transactions: ThemeTransaction[]

  @Type(() => ThemeResult)
  @Transform(({ value }) => {
    const { id, creditor, debtor } = value
    return {
      id,
      creditor: creditor.map(c => c.id),
      debtor: debtor.map(d => d.id) 
    }
  })
  result: ThemeResult[]

  constructor(partial: Partial<ThemeEntity>, joined: boolean) {
    Object.assign(this, { ...partial, editable: joined });
  }
}