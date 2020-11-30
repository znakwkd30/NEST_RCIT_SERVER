import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Position } from "../entities/user.entity";

export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    id: string;
    
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(Position)
    @IsNotEmpty()
    position: Position;
}