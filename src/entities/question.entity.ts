import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'questions' })
export class Questions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  question: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'date' })
  time: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
