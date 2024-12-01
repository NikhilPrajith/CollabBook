import * as React from "react"
import { Plus } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  SidebarInput,
  SidebarGroup,
  SidebarGroupContent
} from "@/components/ui/sidebar"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"


// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  calendars: [
    {
      name: "My Calendars",
      items: ["Personal", "Work", "Family"],
    },
    {
      name: "Favorites",
      items: ["Holidays", "Birthdays"],
    },
    {
      name: "Other",
      items: ["Travel", "Reminders", "Deadlines"],
    },
  ],

  mails: [
    {
      name: "William Smith",
      email: "williamsmith@example.com",
      subject: "Meeting Tomorrow",
      date: "09:34 AM",
      teaser:
        "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
    },

    {
        name: "William Smith",
        email: "williamsmith@example.com",
        subject: "Meeting Tomorrow",
        date: "09:34 AM",
        teaser:
          "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
      },

    {
        name: "William Smith",
        email: "williamsmith@example.com",
        subject: "Meeting Tomorrow",
        date: "09:34 AM",
        teaser:
          "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
      },

    {
        name: "William Smith",
        email: "williamsmith@example.com",
        subject: "Meeting Tomorrow",
        date: "09:34 AM",
        teaser:
          "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
      },


    {
        name: "William Smith",
        email: "williamsmith@example.com",
        subject: "Meeting Tomorrow",
        date: "09:34 AM",
        teaser:
          "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
      },

    {
        name: "William Smith",
        email: "williamsmith@example.com",
        subject: "Meeting Tomorrow",
        date: "09:34 AM",
        teaser:
          "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
      },
      {
        name: "William Smith",
        email: "williamsmith@example.com",
        subject: "Meeting Tomorrow",
        date: "09:34 AM",
        teaser:
          "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
      },

    {
        name: "William Smith",
        email: "williamsmith@example.com",
        subject: "Meeting Tomorrow",
        date: "09:34 AM",
        teaser:
          "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
      },
    {
      name: "Alice Smith",
      email: "alicesmith@example.com",
      subject: "Re: Project Update",
      date: "Yesterday",
      teaser:
        "Thanks for the update. The progress looks great so far.\nLet's schedule a call to discuss the next steps.",
    },
    {
      name: "Bob Johnson",
      email: "bobjohnson@example.com",
      subject: "Weekend Plans",
      date: "2 days ago",
      teaser:
        "Hey everyone! I'm thinking of organizing a team outing this weekend.\nWould you be interested in a hiking trip or a beach day?",
    },
  ],
}

export function SidebarRight({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="none"
      className="sticky hidden lg:flex top-0 h-svh border-l"
      {...props}
    >
      <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-base font-medium text-foreground">
              Edits
            </div>
            <Label className="flex items-center gap-2 text-sm">
              <span>Unreads</span>
              <Switch className="shadow-none" />
            </Label>
          </div>
          <SidebarInput placeholder="Type to search..." />
        </SidebarHeader>
        <SidebarContent className="scrollbar-hide">
          <SidebarGroup className="px-0 scrollbar-hide">
            <SidebarGroupContent className="scrollbar-hide" >
              <div className="scrollbar-hide">
                {data.mails.map((mail, index) => (
                  <a
                    href="#"
                    key={index}
                    className="flex w-[-webkit-fill-available] flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <div className="flex w-auto items-center gap-2">
                      <span className="width-auto">{mail.name}</span>{" "}
                      <span className="ml-auto text-xs width-auto">{mail.date}</span>
                    </div>
                    <span className="font-medium width-auto">{mail.subject}</span>
                    <span className="line-clamp-2 whitespace-break-spaces text-xs width-[-webkit-fill-available]">
                      {mail.teaser}
                    </span>
                  </a>
                ))}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Plus />
              <span>New Calendar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
