import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const url = process.env.DATABASE_URL!;
const authToken = process.env.DATABASE_AUTH_TOKEN;

export const client = createClient(authToken ? { url, authToken } : { url });
export const db = drizzle(client);
