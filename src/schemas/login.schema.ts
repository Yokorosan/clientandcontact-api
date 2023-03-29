import { z } from "zod";

const login = z.object({
  email: z.string(),
  password: z.string(),
});

export { login };
