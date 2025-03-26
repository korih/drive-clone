import { auth } from '@clerk/nextjs/server';
import { mockFolders } from '~/lib/mock-data';
import { redirect } from 'next/navigation';
import { db } from '~/server/db';
import { QUERIES } from '~/server/db/queries';
import { folders } from '~/server/db/schema';
import { SignIn } from '@clerk/nextjs';

export default async function DrivePage() {
  const session = await auth();

  if (!session.userId) {
    return (
      <div className='w-screen h-screen flex flex-col justify-center m-10 gap-5'>
        <div className='w-screen h-[100px] flex justify-center mb-64 ' >
          <h1 className='text-white'>.</h1>
        </div>
        <div className='w-screen h-screen flex justify-center m-10'>
          <SignIn forceRedirectUrl={"/drive"} />
        </div>
      </div>
    )
  }

  const rootFolder = await QUERIES.getRootFolderForUser(session.userId)

  if (!rootFolder) {
    const root = await db.insert(folders).values({
      name: "root",
      ownerId: session.userId,
      parent: null,
    }).$returningId();

    const insert_foldres = mockFolders.map((folder) => ({
      name: folder.name,
      ownerId: session.userId,
      parent: root[0]!.id,
    }))
    await db.insert(folders).values(insert_foldres)
    return redirect(`/f/${session.userId}`)
  }

  return redirect(`/f/${rootFolder.id}`)
}
