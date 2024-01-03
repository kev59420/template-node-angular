import { HttpException, HttpStatus } from "@nestjs/common";

export class EmailAlreadyExistException extends HttpException  {
  constructor(email: string){
    super(`L'email ${email} exists déja`,HttpStatus.CONFLICT)
  }
}