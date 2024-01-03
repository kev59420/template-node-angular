import { UserDto } from "../dto/UserDto";
import { Role } from "../enum/Role";

export class User{
  id: string
  firstname: string
  lastname: string
  email: string
  role: Role
  constructor(userDto: UserDto){
    this.id = userDto.id
    this.firstname = userDto.firstName
    this.lastname = userDto.lastName
    this.email = userDto.email
    this.role = userDto.role
  }
}