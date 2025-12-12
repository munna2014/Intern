import React from "react";
import Link from "next/link";

export default async function BlogDetails({ params }) {
  const { id } = await params;
  return (
    <div>
      <div>BlogDetails</div>
      <Link href="/blogs">Go Back</Link>
      <div className="mt-5">The blog id is : {id}</div>
    </div>
  );
}
