export const dynamic = "force-dynamic"; // Forces SSR

import { db } from '@/lib/db'
import { auth } from '../../../../auth'
import ClientsData from '@/components/ClientsData'

const ClientsPage = async () => {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      console.error("No session found")
      return <div>Error: Unauthorized</div>
    }

    console.log("Session User:", session.user.email)

    const users = await db.user.findMany({
      where: { NOT: { email: session?.user?.email } },
    })

    return <ClientsData data={users} />
  } catch (error) {
    console.error("Error fetching clients:", error)
    return <div>Error loading clients</div>
  }
}

export default ClientsPage


