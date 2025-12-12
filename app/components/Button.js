"use client";
import Image from "next/image";
import itachi from "@/app/assets/itachi.jpg";

import React from "react";

export default function Button() {
  return (
    <div className="mt-5">
      <button
        className="bg-green-500 text-white px-5 py-2"
        onClick={() => alert("Button clicked!")}
      >
        Click me
      </button>
      <div className="mt-5">
  
        <Image
          placeholder="blur"
          src={itachi}
          alt="itachi"
         
        />
      </div>
    </div>
  );
}
