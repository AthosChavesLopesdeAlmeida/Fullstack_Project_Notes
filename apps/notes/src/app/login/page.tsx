'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"

import { apiFetch } from "@/lib/api"

import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { Lightbulb } from "lucide-react"

const Page = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const submitForm  = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const { ok, status } = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })

    if (!ok) {
      if (status === 401) {
        setError('Invalid credentials');
      } else if (status === 0) {
        setError('Server connection was not possible');
      } else {
        setError('Unexpecetd error');
      }
      return;
    }

    router.push('/protected/home')
  }

  return (
    <div className="flex flex-col gap-3 justify-center items-center min-h-screen bg-black-500">
      <h3 className="flex flex-row"><Lightbulb/> KeepInMind</h3>

      <Card className="w-full max-w-md dark">
        <CardHeader>
          <CardTitle>Log in</CardTitle>
          <CardDescription>Enter your data bellow to enter into your account</CardDescription>
        </CardHeader>

          <form onSubmit={(e) => submitForm(e)}>
            <CardContent>
              <div className="flex flex-col gap-8">

                <div className="grid gap-2">
                  <Label htmlFor="email">Insert your email</Label>
                  <Input type="email" required id="email" onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com"/>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Insert your password</Label>
                  <Input type="password" required id="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>

                {error && <p className="text-red-500 text-center">{error}</p>}
              </div>
            </CardContent>

            <CardFooter className="mt-4 flex flex-col gap-2">
              <Button type="submit" disabled={isLoading ? true : false} className={`${isLoading && 'opacity-80'} w-35 bg-purple-400 cursor-pointer hover:bg-purple-300`}>
                {isLoading ? 'Loading...' : 'Log in'}
              </Button>

              <p onClick={() => router.push('/register')} className="hover:underline cursor-pointer">You have no account? Create one here</p>
            </CardFooter>
          </form>
      </Card>
    </div>
  )
}

export default Page