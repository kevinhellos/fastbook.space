"use client";

import { Blocks, BookUser, Calendar, CalendarDays, Menu, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

  const pathname = usePathname();
  // console.log(pathname);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
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
        ></label>
        <ul className="border-r min-h-full bg-white w-64 p-4">
          {/* Sidebar content here */}
          <li className={`fs-sidebar-link ${pathname === "/dashboard" && "fs-sidebar-link-active"}`}>
            <Link href="/dashboard" className="flex">
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
            <Link href="/dashboard/bookings" className="flex">
              <BookUser size={22} strokeWidth={1.5} className="me-2" />
              Bookings
            </Link>
          </li>

          <li className={`fs-sidebar-link ${pathname === "/dashboard/profile" && "fs-sidebar-link-active"}`}>
            <Link href="/dashboard/profile" className="flex">
              <User size={22} strokeWidth={1.5} className="me-2" />
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
