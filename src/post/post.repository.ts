import { EntityRepository, Repository } from "typeorm";
import { Post } from "./enttities/post.entity";

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
    findByUid = (uid: string) => {
        return this.find({ where: {
            uid: uid
        }});
    };

    findOnePost = (id: number) => {
        return this.findOneOrFail(id);
    }
}