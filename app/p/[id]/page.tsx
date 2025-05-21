import React from "react"
import Layout from "../../../components/Layout"
import Post from "../../../components/Post"
import prisma from "../../../lib/prisma"

async function getPost(id: string) {
  return prisma.post.findUnique({ where: { id } })
}

// 1. params is now a Promise
interface Props {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  // 2. await the params promise
  const { id } = await params
  const post = await getPost(id)

  return (
    <Layout>
      <div className="bg-white p-8">
        {post ? <Post post={post} /> : <div>Post not found</div>}
      </div>
    </Layout>
  )
}
