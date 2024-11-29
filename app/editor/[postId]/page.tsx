
import { notFound, redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { Editor } from "@/components/editor"
import { DocumentOutline } from "@/components/document-outline"
import EditPage from "@/components/editPage"

export default async function EditorPage({ params }: { params: { postId: string } }) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (!user) {
    redirect("/sign-in")
  }

  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', params.postId)
    .single()

  if (error || !post) {
    notFound()
  }


  return (
    <>
      <EditPage post={post}/>
    </>
  )
}
