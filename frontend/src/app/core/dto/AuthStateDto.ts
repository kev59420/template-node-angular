import { UserDto } from "./UserDto"

//paylod of jwt
export interface AuthStateDto {
    user: UserDto,
    jwt_token: string
}