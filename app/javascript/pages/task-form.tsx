"use client"

import React from 'react'
import { createRoot } from 'react-dom/client';
import { CustomAlert } from '../components/custom-alert';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "../components/button"
import { Card, CardHeader, CardContent } from "../components/card"
import axios from "axios" // Import Axios
import { Separator } from "../components/separator"
import ComboboxPopover from "../components/custom-drop-down"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../components/form"
import { Textarea } from '../components/textarea'
import { Turbo } from "@hotwired/turbo-rails";


// Get the CSRF token from the HTML meta tag
const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

axios.defaults.headers['X-CSRF-Token'] = csrfToken;

const formSchema = z.object({
    taskid: z.string().min(11, {
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
    //Turbo.visit('/tasks');
    window.location.href = '/tasks';
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
     //console.log('url: ' + url);
    // console.log('task:'+ task);
    //console.log('task:'+ JSON.stringify(task));
    //console.log('task_id:'+ task['task_id']);




    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            taskid: task['task_id'],
            title: task['title'] || "",
            status: task['status'],
            priority: task['priority'],
        },
    })
    

    // 2. Define a submit handler.
    // Define the submit handler with Axios
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            let response;
            console.log('action: ' + action);
            console.log('url: ' + url);
            console.log('action_cond1: ' + (action === "patch" || action === "put"));
            console.log('action_cond2: ' + (action === "get"));
            // console.log('task id:' + values.taskid);
            // console.log('title:' + values.title);
            // console.log('status:' + values.status);
            // console.log('priority:' + values.priority);
            // console.log('values:' + JSON.stringify(values));
            const options = {
                method: action.toUpperCase(),
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json;charset=UTF-8",
                  'X-CSRF-Token': csrfToken,
                },
                body: JSON.stringify({
                    task: {
                        title: values.title,
                        status: values.status,
                        priority: values.priority,
                    },
                }),
              };

            
           // Conditionally use Axios based on action (PATCH, PUT, GET)
           if (action === "patch" || action === "put") {
               //console.log('action:',action)

                response =  await fetch(url, options).then((response) => {
                    // And we'll do some fancy stuff there.
                    console.log("API Response:", response.data);
                    const alertDiv = document.querySelector('[data-utils--header-alert-target="notice"]');
                    createRoot(alertDiv).render(<CustomAlert title='Notification' description="Your task has been successfully updated!" />);
                    setTimeout(() => {
                        // Remove or hide the alert (depending on your desired effect)
                        alertDiv.innerHTML = '';  // Remove the rendered alert from the DOM
                        // OR, if you prefer to hide it instead of removing:
                        // root.style.display = 'none'; // This hides the alert (make sure your alert can be re-shown)
                    }, 10000);
                });
               //Turbo.turbo_stream.update(values.taskid, options);
           } else if (action === "get") {
            console.log('executed2');
            console.log('action:',action)
            response =  await fetch(url, options).then((response) => {
                // And we'll do some fancy stuff there.
                console.log("API Response:", response.data);
                const alertDiv = document.querySelector('[data-utils--header-alert-target="notice"]');
                alertDiv.textContent = "Your task has been successfully created!";
              });
           }

            // Handle successful response
            //console.log("API Response:", response.data)
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
                    <form className="space-y-8 mb-8">

                        <div className="flex h-10 items-center space-x-10 text-sm">
                            <label className='text-muted-foreground'>Task</label>
                            <span className="font-medium"> {task['task_id']} </span>

                            <Separator orientation="vertical" />

                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        {/* <FormLabel>Title and description</FormLabel> */}
                                        <FormControl>

                                            <ComboboxPopover label='Status' values={status} placeholder='status' 
                                            onSelect={(value) => {
                                            form.setValue('status', value);  // Update the form state with the selected value
                                            //console.log(JSON.stringify(form.getValues('status')));
                                             }}
                                            {...field}/>

                                        </FormControl>
                                        {/* <FormDescription>
                                        Task details.
                                    </FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Separator orientation="vertical" />
                            <FormField
                                control={form.control}
                                name="priority"
                                render={({ field }) => (
                                    <FormItem>
                                        {/* <FormLabel>Title and description</FormLabel> */}
                                        <FormControl>
                                            <ComboboxPopover label='Priority' values={priority} placeholder='priority' 
                                            onSelect={(value) => {
                                                form.setValue('priority', value);  // Update the form state with the selected value
                                              }}
                                            {...field} />

                                        </FormControl>
                                        {/* <FormDescription>
                                        Task details.
                                    </FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <p className="text-sm text-muted-foreground">Task</p>
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



                        <Button onClick={(e)=>{
                        e.preventDefault();
                        onSubmit(form.getValues());
                    }}
                        className="mb-4 mr-4">{customLabel}</Button>
                        <Button variant="outline" onClick={navigateToTasks}>Back to tasks</Button>

                    </form>
                </Form>
            </CardContent>


        </Card>
    )
}