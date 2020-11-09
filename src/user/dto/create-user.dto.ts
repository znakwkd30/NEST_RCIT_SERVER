import { Position } from "../entities/user.entity";

export class CreateUserDto {
    id: string;
    
    name: string;

    password: string;

    position: Position;
}