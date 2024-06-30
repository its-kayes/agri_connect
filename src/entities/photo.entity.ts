import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'photos' })
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', default: 'img url here' })
  imgUrl: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
