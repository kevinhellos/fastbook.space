import Link from "next/link"
import type { Metadata } from "next"
 
export const metadata: Metadata = {
  title: "Fastbook.space",
  description: "Manage Personal Bookings with Ease and Speed!",
  openGraph: {
    images: [{
      url: "/assets/imgs/og.png",
      width: 1200,
      height: 630,
      alt: "OG image"
    }]
  }
}

export default function page() {
  return (
    <>
      <div className="text-center mt-[10vh]">
        <h1 className="lg:text-4xl text-2xl font-medium mb-5">
          Manage Personal Bookings <br />
          with <span className="underline text-blue-700">Ease and Speed!</span>
        </h1>
        <p className="max-w-md mx-auto mb-5">
          Quick and effortless all in one booking system, <br />
          for a seamless experience
        </p>

        <div className="flex mx-auto justify-center gap-3">
          <Link
            href="/dashboard"
            className="fs-btn-primary"
          >
            Get started
          </Link>
          {/* 
            <Link
              href="/events/create"
              className="fs-btn-secondary"
            >
              Join event
            </Link> 
          */}
        </div>

        <img 
          src="/assets/imgs/landing.svg" 
          alt="Man writing on a calendar" 
          className="mx-auto mt-10 w-72 lg:w-96"
        />
        
      </div>
    </>
  )
}
