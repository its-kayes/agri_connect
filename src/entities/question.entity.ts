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

  @Column({ type: 'date', default: new Date() })
  time: Date;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
