import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './enttities/post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post) private readonly postRepository: PostRepository
    ) {}

    async getPost(id: number): Promise<Post> {
        try {
            const post = await this.postRepository.findOnePost(id);
        
            if (!post) {
                return null;
            }
    
            return post;
        } catch (error) {
            console.log(`[getPost] : ${error}`);
            throw new Error("포스트 데이터를 가져오는 중 에러 발생");
        }
    }

    async getMyPost(uid: string) {
        try {
            const posts = await this.postRepository.findByUid(uid);

            return posts;
        } catch (error) {
            console.log(`[getMyPost] : ${error}`);
            throw new Error("개인 포스트 데이터 조회중 에러");
        }
    }

    posts(): Promise<Post[]> {
        return this.postRepository.find();
    }

    async createPost(post: CreatePostDto): Promise<CreatePostDto & Post> {
        try {
            const newPost = await this.postRepository.save(post);

            if (!newPost) {
                throw new Error("포스트 에러 발생");
            }

            return newPost;
        } catch (error) {
            console.log(`[createPost] : ${error}`);
            throw new Error("포스트 생성중 에러 발생");
        }
    }

    async deletePost(id: number): Promise<string> {
        try {
            const post = await this.postRepository.findOnePost(id);

            if (!post) {
                throw new Error("이미 삭제되었거나 존재하지 않는 포스트 입니다");
            }

            const check = await this.postRepository.delete(id);
            
            if (check.affected === 1) {
                return "성공적으로 포스트를 삭제하였습니다.";   
            } else {
                return "이미 삭제된 포스트 입니다.";
            }
        } catch (error) {
            console.log(`[deletePost] : ${error}`);
            throw new Error("포스트 삭제중 에러 발생");
        }
    }
}
