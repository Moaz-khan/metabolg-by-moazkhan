import { NextRequest, NextResponse } from "next/server";
import { client } from "../../../../sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Sanity image builder
const builder = imageUrlBuilder(client);
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Define the types for the blog posts
interface BlogPost {
  _id: string;
  title: string;
  description: { _type: string; children: { text: string }[] }[]; // Portable Text type
  launchAt: string;
  category: string;
  image: SanityImageSource;
  author: string;
  authorImage: SanityImageSource;
}

// GET request to fetch blogs
export async function GET() {
  try {
    // Sanity se blog posts fetch kar rahe hain
    const query = `*[_type == "blogs"] | order(launchAt desc){
      _id,
      title,
      description,
      launchAt,
      category,
      image,
      author,
      authorImage
    }`;
    const sanityPosts: BlogPost[] = await client.fetch(query);

    // Agar Sanity se posts milte hain, to unko blogPosts mein merge karte hain
    const posts = sanityPosts.map((post) => ({
      id: post._id,
      title: post.title,
      description: post.description, // Directly Portable Text
      date: post.launchAt,
      category: post.category,
      image: urlFor(post.image).url(),
      author: post.author,
      authorImage: urlFor(post.authorImage).url(),
    }));

    // Static posts ko bhi merge karna
    const staticPosts = [
      {
        id: "1",
        title: "Richird Norton Photorealistic Rendering",
        description:
          "Progressively incentivize cooperative systems through technically sound functionalities.",
        date: "08.08.2021",
        category: "ADVENTURE",
        image: "/images/background.png",
        author: "Muhammad Maaz",
        authorImage: "/images/author.jpg",
      },
      
      // Additional static posts...
    ];

    // Static posts ko dynamic posts ke saath merge karte hain
    const allPosts = [...staticPosts, ...posts];

    return NextResponse.json(allPosts);
  } catch (error) {
    console.error("Error fetching posts: ", JSON.stringify(error));
    return NextResponse.error();
  }
}

// POST request to add a new blog post
export async function POST(request: NextRequest) {
  try {
    // Request body se post ka data lena
    const body = await request.json();
    const {
      title,
      description,
      launchAt,
      category,
      image,
      author,
      authorImage,
    } = body;

    // Sanity mein new blog post create karna
    const newPost = {
      _type: "blogs",
      title,
      description,
      launchAt,
      category,
      image: {
        _type: "image",
        asset: {
          _ref: image, // image ka Sanity asset reference
        },
      },
      author,
      authorImage: {
        _type: "image",
        asset: {
          _ref: authorImage, // author ka image reference
        },
      },
    };

    // Post ko Sanity mein create karte hain
    const createdPost = await client.create(newPost);

    // Response ko return karte hain
    return NextResponse.json({
      message: "Post created successfully",
      post: createdPost,
    });
  } catch (error) {
    console.error("Error creating post: ", JSON.stringify(error));
    return NextResponse.error();
  }
}
