"use client";
import React from "react";
import Link from "next/link";
import Button from "@/app/components/Button";

export default function Mission() {
  return (
    <>
      <div>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, sed eum.
        Quisquam consectetur cupiditate possimus facilis suscipit nesciunt
        inventore laborum, est velit beatae nulla, dolorem soluta quas vel
        sapiente aspernatur.
      </div>
     
        <br />
        <Button />
        
        
      <div className="mt-5"></div>
      <Link className="bg-green-500 text-white px-5 py-2" href="/about">
        Go Back
      </Link>
    </>
  );
}
