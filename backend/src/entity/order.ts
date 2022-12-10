import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn({ name: 'order_id' })
  id: number;

  @Column()
  user1Id: string;

  @Column()
  user2Id: string;

  @Column()
  cart: string;

  @Column()
  createDate: string;

  @Column()
  completeDate: string;

  @Column()
  status1: number; //1:进行中 0：已完成 -1：交易异常

  @Column()
  status2: number; //1:进行中 0：已完成 -1：交易异常
}
