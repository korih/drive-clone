// so we can't import these types onto frontend
import "server-only";

import { int, bigint, text, index, singlestoreTableCreator, timestamp } from "drizzle-orm/singlestore-core"

export const createTable = singlestoreTableCreator((name) => `drive_tutorial_${name}`)

export const files = createTable("files_table", {
  id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
  ownerId: text("owner_id").notNull(),
  name: text("name").notNull(),
  size: int("size").notNull(),
  url: text("url").notNull(),
  parent: bigint("parent", { mode: "number", unsigned: true}).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (t) => {
  return [
    index("parent_index").on(t.parent),
    index("owner_id_index").on(t.ownerId),
  ]
})

export type DB_FileType = typeof files.$inferSelect;

export const folders = createTable("folders_table", {
  id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
  ownerId: text("owner_id").notNull(),
  name: text("name").notNull(),
  parent: bigint("parent", { mode: "number", unsigned: true}),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (t) => {
  return [
    index("parent_index").on(t.parent),
    index("owner_id_index").on(t.ownerId),
  ]
})

export type DB_FolderType = typeof folders.$inferSelect;
