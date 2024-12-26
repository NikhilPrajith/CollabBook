
import { notFound, redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import Reader from "@/components/read/reader"

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
      <Reader content={post.content} title={post.title}/>
    </>
  )
}
