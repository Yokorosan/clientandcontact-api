import { z } from "zod";
import { manyClientResponse } from "./client.schema";

const paginationResponse = z.object({
  prevPage: z.string().nullable(),
  nextPage: z.string().nullable(),
  count: z.number(),
  data: manyClientResponse,
});

export { paginationResponse };
