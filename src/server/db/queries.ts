import "server-only"

import { db } from "~/server/db";
import {
  files as filesSchema,
  folders as foldersSchema,
} from "~/server/db/schema";
import { eq, and, isNull, count } from "drizzle-orm";

export const QUERIES = {

  getAllParentsForFolders: async function(folderId: number) {
    const parents = [];
    let currentId: number | null = folderId;
    while (currentId !== null && currentId !== undefined) {
      const folder = await db
        .selectDistinct()
        .from(foldersSchema)
        .where(eq(foldersSchema.id, currentId));

      if (!folder[0]) {
        console.log("HERE:", currentId)
        throw new Error("Parent folder not found");
      }
      parents.unshift(folder[0]);

      if (currentId === folder[0]?.parent) {
        break
      }
      currentId = folder[0]?.parent;
    }
    return parents;
  },

  getFolders: async function(folderId: number) {
    return db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.parent, folderId))
      .orderBy(foldersSchema.id);
  },

  getFolderById: async function(folderId: number) {
    const folder = await db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.parent, folderId));
    return folder[0]
  },

  getRootFolderForUser: async function(userId: string) {
    const folder = await db
      .select()
      .from(foldersSchema)
      .where(
        and(
          eq(foldersSchema.ownerId, userId),
          isNull(foldersSchema.parent)
        )
      )

    return folder[0]
  },

  getFiles: async function(folderId: number) {
    return db
      .select()
      .from(filesSchema)
      .where(eq(filesSchema.parent, folderId))
      .orderBy(filesSchema.id);
  },

  getFileCount: async function(userId: string) {
    return db
      .select({ count: count() })
      .from(filesSchema)
      .where(eq(filesSchema.ownerId, userId))
  },

}

export const MUTATIONS = {
  createFile: async function(input: {
    file: {
      name: string;
      size: number;
      url: string;
      parent: number;
    };
    userId: string;
  }) {
    return await db.insert(filesSchema).values({
      ...input.file,
      ownerId: input.userId,
    })
  }
}
