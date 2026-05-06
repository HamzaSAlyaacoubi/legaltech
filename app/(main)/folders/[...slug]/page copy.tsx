"use client"

import { useState } from "react"
import Link from "next/link"
import { Download, Share2, Trash2, Edit, LayoutGrid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getFolderByIdPath, getFolderPath, folderDatabase, getSubfolders } from "@/lib/folder-data"
import { FolderBreadcrumb } from "@/components/folder-breadcrumb"
import { FolderTreeSidebar } from "@/components/folder-tree-sidebar"
import { FolderCardView } from "@/components/folder-card-view"
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
        <h1 className="text-2xl font-bold mb-4">Folder Not Found</h1>
        <p className="text-muted-foreground mb-6">
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

  return <FolderDetailsContent
    currentFolder={currentFolder}
    folderPath={folderPath}
    subFolders={subFolders}
    files={files}
    activities={activities}
    rootFolders={rootFolders}
  />
}

function FolderDetailsContent({
  currentFolder,
  folderPath,
  subFolders,
  files,
  activities,
  rootFolders,
}: any) {
  const [layoutMode, setLayoutMode] = useState<"classic" | "sidebar">("classic")
  const [viewMode, setViewMode] = useState<"card" | "list">("card")

  // Sidebar layout
  if (layoutMode === "sidebar") {
    return (
      <div className="flex flex-1 gap-6 px-4 py-4 md:px-6 md:py-6">
        {/* Sidebar */}
        <FolderTreeSidebar
          folders={rootFolders}
          currentFolderId={currentFolder.id}
          folderPath={folderPath}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          {/* Breadcrumb */}
          <FolderBreadcrumb folderPath={folderPath} />

          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{currentFolder.name}</h1>
              <p className="text-muted-foreground">{currentFolder.reference}</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={layoutMode === "sidebar" ? "outline" : "default"}
                size="sm"
                onClick={() => setLayoutMode("classic")}
              >
                Classic
              </Button>
              <Button
                variant={layoutMode === "sidebar" ? "default" : "outline"}
                size="sm"
                onClick={() => setLayoutMode("sidebar")}
              >
                Sidebar
              </Button>
              <Button
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
              </Button>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
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
          </div>

          {/* Description */}
          {currentFolder.description && (
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{currentFolder.description}</p>
              </CardContent>
            </Card>
          )}

          {/* Content View */}
          {viewMode === "card" ? (
            <FolderCardView
              subFolders={subFolders}
              files={files}
              currentFolderPath={folderPath}
            />
          ) : (
            <FolderListView
              subFolders={subFolders}
              files={files}
              currentFolderPath={folderPath}
            />
          )}

          {/* Activity Tab */}
          <Card>
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
          </Card>
        </div>
      </div>
    )
  }

  // Classic layout
  return (
    <div className="flex flex-1 flex-col gap-6 px-4 py-4 md:px-6 md:py-6">
      {/* Breadcrumb */}
      <FolderBreadcrumb folderPath={folderPath} />

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{currentFolder.name}</h1>
          <p className="text-muted-foreground">{currentFolder.reference}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={(layoutMode as string) === "sidebar" ? "outline" : "default"}
            size="sm"
            onClick={() => setLayoutMode("classic")}
          >
            Classic
          </Button>
          <Button
            variant={(layoutMode as string) === "sidebar" ? "default" : "outline"}
            size="sm"
            onClick={() => setLayoutMode("sidebar")}
          >
            Sidebar
          </Button>
          <Button
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
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
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
      </div>

      {/* Description */}
      {currentFolder.description && (
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{currentFolder.description}</p>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <Tabs defaultValue="contents" className="w-full">
        <TabsList>
          <TabsTrigger value="contents">Contents</TabsTrigger>
          <TabsTrigger value="activity">Activity ({activities.length})</TabsTrigger>
        </TabsList>

        {/* Contents Tab */}
        <TabsContent value="contents" className="mt-6">
          {viewMode === "card" ? (
            <FolderCardView
              subFolders={subFolders}
              files={files}
              currentFolderPath={folderPath}
            />
          ) : (
            <FolderListView
              subFolders={subFolders}
              files={files}
              currentFolderPath={folderPath}
            />
          )}
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="mt-6">
          <Card>
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
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
