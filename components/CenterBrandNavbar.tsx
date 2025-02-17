import { NotebookPen } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function CenterBrandNavbar() {
  return (
    <div className="navbar">
      <div className="navbar-start"></div>
      <div className="navbar-center">
        <Link 
          href="/"
          className="flex text-xl font-medium">
          <NotebookPen
            size={30}
            strokeWidth={1.5}
            className="me-2 text-blue-700"
          />
          Fastbook
        </Link>
      </div>
      <div className="navbar-end"></div>
    </div>
  );
}
