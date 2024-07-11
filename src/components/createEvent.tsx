import { Dispatch, SetStateAction, useState } from "react"
import { Button } from "./ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Popover, PopoverContent, PopoverPortal, PopoverTrigger } from "./ui/popover"
import { cn } from "@/lib/utils"
import { Calendar } from "./ui/calendar"
import { format } from "date-fns"
import { CalendarDots, Check, Prohibit } from "@phosphor-icons/react"
import { Color } from "@/lib/types"
import ColorItem from "./colorItem"
import EmojiPicker, { Theme } from "emoji-picker-react"

const eventSchema = z.object({
  emoji: z.string(),
  title: z
    .string({
      required_error: "Please enter a title",
    })
    .min(2)
    .max(50),
  color: z.enum([Object.values(Color)[0], ...Object.values(Color).map((color) => color.toLowerCase())]),
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
  const [color, setColor] = useState<Color | null>(null)
  const [emojiPopoverOpen, setEmojiPopoverOpen] = useState(false)
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
          <div className="flex flex-row gap-2">
            <FormField
              control={form.control}
              name="emoji"
              render={({ field }) => (
                <div className="relative aspect-square ">
                  <Button
                    variant={"outline"}
                    className={cn("flex items-center justify-center")}
                    onClick={(e) => {
                      e.preventDefault()
                      emojiPopoverOpen ? setEmojiPopoverOpen(false) : setEmojiPopoverOpen(true)
                    }}
                  >
                    P
                  </Button>
                  <div
                    className={cn(
                      "absolute bottom-0 left-[50%] aspect-square w-auto min-w-min -translate-x-1/2 translate-y-full transform",
                      !emojiPopoverOpen && "hidden"
                    )}
                  >
                    <EmojiPicker theme={Theme.AUTO} />
                  </div>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className={cn("flex-grow")}>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>The title of the life event</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <Popover modal>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                          field.value && `bg-${field.value}-200 dark:bg-${field.value}-300 dark:text-background`
                        )}
                      >
                        Pick a color
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent align="center" className={cn("w-auto max-w-max")}>
                    <div className="grid grid-cols-3 gap-1">
                      {Object.values(Color).map((c) => (
                        <ColorItem
                          key={c}
                          color={c}
                          active={c === color}
                          onClick={() => {
                            field.onChange(c.toLowerCase())
                            setColor(c)
                          }}
                        />
                      ))}
                      <button
                        className="col-span-2 flex min-h-min flex-row flex-nowrap items-center justify-center gap-3 rounded-md p-2 text-sm hover:bg-muted"
                        onClick={() => {
                          field.onChange(undefined)
                        }}
                      >
                        <span className={`flex h-5 w-5 items-center justify-center rounded-full`}>
                          <Prohibit size={32} />
                        </span>
                        No color
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
                <FormDescription>The background color of the life event</FormDescription>
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
                  <FormLabel>End Date</FormLabel>
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
                  <FormDescription>Only necessary for multi day events.</FormDescription>
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
