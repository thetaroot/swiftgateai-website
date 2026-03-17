'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTypewriterOptions {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseAfterType?: number;
  pauseAfterDelete?: number;
  enabled?: boolean;
}

interface UseTypewriterReturn {
  displayText: string;
  isTyping: boolean;
  cursorVisible: boolean;
}

export function useTypewriter({
  texts,
  typingSpeed = 50,
  deletingSpeed = 25,
  pauseAfterType = 3000,
  pauseAfterDelete = 500,
  enabled = true,
}: UseTypewriterOptions): UseTypewriterReturn {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  const textIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const phaseRef = useRef<'typing' | 'pausing' | 'deleting' | 'waiting'>('waiting');
  const rafIdRef = useRef<number>(0);
  const lastTickRef = useRef(0);
  const cursorIntervalRef = useRef<ReturnType<typeof setInterval>>();

  // Cursor blink - independent interval
  useEffect(() => {
    cursorIntervalRef.current = setInterval(() => {
      setCursorVisible(v => !v);
    }, 530);
    return () => {
      if (cursorIntervalRef.current) clearInterval(cursorIntervalRef.current);
    };
  }, []);

  const tick = useCallback((timestamp: number) => {
    if (!enabled || texts.length === 0) return;

    const currentText = texts[textIndexRef.current % texts.length];

    if (phaseRef.current === 'waiting') {
      phaseRef.current = 'typing';
      charIndexRef.current = 0;
      lastTickRef.current = timestamp;
      setIsTyping(true);
      rafIdRef.current = requestAnimationFrame(tick);
      return;
    }

    if (phaseRef.current === 'typing') {
      const speed = typingSpeed + Math.random() * (typingSpeed * 0.4);
      if (timestamp - lastTickRef.current >= speed) {
        charIndexRef.current++;
        setDisplayText(currentText.slice(0, charIndexRef.current));
        lastTickRef.current = timestamp;

        if (charIndexRef.current >= currentText.length) {
          phaseRef.current = 'pausing';
          setIsTyping(false);
        }
      }
      rafIdRef.current = requestAnimationFrame(tick);
      return;
    }

    if (phaseRef.current === 'pausing') {
      if (timestamp - lastTickRef.current >= pauseAfterType) {
        phaseRef.current = 'deleting';
        lastTickRef.current = timestamp;
        setIsTyping(true);
      }
      rafIdRef.current = requestAnimationFrame(tick);
      return;
    }

    if (phaseRef.current === 'deleting') {
      if (timestamp - lastTickRef.current >= deletingSpeed) {
        charIndexRef.current--;
        setDisplayText(currentText.slice(0, charIndexRef.current));
        lastTickRef.current = timestamp;

        if (charIndexRef.current <= 0) {
          phaseRef.current = 'waiting';
          setIsTyping(false);
          textIndexRef.current = (textIndexRef.current + 1) % texts.length;
          // Small pause before next text
          lastTickRef.current = timestamp;
          setTimeout(() => {
            if (enabled) {
              rafIdRef.current = requestAnimationFrame(tick);
            }
          }, pauseAfterDelete);
          return;
        }
      }
      rafIdRef.current = requestAnimationFrame(tick);
      return;
    }
  }, [enabled, texts, typingSpeed, deletingSpeed, pauseAfterType, pauseAfterDelete]);

  useEffect(() => {
    if (enabled && texts.length > 0) {
      phaseRef.current = 'waiting';
      charIndexRef.current = 0;
      textIndexRef.current = 0;
      setDisplayText('');
      rafIdRef.current = requestAnimationFrame(tick);
    } else {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      setDisplayText('');
      setIsTyping(false);
    }

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [enabled, tick, texts]);

  return { displayText, isTyping, cursorVisible };
}
