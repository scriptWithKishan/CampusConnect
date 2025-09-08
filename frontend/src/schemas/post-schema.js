import z from "zod";

export const postSchema = z.object({
  content: z.string().min(8, {
    message: "Post content should be at least 8 characters long",
  }),
  image: z.any().optional(),
});
