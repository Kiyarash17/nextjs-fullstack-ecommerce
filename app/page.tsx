import prisma from "@/lib/prisma"
import Layout from "../components/Layout"
import PostComponent from "../components/Post"
import type { Post } from '@prisma/client'


async function getFeed() {
  // This is where you would typically fetch data from your database
  return (
    await prisma.post.findMany(
      {}
    )
  )
}

export default async function Blog() {
  const feed = await getFeed()

  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold mb-6">Public Feed</h1>
        <main className="space-y-8">
          {feed.map((post: Post) => (
            <div
              key={post.id}
              className="bg-white transition-shadow duration-100 ease-in hover:shadow-md"
            >
              <PostComponent post={post} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  )
}
