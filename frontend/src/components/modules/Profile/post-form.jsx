import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { postSchema } from "@/schemas/post-schema";
import { postContent } from "@/actions/post-content";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const PostForm = () => {
  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: "",
      image: null,
    },
  });

  const onSubmit = async (data) => {
    try {
      const submitData = new FormData();
      submitData.append("content", data.content);

      if (data.image && data.image[0]) {
        submitData.append("image", data.image[0]);
      }

      await postContent(submitData);
      form.reset();
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter the content" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onChange(e.target.files)}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className={"hover:bg-cyan-400"} variant={"elevated"}>
          Submit
        </Button>
      </form>
    </Form>
  );
};
