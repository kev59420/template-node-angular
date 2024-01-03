import { AuthStateDto } from "../dto/AuthStateDto";
import { User } from "./User";

export class AuthState {
  user: User
  constructor(authStateDto: AuthStateDto){
    this.user = authStateDto.user
  }
}