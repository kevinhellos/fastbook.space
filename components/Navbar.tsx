"use client"

import { auth } from "@/config/firebase";
import { useSignOut } from "@/hooks/auth/useSignOut";
import { onAuthStateChanged } from "firebase/auth";
import { NotebookPen } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  const signOut = useSignOut;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user && setIsAuthenticated(true);
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <div className="navbar shadow-sm border-b px-5">
      <div className="flex-1">
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
      <div className="flex-none">
        {isAuthenticated ? (
          <div className="flex gap-2">
            <Link
              href="/dashboard"
              className="fs-btn-secondary"
            >
              Dashboard
            </Link>
            <button
              className="fs-btn-red"
              onClick={async () => {
                setIsAuthenticated(false);
                await signOut(auth);
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="fs-btn-secondary"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
