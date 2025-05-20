import React from "react"
import Layout from "../../components/Layout"
import Post from "../../components/Post"

async function getPost() {
  // This is where you would typically fetch data from your database

  const post = {
    id: "1",
    title: "Prisma is the perfect ORM for Next.js",
    content: "[Prisma](https://github.com/prisma/prisma) and Next.js go _great_ together!",
    published: false,
    author: {
      name: "Nikolas Burk",
      email: "burk@prisma.io",
    },
  }
  return post
}



export default async function PostPage() {
  const post = await getPost()

  return (
    <Layout>
      <div className="bg-white p-8">
        <Post post={post} />
      </div>
    </Layout>
  )
}
