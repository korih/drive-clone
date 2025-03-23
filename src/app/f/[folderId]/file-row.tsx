import React from 'react'
import { Folder as FolderIcon, FileIcon, Trash2Icon } from "lucide-react"
import type { files, folders } from '~/server/db/schema'
import Link from 'next/link'
import { deleteFile } from '~/server/actions'
import { Button } from '~/components/ui/button'

export function FileRow(props: { file: typeof files.$inferSelect }) {
  const { file } = props
  return (
    <li key={file.id} className="px-6 py-4 border-b border-gray-700 hover:bg-gray-750">
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-6 flex items-center">
          <a
            href={file.url}
            className="flex items-center text-gray-100 hover:text-blue-400"
            target='_blank'
          >
            <FileIcon className="mr-3" size={20} />
            {file.name}
          </a>
        </div>
        <div className="col-span-3 text-gray-400">{"file"}</div>
        <div className="col-span-1 text-gray-400">
          <Button variant="ghost" aria-label="delete-file" onClick={() => deleteFile(file.id)}>
            <Trash2Icon className='' size={20} />
          </Button>
        </div>
      </div>
    </li>
  )
}


export function FolderRow(props: { folder: typeof folders.$inferSelect }) {
  const { folder } = props;
  return (
    <li key={folder.id} className="px-6 py-4 border-b border-gray-700 hover:bg-gray-750">
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-6 flex items-center">
          <Link
            href={`/f/${folder.id}`}
            className="flex items-center text-gray-100 hover:text-blue-400"
          >
            <FolderIcon className="mr-3" size={20} />
            {folder.name}
          </Link>
        </div>
        <div className="col-span-3 text-gray-400"></div>
        <div className="col-span-3 text-gray-400"></div>
      </div>
    </li>
  )
}
