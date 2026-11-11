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
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
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

    expect(response.body.email).toBe('teste@example.com');
    expect(response.body.name).toBe('Lucas Teste');
    expect(response.body.passwordHash).toBeUndefined();
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

  describe('limite do nome (2 a 60 caracteres)', () => {
    const body = (name: string) => ({
      name,
      email: 'limite@example.com',
      password: '123456',
    });

    beforeEach(() => {
      prismaMock.user.findUnique.mockResolvedValue(null);
      prismaMock.user.create.mockClear();
      prismaMock.user.create.mockResolvedValue({
        id: '1',
        name: 'x',
        email: 'limite@example.com',
        role: 'USER',
        createdAt: new Date(),
      });
    });

    it.each([
      ['1 caractere', 'a'],
      ['1 caractere com espaços nas pontas', '  a  '],
      ['mais de 60 caracteres', 'a'.repeat(61)],
    ])('deve rejeitar nome com %s', async (_label, name) => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(body(name))
        .expect(400);

      // O pipe do spec devolve array; o do main.ts (exceptionFactory) devolve string
      expect([response.body.message].flat()).toContain(
        'O nome deve ter entre 2 e 60 caracteres.',
      );
      expect(prismaMock.user.create).not.toHaveBeenCalled();
    });

    it.each([
      ['2 caracteres', 'Ab'],
      ['60 caracteres', 'a'.repeat(60)],
    ])('deve aceitar nome com %s', async (_label, name) => {
      await request(app.getHttpServer())
        .post('/users')
        .send(body(name))
        .expect(201);
    });

    it('deve salvar o nome sem espaços nas pontas', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send(body('  Maria  '))
        .expect(201);

      expect(prismaMock.user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ name: 'Maria' }),
        }),
      );
    });
  });
});