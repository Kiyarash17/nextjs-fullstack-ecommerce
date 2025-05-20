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
