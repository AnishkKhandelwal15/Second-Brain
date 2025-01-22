import { z } from "zod";

export const BrainSchema = z.object({
    share: z.boolean(),
});

