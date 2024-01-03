import { Role } from "../enum/Role"

export class UserDto{
  id: number
  firstName: string
  lastName: string
  email: string
  role: Role
}