import z from "zod";

export const commentSchema = z.object({
  text: z.string().min(8, {
    message: "Comment should have at least 8 characters",
  }),
});
