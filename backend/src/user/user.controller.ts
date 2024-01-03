import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { AdminGuard } from "src/core/guards/admin.guard";
import { AuthGuard } from "../auth/guards/auth.guard";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./models/user.entity";
import { CreateUserUseCase } from "./usecase/create-user.usecase";
import { GetUserUseCase } from "./usecase/get-user.usecase";
import { UserService } from "./user.service";
import { DeleteUserUseCase } from "./usecase/delete-user.usecase";
import { UpdateUserUseCase } from "./usecase/update-user.usecase";

@UseGuards(AuthGuard)
@Controller('api/user')
export class UserController {
  constructor(
    private readonly getUserUseCase: GetUserUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly userService: UserService
    ) {}
  
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.createUserUseCase.createUser(createUserDto);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number, @Req() request: Request) {
    return this.getUserUseCase.getUserById(id,request)
  }

  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.userService.getAll();
  }


  @Put()
  update(@Body() updateUserDto: UpdateUserDto, @Req() request: Request) {
    return this.updateUserUseCase.updateUser(updateUserDto,request)
  }

  
  @UseGuards(AdminGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    this.deleteUserUseCase.deleteById(id)
  }
}
