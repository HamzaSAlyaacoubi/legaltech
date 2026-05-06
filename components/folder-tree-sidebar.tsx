"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Folder, FolderOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { Folder as FolderType, getSubfolders } from "@/lib/folder-data"

import { IconArrowAutofitLeft } from "@tabler/icons-react"
import { IconArrowAutofitLeftFilled } from "@tabler/icons-react"
import { IconArrowAutofitRight } from "@tabler/icons-react"
import { IconArrowAutofitRightFilled } from "@tabler/icons-react"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"

interface FolderTreeSidebarProps {
  folders: FolderType[]
  currentFolder: FolderType
  folderPath: FolderType[]
}

interface TreeNodeProps {
  folder: FolderType
  isCurrentFolder: boolean
  isInPath: boolean
  level: number
  pathIds: string[]
}

function TreeNode({
  folder,
  isCurrentFolder,
  isInPath,
  level,
  pathIds,
}: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(isInPath)
  const subfolders = getSubfolders(folder.id)
  const hasChildren = subfolders.length > 0

  const href = `/folders/${[...pathIds, folder.id].join("/")}`

  return (
    <div className="space-y-1">
      <Link href={href}>
        <div
          className={cn(
            "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground",
            isCurrentFolder && "bg-primary/10 font-medium text-primary"
          )}
          style={{ paddingLeft: `${level * 16 + 12}px` }}
        >
          {hasChildren && (
            <button
              onClick={(e) => {
                e.preventDefault()
                setIsExpanded(!isExpanded)
              }}
              className="rounded p-0 hover:bg-primary/5"
            >
              <ChevronRight
                className={cn(
                  "h-4 w-4 transition-transform",
                  isExpanded && "rotate-90"
                )}
              />
            </button>
          )}
          {!hasChildren && <div className="w-4" />}

          {isExpanded || isCurrentFolder ? (
            <FolderOpen className="h-4 w-4" />
          ) : (
            <Folder className="h-4 w-4" />
          )}

          <span className="truncate text-sm">{folder.name}</span>
        </div>
      </Link>

      {hasChildren && isExpanded && (
        <div>
          {subfolders.map((subfolder) => (
            <TreeNode
              key={subfolder.id}
              folder={subfolder}
              isCurrentFolder={subfolder.id === folder.id}
              isInPath={
                subfolder.id ===
                pathIds.find((id) =>
                  getSubfolders(folder.id).some((f) => f.id === id)
                )
              }
              level={level + 1}
              pathIds={[...pathIds, folder.id]}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function FolderTreeSidebar({
  folders,
  currentFolder,
  folderPath,
}: FolderTreeSidebarProps) {
  const pathIds = folderPath.slice(0, -1).map((f) => f.id)

  const [isCollapsed, setIsCollapsed] = useState(true)

  if (!isCollapsed) {
    return (
      <>
        <Card className="w-64 gap-3 rounded-lg bg-muted/30 p-0 text-sm font-semibold shadow-none ring-1 transition-all duration-300">
          <CardHeader className="flex items-center justify-between rounded-t-lg bg-table-header px-3 py-2">
            <CardTitle className="text-md">{currentFolder.name}</CardTitle>
            <IconArrowAutofitLeft
              className="h-4 w-4 cursor-pointer"
              onClick={() => setIsCollapsed(true)}
            />
          </CardHeader>

          <CardContent className="p-0">
            <div className="space-y-1">
              {folders.map((folder) => (
                <TreeNode
                  key={folder.id}
                  folder={folder}
                  isCurrentFolder={folder.id === currentFolder.id}
                  isInPath={pathIds.includes(folder.id)}
                  level={0}
                  pathIds={[]}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </>
    )
  }
  return (
    <Card className="flex w-10 items-center justify-center rounded-lg bg-muted/30 p-0 shadow-none transition-all duration-300 hover:bg-table-header cursor-pointer"
      onClick={() => setIsCollapsed(false)}
    >
      <IconArrowAutofitRight
        className="h-4 w-4 cursor-pointer"
        
      />
    </Card>
  )
}
