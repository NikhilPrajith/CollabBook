import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getCachedPosts } from "@/utils/cache";
import Link from "next/link";

import { Pencil } from "lucide-react";

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
    <div className="min-h-screen flex flex-col max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={createPost} className="px-8 py-4">
          Create New Post
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {books.map((book: Book) => {
          const filledStars = Math.floor(book.rating);
          const emptyStars = 5 - filledStars;
          const starDisplay = "★".repeat(filledStars) + "☆".repeat(emptyStars);

          return (
            <div key={book.id} className="rounded-xs p-4 flex">
              {/* Book Image */}
                <div className="relative w-[100px] h-[150px] perspective-1000">
                    <div className="w-[100px] h-[150px] bg-gray-200 shadow-[10px_10px_20px_rgba(0,0,0,0.3),-5px_-5px_15px_rgba(0,0,0,0.1)] transform rotate-y-[15deg] rotate-x-[5deg] rounded-[4px]">
                        {book.image ? <img
                        src={book.image}
                        alt={book.title}
                        className="w-full h-full rounded-[4px] object-cover"
                        />
                            :
                        <div 
                        className={`${colors[Math.floor(Math.random() * colors.length)]} w-[100px] h-[150px] font-serif rounded-[4px] object-cover text-xs`}>
                            <div className="font-semibold p-4 text-black">{book.title}</div>
                        </div>}
                    </div>
                    <div className="absolute top-0 left-0 w-[2.5px] h-full bg-gray-500 rounded-l-[4px]"></div>
                </div>

              {/* Book Title and Author */}
              <div className="w-auto pl-8">
                {/* Rating Star */}
                <div className="text-yellow-500">
                  {starDisplay}
                </div>
                <h2 className="text-sm font-semibold">{book.title}</h2>
                <p className="text-gray-400 mt-1 text-xs">{book.author}</p>
                {/* Read Now Button */}
                <Button className="mt-2 text-sm rounded-full border bg-white text-black border-black hover:bg-black hover:text-white">Read Now</Button>
                {/* Edit Button */}
                <Link href={`/editor/${book.id}`}>
                  <Button className="mt-2 text-sm rounded-full border bg-black text-white border-black hover:bg-black hover:text-white">
                    <Pencil className="" size={16} />
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
