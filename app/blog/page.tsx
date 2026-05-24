import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { getAllPosts } from "@/lib/blog"
import Link from "next/link"
import type { Metadata } from "next"
import SchemaMarkup from "@/components/SchemaMarkup"

export const metadata: Metadata = {
  title: "Blog — Web Development & SEO Insights",
  description: "Expert articles on web development, SEO, mobile apps and IT from Cybexonics — IT consultants in Baramati, Pune.",
  alternates: {
    canonical: "https://www.cybexonics.com/blog",
  },
  openGraph: {
    title: "Blog — Web Development & SEO Insights | Cybexonics",
    description: "Expert articles on web development, SEO, mobile apps and IT from Cybexonics — IT consultants in Baramati, Pune.",
    url: "https://www.cybexonics.com/blog",
    type: "website",
  },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cybexonics.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.cybexonics.com/blog" },
  ],
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-white">
      <SchemaMarkup schema={[breadcrumbSchema]} />
      <Navigation />

      {/* Hero */}
      <section className="pt-20 pb-16 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Blog &{" "}
            <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              Insights
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Expert articles on web development, SEO, mobile apps and IT
            consulting from the Cybexonics team in Baramati, Pune.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500">No posts yet. Check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  {/* Card top accent */}
                  <div className="h-1 bg-gradient-to-r from-red-500 to-red-600" />

                  <div className="p-6">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-200 leading-snug">
                      {post.title}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-4 border-t border-gray-50">
                      <span>{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                      <span>{post.readTime}</span>
                    </div>

                    {/* CTA */}
                    <div className="mt-4 text-sm font-semibold text-red-500 group-hover:text-red-600 flex items-center gap-1">
                      Read Article
                      <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Help With Your Project?
          </h2>
          <p className="text-gray-400 mb-8">
            Baramati-based IT consultants serving businesses across India and the UK.
          </p>
          <Link
            href="/india#quote"
            className="inline-block bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-200"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}