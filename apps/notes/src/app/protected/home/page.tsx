'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { apiFetch } from "@/lib/api"

import { Note } from '../../../../../../packages/types/note.type'

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { 
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
  SidebarRail,
} from "@/components/ui/sidebar"

import {
  Lightbulb,
  StickyNote,
  Archive,
  Trash2,
  Plus,
  User,
  LogOut,
} from "lucide-react"

import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkBreaks from "remark-breaks"

const Page = () => {
  const [noteTitle, setNoteTitle] = useState('')
  const [noteContent, setNoteContent] = useState('')

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [notes, setNotes] = useState<Note[]>([])
  const [chosenNote, setChosenNote] = useState<Note>()

  const [isCreateNoteFormOpen, setIsCreateNoteFormOpen] = useState(false)
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false)

  const router = useRouter()

  const fetchNotes = async () => {
    setIsLoading(true)
    setError('')

    const { ok, status, data } = await apiFetch<{ notes: Note[] }>('/notes', {
      method: 'GET'
    })

    if (!ok) {
      setIsLoading(false)

      if (status === 401) {
        return router.push('/login')
      }

      return setError('Unable to fetch notes')
    }

    if (!data) {
      setIsLoading(false)
      return setError('Unable to fetch notes')
    }

    setNotes(data.notes)
    setIsLoading(false)
  }

  const fetchUniqueNote  = async (id: string) => {
    setError('')

    const { ok, status, data } = await apiFetch<{ note: Note }>(`/notes/${id}`, {
      method: 'GET'
    })

    if (!ok) {
      setIsLoading(false)

      if (status === 401) {
        return router.push('/login')
      }

      return setError('Unable to fetch note')
    }

    if (!data) {
      setIsLoading(false)
      return setError('Unable to fetch note')
    }

    setChosenNote(data.note)
    setIsNoteDialogOpen(true)
  }

  const createNote = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setError('')

    const { ok, status } = await apiFetch('/notes', {
      method: 'POST',
      body: JSON.stringify({ title: noteTitle, content: noteContent })
    })

    if (!ok) {
      if (status === 401) {
        return router.push('/login')
      } else {
        return setError('Unable to create note')
      }
    }

    setNoteContent('')
    setNoteTitle('')
    fetchNotes()
    setIsCreateNoteFormOpen(false)
  }

  const deleteNote = async (id: string) => {
    setError('')

    const { ok, status } = await apiFetch(`/notes/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({ id })
    })

    if (!ok) {
      if (status === 401) {
        return router.push('/login')
      } else {
        return setError('Unable to delete note')
      }
    }

    fetchNotes()
    setIsNoteDialogOpen(false)
  }

  const archiveNote  = async (id: string, archived: boolean) => {
    setError('')

    const { ok, status } = await apiFetch(`/notes/${id}/archive`, {
      method: 'PATCH',
      body: JSON.stringify({ id, archived })
    })
    
    if (!ok) {
      if (status === 401) {
        return router.push('/login')
      } else {
        return setError('Unable to delete note')
      }
    }
    
    fetchNotes()
    setIsNoteDialogOpen(false)
  }

  const logout = async () => {
    setError('')

    const { ok, status } = await apiFetch(`/auth/logout`, {
      method: 'POST',
    })
    
    if (!ok) {
      if (status === 401) {
        return router.push('/login')
      } else {
        return setError('Unable to logout')
      }
    }

    router.push('/login')
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const nonArchivedNotes = notes.filter((note: Note) => !note.archived)

  const COLUMN_COUNT = 3

  const columns: Note[][] = Array.from({ length: COLUMN_COUNT }, () => [])
  nonArchivedNotes.forEach((note, index) => {
    columns[index % COLUMN_COUNT].push(note)
  })


  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                render={
                  <span onClick={() => router.push('/protected/home')} className="flex items-center gap-2">
                    <Lightbulb className="size-5" />
                    <span className="font-semibold">KeepInMind</span>
                  </span>
                }
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Notes</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    render={
                      <span onClick={() => router.push('/protected/home')}>
                        <StickyNote />
                        <span>All notes</span>
                      </span>
                    }
                  />
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    render={
                      <span onClick={() => router.push('/protected/archive')}>
                        <Archive />
                        <span>Archived</span>
                      </span>
                    }
                  />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Actions</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => setIsCreateNoteFormOpen(true)}>
                    <Plus />
                    <span>Create note</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => logout()}>
                    <LogOut />
                    <span>Logout</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => router.push('/protected/me')}>
                <User />
                <span>My account</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold">All notes</h1>
        </header>

        <main className="flex flex-1 flex-col items-center gap-4 p-8">

          <Dialog open={isCreateNoteFormOpen} onOpenChange={setIsCreateNoteFormOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a new note</DialogTitle>
                <DialogDescription>Give it a title and write its content in markdown</DialogDescription>
              </DialogHeader>

              <div>
                <form onSubmit={(e) => createNote(e)} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="title">Title</Label>
                      <Input id="title" required onChange={(e) => setNoteTitle(e.target.value)} value={noteTitle} />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="content">Content</Label>
                      <Textarea id="content" required onChange={(e) => setNoteContent(e.target.value)} value={noteContent} className="w-[350px] h-[450px]"/>
                    </div>

                    <Button type="submit" className="bg-purple-400 cursor-pointer hover:bg-purple-300">Create note</Button>
                </form>
              </div>

              {error && <p className="text-m font-bold text-red-500">{error}</p>}
            </DialogContent>
          </Dialog>


          {chosenNote && (
            <Dialog open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen}>
              <DialogContent className="flex flex-col sm:max-w-[700px] max-h-[85vh] p-0 gap-0 pt-5">
                <DialogHeader className="flex flex-row justify-between items-center px-6 pt-6 pb-4 border-b shrink-0">
                  <DialogTitle>{chosenNote.title}</DialogTitle>

                  <div className="flex flex-row gap-4">
                    <Trash2 onClick={() => deleteNote(chosenNote.id)} className="cursor-pointer text-red-500"/>
                    <Archive onClick={() => archiveNote(chosenNote.id, !chosenNote.archived)} className="cursor-pointer"/>
                  </div>
                </DialogHeader>

                <div className="overflow-y-auto px-6 py-4 break-words">
                  <Markdown
                    remarkPlugins={[remarkGfm, remarkBreaks]}
                    components={{
                      h1: ({ children }) => <h1 className="text-2xl font-bold mt-4 mb-2">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-xl font-bold mt-3 mb-2">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-lg font-semibold mt-2 mb-1">{children}</h3>,
                      ul: ({ children }) => <ul className="list-disc list-inside my-2">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal list-inside my-2">{children}</ol>,
                      p: ({ children }) => <p className="my-2 break-words">{children}</p>,
                      a: ({ children, href }) => (
                        <a href={href} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                          {children}
                        </a>
                      ),
                      code: ({ children }) => (
                        <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">{children}</code>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-muted pl-4 italic my-2">{children}</blockquote>
                      ),
                    }}
                  >
                    {chosenNote.content}
                  </Markdown>
                </div>
              </DialogContent>
            </Dialog>
          )}

          {isLoading && <h3 className="text-m font-bold">Loading...</h3>}
          {error && <h3 className="text-m font-bold text-red-500">{error}</h3>}

          {!isLoading && nonArchivedNotes.length === 0 && (
            <h1 className="text-4xl font-bold">
              You have no notes. Create one using the button in the sidebar
            </h1>
          )}

          <div className="flex gap-4 w-full max-w-6xl items-start">
            {columns.map((columnNotes, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-4 flex-1 min-w-0">
                {columnNotes.map((note) => (
                  <Card
                    key={note.id}
                    className=" max-h-94 cursor-pointer hover:opacity-80 transition duration-300 ease-in-out overflow-hidden"
                    onClick={() => fetchUniqueNote(note.id)}
                  >
                    <CardHeader>
                      <CardTitle className="break-words">{note.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="break-words max-h-64 overflow-hidden relative">
                      <Markdown
                        remarkPlugins={[remarkGfm, remarkBreaks]}
                        components={{
                          h1: ({ children }) => <h1 className="text-2xl font-bold mt-4 mb-2">{children}</h1>,
                          h2: ({ children }) => <h2 className="text-xl font-bold mt-3 mb-2">{children}</h2>,
                          h3: ({ children }) => <h3 className="text-lg font-semibold mt-2 mb-1">{children}</h3>,
                          ul: ({ children }) => <ul className="list-disc list-inside my-2">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal list-inside my-2">{children}</ol>,
                          p: ({ children }) => <p className="my-2 break-words">{children}</p>,
                          a: ({ children, href }) => (
                            <a href={href} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                              {children}
                            </a>
                          ),
                          code: ({ children }) => (
                            <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">{children}</code>
                          ),
                          blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-muted pl-4 italic my-2">{children}</blockquote>
                          ),
                        }}
                      >
                        {note.content}
                      </Markdown>
                      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card to-transparent pointer-events-none" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Page