"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false)
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false)
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const pathname = usePathname()
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const regionDropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsAboutDropdownOpen(false)
    setIsMobileAboutOpen(false)
    setIsRegionDropdownOpen(false)
  }, [pathname])

  // Close region dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        regionDropdownRef.current &&
        !regionDropdownRef.current.contains(event.target as Node)
      ) {
        setIsRegionDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Top-level nav: exactly 5 items
  const mainNavItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Pricing", href: "/pricing" },
  ]

  const aboutDropdownItems = [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
  ]

  const regions = [
    { name: "India", flag: "🇮🇳", href: "/india" },
    { name: "UK", flag: "🇬🇧", href: "/uk" },
  ]

  const isUk = pathname === "/uk" || pathname.startsWith("/uk/")
  const currentRegion = isUk ? regions[1] : regions[0]

  const isAboutActive = ["/about", "/careers", "/blog"].some((path) =>
    pathname.startsWith(path)
  )

  const handleMouseEnterAbout = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
    setHoveredItem("About")
    setIsAboutDropdownOpen(true)
  }

  const handleMouseLeaveAbout = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsAboutDropdownOpen(false)
      setHoveredItem((prev) => (prev === "About" ? null : prev))
    }, 120)
  }

  return (
    <>
      <header className="fixed top-2.5 sm:top-3.5 inset-x-3 sm:inset-x-6 max-w-6xl mx-auto z-50 transition-all duration-300">
        <div
          className={`rounded-full px-4 sm:px-6 transition-all duration-300 ${
            isScrolled
              ? "bg-white/85 backdrop-blur-2xl border border-neutral-200/90 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15),0_1px_3px_rgba(0,0,0,0.05)]"
              : "bg-white/75 backdrop-blur-xl border border-neutral-200/70 shadow-[0_6px_24px_-8px_rgba(0,0,0,0.08)]"
          }`}
        >
          <div className="flex items-center justify-between h-13 md:h-12">
            {/* Logo: Uploaded Squircle Chevrons Logo followed by CYBEXONICS Name */}
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-2.5 group transition-opacity duration-200 hover:opacity-85 pl-1 shrink-0"
            >
              <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shrink-0">
                <Image
                  src="/images/logo_1080.png"
                  alt="CYBEXONICS Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain drop-shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                  priority
                />
              </div>
              <span className="text-[14px] sm:text-[15px] font-bold tracking-tight text-neutral-900 select-none">
                CYBEXONICS
              </span>
            </Link>

            {/* Desktop Navigation: Exactly 5 items */}
            <nav
              className="hidden lg:flex items-center space-x-1 relative py-1"
              onMouseLeave={() => {
                if (!isAboutDropdownOpen) {
                  setHoveredItem(null)
                }
              }}
            >
              {mainNavItems.map((item) => {
                const isHovered = hoveredItem === item.name
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onMouseEnter={() => {
                      setIsAboutDropdownOpen(false)
                      setHoveredItem(item.name)
                    }}
                    className={`relative px-3.5 py-1.5 text-[13px] tracking-[-0.01em] transition-colors duration-150 ${
                      isActive
                        ? "text-neutral-950 font-semibold"
                        : "text-neutral-600 hover:text-neutral-950 font-medium"
                    }`}
                  >
                    {/* Vivid Crystal Glass Hover Square */}
                    {isHovered && (
                      <motion.div
                        layoutId="nav-crystal-square"
                        className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden backdrop-blur-xl"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,242,245,0.85) 50%, rgba(225,230,238,0.75) 100%)",
                          boxShadow:
                            "0 6px 18px -2px rgba(15, 23, 42, 0.12), 0 2px 6px -1px rgba(15, 23, 42, 0.08), inset 0 1.5px 0 0 rgba(255, 255, 255, 1), inset 0 -1px 0 0 rgba(148, 163, 184, 0.35)",
                          border: "1px solid rgba(148, 163, 184, 0.45)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 450,
                          damping: 30,
                          mass: 0.65,
                        }}
                      >
                        <div className="absolute inset-x-2 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-100" />
                        <div className="absolute -inset-full bg-[linear-gradient(60deg,transparent_35%,rgba(255,255,255,0.8)_50%,transparent_65%)] opacity-60" />
                        <div className="absolute inset-y-1 left-0 w-[1px] bg-white/80" />
                        <div className="absolute inset-y-1 right-0 w-[1px] bg-black/10" />
                      </motion.div>
                    )}

                    {/* Active Indicator dot */}
                    {isActive && !isHovered && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-600 rounded-full shadow-[0_0_6px_rgba(220,38,38,0.5)]" />
                    )}

                    <span className="relative z-10">{item.name}</span>
                  </Link>
                )
              })}

              {/* 5th Item: About Dropdown on Desktop */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnterAbout}
                onMouseLeave={handleMouseLeaveAbout}
              >
                <button
                  type="button"
                  onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
                  className={`relative flex items-center gap-1 px-3.5 py-1.5 text-[13px] tracking-[-0.01em] transition-colors duration-150 outline-none ${
                    isAboutActive
                      ? "text-neutral-950 font-semibold"
                      : "text-neutral-600 hover:text-neutral-950 font-medium"
                  }`}
                  aria-expanded={isAboutDropdownOpen}
                  aria-haspopup="true"
                >
                  {/* Crystal highlight on About button when hovered or when dropdown is open */}
                  {(hoveredItem === "About" || isAboutDropdownOpen) && (
                    <motion.div
                      layoutId="nav-crystal-square"
                      className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden backdrop-blur-xl"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,242,245,0.85) 50%, rgba(225,230,238,0.75) 100%)",
                        boxShadow:
                          "0 6px 18px -2px rgba(15, 23, 42, 0.12), 0 2px 6px -1px rgba(15, 23, 42, 0.08), inset 0 1.5px 0 0 rgba(255, 255, 255, 1), inset 0 -1px 0 0 rgba(148, 163, 184, 0.35)",
                        border: "1px solid rgba(148, 163, 184, 0.45)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 30,
                        mass: 0.65,
                      }}
                    >
                      <div className="absolute inset-x-2 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-100" />
                      <div className="absolute -inset-full bg-[linear-gradient(60deg,transparent_35%,rgba(255,255,255,0.8)_50%,transparent_65%)] opacity-60" />
                      <div className="absolute inset-y-1 left-0 w-[1px] bg-white/80" />
                      <div className="absolute inset-y-1 right-0 w-[1px] bg-black/10" />
                    </motion.div>
                  )}

                  {/* Active Indicator dot */}
                  {isAboutActive && hoveredItem !== "About" && !isAboutDropdownOpen && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-600 rounded-full shadow-[0_0_6px_rgba(220,38,38,0.5)]" />
                  )}

                  <span className="relative z-10">About</span>
                  <ChevronDown
                    className={`relative z-10 w-3.5 h-3.5 text-neutral-500 transition-transform duration-200 ${
                      isAboutDropdownOpen ? "rotate-180 text-neutral-900" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu Container with Smooth Fade + 8px Slide-Down (200ms ease-out) */}
                <AnimatePresence>
                  {isAboutDropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50">
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="w-48 p-1.5 bg-white/90 backdrop-blur-2xl rounded-2xl border border-neutral-200/90 shadow-[0_14px_36px_-6px_rgba(0,0,0,0.14),0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden"
                      >
                        {/* Crystal top light facet sheen */}
                        <div className="h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90 mb-1" />

                        <div className="space-y-0.5">
                          {aboutDropdownItems.map((subItem) => {
                            const isSubActive = pathname === subItem.href
                            return (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className={`group flex items-center justify-between px-3 py-2 rounded-xl text-[13px] font-medium transition-all duration-150 ${
                                  isSubActive
                                    ? "bg-neutral-900/[0.07] text-neutral-950 font-semibold"
                                    : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-900/[0.04]"
                                }`}
                              >
                                <span>{subItem.name}</span>
                                <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:text-neutral-800 opacity-0 group-hover:opacity-100 transition-all duration-150 -translate-x-1 group-hover:translate-x-0" />
                              </Link>
                            )
                          })}
                        </div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Right Action: Region Switcher + Apple-style Minimal CTA */}
            <div className="hidden sm:flex items-center gap-2 pr-1">
              {/* Secondary Region-Switcher Dropdown */}
              <div className="relative" ref={regionDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsRegionDropdownOpen(!isRegionDropdownOpen)}
                  className={`group inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-normal tracking-tight rounded-full transition-all duration-150 border ${
                    isRegionDropdownOpen
                      ? "bg-neutral-900/[0.07] text-neutral-950 border-neutral-300 font-medium shadow-sm"
                      : "text-neutral-600 hover:text-neutral-950 bg-neutral-100/60 hover:bg-neutral-200/60 border-neutral-200/80"
                  }`}
                  aria-label="Select Region"
                  aria-expanded={isRegionDropdownOpen}
                >
                  <span className="text-[12px] leading-none">{currentRegion.flag}</span>
                  <span className="leading-none">{currentRegion.name}</span>
                  <ChevronDown
                    className={`w-3 h-3 text-neutral-400 group-hover:text-neutral-700 transition-transform duration-200 ${
                      isRegionDropdownOpen ? "rotate-180 text-neutral-900" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isRegionDropdownOpen && (
                    <div className="absolute right-0 top-full pt-2 z-50">
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.96 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="w-32 p-1 bg-white/95 backdrop-blur-2xl rounded-xl border border-neutral-200/90 shadow-[0_12px_28px_-6px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.04)] overflow-hidden"
                      >
                        {regions.map((reg) => {
                          const isSelected = reg.name === currentRegion.name
                          return (
                            <Link
                              key={reg.name}
                              href={reg.href}
                              onClick={() => setIsRegionDropdownOpen(false)}
                              className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[12px] transition-colors ${
                                isSelected
                                  ? "bg-neutral-900/[0.07] text-neutral-950 font-semibold"
                                  : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100"
                              }`}
                            >
                              <span className="flex items-center gap-1.5">
                                <span className="text-[13px]">{reg.flag}</span>
                                <span>{reg.name}</span>
                              </span>
                              {isSelected && (
                                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                              )}
                            </Link>
                          )
                        })}
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Get a Quote Button */}
              <a
                href="https://wa.me/919604902393?text=Hi%20Cybexonics%2C%20I%27d%20like%20to%20get%20a%20quote%20for%20a%20website%2FIT%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-1.5 px-4 py-1.5 text-[12px] font-medium tracking-tight text-white bg-neutral-900 hover:bg-neutral-800 rounded-full transition-all duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] active:scale-95"
              >
                <span>Get a Quote</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-white transition-colors" />
              </a>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              className="lg:hidden p-1.5 text-neutral-700 hover:text-neutral-950 rounded-full hover:bg-black/5 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Apple-style Mobile Dropdown Overlay with Tap Accordion */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-3 sm:inset-x-6 top-16 sm:top-18 z-40 max-w-6xl mx-auto bg-white/95 backdrop-blur-2xl rounded-3xl border border-neutral-200/90 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] lg:hidden max-h-[calc(100vh-5rem)] overflow-y-auto"
          >
            <div className="px-6 py-5 space-y-1">
              {/* Main 4 items on Mobile */}
              {mainNavItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between py-2.5 px-3 rounded-xl text-[15px] transition-colors ${
                      isActive
                        ? "bg-neutral-900/[0.05] text-neutral-950 font-semibold"
                        : "text-neutral-700 hover:text-neutral-950 hover:bg-black/[0.03]"
                    }`}
                  >
                    <span>{item.name}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    )}
                  </Link>
                )
              })}

              {/* 5th Item: About with Tap Accordion on Mobile */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setIsMobileAboutOpen(!isMobileAboutOpen)}
                  className={`w-full flex items-center justify-between py-2.5 px-3 rounded-xl text-[15px] transition-colors ${
                    isAboutActive
                      ? "bg-neutral-900/[0.05] text-neutral-950 font-semibold"
                      : "text-neutral-700 hover:text-neutral-950 hover:bg-black/[0.03]"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    About
                    {isAboutActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    )}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${
                      isMobileAboutOpen ? "rotate-180 text-neutral-900" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isMobileAboutOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="overflow-hidden pl-4 pr-1 py-1 space-y-1"
                    >
                      {aboutDropdownItems.map((subItem) => {
                        const isSubActive = pathname === subItem.href
                        return (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center justify-between py-2 px-3 rounded-lg text-[14px] transition-colors ${
                              isSubActive
                                ? "text-neutral-950 font-semibold bg-neutral-900/[0.04]"
                                : "text-neutral-600 hover:text-neutral-900 hover:bg-black/[0.02]"
                            }`}
                          >
                            <span>{subItem.name}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                          </Link>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Region Switcher Row (Above Get a Quote) */}
              <div className="pt-3 pb-2 border-t border-black/[0.06] mt-3">
                <div className="flex items-center justify-between px-2 mb-2">
                  <span className="text-[11px] font-semibold tracking-wider text-neutral-400 uppercase">
                    Region
                  </span>
                  <span className="text-[11px] text-neutral-500 font-medium">
                    {currentRegion.flag} {currentRegion.name}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 px-1">
                  {regions.map((reg) => {
                    const isSelected = reg.name === currentRegion.name
                    return (
                      <Link
                        key={reg.name}
                        href={reg.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-[13px] font-medium border transition-all ${
                          isSelected
                            ? "bg-neutral-900 text-white border-neutral-900 shadow-sm"
                            : "bg-neutral-100/70 text-neutral-700 border-neutral-200/80 hover:bg-neutral-200/60"
                        }`}
                      >
                        <span>{reg.flag}</span>
                        <span>{reg.name}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="pt-1">
                <a
                  href="https://wa.me/919604902393?text=Hi%20Cybexonics%2C%20I%27d%20like%20to%20get%20a%20quote%20for%20a%20website%2FIT%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-[13px] font-medium text-white bg-neutral-900 hover:bg-neutral-800 rounded-full transition-all duration-200 shadow-sm"
                >
                  <span>Get a Quote via WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-300" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

