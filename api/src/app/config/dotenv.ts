import 'dotenv/config';

interface Config {
  appPort: number,
  dbUser: string,
  dbPassword: string,
  dbPort: number,
  dbHost: string,
  dbName: string
}

const config: Config = {
    appPort: parseInt(process.env.PORT ?? '3000', 10),
    dbUser: process.env.DATABASE_USER ?? '',
    dbPassword: process.env.DATABASE_PASSWORD ?? '',
    dbPort: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
    dbHost: process.env.DATABASE_HOST ?? 'localhost',
    dbName: process.env.DATABASE_NAME ?? '',
};

export default config;
