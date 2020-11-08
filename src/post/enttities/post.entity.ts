import { Comment } from "src/comment/entities/comment.entity";
import { Position, User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: "100" })
    title: string;

    @Column({ length: "1000" })
    content: string;

    @Column({ type: "enum", enum: ["웹", "앱", "서버"] })
    rcitPosition: Position;

    @Column()
    want: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: "uid" })
    uid: string;

    @OneToMany(() => Comment, comment => comment.id)
    comments: Comment    
}