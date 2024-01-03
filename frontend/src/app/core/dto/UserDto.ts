import { Role } from "../enum/Role"

export interface UserDto{
  id: string
  firstName: string,
  lastName: string,
  email: string,
  role: Role
}