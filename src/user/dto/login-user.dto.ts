import { IsNotEmpty } from "class-validator";

export class LoginUserDTO {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    password: string;
}