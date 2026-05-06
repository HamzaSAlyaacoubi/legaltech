import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Folder } from "@/lib/folder-data"

interface FolderBreadcrumbProps {
  folderPath: Folder[]
}

export function FolderBreadcrumb({ folderPath }: FolderBreadcrumbProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Link
        href="/folders"
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        Folders
      </Link>

      {folderPath.map((folder, index) => {
        const href = `/folders/${folderPath
          .slice(0, index + 1)
          .map((f) => f.id)
          .join("/")}`

        const isLast = index === folderPath.length - 1

        return (
          <div key={folder.id} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            {isLast ? (
              <span className="font-medium text-foreground">{folder.name}</span>
            ) : (
              <Link
                href={href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {folder.name}
              </Link>
            )}
          </div>
        )
      })}
    </div>
  )
}
