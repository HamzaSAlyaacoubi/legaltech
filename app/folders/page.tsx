import { FoldersTable } from "@/components/folders-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
              <Input placeholder="Search folders..." className="max-w-sm" />
              <Select>
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button variant="outline">New Folder</Button>
            </div>
          </div>
          <FoldersTable />
        </div>
      </div>
    </div>
  )
}
