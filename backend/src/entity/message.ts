import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('message')
export class Message {
  @PrimaryGeneratedColumn({ name: 'message_id' })
  id: number;

  @Column({ name: 'sender_id' })
  senderId: number;

  @Column({ name: 'receiver_id' })
  receiverId: number;

  @Column()
  content: string;

  @Column({ name: 'send_time' })
  time: string;
}
