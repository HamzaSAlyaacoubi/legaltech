"use client"

import Link from "next/link"
import { FolderOpen, FileIcon, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Folder } from "@/lib/folder-data"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu"
import { useState } from "react"
import { FolderPropertiesDialog } from "./folder-properties-dialog"

interface FolderListViewProps {
  subFolders: Folder[]
  files: Array<{
    id: string
    name: string
    size: string
    uploadedDate: string
    type: string
  }>
  currentFolderPath: Folder[]
}

export function FolderListView({
  subFolders,
  files,
  currentFolderPath,
}: FolderListViewProps) {
  const pathIds = currentFolderPath.map((f) => f.id)
  const hasContent = subFolders.length > 0 || files.length > 0

  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null)
  const [propertiesDialogOpen, setPropertiesDialogOpen] = useState(false)

  const handleDetailsClick = (folderId: string) => {
    setSelectedFolderId(folderId)
    setPropertiesDialogOpen(true)
  }

  if (!hasContent) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FolderOpen className="mb-4 h-12 w-12 text-muted-foreground opacity-50" />
          <p className="text-lg font-medium text-muted-foreground">
            This folder is empty
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            No subfolders or files yet
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="flex-1 overflow-hidden rounded-lg border">
      <Table>
        <TableHeader className="bg-table-header">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Reference</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Subfolders */}
          {subFolders.map((folder) => {
            const href = `/folders/${[...pathIds, folder.id].join("/")}`
            return (
              <TableRow key={folder.id} className="hover:bg-muted/50">
                <TableCell>
                  <ContextMenu>
                    <ContextMenuTrigger>
                      <Link href={href}>
                        <div className="flex items-center gap-2 font-medium transition-colors hover:text-primary">
                          <FolderOpen className="h-4 w-4 text-primary" />
                          {folder.name}
                        </div>
                      </Link>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem>Copy</ContextMenuItem>
                      <ContextMenuItem>Download</ContextMenuItem>
                      <ContextMenuItem
                        onClick={() => handleDetailsClick(folder.id)}
                      >
                        Details
                      </ContextMenuItem>
                      <ContextMenuItem className="text-destructive">Delete</ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                </TableCell>
                <TableCell>
                  <Badge>Folder</Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {folder.reference}
                </TableCell>
                <TableCell className="text-sm">{folder.client}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  —
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(folder.date).toLocaleDateString()}
                </TableCell>
              </TableRow>
            )
          })}

          {/* Files */}
          {files.map((file) => (
            <TableRow key={file.id} className="hover:bg-muted/50">
              <TableCell>
                <div className="flex items-center gap-2 font-medium">
                  <FileIcon className="h-4 w-4 text-blue-500" />
                  {file.name}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{file.type}</Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">—</TableCell>
              <TableCell className="text-sm text-muted-foreground">—</TableCell>
              <TableCell className="text-sm">{file.size}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {new Date(file.uploadedDate).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedFolderId && (
        <FolderPropertiesDialog
          open={propertiesDialogOpen}
          onOpenChange={setPropertiesDialogOpen}
          folderId={selectedFolderId}
        />
      )}
    </div>
  )
}
