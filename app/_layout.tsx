"use client"

import CenterBrandNavbar from "@/components/CenterBrandNavbar";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

export default function Layout({ children } : { children: React.ReactNode}) {

  const pathname = usePathname();

  if (!pathname.includes("/u/") && !pathname.includes("/booking-confirmation/")) {
    return (
      <>
        <Navbar/>
        {children}
      </>
    );
  }

  if (pathname.includes("/booking-confirmation/")) {
    return (
      <>
        <CenterBrandNavbar/>
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
