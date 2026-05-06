export interface File {
  id: string
  name: string
  size: string
  uploadedDate: string
  type: string
}

export interface FolderActivity {
  id: string
  action: string
  user: string
  timestamp: string
}

export interface Folder {
  id: string
  name: string
  reference: string
  client: string
  responsible: string
  date: string
  description?: string
  parentId?: string
  subFolders?: Folder[]
  files?: File[]
  activities?: FolderActivity[]
}

// All folders flattened at top level for easy access
export const folderDatabase: Record<string, Folder> = {
  // Root folders
  "1": {
    id: "1",
    name: "Q1 2024 Contracts",
    reference: "REF-001",
    client: "Acme Corp",
    responsible: "John Smith",
    date: "2024-01-15",
    description: "Contains all contracts signed during Q1 2024 for Acme Corporation including service agreements and licensing deals.",
    files: [
      { id: "1-1", name: "Contract_Summary.xlsx", size: "256 KB", uploadedDate: "2024-03-15", type: "XLSX" },
    ],
    activities: [
      { id: "1", action: "Folder created", user: "John Smith", timestamp: "2024-01-15 09:30" },
      { id: "2", action: "File uploaded: Contract_Summary.xlsx", user: "John Smith", timestamp: "2024-03-15 10:00" },
    ],
  },
  "1-1": {
    id: "1-1",
    name: "Service Agreements",
    reference: "REF-001-SA",
    client: "Acme Corp",
    responsible: "John Smith",
    date: "2024-01-15",
    parentId: "1",
    description: "Service agreements with clients",
    files: [
      { id: "1-1-1", name: "Service_Agreement_Acme.pdf", size: "2.4 MB", uploadedDate: "2024-01-15", type: "PDF" },
      { id: "1-1-2", name: "Service_Agreement_Tech.pdf", size: "1.8 MB", uploadedDate: "2024-01-16", type: "PDF" },
    ],
    activities: [
      { id: "1", action: "Folder created", user: "John Smith", timestamp: "2024-01-15 09:30" },
      { id: "2", action: "File uploaded: Service_Agreement_Acme.pdf", user: "John Smith", timestamp: "2024-01-15 10:00" },
    ],
  },
  "1-2": {
    id: "1-2",
    name: "Licensing Deals",
    reference: "REF-001-LD",
    client: "Acme Corp",
    responsible: "John Smith",
    date: "2024-01-16",
    parentId: "1",
    description: "All licensing agreements and deals",
    files: [
      { id: "1-2-1", name: "License_Agreement.pdf", size: "1.8 MB", uploadedDate: "2024-01-16", type: "PDF" },
    ],
    activities: [
      { id: "1", action: "Folder created", user: "John Smith", timestamp: "2024-01-16 09:00" },
    ],
  },
  "1-2-1": {
    id: "1-2-1",
    name: "Software Licenses",
    reference: "REF-001-LD-SL",
    client: "Acme Corp",
    responsible: "John Smith",
    date: "2024-01-16",
    parentId: "1-2",
    files: [
      { id: "1-2-1-1", name: "Software_License_2024.pdf", size: "1.2 MB", uploadedDate: "2024-01-16", type: "PDF" },
    ],
    activities: [
      { id: "1", action: "Folder created", user: "John Smith", timestamp: "2024-01-16 10:00" },
    ],
  },
  "1-2-2": {
    id: "1-2-2",
    name: "Media Licenses",
    reference: "REF-001-LD-ML",
    client: "Acme Corp",
    responsible: "John Smith",
    date: "2024-01-17",
    parentId: "1-2",
    files: [
      { id: "1-2-2-1", name: "Media_License.pdf", size: "890 KB", uploadedDate: "2024-01-17", type: "PDF" },
    ],
    activities: [
      { id: "1", action: "Folder created", user: "John Smith", timestamp: "2024-01-17 11:00" },
    ],
  },
  "2": {
    id: "2",
    name: "Patent Applications",
    reference: "REF-002",
    client: "Tech Innovations",
    responsible: "Sarah Johnson",
    date: "2024-02-20",
    description: "IP documentation including patent applications, prior art searches, and trademark registrations.",
    files: [
      { id: "2-1", name: "Prior_Art_Search.pdf", size: "4.1 MB", uploadedDate: "2024-02-21", type: "PDF" },
    ],
    activities: [
      { id: "1", action: "Folder created", user: "Sarah Johnson", timestamp: "2024-02-20 08:00" },
      { id: "2", action: "File uploaded: Prior_Art_Search.pdf", user: "Sarah Johnson", timestamp: "2024-02-21 09:15" },
    ],
  },
  "2-1": {
    id: "2-1",
    name: "Provisional Patents",
    reference: "REF-002-PP",
    client: "Tech Innovations",
    responsible: "Sarah Johnson",
    date: "2024-02-20",
    parentId: "2",
    files: [
      { id: "2-1-1", name: "Provisional_Patent_2024.pdf", size: "3.2 MB", uploadedDate: "2024-02-20", type: "PDF" },
    ],
    activities: [
      { id: "1", action: "Folder created", user: "Sarah Johnson", timestamp: "2024-02-20 08:00" },
    ],
  },
  "2-2": {
    id: "2-2",
    name: "Trademarks",
    reference: "REF-002-TM",
    client: "Tech Innovations",
    responsible: "Sarah Johnson",
    date: "2024-02-21",
    parentId: "2",
    files: [
      { id: "2-2-1", name: "Trademark_Application.pdf", size: "1.5 MB", uploadedDate: "2024-02-21", type: "PDF" },
    ],
    activities: [
      { id: "1", action: "Folder created", user: "Sarah Johnson", timestamp: "2024-02-21 09:00" },
    ],
  },
  "3": {
    id: "3",
    name: "Employment Agreements",
    reference: "REF-003",
    client: "Global Systems",
    responsible: "Mike Davis",
    date: "2024-03-10",
    description: "Employment contracts, confidentiality agreements, and non-compete clauses.",
    files: [
      { id: "3-1", name: "Employment_Contract_Template.docx", size: "185 KB", uploadedDate: "2024-03-10", type: "DOCX" },
      { id: "3-2", name: "NDA_Standard.pdf", size: "892 KB", uploadedDate: "2024-03-11", type: "PDF" },
    ],
    activities: [
      { id: "1", action: "Folder created", user: "Mike Davis", timestamp: "2024-03-10 10:00" },
    ],
  },
  "4": {
    id: "4",
    name: "Merger Documentation",
    reference: "REF-004",
    client: "Capital Partners",
    responsible: "Emily Wilson",
    date: "2024-04-05",
    description: "Complete M&A documentation including due diligence reports and agreements.",
    files: [
      { id: "4-1", name: "Purchase_Agreement.pdf", size: "2.3 MB", uploadedDate: "2024-04-07", type: "PDF" },
    ],
    activities: [
      { id: "1", action: "Folder created", user: "Emily Wilson", timestamp: "2024-04-05 09:00" },
    ],
  },
  "4-1": {
    id: "4-1",
    name: "Due Diligence",
    reference: "REF-004-DD",
    client: "Capital Partners",
    responsible: "Emily Wilson",
    date: "2024-04-05",
    parentId: "4",
    files: [
      { id: "4-1-1", name: "Due_Diligence_Report.pdf", size: "5.8 MB", uploadedDate: "2024-04-05", type: "PDF" },
    ],
    activities: [
      { id: "1", action: "Folder created", user: "Emily Wilson", timestamp: "2024-04-05 09:00" },
    ],
  },
  "5": {
    id: "5",
    name: "Compliance Files",
    reference: "REF-005",
    client: "Finance Group",
    responsible: "Robert Brown",
    date: "2024-04-25",
    description: "Regulatory compliance documentation and audit reports.",
    files: [
      { id: "5-1", name: "Annual_Audit_Report.pdf", size: "3.5 MB", uploadedDate: "2024-04-25", type: "PDF" },
      { id: "5-2", name: "Compliance_Checklist.xlsx", size: "412 KB", uploadedDate: "2024-04-26", type: "XLSX" },
    ],
    activities: [
      { id: "1", action: "Folder created", user: "Robert Brown", timestamp: "2024-04-25 08:30" },
    ],
  },
}

