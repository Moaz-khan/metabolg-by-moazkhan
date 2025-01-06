import { NextRequest, NextResponse } from "next/server";
import { client } from "../../../../sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Sanity image builder
const builder = imageUrlBuilder(client);
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Portable Text ko plain text me convert karne ka function
function extractPlainText(
  description: { children: { text: string }[] }[],
): string {
  return description
    .map((block) => block.children.map((child) => child.text).join(" "))
    .join("\n");
}

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
    const sanityPosts = await client.fetch(query);

    // Agar Sanity se posts milte hain, to unko blogPosts mein merge karte hain
    const posts = sanityPosts.map(
      (post: {
        _id: string;
        title: string;
        description: { children: { text: string }[] }[];
        launchAt: string;
        category: string;
        image: SanityImageSource;
        author: string;
        authorImage: SanityImageSource;
      }) => ({
        id: post._id,
        title: post.title,
        description: extractPlainText(post.description),
        date: post.launchAt,
        category: post.category,
        image: urlFor(post.image).url(),
        author: post.author,
        authorImage: urlFor(post.authorImage).url(),
      }),
    );

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
      {
        id: "2",
        title: "Exploring AI in Design",
        description:
          "Discover the evolving role of AI in shaping design and creativity.",
        date: "12.01.2024",
        category: "TECHNOLOGY",
        image: "/images/blogtwo.jpeg",
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

export async function POST(req: NextRequest) {
  try {
    // Request se new post data ko extract kar rahe hain
    const postData = await req.json();

    // Sanity ke liye naya post data prepare kar rahe hain
    const newPost = {
      _type: "blogs",
      title: postData.title,
      description: postData.description,
      launchAt: postData.launchAt,
      category: postData.category,
      image: {
        _type: "image",
        asset: {
          _ref: postData.image.assetRef,
        },
      },
      author: postData.author,
      authorImage: {
        _type: "image",
        asset: {
          _ref: postData.authorImage.assetRef,
        },
      },
    };

    // Sanity me naya post create kar rahe hain
    const result = await client.create(newPost);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error adding post: ", JSON.stringify(error));
    return NextResponse.error();
  }
}
