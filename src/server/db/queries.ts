import "server-only"

import { db } from "~/server/db";
import {
  files as filesSchema,
  folders as foldersSchema,
  type DB_FileType,
} from "~/server/db/schema";
import { eq } from "drizzle-orm";

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
      .where(eq(foldersSchema.parent, folderId));
  },

  getFiles: async function(folderId: number) {
    return db
      .select()
      .from(filesSchema)
      .where(eq(filesSchema.parent, folderId));
  }
}

export const MUTATIONS = {
  createFile: async function(input: {
    file: {
      name: string;
      size: number;
      url: string;
    };
    userId: string;
  }) {
    return await db.insert(filesSchema).values({
      ...input.file,
      parent: 1,
    })
  }
}
