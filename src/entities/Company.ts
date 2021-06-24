import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from './User';


@Entity("companies")
export class Company {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  CNPJ: string;
  
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