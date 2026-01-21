# Hero Image Carousel Implementation Prompt

Implement a smooth, looping image carousel for the hero section background with crossfade transitions.

## Requirements

### Image Sequence
The carousel should display images in this exact order, looping continuously:
1. `/images/hero-image.jpg` (first image on page load)
2. `/images/mountain-bike-backlit.png`
3. `/images/snow-river.jpg` (handle gracefully - convert to JPG/PNG or skip with warning if browser doesn't support)
4. `/images/kayaking.png` (note: file is named "kayaking.png", not "Kayanking.png")
5. `/images/biking.png`

### Visual Requirements
- **Transition type**: Smooth crossfade (opacity transition) - no sliding, no sharp cuts
- **Transition duration**: 2-3 seconds for a calm, gentle fade
- **Display duration**: 5-6 seconds per image before transitioning
- **Loop**: Infinite loop - after the last image, return to the first image
- **Text overlay**: Keep all hero text visible and readable throughout all transitions:
  - "Adventure Therapy" (heading)
  - "more than just a trip..." (subheading)
  - "Evidence-based therapy programs..." (description paragraph)

### Technical Requirements
- Use Next.js Image component (`next/image`) for optimized loading
- Implement in the existing `components/hero.tsx` file
- Use React hooks (useState, useEffect) for state management
- Preload the next image to prevent flicker during transitions
- Respect `prefers-reduced-motion` media query - if enabled, show only the first image (hero-image.jpg) and disable animation
- Handle HEIC files gracefully: if browser doesn't support, skip that image with a console warning (don't crash)
- Ensure images cover the full background area (`object-cover`)
- Maintain the existing hero section styling and layout

### Implementation Details
- Use CSS transitions for smooth opacity changes (not animations)
- Layer images with absolute positioning and z-index for crossfade effect
- Current image fades out (opacity 1 → 0) while next image fades in (opacity 0 → 1) simultaneously
- Use `"use client"` directive since this requires client-side state
- Preload images in the background to ensure smooth transitions

### Code Structure
- Define image array at the top of the component for easy editing
- Use clear variable names for timing constants (e.g., `IMAGE_DURATION`, `FADE_DURATION`)
- Add comments explaining the carousel logic
- Keep the existing hero text and layout structure unchanged

## Expected Behavior
1. Page loads showing `hero-image.jpg`
2. After 5-6 seconds, smoothly crossfades to `mountain-bike-backlit.png`
3. Continues through the sequence with smooth transitions
4. After `biking.png`, loops back to `hero-image.jpg`
5. Text remains visible and readable throughout
6. If user has `prefers-reduced-motion` enabled, only shows `hero-image.jpg` statically

