"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  delay?: number;
}

export function ScrollReveal({ children, className = "", direction = "up", delay = 0 }: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const yOffset = direction === "up" ? 50 : 0;
    const xOffset = direction === "left" ? 50 : direction === "right" ? -50 : 0;

    gsap.fromTo(
      containerRef.current,
      { y: yOffset, x: xOffset, opacity: 0 },
      {
        y: 0,
        x: 0,
        opacity: 1,
        duration: 1.2,
        delay: delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
