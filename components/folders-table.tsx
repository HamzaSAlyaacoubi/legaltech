"use client"

import { useState } from "react"
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
import { IconDotsVertical, IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import { Folder } from "lucide-react"

interface Folder {
  id: string
  folderName: string
  reference: string
  client: string
  responsible: string
  date: string
  elements: number
}

const sampleFolders: Folder[] = [
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
  const totalItems = 24

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
                <TableCell className="font-medium "> 
                  <div className="flex items-center gap-2">
                    <Folder className="text-primary fill-primary" />
                     {folder.folderName}
                  </div>
                    <p className="text-muted-foreground text-xs pl-8">{folder.elements} Elements</p>
                </TableCell>
                <TableCell>{folder.reference}</TableCell>
                <TableCell>{folder.client}</TableCell>
                <TableCell>{folder.responsible}</TableCell>
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
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>View</DropdownMenuItem>
                      <DropdownMenuItem>Download</DropdownMenuItem>
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
            <span className="text-sm text-muted-foreground">Folders per page</span>
            <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
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
    </div>
  )
}
