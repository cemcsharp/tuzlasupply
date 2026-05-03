"use client";

import { useState, useEffect, useRef } from "react";

interface CounterProps {
  end: string;
  duration?: number;
}

export default function Counter({ end, duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Parse the number and suffix (e.g., "500+" -> 500 and "+")
  const numericEnd = parseInt(end.replace(/[^0-9]/g, "")) || 0;
  const suffix = end.replace(/[0-9]/g, "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const increment = numericEnd / (duration / 16); // 60fps logic
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericEnd) {
        setCount(numericEnd);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, numericEnd, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}
