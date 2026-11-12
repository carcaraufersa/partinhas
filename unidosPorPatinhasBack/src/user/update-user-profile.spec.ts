import { Server } from 'http';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import request from 'supertest';
import { PrismaService } from '../prisma/prisma.service';
import { UserModule } from './user.module';

describe('PATCH /users/me', () => {
  let app: INestApplication;
  const jwt = new JwtService({ secret: 'profile-test-secret' });
  const update = jest.fn();
  const profile = {
    id: 'token-user',
    name: 'Lucas',
    email: 'lucas@example.com',
    telephone: '84999999999',
  };
  const token = jwt.sign({ sub: profile.id });

  beforeAll(async () => {
    const module = await Test.createTestingModule({ imports: [UserModule] })
      .overrideProvider(PrismaService)
      .useValue({ user: { update } })
      .overrideProvider(JwtService)
      .useValue(jwt)
      .compile();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });
  beforeEach(() => {
    update.mockReset();
    update.mockResolvedValue({
      ...profile,
      passwordHash: 'secret',
      role: 'ADMIN',
    });
  });
  afterAll(async () => {
    await app.close();
  });

  it('atualiza parcialmente pelo ID do token e filtra a resposta', async () => {
    const response = await request(app.getHttpServer() as Server)
      .patch('/users/me')
      .auth(token, { type: 'bearer' })
      .send({ name: ' Lucas ' })
      .expect(200);
    expect(response.body).toEqual(profile);
    expect(update).toHaveBeenCalledWith({
      where: { id: 'token-user' },
      data: { name: 'Lucas' },
      select: { id: true, name: true, email: true, telephone: true },
    });
  });

  it('permite atualizar email e telefone', async () => {
    await request(app.getHttpServer() as Server)
      .patch('/users/me')
      .auth(token, { type: 'bearer' })
      .send({ email: profile.email, telephone: profile.telephone })
      .expect(200);
    expect(update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {
          email: profile.email,
          telephone: profile.telephone,
        },
      }),
    );
  });

  it.each([
    undefined,
    'Bearer invalid',
    `Bearer ${jwt.sign({ sub: profile.id }, { expiresIn: -1 })}`,
    `Bearer ${new JwtService({ secret: 'wrong' }).sign({ sub: profile.id })}`,
    `Bearer ${jwt.sign({ email: profile.email })}`,
  ])('rejeita autenticaÃ§Ã£o invÃ¡lida: %s', async (authorization) => {
    const req = request(app.getHttpServer() as Server).patch('/users/me');
    if (authorization) req.set('Authorization', authorization);
    await req.send({ name: 'Lucas' }).expect(401);
    expect(update).not.toHaveBeenCalled();
  });

  it.each([
    {},
    { name: '' },
    { name: '   ' },
    { name: null },
    { name: 42 },
    { email: 'invalid' },
    { email: null },
    { telephone: 42 },
    { telephone: null },
    { telephone: 'abc' },
    ...[
      'id',
      'userId',
      'role',
      'password',
      'passwordHash',
      'createdAt',
      'extra',
    ].map((field) => ({ name: 'Lucas', [field]: 'forbidden' })),
  ])('rejeita corpo invÃ¡lido %j', async (body) => {
    const response = await request(app.getHttpServer() as Server)
      .patch('/users/me')
      .auth(token, { type: 'bearer' })
      .send(body)
      .expect(400);
    expect(response.body).toMatchObject({
      statusCode: 400,
      error: 'Bad Request',
    });
    expect(update).not.toHaveBeenCalled();
  });

  it.each([
    ['P2002', 409],
    ['P2025', 404],
  ])('converte erro Prisma %s', async (code, status) => {
    update.mockRejectedValue(
      new Prisma.PrismaClientKnownRequestError('database error', {
        code: String(code),
        clientVersion: '5.22.0',
      }),
    );
    await request(app.getHttpServer() as Server)
      .patch('/users/me')
      .auth(token, { type: 'bearer' })
      .send({ name: 'Lucas' })
      .expect(Number(status));
  });
});