export function getFolderPath(folderId: string): Folder[] {
  const path: Folder[] = []
  let currentId = folderId

  while (currentId) {
    const folder = folderDatabase[currentId]
    if (!folder) break
    path.unshift(folder)
    currentId = folder.parentId || ""
  }

  return path
}

export function getSubfolders(parentId: string): Folder[] {
  return Object.values(folderDatabase).filter(
    (folder) => folder.parentId === parentId
  )
}

// export function getFolderByIdPath(idPath: string[]): Folder | null {
//   if (idPath.length === 0) return null
//   const folderId = idPath.join("-")
//   return folderDatabase[folderId] || null
// }

// From ChatGPT: 
// export function getFolderByIdPath(idPath: string[]): Folder | null {
//   if (!idPath || idPath.length === 0) return null

//   const folderId = idPath[idPath.length - 1]
//   return folderDatabase[folderId] || null
// }

// From ChatGPT with parent-child validation:
export function getFolderByIdPath(path: string[]): Folder | null {
  if (!path || path.length === 0) return null

  let current: Folder | null = null

  for (const segment of path) {
    const folder = folderDatabase[segment]

    if (!folder) return null

    // validate parent-child relationship
    if (folder.parentId !== (current ? current.id : undefined)) {
      return null
    }

    current = folder
  }

  return current
}
