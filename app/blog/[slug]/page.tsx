import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { getPostBySlug, getAllPosts, getRelatedPosts } from "@/lib/blog"
import { MDXRemote } from "next-mdx-remote/rsc"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import SchemaMarkup from "@/components/SchemaMarkup"

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `https://www.cybexonics.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://www.cybexonics.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
    },
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const relatedPosts = getRelatedPosts(post.slug, post.tags)

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "Cybexonics",
    },
    publisher: {
      "@type": "Organization",
      name: "Cybexonics",
      logo: "https://www.cybexonics.com/logo.png",
    },
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cybexonics.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.cybexonics.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://www.cybexonics.com/blog/${post.slug}` },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      <SchemaMarkup schema={[articleSchema, breadcrumbSchema]} />
      <Navigation />

      {/* Hero */}
      <section className="pt-20 pb-12 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-3xl mx-auto">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-red-500">Home</Link>
            <span>→</span>
            <Link href="/blog" className="hover:text-red-500">Blog</Link>
            <span>→</span>
            <span className="text-gray-600 line-clamp-1">{post.title}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 bg-red-50 text-red-600 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pb-8 border-b border-gray-100">
            <span>✍️ {post.author}</span>
            <span>📅 {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
            <span>⏱ {post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-gray-900
            prose-h1:text-4xl prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-red-500 prose-a:no-underline hover:prose-a:text-red-600
            prose-strong:text-gray-900
            prose-ul:text-gray-600 prose-li:mb-1
            prose-table:border prose-table:border-gray-200
            prose-th:bg-gray-50 prose-th:p-3 prose-th:text-left
            prose-td:p-3 prose-td:border prose-td:border-gray-100
            prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded
            prose-blockquote:border-l-4 prose-blockquote:border-red-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-500
          ">
            <MDXRemote source={post.content} />
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group block bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-all duration-200"
                >
                  <div className="text-xs text-red-500 font-medium mb-2">{related.readTime}</div>
                  <h3 className="font-bold text-gray-900 group-hover:text-red-500 transition-colors duration-200 leading-snug">
                    {related.title}
                  </h3>
                  <div className="mt-3 text-sm text-red-500 font-medium">
                    Read Article →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Help With Your Project?
          </h2>
          <p className="text-gray-400 mb-8">
            Get a custom quote from our team in Baramati, Pune — we respond within 4 business hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/india#quote"
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-200"
            >
              Get Free Quote — India
            </Link>
            <Link
              href="/uk"
              className="border border-white/20 hover:border-white/50 text-white px-8 py-4 rounded-full font-semibold transition-all duration-200"
            >
              🇬🇧 UK Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}