import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { UserModule } from './user.module';
import { PrismaService } from '../prisma/prisma.service';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  const prismaMock = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('deve cadastrar um usuário com sucesso', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    prismaMock.user.create.mockResolvedValue({
      id: '123',
      name: 'Lucas Teste',
      email: 'teste@example.com',
      telephone: '84999999999',
      role: 'USER',
      createdAt: new Date(),
      password: 'senha-que-nao-deve-ser-retornada',
      passwordHash: 'hash-que-nao-deve-ser-retornado',
      access_token: 'token-que-nao-deve-ser-retornado',
      refreshToken: 'refresh-token-que-nao-deve-ser-retornado',
    });

    const response = await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'Lucas Teste',
        email: 'teste@example.com',
        password: '123456',
        telephone: '84999999999',
      })
      .expect(201);

    expect(response.body).toEqual({
      id: '123',
      name: 'Lucas Teste',
      email: 'teste@example.com',
    });
    expect(prismaMock.user.create).toHaveBeenCalledWith({
      data: {
        name: 'Lucas Teste',
        email: 'teste@example.com',
        passwordHash: expect.any(String),
        telephone: '84999999999',
      },
      select: { id: true, name: true, email: true },
    });
  });

  it('deve retornar erro quando o e-mail já estiver cadastrado', async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: '123',
      email: 'teste@example.com',
    });

    await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'Outro Lucas',
        email: 'teste@example.com',
        password: '123456',
      })
      .expect(409);
  });
});
