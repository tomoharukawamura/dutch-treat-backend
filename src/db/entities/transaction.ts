import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  CreateDateColumn,
  JoinTable
} from "typeorm";
import { User, Theme } from "./index";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  amount: number

  @CreateDateColumn()
  cratedAt: Date

  @ManyToOne(() => User, (user) => user.credit)
  creditor: User

  @ManyToMany(() => User, (user) => user.deb, { cascade: true })
  @JoinTable()
  debtors: User[]

  @ManyToOne(() => Theme, (theme) => theme.transactions)
  theme: Theme
}