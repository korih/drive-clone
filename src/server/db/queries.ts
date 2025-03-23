import { db } from "~/server/db";
import {
  files as filesSchema,
  folders as foldersSchema,
} from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function getAllParentsForFolder(folderId: number) {
  const parents = [];
  let currentId: number | null = folderId;
  while (currentId !== null && currentId !== undefined) {
    const folder = await db
      .selectDistinct()
      .from(foldersSchema)
      .where(eq(foldersSchema.id, currentId));

    if (!folder[0]) {
      throw new Error("Parent folder not found");
    }
    parents.unshift(folder[0]);

    if (currentId === folder[0]?.parent) {
      break
    }
    currentId = folder[0]?.parent;
  }
  return parents;
}

export async function getFolders(folderId: number) {
  return db
    .select()
    .from(foldersSchema)
    .where(eq(foldersSchema.parent, folderId));
}

export async function getFiles(folderId: number) {
  return db
    .select()
    .from(filesSchema)
    .where(eq(filesSchema.parent, folderId));
}
