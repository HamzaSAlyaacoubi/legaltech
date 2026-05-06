import { FoldersTable } from "@/components/folders-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  CustomSelectTrigger,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Upload, ListFilter, FolderPlus } from "lucide-react"
import { IconSearch } from "@tabler/icons-react"


export default function Folders() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:py-6 lg:px-6">

          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-2xl font-bold">Folders</h1>
              <p className="text-muted-foreground">
                Manage your folders and their contents.
              </p>
            </div>
            <div className="flex items-end justify-end gap-2">
              <div className="relative ">
                <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
                <Input
                  placeholder="Search folders..."
                  className="pl-9"
                />
              </div>
              <Select>
                <CustomSelectTrigger>
                  <ListFilter />
                  <SelectValue placeholder="Filter" />
                </CustomSelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Filter by</SelectLabel>
                    <SelectItem value="name">Folder Name</SelectItem>
                    <SelectItem value="reference">Reference</SelectItem>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="responsable">Responsable</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                  </SelectGroup>
                    <Separator orientation="horizontal"/>
                  <SelectGroup>
                    <SelectItem value="asc">Ascending</SelectItem>
                    <SelectItem value="desc">Descending</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div className="flex gap-0 border-primary border rounded-4xl text-primary">
                <Button variant="outline" className="border-0 hover:bg-primary/10 rounded-r-none">
                  <FolderPlus className="w-4 h-4 mr-2" />
                  New Folder
                </Button>
                <Separator orientation="vertical" className="bg-primary"/>
                <Button variant="ghost" className="border-0 hover:bg-primary/10 rounded-l-none">
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
 
            </div>
          </div>
          <FoldersTable />
        </div>
      </div>
    </div>
  )
}
