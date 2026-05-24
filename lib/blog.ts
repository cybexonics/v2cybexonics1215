import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "content/blog")

export type Post = {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  author: string
  readTime: string
  content: string
}

export function getAllPosts(): Post[] {
  // Return empty array if folder doesn't exist yet
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)

  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "")
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || "",
        description: data.description || "",
        date: data.date || "",
        tags: data.tags || [],
        author: data.author || "Cybexonics Team",
        readTime: data.readTime || "5 min read",
        content,
      }
    })

  // Sort by date — newest first
  return posts.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || "",
      description: data.description || "",
      date: data.date || "",
      tags: data.tags || [],
      author: data.author || "Cybexonics Team",
      readTime: data.readTime || "5 min read",
      content,
    }
  } catch {
    return null
  }
}

export function getRelatedPosts(currentSlug: string, tags: string[]): Post[] {
  const allPosts = getAllPosts()

  return allPosts
    .filter(
      (post) =>
        post.slug !== currentSlug &&
        post.tags.some((tag) => tags.includes(tag))
    )
    .slice(0, 2)
}