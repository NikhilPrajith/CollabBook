"use client"

import React, { useState, useEffect } from 'react'
import { ChevronRight, type LucideIcon } from "lucide-react"
import EditorJS from "@editorjs/editorjs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

interface HeadingItem {
  id: string
  text: string
  level: number
  children: HeadingItem[]
  isExpanded?: boolean
}

interface HeadingProps {
  heading: HeadingItem
  onSelect: (id: string) => void
}

const HeadingNode: React.FC<HeadingProps> = ({ heading, onSelect }) => {
  const [isOpen, setIsOpen] = useState(true)
  
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={heading.text}>
            <span className="truncate font-semibold text-sm">{heading.text}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {heading.children.map((child) => (
              <SidebarMenuSubItem key={child.id}>
                <SidebarMenuSubButton asChild>
                  <span onClick={() => onSelect(child.id)} className="cursor-pointer">
                    {child.text}
                  </span>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}

export function DocumentOutline({ editorRef }: { editorRef: React.RefObject<EditorJS> }) {
  const [headings, setHeadings] = useState<HeadingItem[]>([])

  useEffect(() => {
    const buildHeadingTree = () => {
      try {
        const blocks = document.querySelectorAll('.ce-block')
        
        if (!blocks || blocks.length === 0) {
          setHeadings([])
          return
        }

        const headingTree: HeadingItem[] = []
        let currentChapter: HeadingItem | null = null

        blocks.forEach((block) => {
          try {
            const headerBlock = block.querySelector('.ce-header')
            const chapterBreakBlock = block.querySelector('.chapter-break');

            if (chapterBreakBlock) {
              const chapterTitle = chapterBreakBlock.querySelector('.chapter-break-text')?.innerHTML || 'Untitled Chapter';
              const chapterId = `chapter-${Math.random().toString(36).substr(2, 9)}`;

              currentChapter = {
                id: chapterId,
                text: chapterTitle,
                level: 1,
                children: [],
                isExpanded: true
              };
              headingTree.push(currentChapter);
              return;
            }

            if (!headerBlock) return;

            const levelAttr = headerBlock.getAttribute('data-level');
            const level = levelAttr ? parseInt(levelAttr, 10) : 1;
            if (isNaN(level)) return;

            const text = headerBlock.textContent || 'Untitled';
            const id = headerBlock.id || `heading-${Math.random().toString(36).substr(2, 9)}`;
            
            if (!headerBlock.id) {
              headerBlock.id = id;
            }

            const heading: HeadingItem = {
              id,
              text,
              level,
              children: [],
              isExpanded: true
            };

            if (currentChapter) {
              currentChapter.children.push(heading);
            } else {
                console.log("heading", heading);
              headingTree.push(heading);
            }
          } catch (err) {
            console.error('Error processing header block:', err);
          }
        });

        setHeadings(headingTree);
      } catch (err) {
        console.error('Error building heading tree:', err);
        setHeadings([]);
      }
    }

    buildHeadingTree();
    
    const observer = new MutationObserver((mutations) => {
      const hasHeaderChanges = mutations.some(mutation => {
        const target = mutation.target as Node
        if (target instanceof Element) {
          if (target.classList?.contains('ce-header') || 
              target.classList?.contains('ce-block') || 
              target.classList?.contains('chapter-break-text')) {
            return true
          }
        }
        
        const parentElement = target.parentElement
        if (parentElement?.classList?.contains('ce-header') || 
            parentElement?.classList?.contains('ce-block') || 
            parentElement?.classList?.contains('chapter-break')) {
          return true
        }
        
        return false
      })
      
      if (hasHeaderChanges) {
        setTimeout(buildHeadingTree, 100)
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  const scrollToHeading = (id: string) => {
    try {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } catch (err) {
      console.error('Error scrolling to heading:', err)
    }
  }

  return (
    <aside className="w-full h-full bg-background overflow-hidden">
      <div className="h-full">
        <div className="h-full w-auto overflow-y-scroll scrollbar-hide overflow-x-hidden">
          <div className="w-full">
            <SidebarGroup>
              <SidebarGroupLabel>Table of Contents</SidebarGroupLabel>
              <SidebarMenu>
                {headings.length > 0 ? (
                  headings.map((heading) => (
                    <HeadingNode 
                      key={heading.id} 
                      heading={heading} 
                      onSelect={scrollToHeading}
                    />
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground py-1.5 px-2 break-words">
                    Empty... 🥺
                  </div>
                )}
              </SidebarMenu>
            </SidebarGroup>
          </div>
        </div>
      </div>
    </aside>
  )
}