import React from 'react'
import { auth } from '@clerk/nextjs/server';

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


      }}>
        <button type="submit">CLICK ME</button>
      </form>
    </div>
  )
}

