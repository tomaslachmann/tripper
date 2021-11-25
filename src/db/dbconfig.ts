
import { Client, Pool } from 'pg';

const credentials = {
    user: 'test',
    host: 'localhost',
    database: 'test',
    password: 'test',
    port: 4000,
}

export const client = new Client(credentials);

export const pool = new Pool(credentials)
