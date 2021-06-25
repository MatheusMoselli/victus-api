import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
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
  
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}