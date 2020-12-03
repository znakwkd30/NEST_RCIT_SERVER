import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserDTO } from './dto/user.dto';
import { Position, User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

class UserMock {
  private mockUsers: User[] = [{
    id: "1",
    name: "test1",
    password: "test1",
    position: Position["웹"],
    posts: undefined
  }, {
    id: "2",
    name: "test2",
    password: "test2",
    position: Position["앱"],
    posts: undefined
  }, {
    id: "3",
    name: "test3",
    password: "test3",
    position: Position["서버"],
    posts: undefined
  }]
  
  public users(): User[] {
    return this.mockUsers;
  }

  public getUser(id: string): UserDTO {
    const user = this.mockUsers.find(u => u.id === id);

    if (!user) {
      throw new NotFoundException;
    }

    const returnUser = new UserDTO();
    returnUser.id = user.id;
    returnUser.name = user.name;
    returnUser.position = user.position;

    return returnUser;
  }

  public register(user: CreateUserDTO): UserDTO {
    const newUser = new User();
    newUser.id = user.id;
    newUser.name = user.name;
    newUser.password = user.password;
    newUser.position = user.position;

    this.mockUsers.push(newUser);

    const returnUser = new UserDTO();
    returnUser.id = newUser.id;
    returnUser.name = newUser.name;
    returnUser.position = newUser.position;

    return returnUser;
  }
}

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{
        provide: UserService,
        useClass: UserMock,
      }],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  test('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('users', () => {
    test('should return array', () => {
      expect(userService.users()).toBeInstanceOf(Array);
    });
  });

  describe('getUser', () => {
    test('should return one user', async () => {
      const user = await userService.getUser("1");
      
      expect(user).toBeInstanceOf(UserDTO);
      expect(user.id).toEqual("1");
    });

    test('should return NotFound Exception', () => {
      try {
        userService.getUser("999");
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('register', () => {
    test('should return user', () => {
      const user = new User();
      user.id = "4";
      user.name= "test4";
      user.password = "test4";
      user.position = Position["웹"];
      
      expect(userService.register(user)).toBeInstanceOf(UserDTO);
    });

    test('should return user match this user data', async () => {
      const user = new User();
      user.id = "4";
      user.name= "test4";
      user.password = "test4";
      user.position = Position["웹"];
      
      const newUser: UserDTO = await userService.register(user);

      expect(user.id).toEqual(newUser.id);
      expect(user.name).toEqual(newUser.name);
      expect(user.position).toEqual(newUser.position);
    });

    test('should return type error', () => {
      try {
        const user = new User();
        userService.register(user);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
      }
    });
  });
});
