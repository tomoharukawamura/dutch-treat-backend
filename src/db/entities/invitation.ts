import {
  Column,
  ManyToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  Entity
} from "typeorm";
import { User, Theme } from './index'

enum InvitationStatus  {
  pending = 'pending',
  accepted = 'accepted',
  rejected = 'rejected'
}

@Entity()
export class Invitation {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'enum',
    enum: InvitationStatus,
    default: InvitationStatus.pending
  })
  status: InvitationStatus

  @ManyToMany(() => User, (user) => user.invitation, { cascade: true })
  @JoinTable()
  user: User[]

  @ManyToOne(() => Theme, (t) => t.invitations)
  theme: Theme
}