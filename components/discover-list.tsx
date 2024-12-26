import React from 'react';

const categories = [
  "Action",
  "Adventure",
  "Autobiography",
  "Comedy",
  "Crime",
  "Drama",
  "Dystopian",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Self-Help",
  "Thriller",
  "Young Adult",
];

const DiscoverList = () => {
  return (
    <div className="pt-4">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button key={category} className="border text-xs rounded-full px-3 py-2 hover:opacity-65 shadow-md">
            {category}
          </button>
        ))}
        <button className="border text-xs rounded-full px-4 py-2 bg-[var(--second-highlight-color)] text-white hover:opacity-80">
          View all
        </button>
      </div>
    </div>
  );
};

export default DiscoverList;