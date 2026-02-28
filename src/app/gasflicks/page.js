"use client";
import React from "react";
import Header from "@/components/Header";

export default function page() {
  return (
    // Add that gasflicks.com is closed indefinitely
    <>
      <Header />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1>gasflicks.com is closed indefinitely</h1>
        <p>Sorry for the inconvenience. Please check back later.</p>
      </div>
    </>
  );
}
