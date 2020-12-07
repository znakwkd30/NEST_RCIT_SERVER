import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Position } from '../user/entities/user.entity';
import { CreatePostDTO } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

class PostMock {
  private mockPosts: Post[] = [{
    id: 1,
    title: "test",
    content: "test",
    want: 1,
    rcitPosition: Position["웹"],
    uid: "1234",
    createdAt: new Date()
  }];

  public getPost(id: number): Post {
    const post = this.mockPosts.find(p => p.id === id);

    if (!post) {
      throw new NotFoundException;
    }

    return post;
  }

  public getMyPost(uid: string): Post[] {
    const posts = this.posts();
    const returnPost: Post[] = [];
    posts.map(post => {
      if (post.uid === uid) {
        returnPost.push(post);
      }
    })

    if (!returnPost) {
      throw new NotFoundException;
    }

    return returnPost;
  }

  public posts(): Post[] {
    return this.mockPosts;
  }

  public createPost(post: CreatePostDTO): Post {
    const length = this.posts().length;
    const newPost = new Post();
    newPost.id = length + 1;
    newPost.content = post.content;
    newPost.rcitPosition = post.rcitPosition;
    newPost.title = post.title;
    newPost.want = post.want;
    newPost.createdAt = new Date();

    this.mockPosts.push(newPost);

    return newPost;
  }

  public deletePost(id: number) {
    const postIdx = this.mockPosts.findIndex(p => p.id === id);

    delete this.mockPosts[postIdx];
  }
}

describe('PostService', () => {
  let postService: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [{
        provide: PostService,
        useClass: PostMock,
      }],
    }).compile();

    postService = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(postService).toBeDefined();
  });

  describe('posts', () => {
    test('should return array', () => {
      expect(postService.posts()).toBeInstanceOf(Array);
    });
  });

  describe('getPost', () => {
    test('should return instance of post', () => {
      const post = postService.getPost(1);

      expect(post).toBeInstanceOf(Object);
    });

    test('should return not found exception', () => {
      try {
        postService.getPost(100);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('getMyPost', () => {
    test('should return one my post', async () => {
      const post = await postService.getMyPost("1234");

      expect(post).toBeInstanceOf(Array);
    });

    test('should return not found exception', () => {
      try {
        postService.getMyPost("999");
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('createPost', () => {
    test('should create post return instance of post', () => {
      const post = new CreatePostDTO();
      post.title = "create test";
      post.content = "create test";
      post.rcitPosition = Position["웹"];
      post.want = 3;

      expect(postService.createPost(post)).toBeInstanceOf(Object);
    });

    test('should equal get post and create post', async () => {
      const post = new CreatePostDTO();
      post.title = "create test";
      post.content = "create test";
      post.rcitPosition = Position["웹"];
      post.want = 3;

      postService.createPost(post);
      
      const idx = (await postService.posts()).length;
      const testPost = await postService.getPost(idx);

      expect(testPost.title).toEqual(post.title);
      expect(testPost.content).toEqual(post.content);
      expect(testPost.rcitPosition).toEqual(post.rcitPosition);
      expect(testPost.want).toEqual(post.want);
    });

    test('should return type error', () => {
      try {
        const post = new CreatePostDTO();
        postService.createPost(post);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
      }
    });
  });
});
