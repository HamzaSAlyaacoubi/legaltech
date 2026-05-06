"use client"
import { useState, useEffect, useRef } from 'react'

interface TypingTextProps {
  phrases: string[]
  typingSpeed?: number      // milliseconds per character (default: 80)
  deletingSpeed?: number    // milliseconds per character when deleting (default: 40)
  pauseTime?: number        // pause after typing complete (default: 2000)
  className?: string
  cursorClassName?: string
}

export default function TypingText({
  phrases,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseTime = 2000,
  className = '',
  cursorClassName = ''
}: TypingTextProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (phrases.length === 0) return

    const currentPhrase = phrases[currentPhraseIndex]

    const handleTyping = () => {
      // If paused, wait before starting to delete
      if (isPaused) {
        timeoutRef.current = setTimeout(() => {
          setIsPaused(false)
          setIsDeleting(true)
        }, pauseTime)
        return
      }

      // Deleting phase
      if (isDeleting) {
        if (currentText.length === 0) {
          // Move to next phrase
          setIsDeleting(false)
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
          return
        }
        // Remove one character
        timeoutRef.current = setTimeout(() => {
          setCurrentText((prev) => prev.slice(0, -1))
        }, deletingSpeed)
        return
      }

      // Typing phase
      if (currentText.length < currentPhrase.length) {
        // Add one character
        timeoutRef.current = setTimeout(() => {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1))
        }, typingSpeed)
      } else {
        // Finished typing, pause before deleting
        setIsPaused(true)
      }
    }

    handleTyping()

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [
    currentText,
    currentPhraseIndex,
    isDeleting,
    isPaused,
    phrases,
    typingSpeed,
    deletingSpeed,
    pauseTime
  ])

  // Get the full phrase and split it to identify the last word
  const currentPhrase = phrases[currentPhraseIndex]
  const phraseWords = currentPhrase.split(' ')
  const lastWordOfPhrase = phraseWords[phraseWords.length - 1]
  const textBeforeLastWord = phraseWords.slice(0, -1).join(' ')

  // Determine how much of the text before the last word is currently typed
  const textBeforeLastWordLength = textBeforeLastWord.length

  // Split what's currently displayed
  let displayBeforeLastWord = ''
  let displayLastWord = ''

  if (currentText.length <= textBeforeLastWordLength) {
    // Still typing the part before the last word
    displayBeforeLastWord = currentText
  } else {
    // Typing or showing the last word
    displayBeforeLastWord = textBeforeLastWord
    // Extract only what's been typed of the last word
    displayLastWord = currentText.substring(textBeforeLastWordLength).trimStart()
  }

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span className="text-current">
        {displayBeforeLastWord}
        {displayBeforeLastWord && displayLastWord && ' '}
        <span className="text-primary">{displayLastWord}</span>
      </span>
      <span
        className={`inline-block w-[2px] h-[1.2em] ml-1 bg-current animate-cursor-blink ${cursorClassName}`}
        aria-hidden="true"
      />
    </span>
  )
}
