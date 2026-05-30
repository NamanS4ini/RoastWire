"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import FileUpload from "../FileUpload";
import * as z from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormMessage,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { useModalStore } from "@/hooks/use-modal-store";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(3, "Server name must be at least 3 characters long"),
  imageURL: z.url("Please enter a valid URL").optional(),
});

export const EditServerModal = () => {
  console.log("Rendering EditServerModal");
  const { isOpen, onClose, type, data } = useModalStore();
  const isModalOpen = isOpen && type === "editServer";
  const { server } = data;
  const handleClose = () => {
    form.reset();
    onClose();
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageURL: "",
    },
  });

  useEffect(() => {
    if (server) {
      form.setValue("name", server.name);
      form.setValue("imageURL", server.imageURL);
    }
  }, [server, form]);

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (data: z.infer<typeof formSchema>) => {};

  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>Edit Server</DialogTitle>
            <DialogDescription>Edit your server</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid w-full gap-4 py-4"
            >
              <FormField
                control={form.control}
                name="imageURL"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Server Image</FormLabel>
                    <FormControl>
                      <FileUpload
                        endpoint="serverImage"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Server Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="My Cool Server"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  Create Server
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
