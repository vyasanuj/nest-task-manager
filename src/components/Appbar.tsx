import React from 'react'
import Link from 'next/link'
import { auth, signOut } from '../../auth'

const Appbar = async () => {
  const session = await auth()
  return (
    <div className="flex justify-between p-4 bg-gray-800 text-white">
      {session && session?.user ? <h2>Welcome {session?.user?.name}</h2> : <h2>Welcome to IMS</h2>}
      <div className="flex  gap-4">
        {session && session?.user ? (
          <form
            action={async () => {
              'use server'
              await signOut()
            }}
          >
            <button type="submit">Sign Out</button>
          </form>
        ) : (
          <div className="flex gap-4">
            <Link href="/signup" className="font-bold">
              Sign Up
            </Link>
            <Link href="/login" className="font-bold">
              SignIn
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Appbar
