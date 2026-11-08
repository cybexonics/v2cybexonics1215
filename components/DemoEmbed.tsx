'use client'

import React, { useState, useEffect } from 'react'
import { ExternalLink, RefreshCw, Monitor, Sparkles, AlertCircle } from 'lucide-react'

interface DemoEmbedProps {
  demoUrl?: string
  spaNamePlaceholder?: string
  className?: string
}

export default function DemoEmbed({
  demoUrl = "https://cybexonics-spa-os-demo.vercel.app/",
  spaNamePlaceholder = "Your Spa Name",
  className = "",
}: DemoEmbedProps) {
  const [activeTab, setActiveTab] = useState<'iframe' | 'external'>('iframe')
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [key, setKey] = useState(0)

  useEffect(() => {
    if (activeTab !== 'iframe' || !isLoading) return

    const timer = setTimeout(() => {
      setHasError(true)
      setIsLoading(false)
    }, 8000)

    return () => clearTimeout(timer)
  }, [activeTab, isLoading, key])

  const handleReload = () => {
    setIsLoading(true)
    setHasError(false)
    setKey((prev) => prev + 1)
  }

  return (
    <div
      className={`my-10 rounded-2xl overflow-hidden border border-[#D4AF37]/30 bg-[#0B132B] shadow-2xl transition-all ${className}`}
    >
      {/* Top Header Bar */}
      <div className="bg-[#121B36] border-b border-[#D4AF37]/20 px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-[#C5A880]/15 border border-[#C5A880]/40 flex items-center justify-center text-[#D4AF37]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold text-sm tracking-wide">
                Cybexonics Spa OS
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-[#C5A880]/20 text-[#D4AF37] border border-[#C5A880]/30">
                Interactive Demo
              </span>
            </div>
            <p className="text-xs text-slate-300">
              White-label mode: enter your spa name on the first screen
            </p>
          </div>
        </div>

        {/* Tab / View Switcher (Desktop / Tablet) */}
        <div className="flex items-center bg-[#070D1E] p-1 rounded-xl border border-white/10 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('iframe')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'iframe'
                ? 'bg-[#C5A880] text-[#0B132B] font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            Try it here
          </button>
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-[#D4AF37] transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Open in new tab
          </a>
        </div>
      </div>

      {/* On mobile screens under 640px: Show "Open in new tab" first */}
      <div className="block sm:hidden px-4 py-3 bg-[#0d1630] border-b border-[#D4AF37]/20 text-center">
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#C5A880] text-[#0B132B] font-semibold text-xs shadow-md hover:bg-[#D4AF37] transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Open the full demo in a new tab
        </a>
        <p className="text-[11px] text-slate-400 mt-1.5">
          Recommended for mobile screens. Or test the embedded view below.
        </p>
      </div>

      {/* Main Container: Embed shown second on mobile */}
      <div className="relative bg-[#070D1E] min-h-[640px] flex flex-col justify-center">
        {activeTab === 'iframe' ? (
          <>
            {/* Loading Skeleton */}
            {isLoading && !hasError && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#070D1E] p-6 text-center">
                <div className="relative w-12 h-12 mb-4">
                  <div className="w-12 h-12 rounded-full border-2 border-[#C5A880]/20 border-t-[#D4AF37] animate-spin" />
                </div>
                <p className="text-white text-sm font-medium">Initialising Spa OS Demo...</p>
                <p className="text-xs text-slate-400 mt-1 max-w-sm">
                  Loading white-label workspace. You can enter &quot;{spaNamePlaceholder}&quot; on the start screen.
                </p>
              </div>
            )}

            {/* Graceful Fallback if iframe fails or times out after 8s */}
            {hasError ? (
              <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-12 bg-[#121B36] rounded-xl border border-[#D4AF37]/30">
                <AlertCircle className="w-10 h-10 text-[#D4AF37] mx-auto mb-3" />
                <h4 className="text-white font-semibold text-base mb-1">
                  Unable to load interactive preview in this browser
                </h4>
                <p className="text-xs text-slate-300 mb-6">
                  Some browser privacy shields prevent embedding external applets. You can launch the full, undisturbed live demo directly in a new tab.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleReload}
                    className="w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-medium border border-white/20 text-slate-200 hover:bg-white/5 flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Retry Loading
                  </button>
                  <a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-2 rounded-lg text-xs font-semibold bg-[#C5A880] text-[#0B132B] hover:bg-[#D4AF37] flex items-center justify-center gap-1.5 transition-all shadow-md"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Open the demo in a new tab
                  </a>
                </div>
              </div>
            ) : (
              <iframe
                key={key}
                src={demoUrl}
                title="Cybexonics Spa OS Interactive Live Demo"
                className="w-full h-[680px] border-0"
                onLoad={() => setIsLoading(false)}
                allow="clipboard-write"
                loading="lazy"
              />
            )}
          </>
        ) : (
          <div className="p-8 sm:p-14 text-center max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#C5A880]/15 border border-[#C5A880]/40 flex items-center justify-center text-[#D4AF37] mx-auto mb-4">
              <ExternalLink className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">
              Experience Spa OS in Full Screen
            </h4>
            <p className="text-sm text-slate-300 mb-6">
              Launch the complete white-label demo in an uncluttered browser tab with full desktop or mobile workspace resolution.
            </p>
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C5A880] text-[#0B132B] font-bold text-sm hover:bg-[#D4AF37] transition-all shadow-lg shadow-[#0B132B]/50"
            >
              Launch Full Demo in New Tab
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>

      {/* Mandatory Clarification Microcopy and Direct Controls */}
      <div className="bg-[#121B36] border-t border-[#D4AF37]/20 px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <p className="text-slate-300 text-center sm:text-left">
          <strong className="text-[#D4AF37] font-semibold">Free to try. No card needed.</strong> The demo is limited to 5 customer records so you can test it with real clients.
        </p>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleReload}
            title="Reload interactive demo"
            className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset view</span>
          </button>
          <span className="text-white/20">|</span>
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D4AF37] hover:underline font-medium flex items-center gap-1"
          >
            <span>Open in new tab</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  )
}
