"use client";
import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { PortableText } from "@portabletext/react";

interface Post {
  id: string;
  title: string;
  image: string;
  date: string;
  description: { _type: string; children: { text: string }[] }[]; // Updated type for PortableText
  author: string;
  category: string;
}

export default function BlogCards() {
  const [blogPosts, setBlogPosts] = useState<Post[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [postsPerPage, setPostsPerPage] = useState(1); // Default 1 post per page on mobile
  const router = useRouter();

  useEffect(() => {
    async function fetchBlogPosts() {
      setLoading(true);
      const url = process.env.NEXT_PUBLIC_API_URL || `/api/blogs/1`;
      const response = await fetch(url, { cache: "no-cache" });
      const data = await response.json();
      setBlogPosts(data.reverse()); // Reverse to show latest posts first
      setLoading(false);
    }
    fetchBlogPosts();
  }, []);

  // Adjust posts per page based on window size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setPostsPerPage(1); // Mobile
      } else if (window.innerWidth <= 1024) {
        setPostsPerPage(2); // Tablet
      } else {
        setPostsPerPage(3); // Desktop
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial postsPerPage on component mount

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNext = () => {
    if ((currentIndex + 1) * postsPerPage < blogPosts.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Slice the posts for current page
  const postsToShow = blogPosts.slice(
    currentIndex * postsPerPage,
    (currentIndex + 1) * postsPerPage,
  );

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
        <div className="flex flex-wrap justify-start transition-transform duration-300">
          {postsToShow.map((post) => (
            <div
              key={post.id}
              className="w-full sm:w-1/2 md:w-1/3 p-4 flex-shrink-0">
              <div className="relative bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
                <div
                  className="w-full h-[250px] sm:h-[280px] md:h-[320px] bg-gray-400 rounded-t-lg bg-cover bg-center object-cover"
                  style={{
                    backgroundImage: `url(${post.image})`,
                  }}></div>

                {/* Content Wrapper with fixed height */}
                <div className="p-4">
                  <div className="text-lg font-semibold text-gray-800 truncate">
                    {post.title}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">{post.date}</div>
                  <div className="text-sm text-gray-500 line-clamp-3 mt-2">
                    <PortableText value={post.description} />
                  </div>

                  {/* Buttons and Info */}
                  <div className="mt-4 flex justify-between items-center">
                    <button
                      onClick={() => router.push(`/explore?blogId=${post.id}`)}
                      className="text-sm font-semibold text-blue-500 hover:text-blue-700 transition-colors duration-200">
                      Read More
                    </button>
                    <div className="flex items-center">
                      <div className="text-xs font-semibold text-gray-700">
                        By {post.author}
                      </div>
                      <div className="ml-2 w-36 h-6 bg-blue-500 rounded-lg text-xs text-center text-white font-semibold flex justify-center items-center">
                        {post.category}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <br />
        <br />
        <br />

        {/* Pagination Controls */}
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
            disabled={(currentIndex + 1) * postsPerPage >= blogPosts.length}
            className={`bg-gray-800 text-white p-2 rounded-full shadow-lg ${
              (currentIndex + 1) * postsPerPage >= blogPosts.length
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
