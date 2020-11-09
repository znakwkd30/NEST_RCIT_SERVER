import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor (
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}

    users(): Promise<User[]> {
        return this.userRepository.find();
    }

    async getUser(id: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id: id }});

        if (!user) {
            return ;
        }

        return user;
    }

    async register(user: CreateUserDto): Promise<CreateUserDto & User> {
        try {
            const udata = await this.getUser(user.id);

            if (udata) {
                throw new Error("이미 존재하는 회원 아이디 입니다.");
            }
            
            const bcryptPassword = await bcrypt.hash(user.password, 12);
            const newUser = await this.userRepository.save({
                id: user.id,
                password: bcryptPassword,
                name: user.name,
                position: user.position
            });

            return newUser;
        } catch (error) {
            throw new Error("회원가입 도중 에러가 발생했습니다.")
        }
    }
}
