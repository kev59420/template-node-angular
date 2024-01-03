import { Role } from "src/user/enum/Role"

export type PayloadType = {
  csrf: string
  sub: number
  role: Role
  exp: number
  iat: number
}