'use client'
import { useRouter } from "next/navigation";

import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription 
} from "@/components/ui/card";

import { Heading3, Feather, PaintbrushVertical, FeatherIcon } from "lucide-react";

export default function Home() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen items-center">
      <header className="w-full flex flex-row justify-between items-center px-20 py-6 bg-zinc-900">
        <h1 className="font-bold text-4xl text-white">KeepInMind</h1>

        <ButtonGroup>
          <Button className="cursor-pointer w-26 h-9 bg-purple-400 hover:bg-purple-300" onClick={() => router.push('/register')}>Sign in</Button>
          <Button className="cursor-pointer w-26 h-9" variant={"secondary"} onClick={() => router.push('/login')}>Log in</Button>
        </ButtonGroup>
      </header>

      <main className="grid gird-col-1 gap-25 justify-items-center pt-20  w-8/10">
        <section className="flex flex-col gap-10 items-center">
          <h1 className="text-5xl font-bold text-center">Organize your thoughts in a lightweight and easy-to-use application</h1>

          <h3 className="w-250 text-center">
            KeepInMind is a notekeeping application that uses markdown to help you organize your thoughts, goals or just write anything you find useful.
            KeepInMind is completely free of advertisements, thus giving you a better and cleaner experience. To use our services, create an account or log into yours 
            if you already have one.
          </h3>

          <div className="flex flex-row gap-4">
            <Button className="bg-purple-400 cursor-pointer hover:bg-purple-300  hover:-translate-x-1 hover:-translate-y-1" onClick={() => router.push('/register')}>
              Create your account here
            </Button>

            <Button className=" cursor-pointer hover:-translate-x-1 hover:-translate-y-1" variant={"secondary"} onClick={() => router.push('/login')}>
              Log into your account
            </Button>
          </div>
        </section>

        <section className="flex flex-row gap-6">

          <Card className="w-80 hover:opacity-80 hover:-translate-x-1 hover:-translate-y-1 transition duration-300 ease-in-out">
            <CardHeader>
              <CardTitle><Heading3/> Support for markdown</CardTitle>
            </CardHeader>
            <CardContent>
              <p>KeepInMind is designed to display beautiful notes with markdown. You write in markdown and get nice results.</p>
            </CardContent>
          </Card>

          <Card className="w-80 hover:opacity-80 hover:-translate-x-1 hover:-translate-y-1 transition duration-300 ease-in-out">
            <CardHeader>
              <CardTitle><PaintbrushVertical/>Amazing design</CardTitle>
            </CardHeader>
            <CardContent>
              <p>The application is bautifully designed to make you confortable and to free your mind while you create.</p>
            </CardContent>
          </Card>

          <Card className="w-80 hover:opacity-80 hover:-translate-x-1 hover:-translate-y-1 transition duration-300 ease-in-out">
            <CardHeader>
              <CardTitle><FeatherIcon/>Lightweight</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Your notes are light and the application does not consume much of your memory.</p>
            </CardContent>
          </Card>

        </section>
      </main>
    </div>
  );
}
