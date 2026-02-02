'use client';

import { useState, useRef, useEffect } from 'react';
import { useBackgroundAnimation } from '@/context/BackgroundContext';

export default function ChatWindow() {
  const [message, setMessage] = useState('');
  const [containerBg, setContainerBg] = useState('rgba(229, 225, 216, 0.95)');
  const [borderColor, setBorderColor] = useState('rgba(74, 90, 69, 0.3)');
  const [disclaimerColor, setDisclaimerColor] = useState('rgba(74, 90, 69, 0.5)');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { animationTime } = useBackgroundAnimation();

  // Random function (matches shader)
  const random = (x: number, y: number): number => {
    const dot = x * 12.9898 + y * 78.233;
    return Math.abs(Math.sin(dot) * 43758.5453123 % 1);
  };

  // Noise function (matches shader)
  const noise = (x: number, y: number): number => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const xf = x - xi;
    const yf = y - yi;

    const a = random(xi, yi);
    const b = random(xi + 1, yi);
    const c = random(xi, yi + 1);
    const d = random(xi + 1, yi + 1);

    const u = xf * xf * (3 - 2 * xf);
    const v = yf * yf * (3 - 2 * yf);

    const mixAB = a + (b - a) * u;
    const mixCD = c + (d - c) * u;
    return mixAB + (mixCD - mixAB) * v;
  };

  // FBM (matches shader)
  const fbm = (x: number, y: number): number => {
    let value = 0;
    let amplitude = 0.5;
    let frequency = 0.5;

    for (let i = 0; i < 3; i++) {
      value += amplitude * noise(x * frequency, y * frequency);
      frequency *= 1.5;
      amplitude *= 0.5;
    }
    return value;
  };

  // Calculate background pattern at center
  useEffect(() => {
    const st = { x: 0.5, y: 0.5 };
    const pos = { x: st.x * 1.2, y: st.y * 1.2 };
    const timeSeconds = animationTime / 1000;

    const wave = fbm(
      pos.x + Math.sin(timeSeconds * 0.0002) * 0.3,
      pos.y + Math.cos(timeSeconds * 0.00015) * 0.4
    ) +
    Math.sin(st.x * 2.0 + timeSeconds * 0.0001) * 0.1 +
    Math.cos(st.y * 1.5 - timeSeconds * 0.00012) * 0.1;

    let pattern = wave;
    if (pattern < 0.35) pattern = 0;
    else if (pattern > 0.65) pattern = 1;
    else pattern = (pattern - 0.35) / (0.65 - 0.35);

    // Colors
    const greenColor = { r: 74, g: 90, b: 69 };
    const beigeColor = { r: 229, g: 225, b: 216 };

    // Inverse: when background is green, container is beige (more opaque)
    const containerColor = {
      r: Math.round(beigeColor.r - (beigeColor.r - greenColor.r) * pattern),
      g: Math.round(beigeColor.g - (beigeColor.g - greenColor.g) * pattern),
      b: Math.round(beigeColor.b - (beigeColor.b - greenColor.b) * pattern),
    };

    const borderCol = {
      r: Math.round(greenColor.r + (beigeColor.r - greenColor.r) * pattern),
      g: Math.round(greenColor.g + (beigeColor.g - greenColor.g) * pattern),
      b: Math.round(greenColor.b + (beigeColor.b - greenColor.b) * pattern),
    };

    // Disclaimer text color opposite to container (same as borderCol)
    const disclaimerCol = {
      r: borderCol.r,
      g: borderCol.g,
      b: borderCol.b,
    };

    setContainerBg(`rgba(${containerColor.r}, ${containerColor.g}, ${containerColor.b}, 0.92)`);
    setBorderColor(`rgba(${borderCol.r}, ${borderCol.g}, ${borderCol.b}, 0.4)`);
    setDisclaimerColor(`rgba(${disclaimerCol.r}, ${disclaimerCol.g}, ${disclaimerCol.b}, 0.55)`);
  }, [animationTime]);

  // Set fixed height for 5 lines
  useEffect(() => {
    if (textareaRef.current) {
      const lineHeight = 24;
      const fiveLines = lineHeight * 5 + 16;
      textareaRef.current.style.minHeight = fiveLines + 'px';
      textareaRef.current.style.maxHeight = fiveLines + 'px';
    }
  }, []);

  const handleSend = () => {
    if (message.trim()) {
      console.log('Message sent:', message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto px-4">
      {/* Chat Container - Apple-inspired Design */}
      <div
        className="rounded-3xl p-7 transition-all duration-500 ease-out"
        style={{
          background: containerBg,
          border: `2px solid ${borderColor}`,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: `
            0 20px 60px -15px rgba(0, 0, 0, 0.3),
            0 0 1px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.5)
          `,
        }}
      >

        {/* Input Area */}
        <div className="space-y-4">
          {/* Textarea */}
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Hallo, schön das Sie hier sind. Fragen Sie mich was Sie interessiert..."
              className="w-full bg-white/60 backdrop-blur-md border border-[#4A5A45]/15 rounded-xl px-5 py-4 text-[#1a1a1a] placeholder-[#999]/70 resize-none focus:outline-none focus:ring-2 focus:ring-[#4A5A45]/40 focus:bg-white transition-all duration-200 font-regular text-sm leading-6"
              style={{
                lineHeight: '1.5rem',
                overflowY: 'auto',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
              }}
            />
          </div>

          {/* Send Button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className="group relative px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95 disabled:cursor-not-allowed"
              style={{
                background: message.trim()
                  ? 'linear-gradient(135deg, #4A5A45 0%, #3d4a39 100%)'
                  : 'linear-gradient(135deg, #4A5A45 0%, #3d4a39 100%)',
                color: '#E5E1D8',
                opacity: message.trim() ? 1 : 0.7,
                boxShadow: message.trim() ? '0 8px 16px rgba(74, 90, 69, 0.3)' : '0 4px 12px rgba(74, 90, 69, 0.15)'
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Senden
                <svg
                  className="w-4 h-4 transition-transform group-active:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
