import { Post } from "src/post/enttities/post.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: "1000" })
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: "uid" })
    uid: string;

    @ManyToOne(() => Post, { nullable: false })
    @JoinColumn({ name: "pid" })
    pid: number;
}