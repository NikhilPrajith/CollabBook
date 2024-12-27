import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getCachedPosts } from "@/utils/cache";
import Link from "next/link";

import { Pencil } from "lucide-react";
import TrendingCarousel from "@/components/trending-carousel";
import BookCard from "@/components/BookCard";
import DiscoverList from "@/components/discover-list";
import { BookCardV2, BookCardV3 } from "@/components/BookCard";

async function createPost() {
  "use server";

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  const { data, error } = await supabase
    .from("posts")
    .insert([
      {
        title: "Untitled",
        content: {},
        user_id: user.id,
        rating: 0,
        authors:[],
        description:""
      },
    ])
    .select()
    .single();

  if (error) throw error;

  redirect(`/editor/${data.id}`);
}

async function fetchPosts() {
    "use client";
    const supabase = await createClient();
    const { data: posts, error } = await supabase.from("posts").select("*");
    console.log("data", posts)
  
    if (error) {
      throw new Error("Error fetching posts");
    }
  
    return posts;
  }

interface Book {
  id: number;
  rating: number;
  title: string;
  author: string;
  image?: string;
  description:string,
  creatorName:string,
  authors: { id: string; name: string }[];
  category:string,
}

export default async function HomePage() {
    const books = await getCachedPosts(fetchPosts);

  const colors = [
    "bg-red-100",
    "bg-blue-100",
    "bg-gray-100",
    "bg-green-100",
    "bg-yellow-100",
    "bg-purple-100",
    "bg-pink-100",
  ];

  return (
    <div className="flex max-h-lvh min-h-[600px] justify-center items-start mx-auto w-full relative">
    <div className="h-full max-h-lvh overflow-y-scroll w-3/4 flex flex-col mx-auto px-8 mb-5 scrollbar-hide pb-28 mt-5">
    <TrendingCarousel />
    <div className="flex items-center justify-between mt-4">
      <h1 className="text-base font-bold">Your Books</h1>
      <Button onClick={createPost} variant="ghost" className="m-2 py-4 text-[var(--second-highlight-color)]">
        Create
      </Button>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
      {books.map((book: Book) => (
        <BookCard key={book.id} book={book} colors={colors} />
      ))}
    </div>

    <div> 
      <div className="flex items-center justify-between mt-4">
        <h1 className="text-base font-bold">Discover popular categories</h1>
      </div>
      <DiscoverList />
    </div>
    <div className="flex items-center justify-between mt-4 mb-4">
      <h1 className="text-base font-bold">Bookmarks</h1>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
      {books.map((book: Book) => (
        <BookCardV2 key={book.id} book={book} colors={colors} />
      ))}
    </div>
  </div>
  
  <div className="w-1/4 h-full min-h-lvh flex flex-col border-l bg-[hsl(var(--sidebar-background))]">
    <div className="h-full max-h-lvh overflow-y-scroll overflow-scroll">
      <div className=" h-full rounded sticky top-0 flex-grow p-3">
        <div className="font-semibold">Suggested</div>
        <div className="text-gray-500 text-xs">Recommended books based on your style</div>

    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-2 mt-4 pb-28">
        {books.map((book: Book) => (
          <BookCardV3 key={book.id} book={book} colors={colors} />
        ))}
        </div>
      </div>
    </div>
  </div>
</div>

  );
}
