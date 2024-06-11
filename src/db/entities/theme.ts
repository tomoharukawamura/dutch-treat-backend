import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  CreateDateColumn,
  JoinTable,
  ManyToOne
} from "typeorm";
import { User, Transaction, TransactionResult, Invitation } from "./index";

@Entity()
export class Theme {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @CreateDateColumn()
  startAt: Date

  @Column()
  endsAt: Date

  @ManyToOne(() => User, (u) => u.createTheme)
  creator: User

  @ManyToMany(() => User, (u) => u.join, { cascade: true })
  @JoinTable()
  members: User[]

  @OneToMany(() => Transaction, (transaction) => transaction.theme)
  transactions: Transaction[]

  @OneToMany(() => TransactionResult, (tr) => tr.theme)
  result: TransactionResult[]

  @OneToMany(() => Invitation, (invitaton) => invitaton.theme)
  invitations: Invitation[]
}