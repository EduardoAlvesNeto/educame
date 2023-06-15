import 'dotenv/config';

interface Config {
  port: number,
  secret: string
}

const config: Config = {
  port: parseInt(process.env.PORT ?? '3000', 10),
  secret: process.env.JWT_SECRET ?? 'senhascreta'
};

export default config;
