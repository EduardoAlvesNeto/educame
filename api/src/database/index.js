import { Client } from 'pg';
import config from '../app/config/dotenv';

const client = new Client({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    port: config.DB_PORT,
    database: config.DB_NAME
});

client.connect();

export async function Operation(query, values) {
    const { rows } = await client.query(query, values);
    return rows;
}
