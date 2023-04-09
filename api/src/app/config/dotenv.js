import dotenv from 'dotenv';
dotenv.config();

export default {
    PORT: process.env.PORT || 3000,
    DB_USER: process.env.DATABASE_USER,
    DB_PASSWORD: process.env.DATABASE_PASSWORD,
    DB_PORT: process.env.DATABASE_PORT,
    DB_HOST: process.env.DATABASE_HOST || 'localhost',
    DB_NAME: process.env.DATABASE_NAME,
};
