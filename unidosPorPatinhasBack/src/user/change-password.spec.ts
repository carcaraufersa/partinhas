import { Server } from 'http';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import request from 'supertest';
import { PrismaService } from '../prisma/prisma.service';
import { UserModule } from './user.module';

describe('PATCH /users/me/password', () => {
  let app: INestApplication;
  let passwordHash: string;
  const jwt = new JwtService({ secret: 'password-test-secret' });
  const token = jwt.sign({ sub: 'token-user' });
  const findUnique = jest.fn();
  const update = jest.fn();
  const body = { currentPassword: 'old-pass', newPassword: 'new-pass' };

  beforeAll(async () => {
    passwordHash = await bcrypt.hash(body.currentPassword, 10);
    const module = await Test.createTestingModule({ imports: [UserModule] })
      .overrideProvider(PrismaService)
      .useValue({ user: { findUnique, update } })
      .overrideProvider(JwtService)
      .useValue(jwt)
      .compile();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  beforeEach(() => {
    findUnique.mockReset().mockResolvedValue({ passwordHash });
    update.mockReset().mockResolvedValue({ id: 'token-user' });
  });

  afterAll(async () => {
    await app.close();
  });

  it('confere a senha atual e salva um hash bcrypt usando somente o ID do token', async () => {
    const response = await request(app.getHttpServer() as Server)
      .patch('/users/me/password')
      .auth(token, { type: 'bearer' })
      .send(body)
      .expect(200);
    expect(response.body).toEqual({ message: 'Senha alterada com sucesso.' });
    expect(findUnique).toHaveBeenCalledWith({
      where: { id: 'token-user' },
      select: { passwordHash: true },
    });
    const calls = update.mock.calls as [{ data: { passwordHash: string } }][];
    const savedHash = calls[0][0].data.passwordHash;
    expect(update).toHaveBeenCalledWith({
      where: { id: 'token-user' },
      data: { passwordHash: savedHash },
      select: { id: true },
    });
    expect(savedHash).not.toBe(passwordHash);
    expect(bcrypt.getRounds(savedHash)).toBe(10);
    expect(await bcrypt.compare(body.newPassword, savedHash)).toBe(true);
    expect(await bcrypt.compare(body.currentPassword, savedHash)).toBe(false);
  });

  it('rejeita senha atual incorreta sem alterar o banco ou expor credenciais', async () => {
    const response = await request(app.getHttpServer() as Server)
      .patch('/users/me/password')
      .auth(token, { type: 'bearer' })
      .send({ ...body, currentPassword: 'incorrect' })
      .expect(401);
    expect(response.body).toEqual({
      statusCode: 401,
      error: 'Unauthorized',
      message: 'Não foi possível alterar a senha.',
    });
    expect(update).not.toHaveBeenCalled();
  });

  it('rejeita usuário do token que não existe mais', async () => {
    findUnique.mockResolvedValue(null);
    await request(app.getHttpServer() as Server)
      .patch('/users/me/password')
      .auth(token, { type: 'bearer' })
      .send(body)
      .expect(401);
    expect(update).not.toHaveBeenCalled();
  });

  it.each([
    undefined,
    'Bearer invalid',
    `Bearer ${jwt.sign({ sub: 'token-user' }, { expiresIn: -1 })}`,
    `Bearer ${new JwtService({ secret: 'wrong' }).sign({ sub: 'token-user' })}`,
    `Bearer ${jwt.sign({ email: 'user@example.com' })}`,
  ])('rejeita token ausente ou inválido: %s', async (authorization) => {
    const req = request(app.getHttpServer() as Server).patch(
      '/users/me/password',
    );
    if (authorization) req.set('Authorization', authorization);
    await req.send(body).expect(401);
    expect(findUnique).not.toHaveBeenCalled();
    expect(update).not.toHaveBeenCalled();
  });

  it.each([
    {},
    { currentPassword: body.currentPassword },
    { ...body, newPassword: '' },
    { ...body, newPassword: '1234567' },
    { ...body, newPassword: null },
    { ...body, newPassword: 12345678 },
    { ...body, currentPassword: '' },
    { ...body, currentPassword: null },
    { ...body, currentPassword: 12345678 },
    { newPassword: body.newPassword },
    { ...body, id: 'another-user' },
    { ...body, userId: 'another-user' },
    { ...body, passwordHash: 'injected' },
  ])('rejeita corpo inválido %j antes de acessar o banco', async (payload) => {
    await request(app.getHttpServer() as Server)
      .patch('/users/me/password')
      .auth(token, { type: 'bearer' })
      .send(payload)
      .expect(400);
    expect(findUnique).not.toHaveBeenCalled();
    expect(update).not.toHaveBeenCalled();
  });

  it.each(['1234567', '', null, 12345678])(
    'login rejeita senha inválida %j antes de consultar o banco',
    async (password) => {
      await request(app.getHttpServer() as Server)
        .post('/auth/login')
        .send({ email: 'user@example.com', password })
        .expect(400);
      expect(findUnique).not.toHaveBeenCalled();
    },
  );

  it('login aceita senha de 8 caracteres', async () => {
    findUnique.mockResolvedValue({ id: 'token-user', passwordHash });
    await request(app.getHttpServer() as Server)
      .post('/auth/login')
      .send({ email: 'user@example.com', password: body.currentPassword })
      .expect(200);
    expect(findUnique).toHaveBeenCalled();
  });
});
