import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany
} from "typeorm";
import { Transaction, TransactionResult, Theme, Invitation } from "./index"
  
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  address: string

  @Column()
  password: string

  @Column()
  name: string

  @OneToMany(() => Transaction, (transaction) => transaction.creditor)
  credit: Transaction[]

  @ManyToMany(() => Transaction, (t) => t.debtors)
  deb: Transaction[]

  @OneToMany(() => TransactionResult, (tr) => tr.creditor)
  creditResult: TransactionResult[]

  @OneToMany(() => TransactionResult, (tr) => tr.debtor)
  debtResult: TransactionResult[]

  @ManyToMany(() => Theme, (t) => t.members)
  join: Theme[]

  @OneToMany(() => Theme, (t) => t.creator)
  createTheme: Theme[]

  @ManyToMany(() => Invitation, (i) => i.user)
  invitation: Invitation[]
}