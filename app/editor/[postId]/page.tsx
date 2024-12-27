import { notFound, redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import EditPage from "@/components/editPage";

interface EditorPageProps {
  params: {
    postId: string;
  };
}

export default async function EditorPage({params,
}: {
  params: Promise<{ postId: string }>
}) {
  const postId = (await params).postId
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (!user) {
    redirect("/sign-in");
  }

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postId)
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <>
      <EditPage post={post} />
    </>
  );
}
