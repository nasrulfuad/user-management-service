import dotenv from "dotenv";
import z from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.number().default(3000),
  DATABASE_URL: z.string().trim().min(1),
  HEADER_KEY: z.string().trim().min(1),
});

class Environment {
  public get<T extends keyof typeof envSchema._type>(
    envName: T
  ): (typeof envSchema._type)[T] {
    return process.env[envName] as (typeof envSchema._type)[T];
  }

  public static load() {
    dotenv.config();

    return envSchema.parse({
      PORT: Number(process.env.PORT),
      DATABASE_URL: process.env.DATABASE_URL,
      NODE_ENV: process.env.NODE_ENV,
      HEADER_KEY: process.env.HEADER_KEY,
    });
  }
}

Environment.load();

export const environment = new Environment();
