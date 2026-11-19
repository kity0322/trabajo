import { useEffect } from 'react'
import confetti from 'canvas-confetti'

export function useConfettiCelebration(trigger: boolean) {
  useEffect(() => {
    if (!trigger) return

    const colors = ['#D4A017', '#13214A', '#8B1E1E', '#f4d888']
    const duration = 2200
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.6 },
        colors,
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.6 },
        colors,
      })
      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    confetti({
      particleCount: 90,
      spread: 100,
      origin: { y: 0.5 },
      colors,
      startVelocity: 45,
    })
    frame()
  }, [trigger])
}
