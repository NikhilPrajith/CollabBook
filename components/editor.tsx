"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import EditorJS from "@editorjs/editorjs"
import TextareaAutosize from "react-textarea-autosize"
import { createClient } from "@/utils/supabase/client"

import "@/styles/editor.css"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Toast } from "./ui/toast"
import { Icons } from "./icons"
import ChapterBreak from "./editor/tools/chapter-break"
import { useToast } from "@/hooks/use-toast"

interface EditorProps {
  post: {
    id: string
    title: string
    content: any
    published: boolean
  }
  onTitleChange: (title: string) => void
  onSubmit: (e: React.FormEvent) => void
  ref: React.MutableRefObject<EditorJS | undefined>
}

export function Editor({ post, onTitleChange, onSubmit, ref }: EditorProps) {
  //const ref = React.useRef<EditorJS>()
  const router = useRouter()
  const [isSaving, setIsSaving] = React.useState<boolean>(false)
  const [isMounted, setIsMounted] = React.useState<boolean>(false)
  const [title, setTitle] = React.useState<string>(post.title || "")
  const {toast} = useToast();

  const initializeEditor = React.useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default
    const Header = (await import("@editorjs/header")).default
    const Quote = (await import("@editorjs/quote")).default
    const ImageTool = (await import("@editorjs/image")).default
    const InlineCode = (await import("@editorjs/inline-code")).default
    const ChapterBreak = (await import("./editor/tools/chapter-break")).default

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor
        },
        placeholder: "Start your story...",
        data: post.content && Object.keys(post.content).length > 0 
          ? post.content 
          : {
              blocks: [
                {
                  type: 'chapterBreak',
                  data: {
                    text: 'Chapter One',
                    isFirst: true
                  }
                }
              ]
            },
        tools: {
          paragraph: {
            config: {
              preserveBlank: true,
              placeholder: '        Press Tab to indent...'
            }
          },
          heading1: {
            class: Header as any,
            config: {
              placeholder: 'Heading 1',
              levels: [2],
              defaultLevel: 2
            },
            shortcut: 'CMD+SHIFT+1',
            toolbox: {
              title: 'Heading 1',
              icon: '<svg width="16" height="14" xmlns="http://www.w3.org/2000/svg"><text transform="translate(-12 -9)" stroke="none" fill="currentColor" x="12" y="20" font-family="Helvetica" font-size="15">H1</text></svg>'
            }
          },
          heading2: {
            class: Header as any,
            config: {
              placeholder: 'Heading 2',
              levels: [3],
              defaultLevel: 3
            },
            shortcut: 'CMD+SHIFT+2',
            toolbox: {
              title: 'Heading 2',
              icon: '<svg width="16" height="14" xmlns="http://www.w3.org/2000/svg"><text transform="translate(-12 -9)" stroke="none" fill="currentColor" x="12" y="20" font-family="Helvetica" font-size="15">H2</text></svg>'
            }
          },
          heading3: {
            class: Header as any,
            config: {
              placeholder: 'Heading 3',
              levels: [4],
              defaultLevel: 4
            },
            shortcut: 'CMD+SHIFT+3',
            toolbox: {
              title: 'Heading 3',
              icon: '<svg width="16" height="14" xmlns="http://www.w3.org/2000/svg"><text transform="translate(-12 -9)" stroke="none" fill="currentColor" x="12" y="20" font-family="Helvetica" font-size="15">H3</text></svg>'
            }
          },
          inlineCode: InlineCode,
          chapterBreak: {
            class: ChapterBreak as any,
            config: {
              defaultText: 'Chapter One',
              allowEditing: true
            }
          }
        },
        defaultBlock: 'paragraph',
        inlineToolbar: ['bold', 'italic', 'inlineCode'],

      })
      
    }
  }, [post.content])

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    onTitleChange(newTitle);
  }

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true)
    }
  }, [])

  React.useEffect(() => {
    if (isMounted) {
      initializeEditor()

      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initializeEditor])

  if (!isMounted) {
    return null
  }

  return (
  <>
        <div className="prose prose-stone mx-auto w-full max-w-[800px] dark:prose-invert">
          <TextareaAutosize
            autoFocus
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Title"
            className="w-full text-center resize-y appearance-none bg-transparent text-5xl font-bold focus:outline-none"
          />
          <div id="editor" className="min-h-[500px]" />
        </div>
      </>
  )
}
