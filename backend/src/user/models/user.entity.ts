import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { Exclude } from 'class-transformer';
import { Role } from "../enum/Role";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  role: Role

}