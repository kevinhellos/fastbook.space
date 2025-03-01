"use client";

import CenterBrandNavbar from "@/components/CenterBrandNavbar";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const useCenterBrandNavbar = pathname.includes("/u/") || pathname.includes("/booking-confirmation/");

  return (
    <>
      {useCenterBrandNavbar ? <CenterBrandNavbar /> : <Navbar />}
      {children}
    </>
  );
}