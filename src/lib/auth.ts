import { SignJWT, jwtVerify } from 'jose';

// Секретный ключ для подписи токенов (берем из .env)
const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET!);

export type SessionPayload = {
  sub: string; // ID пользователя
  email: string;
};

// Создаем JWT-токен (живет 7 дней)
export async function createSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
}

// Проверяем токен. Возвращаем данные или null, если токен невалидный
export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as SessionPayload;
  } catch {
    return null;
  }
}