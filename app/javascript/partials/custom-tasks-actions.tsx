import React from 'react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../components/dropdown-menu"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "../components/drawer"

import { Button } from "../components/button"
import { Separator } from "../components/separator"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical, faEye, faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons'


export function CustomTaskActions({ task }) {

    const handleEditTask = () => {
        // Use Turbo to navigate to the new task page
        Turbo.visit('/tasks/' + task.task_id + '/edit');
    };

    return (
        <div>
            <DropdownMenu className="text-right">
                <DropdownMenuTrigger>
                        <FontAwesomeIcon className='h-5 w-5 px-2 py-2' icon={faEllipsisVertical} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <a href={'/tasks/' + task.task_id} data-turbo-method="delete"><FontAwesomeIcon icon={faTrashCan} className='mr-3' /> Delete</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleEditTask}>
                        <FontAwesomeIcon icon={faPen} className='mr-3' /> <span className="font-normal">Edit</span>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem>Task updates</DropdownMenuItem>
                    <DropdownMenuItem>Notification</DropdownMenuItem> */}
                </DropdownMenuContent>
            </DropdownMenu>

            <Drawer>
                <DrawerTrigger>
                    <span>
                    {/* <Button variant="link" size="icon" className="ml-2" > */}
                    <FontAwesomeIcon  className='h-5 w-5 px-2 py-2' icon={faEye} />
                    {/* </Button> */}
                    </span>
                </DrawerTrigger>
                <DrawerContent>

                    <div className="mx-auto w-full max-w-md">

                        <DrawerHeader>
                            <DrawerTitle></DrawerTitle>
                            <DrawerDescription></DrawerDescription>
                            <div className="items-center justify-items-center mt-8">

                                <div className="space-y-8">
                                    <h4 className="text-sm text-muted-foreground leading-none text-center">Task details</h4>
                                    <Separator className="my-8" />
                                    <p className="text-sm font-medium">
                                        {task.title}
                                    </p>
                                </div>
                                <Separator className="my-8" />
                                <div className="flex h-5 items-center space-x-4 text-sm">
                                    <label className='text-muted-foreground'>Priority</label>
                                    <span className="font-medium">  {task.priority} </span>
                                    <Separator orientation="vertical" />
                                    <label className='text-muted-foreground'>Status</label>
                                    <span className="font-medium">  {task.status} </span>
                                </div>

                            </div>
                        </DrawerHeader>
                        <DrawerFooter className="mb-8">
                            <DrawerClose className='text-primary underline-offset-4 hover:font-bold'>
                                {/* <Button variant="link"> */}
                                    Cancel
                                    {/* </Button> */}
                            </DrawerClose>
                        </DrawerFooter>


                    </div>
                </DrawerContent>
            </Drawer>





        </div>
    );
}