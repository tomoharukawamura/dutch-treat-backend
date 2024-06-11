import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { User, Theme } from "./index"

@Entity()
export class TransactionResult {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  amount: number
 
  @ManyToOne(() => Theme, (theme) => theme.result)
  theme: Theme

  @ManyToOne(() => User, (user) => user.creditResult)
  creditor: User

  @ManyToOne(() => User, (user) => user.debtResult)
  debtor: User
}