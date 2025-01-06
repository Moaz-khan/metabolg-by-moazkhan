"use client";
import * as React from "react";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  author: string;
  authorImage: string;
}

export default function ExploreBlogs() {
  const [blogPosts, setBlogPosts] = React.useState<BlogPost[]>([]);
  const [selectedBlog, setSelectedBlog] = React.useState<BlogPost | null>(null);
  const [comment, setComment] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [comments, setComments] = React.useState<
    { name: string; comment: string }[]
  >([]);
  const router = useRouter();

  // Suspense ko useSearchParams ke sath wrap karein
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExploreBlogsContent
        blogPosts={blogPosts}
        selectedBlog={selectedBlog}
        setSelectedBlog={setSelectedBlog}
        setBlogPosts={setBlogPosts}
        comment={comment}
        setComment={setComment}
        name={name}
        setName={setName}
        comments={comments}
        setComments={setComments}
        router={router}
      />
    </Suspense>
  );
}

function ExploreBlogsContent({
  blogPosts,
  selectedBlog,
  setSelectedBlog,
  setBlogPosts,
  comment,
  setComment,
  name,
  setName,
  comments,
  setComments,
  router,
}: {
  blogPosts: BlogPost[];
  selectedBlog: BlogPost | null;
  setSelectedBlog: React.Dispatch<React.SetStateAction<BlogPost | null>>;
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  comments: { name: string; comment: string }[];
  setComments: React.Dispatch<
    React.SetStateAction<{ name: string; comment: string }[]>
  >;
  router: ReturnType<typeof useRouter>;
}) {
  const searchParams = useSearchParams();

  React.useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const url =
          process.env.NEXT_PUBLIC_API_URL ||
          "http://localhost:3000/api/blogs/1";
        const response = await fetch(url, { cache: "no-cache" });
        const data = await response.json();
        setBlogPosts(data);

        // Check for blogId in the URL and select the corresponding blog
        const blogId = searchParams.get("blogId");
        if (blogId) {
          const selected = data.find((post: BlogPost) => post.id === blogId);
          setSelectedBlog(selected || null);
        } else if (data.length > 0) {
          setSelectedBlog(data[0]);
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchBlogPosts();
  }, [searchParams, setBlogPosts, setSelectedBlog]);

  const handleCommentSubmit = () => {
    if (comment && name) {
      const newComment = { name, comment };

      setComments((prevComments) => [...prevComments, newComment]);

      setComment("");
      setName("");
    }
  };

  return (
    <section className="flex flex-col md:flex-row pt-16 w-full max-w-7xl mx-auto">
      {/* Left Section: Blog Detail */}
      <div className="flex-1 p-6">
        {selectedBlog ? (
          <Card className="mb-6">
            <CardContent>
              <div className="relative mb-6">
                <Image
                  src={selectedBlog.image}
                  alt={selectedBlog.title}
                  width={600}
                  height={400}
                  className="rounded-lg object-cover w-full"
                />
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
                {selectedBlog.title}
              </h2>
              <div className="text-xs font-bold py-2 px-4 rounded-lg mb-4 bg-opacity-60">
                {selectedBlog.category}
              </div>
              <p className="text-sm sm:text-base mb-4">
                {selectedBlog.description}
              </p>
              <div className="flex items-center mt-4 mb-6">
                <Image
                  src={selectedBlog.authorImage}
                  alt={selectedBlog.author}
                  width={50}
                  height={50}
                  className="rounded-full mr-3"
                />
                <span className="text-sm font-medium">
                  {selectedBlog.author}
                </span>
              </div>
              <div className="text-xs text-gray-500">{selectedBlog.date}</div>

              {/* Comment Section */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Comments</h4>
                <div>
                  {comments.map((comment, index) => (
                    <div
                      key={index}
                      className="mb-4 p-4 bg-gray-100 rounded-lg">
                      <strong>{comment.name}</strong>
                      <p className="text-sm">{comment.comment}</p>
                    </div>
                  ))}
                </div>

                {/* Comment Form */}
                <div className="mt-4">
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
              </div>
            </CardContent>
          </Card>
        ) : (
          <p>No blog post selected or loading...</p>
        )}
      </div>

      {/* Right Section: Blog List with ScrollArea */}
      <div className="flex-1 p-6">
        <h3 className="text-xl sm:text-2xl font-semibold mb-4">
          Explore Blogs
        </h3>
        <ScrollArea className="h-[80vh] w-full rounded-md border">
          <div className="space-y-4 p-4">
            {blogPosts.map((post: BlogPost, index) => (
              <div
                key={index}
                onClick={() => router.push(`/explore?blogId=${post.id}`)}
                className="cursor-pointer hover:bg-gray-200 p-4 rounded-lg shadow-md transition duration-200 ease-in-out">
                <div className="flex items-center space-x-4">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={100}
                    height={100}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <h4 className="text-lg font-semibold">{post.title}</h4>
                    <p className="text-sm sm:text-base text-gray-600 line-clamp-2">
                      {post.description}
                    </p>
                    <div className="flex items-center mt-2">
                      <Image
                        src={post.authorImage}
                        alt={post.author}
                        width={30}
                        height={30}
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
}
