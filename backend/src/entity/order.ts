import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stuff_order')
export class Order {
  @PrimaryGeneratedColumn({ name: 'order_id' })
  id: number;

  @Column({ name: 'initiator_id' })
  initiatorId: number;

  @Column({ name: 'receiver_id' })
  receiverId: number;

  @Column({ name: 'stuff_i_id' })
  stuffIId: number;

  @Column({ name: 'stuff_r_id' })
  stuffRId: number;

  @Column()
  status: number; // 1 正常 0 未接受 11 发起者收货 12 接收者收货 10 over 21 发起方投诉 22 接受方投诉

  @Column({ name: 'create_time' })
  createTime: string;

  @Column()
  tracking_info: string;
}
