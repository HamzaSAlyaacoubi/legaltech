import Link from "next/link"
import { Download, Share2, Trash2, Edit, LayoutGrid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  getFolderByIdPath,
  getFolderPath,
  folderDatabase,
  getSubfolders,
} from "@/lib/folder-data"
import { FolderBreadcrumb } from "@/components/folder-breadcrumb"
import { FolderTreeSidebar } from "@/components/folder-tree-sidebar"
import { FolderListView } from "@/components/folder-list-view"

interface FolderDetailsPageProps {
  params: Promise<{
    slug: string[]
  }>
}

export default async function FolderDetailsPage({
  params,
}: FolderDetailsPageProps) {
  const { slug } = await params
  const currentFolder = getFolderByIdPath(slug)

  if (!currentFolder) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <h1 className="mb-4 text-2xl font-bold">Folder Not Found</h1>
        <p className="mb-6 text-muted-foreground">
          The folder you're looking for doesn't exist.
        </p>
        <Link href="/folders">
          <Button>Back to Folders</Button>
        </Link>
      </div>
    )
  }

  const folderPath = getFolderPath(currentFolder.id)
  const subFolders = getSubfolders(currentFolder.id)
  const files = currentFolder.files || []
  const activities = currentFolder.activities || []
  const rootFolders = Object.values(folderDatabase).filter((f) => !f.parentId)

  return (
    <FolderDetailsContent
      currentFolder={currentFolder}
      folderPath={folderPath}
      subFolders={subFolders}
      files={files}
      activities={activities}
      rootFolders={rootFolders}
    />
  )
}

function FolderDetailsContent({
  currentFolder,
  folderPath,
  subFolders,
  files,
  activities,
  rootFolders,
}: any) {
  // Sidebar layout

  return (
    <div className="flex flex-1 gap-6 px-4 py-4 md:px-6 md:py-6">
      {/* Sidebar */}
      {/* <FolderTreeSidebar
          folders={rootFolders}
          currentFolderId={currentFolder.id}
          folderPath={folderPath}
        /> */}

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        {/* Breadcrumb */}
        <FolderBreadcrumb folderPath={folderPath} />

        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold">{currentFolder.name}</h1>
            <p className="text-muted-foreground">{currentFolder.reference}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {/* <Button
                variant={viewMode === "card" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("card")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button> */}
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Client
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{currentFolder.client}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Responsible
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{currentFolder.responsible}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Depth Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{folderPath.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Created
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {new Date(currentFolder.date).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          </div> */}

        {/* Description */}
        {/* {currentFolder.description && (
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{currentFolder.description}</p>
              </CardContent>
            </Card>
          )} */}

        <div className="flex gap-1">
          {/* Sidebar */}
          <FolderTreeSidebar
            folders={rootFolders}
            currentFolder={currentFolder}
            folderPath={folderPath}
          />

          {/* Content View */}
          <FolderListView
            subFolders={subFolders}
            files={files}
            currentFolderPath={folderPath}
          />
        </div>

        {/* Activity Tab */}
        {/* <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {activities.length > 0 ? (
                <div className="space-y-4">
                  {activities.map((activity: any) => (
                    <div
                      key={activity.id}
                      className="flex gap-4 pb-4 border-b last:border-b-0"
                    >
                      <div className="flex flex-col gap-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.user} • {activity.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No activity yet</p>
              )}
            </CardContent>
          </Card> */}
      </div>
    </div>
  )
}
