import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z
  .object({
    PORT: z.coerce.number().default(8080),
    HOST: z.string().default('0.0.0.0'),
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
  })
  .passthrough();

const parsedConfig = envSchema.parse(process.env);

const config = Object.freeze(parsedConfig);

export default config;
