import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user.service";
import { Request } from "express";

@Injectable()
export class DeleteUserUseCase {
  constructor(
    private readonly userService: UserService
  ){}

  deleteById(id: number){
    if(id === 1)
      throw new UnauthorizedException("Vous ne pouvez pas supprimer l'utilisateur original")
    this.userService.deleteById(id)
  }
}