import { EntityRepository, Repository } from "typeorm";
import { Post } from "./enttities/post.entity";

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
    
}