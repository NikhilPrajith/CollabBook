interface EditorProps {
  children?: React.ReactNode
}

export default function EditorLayout({ children }: EditorProps) {
  return (
    <div className="h-[calc(100svh)] flex">
      {children}
    </div>
  )
}
