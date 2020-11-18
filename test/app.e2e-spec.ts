import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('RCIT SERVER Running~');
  });

  describe('Auth', () => {
    it('로그인 테스트 (기대값: 200)', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          id: "1234",
          password: "1234"
        })
        .expect(200)
    })

    it('로그인 테스트 (기대값: 400)', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .expect(400)
    })
  })

});
