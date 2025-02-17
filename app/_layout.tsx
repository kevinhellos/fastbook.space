"use client"

import CenterBrandNavbar from "@/components/CenterBrandNavbar";
// import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

export default function Layout({ children } : { children: React.ReactNode}) {

  const pathname = usePathname();

  if (!pathname.includes("/u/")) {
    return (
      <>
        <Navbar/>
        {children}
      </>
    );
  }
  else {
    return (
      <>
        <CenterBrandNavbar/>
        {children}
      </>
    );
  }

}
