import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { User } from './User';
import { v4 as uuid } from 'uuid';


@Entity("collection_points")
export class CollectionPoint {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  location: string;

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