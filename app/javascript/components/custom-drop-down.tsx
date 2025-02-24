"use client"

import React, { forwardRef } from 'react';

import { Button } from "./button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command"  
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"

interface Field  {
  value: string;
  label: string;
}


const ComboboxPopover = forwardRef((props, ref) => {
// export function ComboboxPopover(props) {

  const getLabelForValue = (value) => {
    const item = props.values.find((entry) => entry.value === value);
    return item ? item : null; // Returns label or null if not found
  };

  // console.log('props'+JSON.stringify(props))
  // console.log('value: '+ 	props.value);
  // console.log('placeholder:'+ 	props.placeholder);
  //console.log('json:'+ 	JSON.stringify(props.values));

  const initialStatus = getLabelForValue(props.value);
  const Fields: Field[] =props.values
  const [open, setOpen] = React.useState(false)
  const [selectedStatus, setSelectedStatus] = React.useState<Field | null>
    (initialStatus)


  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm text-muted-foreground">{props.label}</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start" ref={ref}>
            {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set {props.label}</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder={`Change ${props.placeholder}...` }/>
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {Fields.map((field) => (
                  <CommandItem
                    key={field.value}
                    value={field.value}
                    onSelect={(value) => {
                      setSelectedStatus(
                        Fields.find((priority) => priority.value === value) ||
                          null
                      );
                      if (props.onSelect) {
                        props.onSelect(value);  // Call onSelect function passed from the parent
                      }
                      setOpen(false);
                    }}
                  >
                    {field.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
});
export default ComboboxPopover;
