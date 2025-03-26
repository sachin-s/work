"use client"

import React from 'react'
import { createRoot } from 'react-dom/client';
import { CustomAlert } from '../components/custom-alert';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "../components/button"
import { Card, CardHeader, CardContent } from "../components/card"
//import axios from "axios" // Import Axios
import { Separator } from "../components/separator"
import ComboboxPopover from "../components/custom-drop-down"

import {
    Form,
    FormControl,
    //FormDescription,
    FormField,
    FormItem,
   // FormLabel,
    FormMessage,
} from "../components/form"
import { Textarea } from '../components/textarea'
import { Turbo } from "@hotwired/turbo-rails";


// Get the CSRF token from the HTML meta tag
const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

//axios.defaults.headers['X-CSRF-Token'] = csrfToken;

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

const navigateToTasks = (e) => {
    // Use Turbo to navigate to the new task page
    e.preventDefault();
    Turbo.visit('/tasks');
};



interface ProfileFormProps {
    action: "get" | "put" | "patch" | "new"; // The action type (GET, PUT, PATCH)
    url: string; // The URL for the API request
    task: string;
    priority: object;
    status: object;
}
export function ProfileForm({ action, url, task, priority, status }: ProfileFormProps) {
    // 1. Defining the form.

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            taskid: task['task_id'],
            title: task['title'] || "",
            status: task['status'],
            priority: task['priority'],
        },
    })
    

    // 2. Defining the submit handler.
    async function yourSubmitFunction(values: z.infer<typeof formSchema>) {
        try {
            let response;
            console.log('action: ' + action);
            console.log('values: '+ JSON.stringify(values));
            if (action === "create") 
                {
                    action="POST";
                }
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
                        task_id: values.taskid
                    },
                }),
              };

            
           // Conditionally use fetch based on action (PATCH, PUT, GET)
           if (action === "patch" || action === "put") {
            //    console.log('action:',action)
            //    console.log('url:',url)
            //    console.log(JSON.stringify(options));

                response =  await fetch(url, options).then((response) => {
                    // And we'll do some fancy stuff there.
                    //console.log("API Response:", response.data);
                    const alertDiv = document.querySelector('[data-controller="utils--header-alert"');
                    createRoot(alertDiv).render(<CustomAlert title='Notification' description="Your task has been successfully updated!" />);
                    setTimeout(() => {
                        alertDiv.innerHTML = '';  // Remove the rendered alert from the DOM
                    }, 10000);
                });
               //Turbo.turbo_stream.update(values.taskid, options);
           } else //if (action === "get") 
            {
                
                // console.log('action:',action)
                // console.log('url:',url)
                // console.log(JSON.stringify(options));
            response =  await fetch(url, options).then((response) => {
                // And we'll do some fancy stuff there.
                //console.log("API Response:", response.data);
                //const alertDiv = document.querySelector('[data-utils--header-alert-target="notice"]');
                // createRoot(alertDiv).render(<CustomAlert title='Notification' description="Your task has been successfully created!" />);
                // setTimeout(() => {
                //     alertDiv.innerHTML = '';  // Remove the rendered alert from the DOM
                // }, 10000);
                const editUrl = `/tasks/${values.taskid}/edit`; // Construct the edit URL
                Turbo.visit(editUrl);
            });
        }

            // Handle successful response
            //console.log("API Response:", response.data)
        } catch (error) {
            // Handle error
                console.error("Unexpected error:", error)
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
                    <form className="space-y-8 mb-8" onSubmit={form.handleSubmit(yourSubmitFunction)}>

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
                                        <Textarea rows="12" placeholder="Task title and description" {...field} />
                                    </FormControl>
                                    {/* <FormDescription>
                                        Task details.
                                    </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />



                        <Button type="submit"
                    //     onClick={(e)=>{
                    //     onSubmit(form.getValues());
                    // }}
                        className="mb-4 mr-4">{customLabel}</Button>
                        <Button variant="outline" onClick={navigateToTasks}>Back to tasks</Button>


                    </form>

                </Form>
            </CardContent>


        </Card>
    )
}