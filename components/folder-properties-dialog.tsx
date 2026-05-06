"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { folderDatabase, Folder } from "@/lib/folder-data"
import { Folder as FolderIcon } from "lucide-react"

interface FolderPropertiesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  folderId: string
}

function calculateFolderSize(folderId: string): number {
  const folder = folderDatabase[folderId]
  if (!folder) return 0

  let totalSize = 0

  // Add files in current folder
  if (folder.files) {
    folder.files.forEach((file) => {
      const sizeMatch = file.size.match(/(\d+(?:\.\d+)?)\s*(B|KB|MB|GB)/)
      if (sizeMatch) {
        const value = parseFloat(sizeMatch[1])
        const unit = sizeMatch[2]
        const multiplier: Record<string, number> = {
          B: 1,
          KB: 1024,
          MB: 1024 * 1024,
          GB: 1024 * 1024 * 1024,
        }
        totalSize += value * (multiplier[unit] || 1)
      }
    })
  }

  // Recursively add files in subfolders
  Object.values(folderDatabase).forEach((subfolder) => {
    if (subfolder.parentId === folderId && subfolder.files) {
      subfolder.files.forEach((file) => {
        const sizeMatch = file.size.match(/(\d+(?:\.\d+)?)\s*(B|KB|MB|GB)/)
        if (sizeMatch) {
          const value = parseFloat(sizeMatch[1])
          const unit = sizeMatch[2]
          const multiplier: Record<string, number> = {
            B: 1,
            KB: 1024,
            MB: 1024 * 1024,
            GB: 1024 * 1024 * 1024,
          }
          totalSize += value * (multiplier[unit] || 1)
        }
      })
    }
  })

  return totalSize
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

function countNestedContent(folderId: string): { files: number; folders: number } {
  let fileCount = 0
  let folderCount = 0

  const folder = folderDatabase[folderId]
  if (!folder) return { files: 0, folders: 0 }

  // Count files in current folder
  if (folder.files) {
    fileCount += folder.files.length
  }

  // Recursively count nested files and folders
  const countRecursive = (parentId: string) => {
    Object.values(folderDatabase).forEach((subfolder) => {
      if (subfolder.parentId === parentId) {
        folderCount += 1
        if (subfolder.files) {
          fileCount += subfolder.files.length
        }
        countRecursive(subfolder.id)
      }
    })
  }

  countRecursive(folderId)

  return { files: fileCount, folders: folderCount }
}

function getLastModificationDate(folderId: string): string {
  const folder = folderDatabase[folderId]
  if (!folder) return "N/A"

  let latestDate: Date | null = null

  const folder_obj = folderDatabase[folderId]
  if (folder_obj?.files) {
    folder_obj.files.forEach((file) => {
      const fileDate = new Date(file.uploadedDate)
      if (!latestDate || fileDate > latestDate) {
        latestDate = fileDate
      }
    })
  }

  // Check nested folders for latest file
  const checkNested = (parentId: string) => {
    Object.values(folderDatabase).forEach((subfolder) => {
      if (subfolder.parentId === parentId && subfolder.files) {
        subfolder.files.forEach((file) => {
          const fileDate = new Date(file.uploadedDate)
          if (!latestDate || fileDate > latestDate) {
            latestDate = fileDate
          }
        })
        checkNested(subfolder.id)
      }
    })
  }

  checkNested(folderId)

  if (latestDate) {
    return latestDate.toLocaleDateString()
  }
  return folder.date ? new Date(folder.date).toLocaleDateString() : "N/A"
}

export function FolderPropertiesDialog({
  open,
  onOpenChange,
  folderId,
}: FolderPropertiesDialogProps) {
  const folder = folderDatabase[folderId]
  const [folderName, setFolderName] = useState(folder?.name || "")
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
  if (folder) {
    setFolderName(folder.name)
    setHasChanges(false)
  }
}, [folderId])

  if (!folder) {
    return null
  }

  const folderSize = calculateFolderSize(folderId)
  const { files: fileCount, folders: folderCount } = countNestedContent(folderId)
  const lastModified = getLastModificationDate(folderId)

  const handleFolderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value)
    setHasChanges(true)
  }

  const handleSave = () => {
    // Save changes - in a real app, this would update the database
    if (folder.name !== folderName) {
      folder.name = folderName
    }
    setHasChanges(false)
    onOpenChange(false)
  }

  const handleCancel = () => {
    setFolderName(folder.name)
    setHasChanges(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl gap-0 p-0">
        <DialogHeader className="border-b px-6 py-4">
          <div className="flex items-center gap-2">
            <FolderIcon className="h-5 w-5 fill-primary text-primary" />
            <DialogTitle>{folder.name}</DialogTitle>
          </div>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full min-h-[430px]">
          <TabsList className="grid w-full grid-cols-3 rounded-none border-b bg-background px-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="share">Share</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <div className="p-6">
            <TabsContent value="general" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="folder-name">Folder Name</Label>
                <Input
                  id="folder-name"
                  value={folderName}
                  onChange={handleFolderNameChange}
                  placeholder="Enter folder name"
                />
              </div>

              <Separator className="my-4" />

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label className="text-sm text-muted-foreground">Type</Label>
                  <p className="text-sm font-medium">Folder</p>
                </div>

                <div className="space-y-1">
                  <Label className="text-sm text-muted-foreground">Size</Label>
                  <p className="text-sm font-medium">{formatBytes(folderSize)}</p>
                </div>

                <div className="space-y-1">
                  <Label className="text-sm text-muted-foreground">
                    Created
                  </Label>
                  <p className="text-sm font-medium">
                    {new Date(folder.date).toLocaleDateString()}
                  </p>
                </div>

                <div className="space-y-1">
                  <Label className="text-sm text-muted-foreground">
                    Modified
                  </Label>
                  <p className="text-sm font-medium">{lastModified}</p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-1">
                <Label className="text-sm text-muted-foreground">Content</Label>
                <div className="grid grid-cols-2 gap-4 rounded-lg border bg-muted/30 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Files</span>
                    <span className="text-md font-semibold text-primary">
                      {fileCount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Folders</span>
                    <span className="text-md font-semibold text-primary">
                      {folderCount}
                    </span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="share" className="py-8">
              <div className="flex items-center justify-center text-muted-foreground">
                <p>Share settings coming soon</p>
              </div>
            </TabsContent>

            <TabsContent value="security" className="py-8">
              <div className="flex items-center justify-center text-muted-foreground">
                <p>Security settings coming soon</p>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <Separator />

        <div className="flex justify-end gap-3 px-6 py-4">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="min-w-24"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!hasChanges}
            className="min-w-24"
          >
            Change
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
