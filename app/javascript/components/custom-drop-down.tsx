"use client"

import * as React from "react"

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



export function ComboboxPopover({label, values, placeholder}) {

  const getLabelForValue = (value) => {
    const item = values.find((entry) => entry.value === value);
    return item ? item : null; // Returns label or null if not found
  };

  // console.log('label'+ 	label);
  // console.log('placeholder:'+ 	placeholder);
  console.log('json:'+ 	JSON.stringify(values));

  const Fields: Field[] =values
  const [open, setOpen] = React.useState(false)
  const [selectedStatus, setSelectedStatus] = React.useState<Field | null>(
    getLabelForValue(getLabelForValue[label.toLowerCase()])
  )

  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set {label}</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change {status}..." />
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
                      )
                      setOpen(false)
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
}
