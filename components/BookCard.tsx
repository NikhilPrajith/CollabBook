import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { Badge } from "./ui/badge";

interface Book {
  id: number;
  rating: number;
  title: string;
  description: string;
  creatorName: string;
  authors: { id: string; name: string }[];
  image?: string;
  category: string;
}

const BookCard = ({ book, colors }: { book: Book; colors: string[] }) => {
  const filledStars = Math.floor(book.rating);
  const emptyStars = 5 - filledStars;
  const getStarDisplay = (rating: number) => {
    const filledStars = Math.floor(rating);
    const emptyStars = 5 - filledStars;
    return "★".repeat(filledStars) + "☆".repeat(emptyStars);
  };
  const starDisplay = getStarDisplay(book.rating||0);

    return (
      <div className="relative border border-gray-200 flex flex-col justify-between rounded-md p-4 overflow-hidden transition-shadow duration-200 cursor-pointer group hover:shadow-lg">
        <div>
            <div className="relative w-[100px] h-[150px] rounded-lg overflow-hidden m-auto">
              <img
                  src="https://images.beta.cosmos.so/f7fcb95d-981b-4cb3-897f-e35f6c20e830?format=jpeg" // Temporary picture
                  alt={book.title}
                  className="w-full h-full object-cover"
              />
            </div>
            <div className="p-1">
            <div className="text-[var(--star-color)] mt-2 text-center">{starDisplay}</div>
            <h2 className="text-base font-semibold text-center line-clamp-2 transition-all duration-200">{book.title}</h2>
            </div>
        </div>
        <div>
        <Button variant="outline" className="mt-2 font-xs w-full">
            Read Now
          </Button>
          <Link href={`/editor/${book.id}`}>
            <Button variant="ghost" className="text-xs transition-opacity duration-200 opacity-100 mt-1 w-full">
                    Contribute
            </Button>
            </Link>
            </div>
      </div>
    );
};


export const BookCardV2 = ({ book, colors }: { book: Book; colors: string[] }) => {
  const filledStars = Math.floor(book.rating);
  const emptyStars = 5 - filledStars;
  const getStarDisplay = (rating: number) => {
    const filledStars = Math.floor(rating);
    const emptyStars = 5 - filledStars;
    return "★".repeat(filledStars) + "☆".repeat(emptyStars);
  };
  const starDisplay = getStarDisplay(book.rating||0);

    return (
      <div className="relative border border-gray-200 flex flex-col justify-between rounded-md overflow-hidden transition-shadow duration-200 cursor-pointer group hover:shadow-lg">
        <div>
            <div className="relative w-full h-[150px] overflow-hidden m-auto">
              <img
                  src="https://images.beta.cosmos.so/f7fcb95d-981b-4cb3-897f-e35f6c20e830?format=jpeg" // Temporary picture
                  alt={book.title}
                  className="w-full h-full object-cover"
              />
            <div className="absolute flex justify-end flex-col bottom-0 left-0 right-0 top-0 mt-auto bg-black bg-opacity-40 p-4 transition-all"></div>
            </div>
            <div className="m-3">
              <div className="mt-2 flex items-center justify-between text-xs">
                <div className="text-gray-400">{book.category || 'Popular'}</div>
              </div>
              <div className="text-[var(--star-color)] m-1 absolute top-0 right-0">{book.rating | 0}★</div>
            <h2 className="text-base font-semibold line-clamp-1 transition-all duration-200">{book.title}</h2>
            <div className="flex text-xs items-center"> by<div className="text-[var(--second-highlight-color)] ml-1 mr-1">{book.creatorName || "Anonymous"}</div>
              {book.authors && book.authors.length !=0 && <>+{book.authors.length}</>}
            </div>
            </div>
        </div>
        <div className="m-4 flex justify-center items-center">
        <Button variant="outline" className="mt-2 font-xs w-full">
            Read Now
          </Button>
          <Link href={`/editor/${book.id}`}>
            <Button variant="ghost" className="text-xs transition-opacity duration-200 opacity-100 mt-1 w-full">
                    Contribute
            </Button>
            </Link>
            </div>
      </div>
    );
};


import { Card } from "@/components/ui/card";

export const BookCardV3 = ({ book, colors }: { book: Book; colors: string[] }) => {
    return (
      <Card className="relative flex flex-row p-4 overflow-hidden transition-shadow duration-200 cursor-pointer group hover:shadow-lg">
        <div className="relative w-[80px] h-[100px] rounded-lg overflow-hidden">
          <img
              src="https://images.beta.cosmos.so/f7fcb95d-981b-4cb3-897f-e35f6c20e830?format=jpeg" // Temporary picture
              alt={book.title}
              className="h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-between ml-4">
        <div className="">
              <div className="mt-2 flex items-center justify-between text-xs">
                <div className="text-gray-400">{book.category || 'Popular'}</div>
              </div>
              <div className="text-[var(--star-color)] m-1 absolute top-0 right-0 text-xs">{book.rating | 0}★</div>
            <h2 className="text-sm font-semibold line-clamp-1 transition-all duration-200">{book.title}</h2>
            <div className="flex text-xs items-center"> by<div className="text-[var(--second-highlight-color)] ml-1 mr-1">{book.creatorName || "Anonymous"}</div>
              {book.authors && book.authors.length !=0 && <>+{book.authors.length}</>}
            </div>

          <p className="text-xs mt-3 text-gray-500 line-clamp-2">{book.description || "No description available."}</p>
            </div>
        </div>
      </Card>
    );
};

export default BookCard; 