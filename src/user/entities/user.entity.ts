import { Post } from "src/post/enttities/post.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

export enum Position {
    "웹",
    "앱",
    "서버"
}

@Entity()
export class User {
    @PrimaryColumn({ length: "100" })
    id: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column({ type: "enum", enum: ["웹", "앱", "서버"] })
    position: Position;

    @OneToMany(() => Post, post => post.uid)
    posts: Post;
}