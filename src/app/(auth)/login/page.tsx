'use client'
import React, { useOptimistic } from 'react'
import FormInput from '@/components/FormInput'
import { Button } from '@/components/ui/button'
import { loginSignup } from '@/actions/user'
import { toast } from '@/hooks/use-toast'
function LoginPage() {
  const [loading, setLoading] = useOptimistic(false)
  const handleSubmit = async (formdata: FormData) => {
    setLoading(true)
    const res = await loginSignup(formdata, true)
    if (res?.error) {
      toast({ title: res?.error })
    }
    setLoading(false)
  }
  return (
    <form action={handleSubmit} className="w-full px-5">
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800 dark:text-white">
            Welcome Back 👋
          </h2>

          <FormInput name="email" label="Email" type="email" placeholder="Enter your email" />
          <FormInput
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
          />

          <Button className="w-full mt-4 bg-blue-600 transition hover:bg-blue-700" type="submit">
            Login
          </Button>

          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline dark:text-blue-400">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </form>
  )
}

export default LoginPage
