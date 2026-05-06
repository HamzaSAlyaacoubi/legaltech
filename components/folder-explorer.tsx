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
import { Folder, getSubfolders } from "@/lib/folder-data"

interface FolderExplorerProps {
  currentFolder: Folder
  folderPath: Folder[]
}

export function FolderExplorer({ currentFolder, folderPath }: FolderExplorerProps) {
  const subFolders = getSubfolders(currentFolder.id)
  const files = currentFolder.files || []
  const pathIds = folderPath.map((f) => f.id)

  const hasContent = subFolders.length > 0 || files.length > 0

  return (
    <div className="space-y-6">
      {/* Subfolders Section */}
      {subFolders.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              Subfolders ({subFolders.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {subFolders.map((subFolder) => {
                const href = `/folders/${[...pathIds, subFolder.id].join("/")}`
                return (
                  <Link key={subFolder.id} href={href}>
                    <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent hover:border-primary transition-colors cursor-pointer group">
                      <FolderOpen className="h-5 w-5 text-primary shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate group-hover:text-primary transition-colors">
                          {subFolder.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {subFolder.reference}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Files Section */}
      {files.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileIcon className="h-5 w-5" />
              Files ({files.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader className="bg-table-header">
                  <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Uploaded Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {files.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <FileIcon className="h-4 w-4 text-muted-foreground" />
                          {file.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{file.type}</Badge>
                      </TableCell>
                      <TableCell>{file.size}</TableCell>
                      <TableCell>
                        {new Date(file.uploadedDate).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!hasContent && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FolderOpen className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
            <p className="text-lg font-medium text-muted-foreground">
              This folder is empty
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              No subfolders or files yet
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
