'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface BackgroundContextType {
  animationTime: number;
}

const BackgroundContext = createContext<BackgroundContextType>({ animationTime: 0 });

export function BackgroundProvider({ children }: { children: React.ReactNode }) {
  const [animationTime, setAnimationTime] = useState(0);

  useEffect(() => {
    let startTime = Date.now();
    let animationFrame: number;

    const updateTime = () => {
      const currentTime = Date.now() - startTime;
      setAnimationTime(currentTime);
      animationFrame = requestAnimationFrame(updateTime);
    };

    animationFrame = requestAnimationFrame(updateTime);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <BackgroundContext.Provider value={{ animationTime }}>
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackgroundAnimation() {
  return useContext(BackgroundContext);
}
