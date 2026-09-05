'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { apiFetch } from "@/lib/api"

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
} from "lucide-react"
import GuidePage from "./guidePage"

const Page = () => {
  const [error, setError] = useState('')

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
          <h1 className="text-lg font-semibold">Markdown Tutorial</h1>
        </header>

        <main className="flex flex-1 flex-col items-center gap-4 p-8">
           {error && <p className="font-bold text-red-500">{error}</p>}

            <div className="prose prose-sm dark:prose-invert max-w-2xl mx-auto p-8">
                <GuidePage/>
            </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Page