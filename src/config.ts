import { z } from "zod";

const configSchema = z.object({
  NEXT_PUBLIC_URL: z.string(),
  NEXT_PUBLIC_API_END_POINT: z.string(),
});

const config = configSchema.safeParse({
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  NEXT_PUBLIC_API_END_POINT: process.env.NEXT_PUBLIC_API_END_POINT,
});

if (!config.success) {
  console.log(config.error.errors);
  throw new Error("Giá Trị Khai Báo Không Hợp Lệ");
}

export const envConfig = config.data;
