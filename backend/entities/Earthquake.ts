import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Earthquake {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  location: string;

  @Column("float")
  magnitude: number;

  @Column()
  date: Date;
}
