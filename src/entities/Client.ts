import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from './User';


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

  @Column()
  user_id: string;

  @JoinColumn({ name: "user_id" })
  @OneToOne(() => User)
  user: User;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}