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

function Tasks({tasks}) {
  return (
    <div>
    <Table>
      <TableCaption>A list of tasks.</TableCaption>
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
    </div>

  )
}

export default Tasks;