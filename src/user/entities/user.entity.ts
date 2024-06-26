import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'text', unique: true })
  phoneNumber: string;

  @Column({
    type: 'text',
    nullable: true,
    default: 'farmer',
    enum: ['farmer', 'agronomists', 'admin'],
  })
  password: string;

  @Column({ type: 'text' })
  role?: string;

  @Column({ type: 'text', nullable: true })
  bio?: string;
}
