"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const left = (
    <div className="flex items-center space-x-4">
      <Link 
        href="/" 
        className={`font-bold no-underline text-black inline-block ${
          isActive("/") ? "text-gray-500" : "hover:text-gray-600"
        }`}
      >
        Feed
      </Link>
    </div>
  );

  return (
    <nav className="flex p-8 items-center">
      {left}
    </nav>
  );
}
