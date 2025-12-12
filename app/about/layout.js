import React from "react";
import Link from "next/link";

export default function AboutLayout({ children }) {
  return (
    <>
      <nav className="mt-10">
        <Link href="/about/mission">Mission</Link> |
        <Link href="/about/vision">Vision</Link>
      </nav>
     
      <div className="mt-10">{children}</div>
    </>
  );
}
