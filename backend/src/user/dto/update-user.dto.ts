import { IsEmail, IsNumber, IsString } from 'class-validator';
import { Role } from '../enum/Role';
export class UpdateUserDto {

    @IsNumber()
    id: number

    @IsString()
    firstName: string

    @IsString()
    lastName: string

    @IsEmail()
    email: string

    role: Role
}