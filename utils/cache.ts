let cache: any = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 1000 * 60 * 5; // Cache for 5 minutes

export const getCachedPosts = async (fetchPosts: () => Promise<any>) => {
  const currentTime = Date.now();
  
  if (cache && (currentTime - lastFetchTime < CACHE_DURATION)) {
    return cache; // Return cached posts
  }

  // Fetch new posts if cache is empty or expired
  cache = await fetchPosts();
  lastFetchTime = currentTime;
  return cache;
}; 