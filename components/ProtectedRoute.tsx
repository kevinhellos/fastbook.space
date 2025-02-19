"use client"

import { useEffect, useState, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/config/firebase";
import { Unsubscribe, onAuthStateChanged } from "firebase/auth";
import CenterLoader from "./CenterLoader";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // setTimeout(() => {
      const unsubscribe: Unsubscribe = onAuthStateChanged(auth, (user) => {
        !user ? router.push(`/login?next=${pathname}`) : setIsAuthenticated(true);
        setLoading(false);
      });
      return () => unsubscribe();
    // }, 2000);
  }, [router]);

  if (loading) {
    return <CenterLoader/>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default ProtectedRoute;