import { AuthType } from "../enum/AuthType"
import { UserDto } from "./UserDto"

//paylod of jwt
export interface AuthStateDto {
    user: UserDto,
    type: AuthType
    jwt_token: string
}