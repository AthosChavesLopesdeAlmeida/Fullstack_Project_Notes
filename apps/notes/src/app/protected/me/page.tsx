'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { apiFetch } from "@/lib/api"

import { UserType } from '../../../../../../packages/types/user.type'

import { 
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
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
  User,
  LogOut,
  FileQuestionMark
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const Page = () => {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)  
  const [password, setPassword] = useState('')

  const [userData, setUserData] = useState<UserType | null>()

  const router = useRouter()

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

  const deleteAccount = async () => {
    setError('')

    const { ok, status } = await apiFetch('/auth/delete', {
        method: 'DELETE',
        body: JSON.stringify({ password })
    })

    if (!ok) {
      if (status === 401) {
        return router.push('/login')
      } else {
        return setError('Unable to delete your account')
      }
    }

    router.push('/login')
  }

  const fetchUserData = async () => {
    setError('')
    setIsLoading(true)

    const { ok, status, data } = await apiFetch<{ userData: UserType }>('/me', {
        method: 'GET'
    })

    if (!ok) {
      if (status === 401) {
        return router.push('/login')
      } else {
        return setError('Unable to fetch your data')
      }
    }

    setIsLoading(false)
    setUserData(data?.userData ?? null)
  }

  useEffect(() => {
    fetchUserData()
  }, [])

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
                  <SidebarMenuButton onClick={() => logout()}>
                    <LogOut />
                    <span>Logout</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>


          <SidebarGroup>
            <SidebarGroupLabel>Documentation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => router.push('/protected/guide')}>
                    <FileQuestionMark />
                    <span>Markdown tutorial</span>
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
          <h1 className="text-lg font-semibold">My account</h1>
        </header>

        <main className="flex flex-1 flex-col items-center gap-4 p-8">

          {isLoading && <h3 className="text-m font-bold">Loading...</h3>}
          {error && <h3 className="text-m font-bold text-red-500">{error}</h3>}

          {userData && 
            <Card className="text-center">
                <CardHeader>
                    <h2 className="font-bold">{userData.name}</h2>
                    <p>{userData.email}</p>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <p>Your Id: {userData.id}</p>
                    <p>Your account was created in: {new Date(userData.createdAt).toLocaleDateString()}</p>
                </CardContent>
                <CardFooter className="flex flex-row gap-5 justify-center">
                    <Button onClick={() => logout()} className="cursor-pointer" variant={"secondary"}>Logout</Button>
                    <Button onClick={() => setIsPasswordDialogOpen(true)} className="cursor-pointer" variant={"destructive"}>Delete account</Button>
                </CardFooter>
            </Card>
          }

          <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
            <DialogContent>
            <DialogHeader>
                <DialogTitle>Delete your account</DialogTitle>
                <DialogDescription>This is a permanent action. Insert your password to confirm</DialogDescription>
            </DialogHeader>
                <div>
                    <form onSubmit={() => deleteAccount()} className="flex flex-col gap-4 justify-center">
                        <div className="flex flex-col gap-4">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" onChange={(e) => setPassword(e.target.value)} type="password"/>
                        </div>

                        <Button type="submit" variant={"destructive"} onClick={() => deleteAccount()} className="cursor-pointer">Delete</Button>
                    </form>
                </div>
            </DialogContent>
          </Dialog>

        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Page