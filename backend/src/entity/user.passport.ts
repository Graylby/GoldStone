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

  @Column()
  avatar: string;

  @Column({ name: 'create_time' })
  createTime: string;

  @Column()
  label: string;

  @Column({ name: 'following_list' })
  followingList: string;

  @Column({ name: 'follower_list' })
  followerList: string;

  @Column({ name: 'last_login_date' })
  lastLoginDate: string;
}
