import React from "react";
import Link from "next/link";
// import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

export default function Post({ post }: { post: PostProps }) {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <Link href={`/p/${post.id}`} className="post-link">
      <div>
        <h2>{post.title}</h2>
        <small>By {authorName}</small>
        {/* <ReactMarkdown children={post.content} /> */}
      </div>
      {/* <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
        .post-link {
          text-decoration: none;
          color: inherit;
          display: block;
        }
      `}</style> */}
    </Link>
  );
}
