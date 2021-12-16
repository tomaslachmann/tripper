import * as dotenv from 'dotenv';

import { Client, Pool } from 'pg';

dotenv.config({ path: __dirname+'/.env' });

interface Credentials {
    user:any,
    host:any,
    database:any,
    password:any,
    port:any
}

const credentials:Credentials = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST_DEV,
    database: process.env.DB_DB,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT_DEV
}


export const client = new Client(credentials);

export const pool = new Pool(credentials)
