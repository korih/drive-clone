"use server";

import { and, eq } from "drizzle-orm";
import { db } from "./db";
import { files } from "./db/schema";
import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi()

export async function deleteFile(fileId: number) {
  const userSession = await auth();
  if (!userSession.userId) {
    return { error: "Unauthorized" };
  }


  const [file] = await db
    .select()
    .from(files)
    .where(and(eq(files.id, fileId),
      eq(files.ownerId, userSession.userId)))

  if (!file) {
    return { error: "Unauthorized" }
  }


  const cleanedString: string | undefined = file.url.split("/").pop()


  if (!cleanedString) {
    return { error: "File not found" }
  }

  await utapi.deleteFiles([cleanedString])
  await db.delete(files).where(eq(files.id, fileId));
  const c = await cookies();
  c.set("force-refresh", JSON.stringify(Math.random()));

  return { success: true }

}
