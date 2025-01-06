// BlogCard.tsx
"use client"
import Image from "next/image";

interface BlogCardProps {
  image: string;
  title: string;
  date: string;
  description: string;
  author: string;
  authorImage: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  image,
  title,
  date,
  description,
  author,
  authorImage,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="relative mb-4">
        <Image
          src={image}
          alt={title}
          width={320}
          height={180}
          className="rounded-lg object-cover w-full h-40"
        />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-500">{date}</p>
      <p className="text-sm text-gray-700 mt-2">{description}</p>
      <div className="flex items-center mt-4">
        <Image
          src={authorImage}
          alt={author}
          width={30}
          height={30}
          className="rounded-full mr-2"
        />
        <span className="text-sm font-medium">{author}</span>
      </div>
    </div>
  );
};

export default BlogCard;
