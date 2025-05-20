import Layout from "../components/Layout"
import Post from "../components/Post"


async function getFeed() {
  // This is where you would typically fetch data from your database
  const feed = [
    {
      id: "1",
      title: "Prisma is the perfect ORM for Next.js",
      content: "[Prisma](https://github.com/prisma/prisma) and Next.js go _great_ together!",
      published: false,
      author: {
        name: "Nikolas Burk",
        email: "burk@prisma.io",
      },
    },
  ]
  return feed
}

export default async function Blog() {
  const feed = await getFeed()

  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold mb-6">Public Feed</h1>
        <main className="space-y-8">
          {feed.map((post) => (
            <div
              key={post.id}
              className="bg-white transition-shadow duration-100 ease-in hover:shadow-md"
            >
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  )
}
