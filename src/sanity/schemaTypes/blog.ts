import { Rule } from "sanity";

const blogSchema = {
  name: "blogs",
  type: "document",
  title: "Blogs",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Blogs",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      title: "Description",
      name: "description",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      title: "Blog Publish Date",
      name: "launchAt",
      type: "datetime",
    },
    {
      name: "category",
      type: "string",
      title: "Category",
    },
    {
      name: "image",
      type: "image",
      title: "Post Image",
    },
    {
      name: "author",
      title: "Author",
      type: "string",
    },
    {
      name: "authorImage",
      title: "Author Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
};

export default blogSchema;
