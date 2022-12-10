import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('goods')
export class Goods {
  @PrimaryGeneratedColumn({ name: 'goods_id' })
  id: number;

  @Column()
  name: string;

  @Column()
  isOnDeal: boolean;
}
