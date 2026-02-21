"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import FileUpload from "../fileUpload"
import * as z from "zod"

import { Input } from "../ui/input"
import { Button } from "../ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog"
import {
    Form,
    FormControl,
    FormMessage,
    FormField,
    FormItem,
    FormLabel
} from "../ui/form"


const formSchema = z.object({
    name: z.string().min(3, "Server name must be at least 3 characters long"),
    imageURL: z.url("Please enter a valid URL").optional()
})

export const InitialModal = () => {
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
      setMounted(true)
    
    }, [])
    
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageURL: ""
        }
    })
    
    const isLoading = form.formState.isSubmitting
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log(data)
    }
    
    if (!mounted) {
      return null
    }

    return (
        <div>
            <Dialog open>
                <DialogContent className="sm:max-w-106.25">
                    <DialogHeader>
                        <DialogTitle>Initial Setup</DialogTitle>
                        <DialogDescription>
                            Let's get started by creating your first server.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Server Name</FormLabel>
                                        <FormControl>
                                            <Input disabled={isLoading} placeholder="My Cool Server" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="imageURL"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Server Image</FormLabel>
                                        <FormControl>
                                            <FileUpload />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                    <DialogFooter>
                        <Button type="submit" disabled={isLoading}>Create Server</Button>
                    </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}