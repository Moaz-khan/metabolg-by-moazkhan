"use client";
import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface Post {
  id: string;
  title: string;
  image: string;
  date: string;
  description: string;
  author: string;
  category: string;
}

export default function BlogCards() {
  const [blogPosts, setBlogPosts] = useState<Post[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const postsPerPage = 3;

  useEffect(() => {
    async function fetchBlogPosts() {
      setLoading(true);
      const url =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/blogs/1";
      const response = await fetch(url, { cache : "no-cache" }); // Revalidate every 5 minutes
      const data = await response.json();
      setBlogPosts(data.reverse());
      setLoading(false);
    }
    fetchBlogPosts();
  }, []);

  const handleNext = () => {
    if (currentIndex * postsPerPage < blogPosts.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const postsToShow = blogPosts.slice(0, (currentIndex + 1) * postsPerPage);

  if (loading) {
    return (
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Posts</h2>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Posts</h2>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {postsToShow.map((post) => (
            <div key={post.id} className="w-full sm:w-1/3 p-2 flex-shrink-0">
              <div className="relative h-[450px] sm:h-[565px] bg-white rounded-lg shadow-lg">
                <div
                  className="w-full h-[220px] sm:h-[280px] bg-gray-400 rounded-t-lg"
                  style={{
                    backgroundImage: `url(${post.image})`,
                    backgroundSize: "cover",
                  }}></div>
                <div className="absolute top-[250px] sm:top-[300px] left-[10px] text-lg font-semibold text-gray-700">
                  {post.title}
                </div>
                <div className="absolute top-[310px] sm:top-[355px] left-[10px] text-sm text-gray-500">
                  {post.date}
                </div>
                <div className="absolute top-[340px] sm:top-[385px] left-[10px] text-sm text-gray-500 line-clamp-2">
                  {post.description}
                </div>
                <button
                  onClick={() => router.push(`/explore?blogId=${post.id}`)}
                  className="absolute bottom-[40px] sm:bottom-[50px] left-[10px] text-sm font-semibold text-blue-500">
                  Read More
                </button>
                <div className="absolute bottom-[10px] left-[10px] text-xs font-semibold text-gray-700">
                  By {post.author}
                </div>
                <div className="absolute bottom-[10px] right-[10px] w-12 h-5 bg-white bg-opacity-40 rounded-lg text-xs text-center text-white font-semibold">
                  {post.category}
                </div>
              </div>
            </div>
          ))}
        </div>
        <br />
        <br />
        <br />

        <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-4 pb-4">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`bg-gray-800 text-white p-2 rounded-full shadow-lg ${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}>
            <FaAngleLeft />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex * postsPerPage >= blogPosts.length}
            className={`bg-gray-800 text-white p-2 rounded-full shadow-lg ${
              currentIndex * postsPerPage >= blogPosts.length
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}>
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
}
