"use client"

import { useEffect, useState, useCallback } from "react"

// Image carousel configuration
// Edit this array to change the images and their order
// All images are in web-friendly formats (JPEG/PNG)
const HERO_IMAGES = [
  "/images/hero-image.jpg",           // JPEG
  "/images/mountain-bike-backlit.png", // PNG
  "/images/snow-river.jpg",           // JPEG (converted from HEIC)
  "/images/kayaking.png",             // PNG
  "/images/biking.png",               // PNG
] as const

const IMAGE_DURATION = 6000 // 6 seconds per image
const FADE_DURATION = 1500 // 1.5 seconds fade duration

interface HeroBackgroundCarouselProps {
  onActiveImageChange?: (imagePath: string) => void
}

export function HeroBackgroundCarousel({ onActiveImageChange }: HeroBackgroundCarouselProps = {}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState(1)
  const [nextOpacity, setNextOpacity] = useState(0)
  const [nextDecoded, setNextDecoded] = useState(false)
  const [isFading, setIsFading] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [decodedImages, setDecodedImages] = useState<Set<string>>(new Set())
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())

  // Helper to get next valid index (skips failed images)
  const getNextValidIndex = useCallback((startIdx: number): number => {
    let nextIdx = (startIdx + 1) % HERO_IMAGES.length
    let attempts = 0
    while (failedImages.has(HERO_IMAGES[nextIdx]) && attempts < HERO_IMAGES.length) {
      nextIdx = (nextIdx + 1) % HERO_IMAGES.length
      attempts++
    }
    return nextIdx
  }, [failedImages])

  useEffect(() => {
    // Check for prefers-reduced-motion
    if (typeof window === "undefined") return

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Preload all images on mount using Image() constructor and decode
  useEffect(() => {
    HERO_IMAGES.forEach((imageSrc, index) => {
      const img = new window.Image()
      img.onload = async () => {
        setLoadedImages((prev) => new Set(prev).add(imageSrc))
        // Decode the image to ensure it's ready to paint
        try {
          await img.decode()
          setDecodedImages((prev) => new Set(prev).add(imageSrc))
        } catch (err) {
          // If decode fails, still mark as decoded to prevent blocking
          setDecodedImages((prev) => new Set(prev).add(imageSrc))
        }
      }
      img.onerror = () => {
        console.warn(`Failed to load image: ${imageSrc} - will skip this image`)
        setFailedImages((prev) => new Set(prev).add(imageSrc))
        setLoadedImages((prev) => new Set(prev).add(imageSrc))
        setDecodedImages((prev) => new Set(prev).add(imageSrc))
      }
      img.src = imageSrc
      // Mark first image as loaded and decoded immediately
      if (index === 0) {
        setLoadedImages((prev) => new Set(prev).add(imageSrc))
        setDecodedImages((prev) => new Set(prev).add(imageSrc))
      }
    })
  }, [])

  // Initialize next index and reset nextDecoded when next changes
  useEffect(() => {
    if (!prefersReducedMotion) {
      const newNextIdx = getNextValidIndex(activeIndex)
      const newNextImg = HERO_IMAGES[newNextIdx]
      setNextIndex(newNextIdx)
      setNextOpacity(0) // Force opacity to 0
      setIsFading(false) // Reset fade state
      
      // Check if next image is already decoded
      if (decodedImages.has(newNextImg) || failedImages.has(newNextImg)) {
        setNextDecoded(true) // Already decoded, mark as ready
      } else {
        setNextDecoded(false) // Reset decode state, wait for decode
      }
    }
  }, [activeIndex, getNextValidIndex, prefersReducedMotion, decodedImages, failedImages])

  // Carousel transition logic - wait for decode, then fade
  useEffect(() => {
    if (prefersReducedMotion) {
      return // Don't animate if user prefers reduced motion
    }

    const nextImg = HERO_IMAGES[nextIndex]
    
    // Only proceed if next image is decoded (or failed)
    if (!nextDecoded && !decodedImages.has(nextImg) && !failedImages.has(nextImg)) {
      return // Wait for next image to decode
    }

    // Start transition timer after IMAGE_DURATION
    const timeoutId = setTimeout(() => {
      // Only start fade if next is confirmed decoded
      if (nextDecoded || decodedImages.has(nextImg) || failedImages.has(nextImg)) {
        // Notify parent of upcoming image change at the START of fade (so text updates in sync)
        if (onActiveImageChange) {
          onActiveImageChange(HERO_IMAGES[nextIndex])
        }
        
        // Step 1: Make overlay visible (but still opacity 0)
        setIsFading(true)
        
        // Step 2: Wait 2 requestAnimationFrame ticks, then animate opacity to 1
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setNextOpacity(1) // Start fade in
          })
        })
        
        // After fade completes, swap active and next
        setTimeout(() => {
          setActiveIndex(nextIndex)
          setNextOpacity(0)
          setIsFading(false) // Hide overlay
          setNextDecoded(false) // Reset for new next image
        }, FADE_DURATION)
      }
    }, IMAGE_DURATION)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [prefersReducedMotion, activeIndex, nextIndex, nextDecoded, decodedImages, failedImages])

  const activeImage = HERO_IMAGES[activeIndex]
  const nextImage = HERO_IMAGES[nextIndex]

  // Notify parent of initial active image on mount (synchronous)
  useEffect(() => {
    if (onActiveImageChange && activeImage) {
      onActiveImageChange(activeImage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only on mount to set initial image

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* Solid black fallback background - prevents any color flashes */}
      <div 
        className="absolute inset-0 bg-black" 
        style={{ zIndex: 1 }} 
      />
      
      {/* Subtle overlay for readability */}
      <div 
        className="absolute inset-0 bg-black/20" 
        style={{ zIndex: 30, pointerEvents: "none" }} 
      />
      
      {/* Active background image - always at opacity 1 */}
      {activeImage && !failedImages.has(activeImage) && (
        <div
          className="absolute inset-0"
          style={{
            opacity: 1,
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <img
            src={activeImage}
            alt=""
            className="h-full w-full object-cover"
            style={{ 
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            onLoad={() => {
              setLoadedImages((prev) => new Set(prev).add(activeImage))
            }}
            onError={(e) => {
              console.error(`Error loading image: ${activeImage}`)
              setFailedImages((prev) => new Set(prev).add(activeImage))
              e.currentTarget.style.display = "none"
            }}
          />
        </div>
      )}
      
      {/* Next background image - fades in on top using opacity only */}
      {/* Only render when next image exists and is not failed */}
      {nextImage && !failedImages.has(nextImage) && (
        <div
          className="absolute inset-0 transition-opacity ease-in-out"
          style={{
            // Use BOTH opacity: 0 AND visibility: hidden when not fading
            opacity: isFading ? nextOpacity : 0,
            transitionDuration: isFading ? `${FADE_DURATION}ms` : "0ms",
            visibility: isFading ? "visible" : "hidden",
            zIndex: 20,
            pointerEvents: "none",
            willChange: "opacity",
          }}
        >
          <img
            src={nextImage}
            alt=""
            className="h-full w-full object-cover"
            style={{ 
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            onLoad={async (e) => {
              setLoadedImages((prev) => new Set(prev).add(nextImage))
              // Decode the image before marking as ready
              try {
                await e.currentTarget.decode()
                setDecodedImages((prev) => new Set(prev).add(nextImage))
                setNextDecoded(true) // Mark next image as decoded and ready
              } catch (err) {
                // If decode fails, still mark as decoded to prevent blocking
                setDecodedImages((prev) => new Set(prev).add(nextImage))
                setNextDecoded(true)
              }
            }}
            onError={(e) => {
              console.error(`Error loading image: ${nextImage}`)
              setFailedImages((prev) => new Set(prev).add(nextImage))
              setLoadedImages((prev) => new Set(prev).add(nextImage))
              setDecodedImages((prev) => new Set(prev).add(nextImage))
              setNextDecoded(true) // Mark as "decoded" (failed) to prevent blocking
              e.currentTarget.style.display = "none"
            }}
          />
        </div>
      )}
    </div>
  )
}

