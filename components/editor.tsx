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
}

export function Editor({ post }: EditorProps, onTitleChange: (title: string) => void) {
  const ref = React.useRef<EditorJS>()
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
        inlineToolbar: true,
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
          heading1: {
            class: Header,
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
            class: Header,
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
            class: Header,
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
          quote: {
            class: Quote,
            inlineToolbar: true,
            config: {
              quotePlaceholder: 'Enter a quote',
              captionPlaceholder: 'Quote\'s author',
            },
            shortcut: 'CMD+SHIFT+Q',
            toolbox: {
              title: 'Quote',
              icon: '<svg width="15" height="14" viewBox="0 0 15 14" xmlns="http://www.w3.org/2000/svg"><path d="M13.53 6.185l.027.025a1.109 1.109 0 0 1 0 1.568l-5.644 5.644a1.109 1.109 0 1 1-1.569-1.568l4.838-4.837L6.344 2.18A1.109 1.109 0 1 1 7.913.611l5.644 5.644a1.109 1.109 0 0 1-.027 1.93z" fill="currentColor"/></svg>'
            }
          },
          image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: '/api/upload-image',
              },
              captionPlaceholder: 'Image caption'
            },
            toolbox: {
              title: 'Image'
            }
          },
          inlineCode: InlineCode,
          chapterBreak: {
            class: ChapterBreak,
            config: {
              defaultText: 'Chapter One',
              allowEditing: true
            }
          }
        },
        defaultBlock: 'paragraph',
        inlineToolbar: ['bold', 'italic', 'inlineCode'],
        blockSettings: {
          enabled: false
        }
      })
    }
  }, [post.content])

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

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSaving(true)

    try {
      const blocks = await ref.current?.save()
      const supabase = createClient()

      const { error } = await supabase
        .from('posts')
        .update({ 
          title,
          content: blocks,
          updated_at: new Date().toISOString()
        })
        .eq('id', post.id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Your post has been saved.",
        variant: "success",
      })
      
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Your post was not saved. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (!isMounted) {
    return null
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="grid w-auto gap-10 m-5">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link
              href="/"
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              <>
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                Back
              </>
            </Link>
          </div>
          <button type="submit" className={cn(buttonVariants())}>
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>
        </div>
        <div className="prose prose-stone mx-auto w-full max-w-[800px] dark:prose-invert">
          <TextareaAutosize
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full text-center resize-y appearance-none bg-transparent text-5xl font-bold focus:outline-none"
          />
          <div id="editor" className="min-h-[500px]" />
        </div>
      </div>
    </form>
  )
}
