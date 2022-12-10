import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_passport')
export class UserPassport {
  @PrimaryGeneratedColumn({ name: 'userId' })
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;
}
