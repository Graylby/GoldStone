import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stuffs')
export class Stuff {
  @PrimaryGeneratedColumn({ name: 'stuff_id' })
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column()
  tags: string;

  @Column()
  des: string;

  @Column()
  img: string;

  @Column()
  status: number;

  @Column({ name: 'create_time' })
  createTime: string;

  @Column({ name: 'view_count' })
  viewCount: string;
}
