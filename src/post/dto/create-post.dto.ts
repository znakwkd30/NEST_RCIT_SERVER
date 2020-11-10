import { IsNotEmpty } from "class-validator";
import { Position } from "src/user/entities/user.entity";

export class CreatePostDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    rcitPosition: Position;

    @IsNotEmpty()
    want: number;
}