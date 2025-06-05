'use client'

import { Container } from "@/shared/helpers/Container";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const links = [
  { label: 'Главная', href: '/' },
  { label: 'Каталог', href: '/catalog' },
  { label: 'Контакты', href: '/contacts' },
];

export default function LinkHeader() {
  const pathname = usePathname();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const activeIndex = links
    .map((link, i) => ({
      index: i,
      matchLength: pathname.startsWith(link.href) ? link.href.length : 0,
    }))
    .reduce((max, current) => (current.matchLength > max.matchLength ? current : max), { index: -1, matchLength: 0 })
    .index;

  useEffect(() => {
    const index = hoverIndex ?? activeIndex;
    const linkEl = linkRefs.current[index];
    if (linkEl) {
      const { offsetLeft, clientWidth } = linkEl;
      setIndicatorStyle({ left: offsetLeft, width: clientWidth });
    }
  }, [hoverIndex, activeIndex, pathname]);

  return (
    <div className="py-4 border-b fixed top-[118px] left-0 right-0 z-20 bg-white">
      <Container>
        <div className="flex justify-between items-center py-2">
          <div
            ref={containerRef}
            className="relative flex w-[83%] font-bold text-[#184363]"
          >
            <div
              className="absolute bottom-[-6px] h-[2px] bg-[#184363] transition-all duration-300 ease-in-out"
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
              }}
            />

            {links.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                ref={(el) => { linkRefs.current[i] = el; }}
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
                className={`px-6 cursor-pointer transition-colors ${
                  i === activeIndex ? 'text-[#184363]' : 'text-[#184363]/70'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
