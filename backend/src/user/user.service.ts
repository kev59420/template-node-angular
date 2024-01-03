import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./models/user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ){}
    private readonly users: User[] = []

    async create(user: User): Promise<User>{
        return this.userRepository.save(user)
    }

    getById(id: number): Promise<User> {
        return this.userRepository.findOne({
            where: { id: id}
        })
    }

    getAll(): Promise<User[]> {
        return this.userRepository.find()
    }

    findByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({
            where: {
                email: email
            }
        })
    }

    emailAlreadyExist(email: string): Promise<boolean> {
        return this.userRepository.exists({
            where: {
                email: email
            }
        })
    }

    update(userToUpdate: UpdateUserDto): Promise<User>{   
        return this.userRepository.save(userToUpdate)
    }

    deleteById(id: number) {
        this.userRepository.delete(id)
    }
}