import { z } from "zod";

export const userListQueryRequest = z.object({
  q: z.string().optional(),
  ob: z.union([z.literal("name"), z.literal("email")]).optional(),
  sb: z.union([z.literal("asc"), z.literal("desc")]).optional(),
  of: z.coerce.number().min(0).optional(),
  lt: z.coerce.number().default(30).optional(),
});

export type UserListQueryRequest = z.infer<typeof userListQueryRequest>;
