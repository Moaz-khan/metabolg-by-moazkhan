"use client";
import { useEffect, useState } from "react";
import {
  PortableText,
  PortableTextBlock,
  PortableTextComponents,
} from "@portabletext/react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import useQueryParams from "../hooks/useQueryParams"; // Custom hook import

interface BlogPost {
  id: string;
  title: string;
  description: PortableTextBlock[];
  date: string;
  category: string;
  image: string;
  author: string;
  authorImage: string;
}

const ExploreBlogs = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [comment, setComment] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [comments, setComments] = useState<{ name: string; comment: string }[]>(
    [],
  );

  const [currentBlogId, setCurrentBlogId] = useQueryParams("blogId");

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_API_URL || "/api/blogs/1";
        const response = await fetch(url, { cache: "no-cache" });
        const data: BlogPost[] = await response.json();
        setBlogPosts(data);

        if (currentBlogId) {
          const selected = data.find((post) => post.id === currentBlogId);
          setSelectedBlog(selected || null);
        } else if (data.length > 0) {
          setSelectedBlog(data[0]);
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchBlogPosts();
  }, [currentBlogId]);

  const handleCommentSubmit = () => {
    if (comment && name) {
      setComments((prevComments) => [...prevComments, { name, comment }]);
      setComment("");
      setName("");
    }
  };

  const customComponents: PortableTextComponents = {
    block: {
      h1: ({ children }) => (
        <h1 className="text-3xl font-extrabold my-6">{children}</h1>
      ),
      normal: ({ children }) => <p className="text-base my-2">{children}</p>,
    },
    marks: {
      strong: ({ children }) => (
        <strong className="font-bold">{children}</strong>
      ),
      em: ({ children }) => <em className="italic">{children}</em>,
    },
    list: {
      bullet: ({ children }) => <ul className="list-disc pl-5">{children}</ul>,
    },
    listItem: {
      bullet: ({ children }) => <li>{children}</li>,
    },
  };

  const handleBlogSelect = (blogId: string) => {
    setCurrentBlogId(blogId);
    const selected = blogPosts.find((post) => post.id === blogId);
    setSelectedBlog(selected || null);
  };

  return (
    <section className="flex flex-col md:flex-row pt-16 w-full max-w-7xl mx-auto">
      <div className="flex-1 p-4 md:p-6">
        {selectedBlog ? (
          <Card className="mb-6">
            <CardContent>
              <Image
                src={selectedBlog.image}
                alt={selectedBlog.title}
                width={600}
                height={400}
                className="rounded-lg object-cover w-full"
              />
              <h2 className="text-xl md:text-2xl font-semibold my-4">
                {selectedBlog.title}
              </h2>
              <div className="text-sm md:text-base mb-4">
                <PortableText
                  value={selectedBlog.description}
                  components={customComponents}
                />
              </div>
              <div className="flex items-center mt-4 mb-6">
                <Image
                  src={selectedBlog.authorImage}
                  alt={selectedBlog.author}
                  width={40}
                  height={40}
                  className="rounded-full mr-3"
                />
                <span className="text-sm font-medium">
                  {selectedBlog.author}
                </span>
              </div>
              <div className="text-xs text-gray-500">{selectedBlog.date}</div>
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Comments</h4>
                {comments.map((comment, index) => (
                  <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg">
                    <strong>{comment.name}</strong>
                    <p className="text-sm">{comment.comment}</p>
                  </div>
                ))}
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full mb-2 p-2 border rounded-lg"
                />
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Your Comment"
                  className="w-full mb-2 p-2 border rounded-lg"
                />
                <button
                  onClick={handleCommentSubmit}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                  Submit Comment
                </button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <p>No blog post selected or loading...</p>
        )}
      </div>

      <div className="flex-1 p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold mb-4">Explore Blogs</h3>
        <ScrollArea className="h-[60vh] md:h-[80vh] w-full rounded-md border">
          <div className="space-y-4 p-4">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => handleBlogSelect(post.id)}
                className="cursor-pointer hover:bg-gray-200 p-4 rounded-lg shadow-md transition duration-200 ease-in-out">
                <div className="flex items-center space-x-4">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <h4 className="text-sm md:text-lg font-semibold">
                      {post.title}
                    </h4>
                    <div className="text-xs md:text-sm text-gray-600 line-clamp-2">
                      <PortableText
                        value={post.description}
                        components={customComponents}
                      />
                    </div>
                    <div className="flex items-center mt-2">
                      <Image
                        src={post.authorImage}
                        alt={post.author}
                        width={24}
                        height={24}
                        className="rounded-full mr-2"
                      />
                      <span className="text-xs">{post.author}</span>
                    </div>
                  </div>
                </div>
                <Separator className="my-2" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </section>
  );
};

export default ExploreBlogs;
