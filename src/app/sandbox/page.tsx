import React from 'react'
import { auth } from '@clerk/nextjs/server';
import { db } from '~/server/db';
import { folders } from '~/server/db/schema';
import { mockFolders } from '~/lib/mock-data';

export default function SandboxPage() {
  return (
    <div className='flex flex-col gap-4'>
      Seed Function
      <form action={async () => {
        "use server";

        const user = await auth();
        if (!user.userId) {
          throw new Error("User not authorized")
        }

        const root = await db.insert(folders).values({
          name: "root",
          ownerId: user.userId,
          parent: null,
        }).$returningId();

        const insert_foldres = mockFolders.map((folder) => ({
          name: folder.name,
          ownerId: user.userId,
          parent: root[0]!.id,
        }))
        await db.insert(folders).values(insert_foldres)

      }}>
        <button type="submit">CLICK ME</button>
      </form>
    </div>
  )
}

