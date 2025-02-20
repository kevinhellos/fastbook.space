"use client";

import { Blocks, BookUser, Menu, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

  const pathname = usePathname();
  const drawerRef = useRef<HTMLLabelElement>(null);

  return (
    <div className="drawer lg:drawer-open">
      <input 
        id="my-drawer-2" 
        type="checkbox" 
        className="drawer-toggle" 
      />
      <div className="drawer-content p-3">
        <label
          htmlFor="my-drawer-2"
          className="fs-btn-secondary flex w-fit lg:hidden ms-3"
        >
          <Menu size={22} strokeWidth={1.5} className="me-2" />
          Menu
        </label>
        <div className="p-5">{children}</div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
          ref={drawerRef}
        ></label>
        <ul className="border-r min-h-full bg-white w-64 p-4">
          {/* Sidebar content here */}
          <li className={`fs-sidebar-link ${pathname === "/dashboard" && "fs-sidebar-link-active"}`}>
            <Link href="/dashboard" className="flex" onClick={() => drawerRef?.current?.click()}>
              <Blocks size={22} strokeWidth={1.5} className="me-2" />
              Dashboard
            </Link>
          </li>

          {/* <li className={`fs-sidebar-link ${pathname === "/dashboard/events" && "fs-sidebar-link-active"}`}>
            <Link href="/dashboard/events" className="flex">
              <CalendarDays size={22} strokeWidth={1.5} className="me-2" />
              Events
            </Link>
          </li> */}

          <li className={`fs-sidebar-link ${pathname === "/dashboard/bookings" && "fs-sidebar-link-active"}`}>
            <Link href="/dashboard/bookings" className="flex" onClick={() => drawerRef?.current?.click()}>
              <BookUser size={22} strokeWidth={1.5} className="me-2" />
              Bookings
            </Link>
          </li>

          <li className={`fs-sidebar-link ${pathname === "/dashboard/profile" && "fs-sidebar-link-active"}`}>
            <Link href="/dashboard/profile" className="flex" onClick={() => drawerRef?.current?.click()}>
              <User size={22} strokeWidth={1.5} className="me-2" />
              Profile
            </Link>
          </li>

        </ul>
      </div>
    </div>
  );
}
