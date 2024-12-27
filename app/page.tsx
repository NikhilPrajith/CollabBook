import CreationList from "@/components/creation-list";
import Hero from "@/components/hero";
import { TrendingCarouselV2 } from "@/components/trending-carousel";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { BookCardV4 } from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/navigation/footer";
import { Input } from "@/components/ui/input";

export interface Book {
  id: number;
  rating: number;
  title: string;
  description: string;
  creatorName: string;
  authors: { id: string; name: string }[];
  image?: string;
  category: string;
}

const trending = [
  {
    image: "https://images.beta.cosmos.so/f7fcb95d-981b-4cb3-897f-e35f6c20e830?format=jpeg",
    title: "Iron Flame",
    description: "A thrilling fantasy adventure featuring dragons and epic battles.",
  },
  {
    image: "https://images-platform.99static.com/WWeTfsyhi69xuCvwOh7Y_RBGZ_k=/2x418:971x1387/500x500/top/smart/99designs-contests-attachments/120/120397/attachment_120397084",
    title: "One Piece",
    description: "Join Luffy on his quest to become the Pirate King.",
  },
  {
    image: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781974740819/jujutsu-kaisen-the-official-anime-guide-season-1-9781974740819_hr.jpg",
    title: "Jujutsu Kaisen",
    description: "Dive into the world of cursed energy and fierce battles.",
  },

  {
    image: "https://images.beta.cosmos.so/f7fcb95d-981b-4cb3-897f-e35f6c20e830?format=jpeg",
    title: "Iron Flame",
    description: "A thrilling fantasy adventure featuring dragons and epic battles.",
  },
  {
    image: "https://images-platform.99static.com/WWeTfsyhi69xuCvwOh7Y_RBGZ_k=/2x418:971x1387/500x500/top/smart/99designs-contests-attachments/120/120397/attachment_120397084",
    title: "One Piece",
    description: "Join Luffy on his quest to become the Pirate King.",
  },
  {
    image: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781974740819/jujutsu-kaisen-the-official-anime-guide-season-1-9781974740819_hr.jpg",
    title: "Jujutsu Kaisen",
    description: "Dive into the world of cursed energy and fierce battles.",
  }
];

