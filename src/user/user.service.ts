import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor (
        @InjectRepository(User) private readonly userRepository: UserRepository
    ) {}

    users(): Promise<User[]> {
        return this.userRepository.find();
    }

    async getUser(id: string): Promise<User> {
        try {
            const user = await this.userRepository.findOne({ where: { id: id }});

            if (!user) {
                return null;
            }
    
            return user;    
        } catch (error) {
            console.log(`[getUser] : ${error}`);
            throw new Error("유저 데이터 얻는중 에러 발생");
        }
    }

    async register(user: CreateUserDTO): Promise<UserDTO> {
        try {
            const udata = await this.userRepository.findOneUser(user.id);

            if (udata) {
                throw new Error("이미 존재하는 회원 아이디 입니다.");
            }

            const bcryptPassword = await bcrypt.hash(user.password, 12);

            await this.userRepository.save({
                id: user.id,
                password: bcryptPassword,
                name: user.name,
                position: user.position
            });
            
            const saveUser: UserDTO = new UserDTO();
            saveUser.id = user.id;
            saveUser.name = user.name;
            saveUser.position = user.position;

            return saveUser;
        } catch (error) {
            console.log(`[register] : ${error}`)
            throw new Error("회원가입 도중 에러가 발생했습니다.")
        }
    }
}
