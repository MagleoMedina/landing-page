export const ANIM_DURATION = 600

export const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

export type ScrollCancel = () => void

export function animateScrollTo(
  element: HTMLElement,
  to: number,
  duration: number = ANIM_DURATION,
  onDone?: () => void
): ScrollCancel {
  const start = element.scrollLeft
  const delta = to - start
  let startTime: number | null = null
  let rafId = 0
  let finished = false

  const step = (currentTime: number) => {
    if (!element.isConnected || finished) return
    if (startTime === null) startTime = currentTime
    const progress = Math.min((currentTime - startTime) / duration, 1)
    element.scrollLeft = start + delta * easeInOutCubic(progress)
    if (progress < 1) {
      rafId = requestAnimationFrame(step)
    } else {
      finished = true
      onDone?.()
    }
  }

  rafId = requestAnimationFrame(step)

  return () => {
    if (finished) return
    finished = true
    cancelAnimationFrame(rafId)
  }
}