const creationList = [{
  image: "https://images.beta.cosmos.so/f7fcb95d-981b-4cb3-897f-e35f6c20e830?format=jpeg",
  title: "Iron Flame",
  description: "A thrilling fantasy adventure featuring dragons and epic battles.",
  category: "Drama",
  id: 1,
  rating: 0,
  creatorName: "Anonymous",
  authors: []
},
{
  image: "https://images-platform.99static.com/WWeTfsyhi69xuCvwOh7Y_RBGZ_k=/2x418:971x1387/500x500/top/smart/99designs-contests-attachments/120/120397/attachment_120397084",
  title: "One Piece",
  description: "Join Luffy on his quest to become the Pirate King.",
  category: "Drama",
  id: 2,
  rating: 0,
  creatorName: "Anonymous",
  authors: []
},
{
  image: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781974740819/jujutsu-kaisen-the-official-anime-guide-season-1-9781974740819_hr.jpg",
  title: "Jujutsu Kaisen",
  description: "Dive into the world of cursed energy and fierce battles.",
  category: "Drama",
  id: 3,
  rating: 0,
  creatorName: "Anonymous",
  authors: []
},

{
  image: "https://images.beta.cosmos.so/f7fcb95d-981b-4cb3-897f-e35f6c20e830?format=jpeg",
  title: "Iron Flame",
  description: "A thrilling fantasy adventure featuring dragons and epic battles.",
  category: "Drama",
  id: 4,
  rating: 0,
  creatorName: "Anonymous",
  authors: []
},
{
  image: "https://images-platform.99static.com/WWeTfsyhi69xuCvwOh7Y_RBGZ_k=/2x418:971x1387/500x500/top/smart/99designs-contests-attachments/120/120397/attachment_120397084",
  title: "One Piece",
  description: "Join Luffy on his quest to become the Pirate King.",
  category: "Drama",
  id: 5,
  rating: 0,
  creatorName: "Anonymous",
  authors: []
},
{
  image: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781974740819/jujutsu-kaisen-the-official-anime-guide-season-1-9781974740819_hr.jpg",
  title: "Jujutsu Kaisen",
  description: "Dive into the world of cursed energy and fierce battles.",
  category: "Drama",
  id: 6,
  rating: 0,
  creatorName: "Anonymous",
  authors: []
},{
  image: "https://images.beta.cosmos.so/f7fcb95d-981b-4cb3-897f-e35f6c20e830?format=jpeg",
  title: "Iron Flame",
  description: "A thrilling fantasy adventure featuring dragons and epic battles.",
  category: "Drama",
  id: 7,
  rating: 0,
  creatorName: "Anonymous",
  authors: []
},
{
  image: "https://images-platform.99static.com/WWeTfsyhi69xuCvwOh7Y_RBGZ_k=/2x418:971x1387/500x500/top/smart/99designs-contests-attachments/120/120397/attachment_120397084",
  title: "One Piece",
  description: "Join Luffy on his quest to become the Pirate King.",
  category: "Drama",
  id: 8,
  rating: 0,
  creatorName: "Anonymous",
  authors: []
},
{
  image: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781974740819/jujutsu-kaisen-the-official-anime-guide-season-1-9781974740819_hr.jpg",
  title: "Jujutsu Kaisen",
  description: "Dive into the world of cursed energy and fierce battles.",
  category: "Drama",
  id: 9,
  rating: 0,
  creatorName: "Anonymous",
  authors: []
},

{
  image: "https://images.beta.cosmos.so/f7fcb95d-981b-4cb3-897f-e35f6c20e830?format=jpeg",
  title: "Iron Flame",
  description: "A thrilling fantasy adventure featuring dragons and epic battles.",
  category: "Drama",
  id: 10,
  rating: 0,
  creatorName: "Anonymous",
  authors: []
},
{
  image: "https://images-platform.99static.com/WWeTfsyhi69xuCvwOh7Y_RBGZ_k=/2x418:971x1387/500x500/top/smart/99designs-contests-attachments/120/120397/attachment_120397084",
  title: "One Piece",
  description: "Join Luffy on his quest to become the Pirate King.",
  category: "Drama",
  id: 11,
  rating: 0,
  creatorName: "Anonymous",
  authors: []
},
{
  image: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781974740819/jujutsu-kaisen-the-official-anime-guide-season-1-9781974740819_hr.jpg",
  title: "Jujutsu Kaisen",
  description: "Dive into the world of cursed energy and fierce battles.",
  category: "Drama",
  id: 12,
  rating: 0,
  creatorName: "Anonymous",
  authors: []
}]
export default async function Index() {
  return (
    <div className="w-full relative">
      <div className="relative h-screen min-h-[600px] items-center text-center bg-center bg-cover"
          style={{ backgroundImage: `url('https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781974740819/jujutsu-kaisen-the-official-anime-guide-season-1-9781974740819_hr.jpg')` }}
      >
        
        <div className="absolute flex justify-end flex-col bottom-0 left-0 right-0 top-0 mt-auto bg-black bg-opacity-80 p-4 transition-all"></div>
        <div className="sticky top-0 z-10 transition-all duration-300">
          <div className="max-w-6xl mx-auto py-6 px-4 text-white">
            <h1 className="text-5xl font-bold mb-2 mt-20">The Trend</h1>
            <h2 className="text-3xl font-semibold mb-4">Tell Your Wonderful Stories</h2>
            <p className="text-gray-500 mb-6">Feeling stuck? Collaborate with other to complete your masterpiece</p>
            
            <div className="max-w-2xl m-auto">
              <Input 
                type="search" 
                placeholder="Explore authentic collaborative books..." 
                className="h-12 px-4 rounded-full border-2 border-gray-200 focus:border-primary transition-colors"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between w-full max-w-6xl mx-auto mt-20 m-auto">
        <div>

          <div className="font-semibold">Trending</div>
          <div className="text-gray-500 text-xs">Creations popping off recently</div>
        </div>
        <Button variant="ghost" className=" py-4 text-[var(--second-highlight-color)]">
          Explore
        </Button>
      </div>
      <div className="w-full max-w-6xl mx-auto flex items-center justify-center m-auto">
        <div className="w-2/3 mr-5">
        <CreationList creationList={creationList} />
        </div>
      <div className="flex flex-col m-2  w-1/3">
        <div className="grid grid-cols-3 gap-3">
          {creationList.slice(6, 15).map((item, index) => (
            <BookCardV4 key={index} book={{
              ...item,
            }} colors={[]} />
          ))}
        </div>
      </div>
      </div>
        <div className="overflow-x-hidden">
        <TrendingCarouselV2 trendingCreations={trending}/>
      </div>
      <Footer/>
    </div>
  );
}
