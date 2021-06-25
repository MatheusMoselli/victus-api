import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from './User';
import { Exclude } from 'class-transformer';


@Entity("clients")
export class Client {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  CPF: string;

  @Column()
  birthday: Date;

  @Column()
  premium: boolean;

  @Column()
  points: number;

  @Exclude()
  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @JoinColumn({ name: "user_id" })
  @OneToOne(() => User)
  user: User;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}