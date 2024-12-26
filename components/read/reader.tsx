'use client'
import React, { useEffect, useRef, useState } from "react";
import styles from "./reader.module.css"
import EditorJS from '@editorjs/editorjs';
import "@/styles/editor.css"

interface ReaderProps {
  content: {
    blocks: Array<{
      id: string;
      type: string;
      data: {
        text: string;
        isFirst?: boolean;
      };
    }>;
  },
  title:string
}

const Reader: React.FC<ReaderProps> = ({ content, title }) => {
  const editorRef = useRef<EditorJS | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const initEditor = async () => {
      if (!editorRef.current) {
        const EditorJS = (await import('@editorjs/editorjs')).default;
        
        const editor = new EditorJS({
          holder: 'reader-container',
          readOnly: true,
          data: content,
          tools: {
            chapterBreak: {
              class: class {
                static get toolbox() {
                  return {
                    title: 'Chapter Break'
                  }
                }

                static get isReadOnlySupported() {
                  return true;
                }

                constructor({ data }) {
                  this.data = data;
                }

                render() {
                  const wrapper = document.createElement('div');
                  wrapper.classList.add('chapter-break');
                  
                  const line1 = document.createElement('div');
                  line1.classList.add('chapter-break-line');
                  
                  const content = document.createElement('div');
                  content.classList.add('chapter-break-text');
                  content.innerHTML = this.data.text;
                  
                  const line2 = document.createElement('div');
                  line2.classList.add('chapter-break-line');
                  
                  wrapper.appendChild(line1);
                  wrapper.appendChild(content);
                  wrapper.appendChild(line2);
                  
                  return wrapper;
                }

                save(blockContent) {
                  return {
                    text: this.data.text
                  }
                }
              }
            }
          }
        });

        editorRef.current = editor;
      }
    };

    if (isMounted) {
      initEditor().catch(console.error);
    }

    return () => {
      const destroyEditor = async () => {
        if (editorRef.current && editorRef.current.destroy) {
          try {
            await editorRef.current.destroy();
            editorRef.current = null;
          } catch (error) {
            console.error('Error destroying editor:', error);
          }
        }
      };

      destroyEditor().catch(console.error);
    };
  }, [isMounted, content]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const backgroundImageUrl = "https://images.beta.cosmos.so/f7fcb95d-981b-4cb3-897f-e35f6c20e830?format=jpeg";

  return (
    <div className="w-[70%] min-w-[400px] max-w-[800px] m-auto border border-gray-200 p-10 rounded-sm mt-7">
        <div className=" min-h-screen min-h-[800px] h-full flex justify-center items-center rounded-md relative" >
            <div style={{ background: `url(${backgroundImageUrl})` }} className="absolute top-0 w-full h-full bg-center bg-cover rounded-md"></div>
            <div className="text-3xl text-white">Testing</div>
        </div>
      <div id="reader-container" className="codex-editor" />
    </div>
  );
};

export default Reader;
