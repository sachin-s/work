"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "../components/button"
import { Card, CardHeader, CardContent } from "../components/card"
import axios from "axios" // Import Axios
import { Separator } from "../components/separator"
import { ComboboxPopover } from "../components/custom-drop-down"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../components/form"
import { Input } from "../components/input"
import { Textarea } from '../components/textarea'
import { Turbo } from "@hotwired/turbo-rails";

const formSchema = z.object({
    taskid: z.string(). min(11, {
        message: "Task ID must be at least 11 characters.",
    }),
    title: z.string().min(1, {
        message: "Title must be at least 1 characters.",
    }),
    status: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    priority: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})

  const navigateToTasks = () => {
    // Use Turbo to navigate to the new task page
    Turbo.visit('/tasks');
  };

interface ProfileFormProps {
    action: "get" | "put" | "patch"; // The action type (GET, PUT, PATCH)
    url: string; // The URL for the API request
    task: string;
    priority: object;
    status: object;
}
export function ProfileForm({ action, url, task, priority, status }: ProfileFormProps) {
    // 1. Define your form.

    //console.log('action: ' + action);
    // console.log('url: ' + url);
    // console.log('task:'+ task);
    console.log('task:'+ JSON.stringify(task));
    console.log('task_id:'+ task['task_id']);




    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            taskid: task['task_id'],
            title: "",
            status: "",
            priority: "",
        },
    })

    // 2. Define a submit handler.
    // Define the submit handler with Axios
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            let response;
            // console.log('action: ' + action);
            // console.log('url: ' + url);
            // console.log('id:'+id);

            // Conditionally use Axios based on action (PATCH, PUT, GET)
            if (action === "patch" || action === "put") {
                response = await axios[action](`${url}/${values.taskid}`, {
                    task: {
                        title: values.title,
                        status: values.status,
                        priority: values.priority,
                    },
                })
            } else if (action === "get") {
                response = await axios.get(`${url}/${values.taskid}`)
            }

            // Handle successful response
            console.log("API Response:", response.data)
            // Optionally, you can handle some success state here, like showing a success message.
        } catch (error) {
            // Handle error
            if (axios.isAxiosError(error)) {
                console.error("Error:", error.response?.data || error.message)
                // Optionally, handle error state (e.g., showing an error message).
            } else {
                console.error("Unexpected error:", error)
            }
        }
    }

    let customLabel;

    if (action === 'get') {
        customLabel = 'Create';
    } else if (action === 'put' || action === 'patch') {
        customLabel = 'Update';
    } else {
        customLabel = 'Create';  // Default for any other cases
    }



    return (
        <Card className="mx-20 px-6">
            <CardHeader><div className="text-2xl font-bold tracking-tight">Task details</div></CardHeader>
            <CardContent>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mb-8">

                        <div className="flex h-10 items-center space-x-10 text-sm">
                            <label className='text-muted-foreground'>Task</label>
                            <span className="font-medium"> {task['task_id']} </span>

                            <Separator orientation="vertical" />
                            <ComboboxPopover label='Status' values={status} placeholder='Set status' />

                            <Separator orientation="vertical" />
                            <ComboboxPopover label='Priority' values={priority} placeholder='Set priority'  />

                        </div>

                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title and description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Task title and description" {...field} />
                                    </FormControl>
                                    {/* <FormDescription>
                                        Task details.
                                    </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        


                        <Button type="submit" className="mb-4 mr-4">{customLabel}</Button>
                        <Button variant="outline" onClick={navigateToTasks}>Back to tasks</Button>

                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}