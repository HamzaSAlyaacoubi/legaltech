"use client"

import { useState } from "react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  IconDotsVertical,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react"
import { Folder } from "lucide-react"
import { FolderPropertiesDialog } from "@/components/folder-properties-dialog"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface FolderTableItem {
  id: string
  folderName: string
  reference: string
  client: string
  responsible: string
  date: string
  elements: number
}

const sampleFolders: FolderTableItem[] = [
  {
    id: "1",
    folderName: "Q1 2024 Contracts",
    reference: "REF-001",
    client: "Acme Corp",
    responsible: "John Smith",
    date: "2024-01-15",
    elements: 8,
  },
  {
    id: "2",
    folderName: "Patent Applications",
    reference: "REF-002",
    client: "Tech Innovations",
    responsible: "Sarah Johnson",
    date: "2024-02-20",
    elements: 8,
  },
  {
    id: "3",
    folderName: "Employment Agreements",
    reference: "REF-003",
    client: "Global Systems",
    responsible: "Mike Davis",
    date: "2024-03-10",
    elements: 8,
  },
  {
    id: "4",
    folderName: "Merger Documentation",
    reference: "REF-004",
    client: "Capital Partners",
    responsible: "Emily Wilson",
    date: "2024-04-05",
    elements: 8,
  },
  {
    id: "5",
    folderName: "Compliance Files",
    reference: "REF-005",
    client: "Finance Group",
    responsible: "Robert Brown",
    date: "2024-04-25",
    elements: 8,
  },
]

export function FoldersTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(4)
  
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null)
  const [propertiesDialogOpen, setPropertiesDialogOpen] = useState(false)
  const totalItems = sampleFolders.length

  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
  const paginatedFolders = sampleFolders.slice(startIndex, endIndex)

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(parseInt(value))
    setCurrentPage(1)
  }

  const handleDetailsClick = (folderId: string) => {
    setSelectedFolderId(folderId)
    setPropertiesDialogOpen(true)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-4xl border bg-background">
        <Table>
          <TableHeader className="bg-table-header">
            <TableRow>
              <TableHead>Folder Name</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Responsable</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-12">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedFolders.map((folder) => (
              <TableRow key={folder.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <ContextMenu>
                      <ContextMenuTrigger>
                        <Link href={`/folders/${folder.id}`}>
                          <div className="flex items-center gap-2 font-medium transition-colors hover:text-primary">
                            <Folder className="h-4 w-4 fill-primary text-primary" />
                            {folder.folderName}
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
                        <ContextMenuItem className="text-destructive">
                          Delete
                        </ContextMenuItem>
                      </ContextMenuContent>
                    </ContextMenu>
                  </div>
                  <p className="pl-8 text-xs text-muted-foreground">
                    {folder.elements} Elements
                  </p>
                </TableCell>
                <TableCell>{folder.reference}</TableCell>
                <TableCell>{folder.client}</TableCell>
                <TableCell>
                  <div className="flex flex-1 items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    {folder.responsible}
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(folder.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
                        size="icon"
                      >
                        <IconDotsVertical />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Copy</DropdownMenuItem>
                      <DropdownMenuItem>Download</DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDetailsClick(folder.id)}
                      >
                        Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to {endIndex} of {totalItems} folders
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Folders per page
            </span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={handleItemsPerPageChange}
            >
              <SelectTrigger className="w-16">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="8">8</SelectItem>
                <SelectItem value="12">12</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              <IconChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              <IconChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>

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
