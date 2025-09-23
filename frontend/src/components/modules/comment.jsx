import { useContext } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import UserContext from "@/context/user-context";
import { commentSchema } from "@/schemas/comment-schema";
import { postComment } from "@/actions/post-content";

import { MessageCircle, SendHorizonalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { EachComment } from "./each-comment";

export const Comment = ({ commentsData, postId }) => {
  const { user } = useContext(UserContext);

  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = async (data) => {
    await postComment(data, postId);
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" disabled={!user} variant={"elevated"}>
          <MessageCircle />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full space-y-4">
        <DialogHeader className="space-y-2">
          <DialogTitle className={`text-center`}>Comments</DialogTitle>
          <DialogDescription asChild>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex items-center gap-2 w-full">
                  <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input {...field} placeholder="comment" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button
                    size="icon"
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    variant="elevated"
                  >
                    <SendHorizonalIcon
                      className="fill-cyan-400"
                      color="fill-cyan-400"
                    />
                  </Button>
                </div>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full">
          {commentsData.length === 0 ? (
            <div className="w-full">
              <h3 className="text-center text-base font-semibold">
                No Comments.
              </h3>
            </div>
          ) : (
            <div className="w-full px-4 flex flex-col gap-y-4">
              <ScrollArea className="h-100 lg:h-140">
                {commentsData.map((eachComment, i) => (
                  <EachComment key={i} details={eachComment} />
                ))}
              </ScrollArea>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
