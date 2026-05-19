import { z } from "zod/mini";

const envSchema = z.object({
  NODE_ENV: z._default(z.optional(z.enum(["development", "production", "test"])), "development"),

  DISCORD_BOT_TOKEN: z.string(),
  LAVALINK_NODES: z.string(),
});

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error("Invalid environment variables:");
    console.error(result.error);
    process.exit(1);
  }

  return result.data;
}

export const env = loadEnv();
