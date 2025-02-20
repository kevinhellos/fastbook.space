"use client"

import { auth } from "@/config/firebase";
import { useSignInWithGoogle } from "@/hooks/auth/useSignInWithGoogle";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function page() {

  const signInWithGoogle = useSignInWithGoogle;
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // user ? router.push("/dashboard") : router.push("/login")
      user && router.push("/dashboard");
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <div className="text-center mt-[10vh]">
      <h1 className="lg:text-4xl text-2xl font-medium mb-5">Login</h1>
      <p className="max-w-md mx-auto mb-5">Sign in to manage/ join events</p>
      <button 
        type="button" 
        className="fs-btn-plain flex mx-auto"
        onClick={signInWithGoogle}
      >
        <img
          src="/assets/imgs/google.png"
          alt=""
          width={25}
          height={25}
          className="me-2"
        />
        Continue with Google
      </button>
    </div>
  );
}
