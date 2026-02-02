'use client';

import { useState, useRef, useEffect } from 'react';
import { useBackgroundAnimation } from '@/context/BackgroundContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatWindow() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [containerBg, setContainerBg] = useState('rgba(229, 225, 216, 0.95)');
  const [borderColor, setBorderColor] = useState('rgba(74, 90, 69, 0.3)');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { animationTime } = useBackgroundAnimation();

  // Demo conversation
  const demoConversation: Message[] = [
    { role: 'user', content: 'Hallo! Können Sie mir mehr über Ihre Services erzählen?' },
    { role: 'assistant', content: 'Gerne! Ich biete Full-Service Webentwicklung mit modernsten Technologien wie React, Next.js und TypeScript. Von der initialen Beratung bis zum finalen Launch begleite ich Projekte komplett.' },
    { role: 'user', content: 'Wie lange dauert typischerweise ein Projekt?' },
    { role: 'assistant', content: 'Das hängt stark vom Umfang ab. Ein kleineres Portfolio-Projekt kann in 2-3 Wochen fertig sein, während größere E-Commerce Plattformen 2-3 Monate benötigen. Ich plane immer realistisch und transparent.' },
  ];

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

    // Inverse: when background is green, container is beige
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

    setContainerBg(`rgba(${containerColor.r}, ${containerColor.g}, ${containerColor.b}, 0.95)`);
    setBorderColor(`rgba(${borderCol.r}, ${borderCol.g}, ${borderCol.b}, 0.25)`);
  }, [animationTime]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = Math.min(scrollHeight, 150) + 'px';
    }
  }, [message]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current && isExpanded) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, isExpanded]);

  const handleSend = () => {
    if (message.trim()) {
      // Add user message
      const newMessages = [...messages, { role: 'user' as const, content: message }];
      setMessages(newMessages);
      setMessage('');

      // Expand on first message
      if (!isExpanded) {
        setIsExpanded(true);
        // Load demo conversation after a short delay
        setTimeout(() => {
          setMessages(demoConversation);
        }, 300);
      }

      // Simulate AI response (demo only)
      if (isExpanded) {
        setTimeout(() => {
          setMessages([...newMessages, {
            role: 'assistant' as const,
            content: 'Das ist eine Demo-Antwort. In der finalen Version wird hier die echte AI antworten.'
          }]);
        }, 1000);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && message.trim()) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 flex pointer-events-none z-10 transition-all duration-700 ease-out ${
        isExpanded ? 'items-start pt-12' : 'items-center justify-center'
      }`}
    >
      <div className={`w-full mx-auto px-4 sm:px-6 pointer-events-auto transition-all duration-700 ease-out ${
        isExpanded ? 'max-w-3xl' : 'max-w-xl'
      }`}>
        {/* Chat Container */}
        <div
          className="rounded-2xl transition-all duration-700 ease-out flex flex-col"
          style={{
            background: containerBg,
            border: `1px solid ${borderColor}`,
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            boxShadow: isExpanded
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
              : '0 20px 40px -10px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
            height: isExpanded ? 'calc(100vh - 120px)' : 'auto',
            maxHeight: isExpanded ? 'calc(100vh - 120px)' : 'none',
          }}
        >
          {/* Messages Area - Only show when expanded */}
          {isExpanded && (
            <div className="flex-1 overflow-y-auto px-6 pt-6 pb-4">
              <div className="space-y-8 max-w-2xl mx-auto">
                {messages.map((msg, index) => (
                  <div key={index} className="flex gap-4 group">
                    {/* Dot Indicator */}
                    <div className="pt-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                        style={{
                          background: msg.role === 'user' ? '#4A5A45' : '#43302E',
                          opacity: 0.6,
                        }}
                      />
                    </div>
                    {/* Message Text */}
                    <div className="flex-1 pt-0.5">
                      <p className="text-[#1a1a1a] text-[15px] leading-[1.7] font-normal tracking-[-0.01em]">
                        {msg.content}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}

          {/* Input Area */}
          <div
            className={`transition-all duration-700 ${
              isExpanded
                ? 'px-6 pb-6 pt-4 border-t'
                : 'p-6'
            }`}
            style={{
              borderTopColor: isExpanded ? borderColor : 'transparent',
            }}
          >
            <div className="max-w-2xl mx-auto">
              {/* Input Container */}
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  placeholder="Fragen Sie mich etwas..."
                  className="w-full bg-white/70 backdrop-blur-sm border-0 rounded-xl px-4 py-[13px] pr-14 text-[#1a1a1a] placeholder-[#666]/50 resize-none focus:outline-none focus:ring-1 focus:ring-[#4A5A45]/30 focus:bg-white/80 transition-all duration-200 text-[15px] leading-[1.5] font-normal"
                  style={{
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                    minHeight: '50px',
                    maxHeight: '150px',
                  }}
                />

                {/* Send Button - Icon Style - Aligned to bottom, moves with text */}
                <button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="absolute right-2 bottom-[11px] p-2.5 rounded-lg transition-all duration-200 disabled:opacity-30"
                  style={{
                    background: message.trim()
                      ? 'linear-gradient(135deg, #4A5A45 0%, #3d4a39 100%)'
                      : '#e5e5e5',
                    cursor: message.trim() ? 'pointer' : 'default',
                  }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke={message.trim() ? '#E5E1D8' : '#999'}
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
