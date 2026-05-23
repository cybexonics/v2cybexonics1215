// app/about/layout.tsx
export const metadata = {
  title: "About Us — IT Consultants in Baramati, Pune",
  // template in layout.tsx auto-appends → "About Us — IT Consultants in Baramati, Pune | Cybexonics"
  // Perfect length ✓
  
  description: "Meet the Cybexonics team — passionate IT consultants from Baramati delivering world-class web development, AI & SaaS solutions across India and the UK.",
  
  openGraph: {
    title: "About Us — IT Consultants in Baramati, Pune | Cybexonics",
    // OG title can be slightly longer, full brand name here is fine ✓
    description: "Meet the Cybexonics team — passionate IT consultants from Baramati delivering world-class web development, AI & SaaS solutions across India and the UK.",
    url: "https://www.cybexonics.com/about",
    // ☝️ use www. consistently — matches your canonical
    siteName: "Cybexonics",
    type: "website",
    images: [
      {
        url: "https://www.cybexonics.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cybexonics — IT Consultants Baramati Pune",
      },
    ],
    // ☝️ you're missing images — WhatsApp/LinkedIn won't show preview without this
  },
}