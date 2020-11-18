import { Test, TestingModule } from '@nestjs/testing';
import { PostRepository } from '../post/post.repository';
import { UserRepository } from '../user/user.repository';
import { PostService } from '../post/post.service';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService, UserRepository, PostService, PostRepository],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
