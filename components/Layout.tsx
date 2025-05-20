import React from "react";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="px-8">
        {children}
      </div>
    </div>
  );
}
