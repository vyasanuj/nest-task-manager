import Appbar from '@/components/Appbar'
import AuthDesign from '@/components/AuthDesign'
import { auth } from '../../auth'
import { db } from '@/lib/db'
import ClientComp from '@/components/ClientComp'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await auth()
  if (session) {
    const user = await db.user.findUnique({
      where: { email: session?.user?.email! },
      include: { inventory: true },
    })
    console.log(user, 'user')

    if (user && !user?.isAdmin) {
      return (
        <>
          <Appbar />
          <ClientComp user={user} />
        </>
      )
    } else if (user && user?.isAdmin) {
      redirect('/dashboard')
    }
  } else {
    return (
      <div className="">
        <Appbar />
        <AuthDesign />
      </div>
    )
  }
}
