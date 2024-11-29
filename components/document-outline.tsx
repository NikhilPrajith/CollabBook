"use client"

import React, { useState, useEffect } from 'react'
import { ChevronDown } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

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
  const hasChildren = heading.children.length > 0
  
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn(
        "w-auto",
        heading.level > 1 && "ml-4"
      )}
    >
      <div className="flex items-center w-full">
        <CollapsibleTrigger className="flex items-center gap-2 py-1.5 px-2 hover:bg-accent hover:text-accent-foreground rounded-md w-[-webkit-fill-available]">
          <ChevronDown className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            !isOpen && "-rotate-90"
          )} />
          <span className="truncate font-semibold text-sm">{heading.text}</span>
        </CollapsibleTrigger>
      </div>
      
      <CollapsibleContent>
        <button
          onClick={() => onSelect('test')}
          className="flex items-center gap-2 py-1.5 px-2 hover:bg-accent hover:text-accent-foreground rounded-md w-[-webkit-fill-available] ml-6"
        >
          <span className="truncate text-sm text-muted-foreground">Test</span>
        </button>
        {heading.children.map((child) => (
          <HeadingNode 
            key={child.id} 
            heading={child} 
            onSelect={onSelect}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}

export function DocumentOutline({title}: {title: string}) {
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
        let stack: HeadingItem[] = []
        let currentChapter: HeadingItem | null = null

        blocks.forEach((block) => {
          try {
            const headerBlock = block.querySelector('.ce-header')
            const chapterBreakBlock = block.querySelector('.chapter-break');

            if (chapterBreakBlock) {
              // If a ChapterBreak is found, create a new heading item for it
              const chapterTitle = chapterBreakBlock.querySelector('.chapter-break-title')?.innerHTML || 'Untitled Chapter';
              const chapterId = `chapter-${Math.random().toString(36).substr(2, 9)}`;

              currentChapter = {
                id: chapterId,
                text: chapterTitle,
                level: 1, // Treat ChapterBreak as level 1
                children: [],
                isExpanded: true
              };

              headingTree.push(currentChapter);
              return; // Skip to the next block
            }

            if (!headerBlock) return;

            // Safely get the level with a fallback
            const levelAttr = headerBlock.getAttribute('data-level');
            const level = levelAttr ? parseInt(levelAttr, 10) : 1;
            if (isNaN(level)) return;

            const text = headerBlock.textContent || 'Untitled';
            const id = headerBlock.id || `heading-${Math.random().toString(36).substr(2, 9)}`;
            
            // Ensure the header has an ID
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

            // If there's a current chapter, push the heading into its children
            if (currentChapter) {
              currentChapter.children.push(heading);
            } else {
              headingTree.push(heading);
            }

            stack.push(heading);
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
              target.classList?.contains('ce-block')) {
            return true
          }
        }
        
        const parentElement = target.parentElement
        if (parentElement?.classList?.contains('ce-header') || 
            parentElement?.classList?.contains('ce-block')) {
          return true
        }
        
        return false
      })
      
      if (hasHeaderChanges) {
        // Add a small delay to ensure DOM is updated
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
    <aside className="w-64 bg-gray-100 border-r border-border h-full px-4 bg-background overflow-hidden">
      <div className="h-full">
        <div className="h-full w-auto py-6 overflow-y-scroll scrollbar-hide">
          <div className="w-full">
            <h4 className="text-base font-bold mb-4 break-words">Table of Contents</h4>
            <div className="space-y-1">
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
                  No headings found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}