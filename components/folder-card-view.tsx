"use client"

import Link from "next/link"
import { FolderOpen, FileIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Folder } from "@/lib/folder-data"

interface FolderCardViewProps {
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

export function FolderCardView({
  subFolders,
  files,
  currentFolderPath,
}: FolderCardViewProps) {
  const pathIds = currentFolderPath.map((f) => f.id)
  const hasContent = subFolders.length > 0 || files.length > 0

  if (!hasContent) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-12">
        <FolderOpen className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
        <p className="text-lg font-medium text-muted-foreground">
          This folder is empty
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          No subfolders or files yet
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Subfolders */}
      {subFolders.map((folder) => {
        const href = `/folders/${[...pathIds, folder.id].join("/")}`
        return (
          <Link key={folder.id} href={href}>
            <Card className="h-full hover:shadow-lg hover:border-primary transition-all cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <FolderOpen className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <Badge variant="secondary" className="text-xs">
                    Folder
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  <h3 className="font-semibold line-clamp-2">{folder.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {folder.reference}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {folder.client}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(folder.date).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}

      {/* Files */}
      {files.map((file) => (
        <Card
          key={file.id}
          className="h-full hover:shadow-lg hover:border-primary transition-all cursor-pointer"
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <FileIcon className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
              <Badge variant="outline" className="text-xs">
                {file.type}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div>
              <h3 className="font-semibold line-clamp-2">{file.name}</h3>
              <p className="text-sm text-muted-foreground mt-2">{file.size}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(file.uploadedDate).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
