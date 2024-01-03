import { AuthStateDto } from "../dto/AuthStateDto";
import { AuthType } from "../enum/AuthType";
import { User } from "./User";

export class AuthState {
  user: User | null
  type: AuthType
  jwt_token: string | null
  constructor(authStateDto: AuthStateDto){
    this.user = authStateDto.user!! ? new User(authStateDto.user) : null
    this.type = authStateDto.type
    this.jwt_token = authStateDto.jwt_token
  }

  isAuthenticated() : boolean {
    return this.type !== AuthType.ANONYMOUS
  }
}