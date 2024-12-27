'use client'
import React, { useState } from 'react'
import { DocumentOutline } from './document-outline'
import { Editor } from './editor'
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
  } from "@/components/ui/sidebar";

import EditorJS from "@editorjs/editorjs"

import { createClient } from "@/utils/supabase/client"
import { SidebarLeft } from './sidebar-left';
import { SidebarRight } from './sidebar-right';
import { Separator } from "@/components/ui/separator"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
  } from "@/components/ui/breadcrumb"
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';
import { Icons } from "./icons";
import { Button } from './ui/button';
import { Toast } from "./ui/toast"
import { useToast } from "@/hooks/use-toast"
import Link from 'next/link';

import { useRouter } from "next/navigation"
  

export default function EditPage({post}: {post: any}) {
  const [title, setTitle] = useState<string>(post.title);
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  const [showRightSidebar, setShowRightSidebar] = useState(true);
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false);
  const ref = React.useRef<EditorJS | null>(null);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };
  const {toast} = useToast();

  const toggleLeftSidebar = () => setShowLeftSidebar(!showLeftSidebar);
  const toggleRightSidebar = () => setShowRightSidebar(!showRightSidebar);

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    setIsSaving(true);
    console.log("testign submit")
    try {
      const blocks = await ref.current?.save(); // Ensure ref is accessible
      const supabase = createClient();

      const { error } = await supabase
        .from('posts')
        .update({ 
          title,
          content: blocks,
          updated_at: new Date().toISOString()
        })
        .eq('id', post.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your post has been saved.",
        variant: "default",
      });
      
      router.refresh();
    } catch (error) {
        console.log("failed,", error);
      toast({
        title: "Error",
        description: "Your post was not saved. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SidebarProvider>
        <div className='relative'>
      {ref && <SidebarLeft editorRef={ref as React.RefObject<EditorJS>} />}
      </div>
      <SidebarInset>
        <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background border-border border-b">
          <div className="flex flex-1 items-center gap-2 px-3">
            <div className="flex flex-1 items-center gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    {title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            </div>
            <div className="flex items-center space-x-10">
                <Link
                href="/"
                className={cn(buttonVariants({ variant: "ghost" }))}
                >
                <>
                    <Icons.chevronLeft className="mr-1 h-4 w-4" />
                    Back
                </>
                </Link>
            </div>
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Button type="submit" onClick={handleSubmit} variant="outline">
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
            </Button>
          </div>
          
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 overflow-y-auto w-auto h-auto">
        <Editor
                post={{
                    id: post.id,
                    title: title,
                    content: post.content,
                    published: post.published,
                }}
                onTitleChange={handleTitleChange}
                onSubmit={handleSubmit}
                ref={ref}
                />
        </div>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  )
}
