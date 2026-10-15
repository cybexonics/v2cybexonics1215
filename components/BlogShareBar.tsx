"use client"

import React, { useState, useEffect } from "react"
import { Share2, Copy, Check, Linkedin, Twitter, MessageCircle, ExternalLink } from "lucide-react"

interface BlogShareProps {
  slug: string
  title: string
  description?: string
  variant?: "bottom" | "inline" | "floating" | "card"
  className?: string
}

export default function BlogShareBar({
  slug,
  title,
  description,
  variant = "bottom",
  className = "",
}: BlogShareProps) {
  const [copied, setCopied] = useState(false)
  const [canNativeShare, setCanNativeShare] = useState(false)
  const [isFloatingOpen, setIsFloatingOpen] = useState(false)
  const [shareUrl, setShareUrl] = useState(`https://www.cybexonics.com/blog/${slug}`)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(`${window.location.origin}/blog/${slug}`)
      if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
        setCanNativeShare(true)
      }
    }
  }, [slug])

  const handleCopy = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl)
      } else {
        const textArea = document.createElement("textarea")
        textArea.value = shareUrl
        textArea.style.position = "fixed"
        textArea.style.opacity = "0"
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand("copy")
        document.body.removeChild(textArea)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2400)
    } catch {
      // Fallback
      setCopied(false)
    }
  }

  const handleNativeShare = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (canNativeShare) {
      try {
        await navigator.share({
          title,
          text: description || title,
          url: shareUrl,
        })
      } catch (err) {
        // User cancelled or dismissed share sheet
        if ((err as Error)?.name !== "AbortError") {
          handleCopy()
        }
      }
    } else {
      handleCopy()
    }
  }

  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedTitle = encodeURIComponent(title)
  const encodedSummary = encodeURIComponent(`${title} — Read on Cybexonics:\n${shareUrl}`)

  const shareLinks = [
    {
      name: "WhatsApp",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.09-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.18-.47-.31z" />
        </svg>
      ),
      href: `https://api.whatsapp.com/send?text=${encodedSummary}`,
      bg: "hover:bg-emerald-500 hover:text-white text-emerald-600 bg-emerald-50 border-emerald-200",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-4 h-4" />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      bg: "hover:bg-blue-600 hover:text-white text-blue-600 bg-blue-50 border-blue-200",
    },
    {
      name: "X (Twitter)",
      icon: <Twitter className="w-4 h-4" />,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      bg: "hover:bg-gray-900 hover:text-white text-gray-800 bg-gray-100 border-gray-200",
    },
    {
      name: "Facebook",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      bg: "hover:bg-indigo-600 hover:text-white text-indigo-600 bg-indigo-50 border-indigo-200",
    },
  ]

  // Variant: Card footer in blog listing
  if (variant === "card") {
    return (
      <div className={`relative inline-flex items-center ${className}`}>
        <span
          role="button"
          tabIndex={0}
          onClick={canNativeShare ? handleNativeShare : handleCopy}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              e.stopPropagation()
              if (canNativeShare) {
                handleNativeShare()
              } else {
                handleCopy()
              }
            }
          }}
          title={copied ? "Link Copied!" : "Quick Share"}
          aria-label="Share this blog post"
          className="relative inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-600 border border-gray-200 transition-all duration-200 active:scale-95 cursor-pointer select-none"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-600 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-gray-500 group-hover:text-red-500" />
              <span>Share</span>
            </>
          )}
        </span>

        {copied && (
          <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gray-900 text-white text-[10px] rounded shadow-md whitespace-nowrap animate-fade-in pointer-events-none">
            Link Copied to Clipboard!
          </span>
        )}
      </div>
    )
  }

  // Variant: Inline (e.g., right under the article headline)
  if (variant === "inline") {
    return (
      <div className={`flex flex-wrap items-center gap-2 pt-3 ${className}`}>
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5 mr-1">
          <Share2 className="w-3.5 h-3.5 text-red-500" />
          Share:
        </span>

        {/* Quick Copy Link */}
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 transition-colors duration-150 active:scale-95 shadow-2xs"
          title="Copy link"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-600" />
              <span className="text-emerald-600 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 text-gray-500" />
              <span>Copy Link</span>
            </>
          )}
        </button>

        {/* Native Share button (mobile/supported) */}
        {canNativeShare && (
          <button
            type="button"
            onClick={handleNativeShare}
            className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 transition-colors duration-150 active:scale-95 shadow-2xs"
            title="Share via device"
          >
            <Share2 className="w-3 h-3 text-red-600" />
            <span>More</span>
          </button>
        )}

        {/* Social Share Buttons */}
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${link.name}`}
            className={`p-1.5 rounded-full border transition-all duration-150 active:scale-95 shadow-2xs ${link.bg}`}
            title={`Share on ${link.name}`}
          >
            {link.icon}
          </a>
        ))}
      </div>
    )
  }

  // Variant: Floating quick share pill / button (e.g. bottom-right of article)
  if (variant === "floating") {
    return (
      <div className={`fixed bottom-6 right-6 z-40 print:hidden ${className}`}>
        {isFloatingOpen && (
          <div className="mb-3 p-3 bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col gap-2 min-w-[200px] animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-500 pb-1 border-b border-gray-100 px-1">
              <span>Share this article</span>
              <button
                type="button"
                onClick={() => setIsFloatingOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-0.5 rounded"
                aria-label="Close share menu"
              >
                ✕
              </button>
            </div>

            {/* Copy Link Option */}
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors text-left"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-600 font-semibold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-gray-500" />
                  <span>Copy Link</span>
                </>
              )}
            </button>

            {/* Native device share */}
            {canNativeShare && (
              <button
                type="button"
                onClick={handleNativeShare}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left"
              >
                <Share2 className="w-4 h-4 text-red-500" />
                <span>Device Share...</span>
              </button>
            )}

            {/* Social Share items */}
            <div className="flex items-center gap-1.5 pt-1 border-t border-gray-100 px-1">
              {shareLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Share on ${link.name}`}
                  title={`Share on ${link.name}`}
                  className={`p-2 rounded-lg border transition-all duration-150 active:scale-95 ${link.bg}`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            if (canNativeShare && !isFloatingOpen) {
              // Try native share first or toggle menu
              setIsFloatingOpen(!isFloatingOpen)
            } else {
              setIsFloatingOpen(!isFloatingOpen)
            }
          }}
          aria-label="Quick Share"
          title="Share article"
          className="flex items-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 group"
        >
          <Share2 className="w-5 h-5 text-white transition-transform group-hover:rotate-12" />
          <span className="text-sm font-semibold tracking-wide">Share</span>
        </button>
      </div>
    )
  }

  // Variant: Bottom of Blog Post (Rich Share Section with visual flair)
  return (
    <div
      className={`my-12 p-6 md:p-8 bg-gradient-to-br from-gray-50 via-white to-red-50/20 border border-gray-200/80 rounded-2xl shadow-sm ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600 mb-1.5">
            <Share2 className="w-4 h-4" />
            <span>Found This Insightful?</span>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-snug">
            Share this article with your team & network
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Spread the knowledge — help friends and colleagues stay ahead in tech & SEO.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Main Copy Link Button */}
          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 shadow-xs active:scale-95 ${
              copied
                ? "bg-emerald-600 text-white shadow-emerald-200"
                : "bg-gray-900 hover:bg-black text-white hover:shadow-md"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 animate-bounce" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Link</span>
              </>
            )}
          </button>

          {/* Device Share Button (if supported) */}
          {canNativeShare && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm bg-red-500 hover:bg-red-600 text-white transition-all duration-200 shadow-xs active:scale-95"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          )}

          {/* Social icons */}
          <div className="flex items-center gap-2">
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Share on ${link.name}`}
                title={`Share on ${link.name}`}
                className={`p-2.5 rounded-xl border transition-all duration-150 active:scale-95 shadow-xs ${link.bg}`}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
