import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/table"



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFilter } from '@fortawesome/free-solid-svg-icons'

import { Card, CardHeader, CardContent } from "../components/card"
import { Button } from "../components/button"
import { Turbo } from "@hotwired/turbo-rails";
import { CustomTaskActions } from "../partials/custom-tasks-actions"
import { format } from 'date-fns';


function Tasks({ tasks, newTaskUrl }) {

  const handleNewTask = () => {
    // Use Turbo to navigate to the new task page
    Turbo.visit(newTaskUrl);
  };

  return (
    <Card className="rounded-md border">
      <CardHeader>
        <div className='flex justify-between'>
          <div className="text-2xl font-bold tracking-tight">Tasks</div>
          <div className="mr-6">
            <Button variant="outline" className='mr-3'><FontAwesomeIcon icon={faFilter} /></Button>
            <Button onClick={handleNewTask}><FontAwesomeIcon icon={faPlus} /></Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption className="mb-4 mt-10">List of tasks.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px] pl-5">Task</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Date created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.task_id} className="border-b">
                <TableCell className="pl-5">{task.task_id}</TableCell>
                <TableCell className="font-medium max-w-prose">{task.title}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>{format(new Date(task.created_at), 'dd-MMM-yyyy hh:mm a')}</TableCell>
                <TableCell>
                  <CustomTaskActions task={task} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>

  )
}

export default Tasks;