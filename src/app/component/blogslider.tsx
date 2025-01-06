"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BlogPost {
  id: number; // Added id property
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  author: string;
  authorImage: string;
}

export default function BlogSlider() {
  const [blogPosts, setBlogPosts] = React.useState<BlogPost[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    const fetchBlogPosts = async () => {
      const response = await fetch("http://localhost:3000/api/blogs/1");
      const data = await response.json();
      setBlogPosts(data);
      setIsLoading(false);
    };

    fetchBlogPosts();
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % blogPosts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [blogPosts.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? blogPosts.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % blogPosts.length);
  };

  const goToBlogDetail = (id: number) => {
    router.push(`/explore?blogId=${id}`);
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="spinner">Loading...</div>
      </div>
    );
  }

  return (
    <section className="relative pt-16">
      <div className="w-full max-w-7xl mx-auto relative">
        {blogPosts.map((post, index) => (
          <div
            key={index}
            className={`transition-opacity duration-700 ease-in-out ${
              currentIndex === index ? "opacity-100" : "opacity-0"
            }`}
            style={{ display: currentIndex === index ? "block" : "none" }}>
            <div className="relative p-4 h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh]">
              <div className="absolute inset-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  priority
                  className="mb-3 mt-3 rounded-lg"
                />
              </div>
              <div className="relative z-10 flex flex-col justify-end items-start p-6 h-full text-white">
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
                <Card className="relative z-10 w-full bg-transparent border-none">
                  <CardContent className="flex flex-col justify-start items-start p-6 text-white">
                    <div className="text-xs font-bold py-2 px-4 rounded-lg mb-4 bg-opacity-60">
                      {post.category}
                    </div>
                    <h2 className="text-3xl font-semibold mb-2">
                      {post.title}
                    </h2>
                    <p
                      className="text-sm mb-4 line-clamp-3"
                      title={post.description}>
                      {post.description}
                    </p>
                    <div className="flex items-center mt-4">
                      <Image
                        src={post.authorImage}
                        alt={post.author}
                        width={40}
                        height={40}
                        className="rounded-full mr-3"
                      />
                      <span className="text-sm font-medium">{post.author}</span>
                    </div>
                    <div className="text-xs mt-2">{post.date}</div>
                    <button
                      onClick={() => goToBlogDetail(post.id)}
                      className="mt-4 text-blue-500 font-semibold">
                      Read More
                    </button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10">
          &#10094;
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10">
          &#10095;
        </button>
      </div>
    </section>
  );
}
