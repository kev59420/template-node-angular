import { UserDto } from "src/user/dto/UserDto";
import { User } from "src/user/models/user.entity";

//paylod of jwt
export class AuthStateDto {
    constructor(user: User | null, accesToken: string | null, type: AuthTypeEnum){
        this.user = user
        this.jwt_token = accesToken
        this.type = type
    }
    user: UserDto
    type: AuthTypeEnum
    jwt_token: string
}

export enum AuthTypeEnum{
    AUTHENTICATED = "AUTHENTICATED",
    ANONYMOUS= "ANONYMOUS"
}