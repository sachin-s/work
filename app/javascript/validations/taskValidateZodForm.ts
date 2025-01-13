import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const taskFormSchema = z.object({
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

const form = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
        taskid: "",
        title: "",
        status: "",
        priority: "",
    },
})

