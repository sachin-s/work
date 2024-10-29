import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"

import {Card,CardHeader, CardContent } from "./card"
import { Button } from "./button"

function Tasks({tasks}) {
  return (
    <Card className="m-20">
      <CardHeader>
        <div className='flex justify-between'>
          <div>Tasks</div>
          <div>
            <Button className='mr-3'>New task</Button>
            <Button variant="outline">Columns</Button>
          </div>
        </div>  
      </CardHeader>
      <CardContent>
    <Table>
      <TableCaption>List of tasks.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">Task</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Priority</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
          {tasks.map((task) => (
              <TableRow key={task.task_id}>
                <TableCell className="font-medium">{task.task_id}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell className="text-right">{task.priority}</TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
    </CardContent>
    </Card>

  )
}

export default Tasks;