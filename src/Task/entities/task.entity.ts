import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'tb_todo'})
export class Task{
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({length: 100, nullable: false})
  text: string;

  @Column('boolean', {default: false})
  isDone: boolean;

  @UpdateDateColumn()
  date: Date;
}