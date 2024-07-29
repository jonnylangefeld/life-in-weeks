import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { cn } from "@/lib/utils"
import { Calendar } from "./ui/calendar"
import { format } from "date-fns"
import { CalendarDots, Confetti, Prohibit } from "@phosphor-icons/react"
import { Color } from "@/lib/types"
import ColorItem from "./colorItem"
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react"
import { toast } from "sonner"
import { createClient } from "@/utils/supabase/client"
import { Event } from "@/lib/database.types"
import { Loader2 } from "lucide-react"

const eventSchema = z.object({
  emoji: z.string().optional(),
  title: z
    .string({
      errorMap: (issue: z.ZodIssueOptionalMessage, ctx) => {
        if (issue.code == "invalid_type") {
          return { message: "Please enter a title" }
        }
        if (issue.code == "too_small") {
          return { message: "The title should be more than 1 character" }
        }
        if (issue.code == "too_big") {
          return { message: "The title should be less than 50 characters" }
        }
        return z.defaultErrorMap(issue, ctx)
      },
    })
    .min(2)
    .max(50),
  color: z.enum([Object.values(Color)[0], ...Object.values(Color).map((color) => color.toLowerCase())]).optional(),
  date: z.date({
    required_error: "Please pick a date",
  }),
  to_date: z.date({}).optional(),
})

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>
  upsertEvent: (event: Event) => void
  event?: Event
}

export default function UpsertEvent(props: Props) {
  const supabase = createClient()
  const now = new Date()
  const [emojiPopoverOpen, setEmojiPopoverOpen] = useState(false)
  const emojiPopoverContainerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof eventSchema>>({
    defaultValues: props.event,
  })

  const onSubmit = async (values: z.infer<typeof eventSchema>) => {
    setLoading(true)
    try {
      const result = eventSchema.safeParse(values)
      if (!result.success) {
        toast.error(
          result.error.errors
            .map((e) => {
              return e.message
            })
            .join(" & ")
        )
        return
      }

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (error) {
        toast.error("Authentication error:" + error.message)
        return
      }

      if (!user) {
        toast.error("Please log in to create an event")
        return
      }

      const event = {
        user_id: user.id,
        ...values,
      } as Event
      const { data, error: insertError } = await supabase.from("events").upsert(event)
      if (insertError) {
        toast.error("Failed to create event: " + insertError.message)
        return
      }

      toast.success(`${props.event ? "Updated" : "Created"} "${[event.emoji, event.title].join(" ")}"`)

      // form.reset()
      props.upsertEvent(event)
      props.setOpen(false)
    } finally {
      setLoading(false)
    }
  }

  const handleEmojiPopoverClick = useCallback((event: MouseEvent) => {
    if (emojiPopoverContainerRef.current) {
      const rect = emojiPopoverContainerRef.current.getBoundingClientRect()
      if (
        event.clientX < rect.left ||
        event.clientX > rect.left + rect.width ||
        event.clientY < rect.top ||
        event.clientY > rect.top + rect.height
      ) {
        openEmojiPopover(false)
      }
    }
  }, [])

  const openEmojiPopover = (open: boolean) => {
    setEmojiPopoverOpen(open)
    if (open) {
      document.addEventListener("click", handleEmojiPopoverClick, true)
    } else {
      document.removeEventListener("click", handleEmojiPopoverClick, true)
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Live Event</DialogTitle>
        <DialogDescription>
          {props.event ? "Edit" : "Fill out"} the fields below and hit {props.event ? "'Save'" : "'Create'"}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-6">
          <FormItem>
            <FormLabel>Emoji & Title</FormLabel>
            <div className="flex flex-row gap-2">
              <FormField
                control={form.control}
                name="emoji"
                render={({ field }) => (
                  <div className="relative ">
                    <Button
                      variant={"outline"}
                      className={cn("flex aspect-square items-center justify-center p-0")}
                      onClick={(e) => {
                        e.preventDefault()
                        openEmojiPopover(true)
                      }}
                    >
                      {field.value ? field.value : <Confetti className="h-full py-2 text-muted-foreground" size={32} />}
                    </Button>
                    <div
                      ref={emojiPopoverContainerRef}
                      className={cn(
                        "absolute bottom-0 left-[50%] w-auto min-w-min -translate-x-1/2 translate-y-full transform",
                        !emojiPopoverOpen && "hidden"
                      )}
                    >
                      <EmojiPicker
                        theme={Theme.AUTO}
                        width={350}
                        height={450}
                        onEmojiClick={(e: EmojiClickData) => field.onChange(e.emoji)}
                      />
                    </div>
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <Input type="text" value={field.value ? field.value : ""} onChange={field.onChange} />
                )}
              />
              <FormMessage />
            </div>
            <FormDescription>Choose an emoji and title for your life event</FormDescription>
            <FormMessage />
          </FormItem>
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
                          active={c === field.value}
                          onClick={() => {
                            field.onChange(c.toLowerCase())
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
                  <FormDescription>The day this life event happened</FormDescription>
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
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Only select for multi day events</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Loading..." : props.event ? "Save" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}
