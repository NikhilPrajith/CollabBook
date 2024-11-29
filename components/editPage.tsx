'use client'
import React, { useState } from 'react'
import { DocumentOutline } from './document-outline'
import { Editor } from './editor'

export default function EditPage({post}: {post: any}) {
  const [title, setTitle] = useState<string>(post.title);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  return (
    <>
        <DocumentOutline title={title} />
        <div className="flex-1 overflow-y-auto w-auto">
            <Editor
            post={{
                id: post.id,
                title: title,
                content: post.content,
                published: post.published,
            }}
            onTitleChange={()=>{handleTitleChange}}
            />
        </div>
    </>
  )
}
