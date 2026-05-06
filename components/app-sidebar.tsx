"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconLayoutDashboard,
  IconSitemap,
  IconListCheck,
  IconCalendarWeek,
  IconMessageCircle,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

import Logo from "@/public/img/logobgless.png"
import Image from "next/image"

const data = {
  user: {
    name: "Hamza",
    email: "Hamza@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconLayoutDashboard,
    },
    {
      title: "Generate Contract",
      url: "/generate-contract",
      icon: IconFileDescription,
    },
    {
      title: "Folders",
      url: "/folders",
      icon: IconFolder,
    },
    {
      title: "Clients",
      url: "/clients",
      icon: IconUsers,
    },
    {
      title: "Processes",
      url: "/processes",
      icon: IconSitemap,
    },
    {
      title: "Chatbot",
      url: "/chatbot",
      icon: IconMessageCircle,
    },
    {
      title: "Tasks",
      url: "/tasks",
      icon: IconListCheck,
    },
    {
      title: "Agenda",
      url: "/agenda",
      icon: IconCalendarWeek,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
  ],
  // navClouds: [
  //   {
  //     title: "Capture",
  //     icon: IconCamera,
  //     isActive: true,
  //     url: "#",
  //     items: [
  //       {
  //         title: "Active Proposals",
  //         url: "#",
  //       },
  //       {
  //         title: "Archived",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Proposal",
  //     icon: IconFileDescription,
  //     url: "#",
  //     items: [
  //       {
  //         title: "Active Proposals",
  //         url: "#",
  //       },
  //       {
  //         title: "Archived",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Prompts",
  //     icon: IconFileAi,
  //     url: "#",
  //     items: [
  //       {
  //         title: "Active Proposals",
  //         url: "#",
  //       },
  //       {
  //         title: "Archived",
  //         url: "#",
  //       },
  //     ],
  //   },
  // ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
}

function SidebarHeaderContent() {
  const { state } = useSidebar()
  const [isHovered, setIsHovered] = React.useState(false)
  const isCollapsed = state === "collapsed"

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          className="rounded-xl p-0 data-[slot=sidebar-menu-button]:p-1.5! data-[slot=sidebar-menu-button]:py-7!"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          size="sm"
        >
          <div
            className={`flex w-full items-center ${
              isCollapsed ? "justify-center" : "justify-between"
            }`}
          >
            <Image
              src={Logo}
              alt="Logo"
              className={` ${isCollapsed ? "mx-auto size-8" : "size-10"} ${isCollapsed && isHovered ? "hidden" : ""} `}
            />
            {!isCollapsed && (
              <span>
                <p className="text-base font-semibold text-logo">LegalTech</p>
                <p className="text-[0.6rem] text-muted-foreground">
                  BY HELKINZ
                </p>
              </span>
            )}
            {/* Show trigger when hovering (if collapsed) or always (if open) */}
            {(isHovered || !isCollapsed) && (
              <SidebarTrigger className="ml-auto" />
            )}
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarHeaderContent />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/*<NavDocuments items={data.documents} />*/}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
