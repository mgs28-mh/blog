'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setProgress(Math.min(progress, 100));
    };

    const handleScroll = () => {
      requestAnimationFrame(calculateProgress);
    };

    window.addEventListener('scroll', handleScroll);
    calculateProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div 
        className="h-full bg-emerald-500 transition-all duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}