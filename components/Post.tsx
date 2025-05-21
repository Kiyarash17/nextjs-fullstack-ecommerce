import type { Post } from '@prisma/client'
import Link from "next/link";
// import ReactMarkdown from "react-markdown";


type Props = {
  post: Post
}

export default function Post({ post }: Props) {
  // const authorName = post.author ? post.author.name : "Unknown author";
  const authorName = post.authorId ? post.authorId : "Unknown author";
  return (
    <Link
      href={`/p/${post.id}`}
      className="block text-inherit no-underline hover:bg-gray-50 transition-colors"
    >
      <div className="p-8">
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <small className="text-gray-600">By {authorName}</small>
        {/* <ReactMarkdown children={post.content} /> */}
      </div>
    </Link>
  );
}
