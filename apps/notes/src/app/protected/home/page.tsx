'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { apiFetch } from "@/lib/api"

import { Button } from "@/components/ui/button"

import { 
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription 
} from "@/components/ui/card"

import { 
  SidebarProvider,
  Sidebar, 
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter
} from "@/components/ui/sidebar"

import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

const Page = () => {
  return (
    <div>Home</div>
  )
}

export default Page