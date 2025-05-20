import React from "react"
import Layout from "../../components/Layout"
import Post from "../../components/Post"

async function getPost(id: string) {
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

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)
  
  return (
    <Layout>
      <div className="page">
        <Post post={post} />
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }
      `}</style>
    </Layout>
  )
}
