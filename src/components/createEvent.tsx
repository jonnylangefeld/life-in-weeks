import { Dispatch, SetStateAction, useState } from "react"
import { Button } from "./ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { cn } from "@/lib/utils"
import { Calendar } from "./ui/calendar"
import { format } from "date-fns"
import { CalendarDots } from "@phosphor-icons/react"

const eventSchema = z.object({
  title: z
    .string({
      required_error: "Please enter a title",
    })
    .min(2)
    .max(50),
  date: z.date({
    required_error: "Please pick a date",
  }),
  to_date: z.date({
    required_error: "Please pick a date",
  }),
})

interface Props {
  createEvent: () => Promise<void>
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function CreateEvent({ createEvent, setOpen }: Props) {
  const now = new Date()
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {},
  })
  function onSubmit(values: z.infer<typeof eventSchema>) {
    console.log(values)
    createEvent()
    setOpen(false)
    form.reset()
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create a new life event!</DialogTitle>
        <DialogDescription>Foobar</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>The title of the life event</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full flex-row flex-wrap justify-between gap-1 sm:flex-nowrap">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover modal>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          <CalendarDots className="h-full" size={32} />
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        captionLayout="dropdown"
                        fromYear={now.getFullYear() - 100}
                        toYear={now.getFullYear()}
                        disabled={(date) => date > now}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>The day this life event happened.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="to_date"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover modal>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          disabled
                          className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          <CalendarDots className="h-full" size={32} />
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        captionLayout="dropdown"
                        fromYear={now.getFullYear() - 100}
                        toYear={now.getFullYear()}
                        disabled
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>The day this life event happened.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}
