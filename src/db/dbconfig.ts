
import { Client, Pool } from 'pg';

const credentials = {
    user: 'tomaslachmanngmailcom_2093',
    host: 'localhost',
    database: 'tomaslachmanngmailcom_2093',
    password: 'Lachty25051995',
    port: 4000,
}

export const client = new Client(credentials);

export const pool = new Pool(credentials)