import React from "react";

export default function NoBookings({ children } : { children?: React.ReactNode}) {
  return (
    <div className="border mt-5 text-center rounded-md shadow-md">
      <h2 className="text-2xl mt-10 overflow text-gray-700">No bookings for now</h2>
      <p className="text-sm text-gray-700">Have a good day ahead</p>
      {children}
      <img 
        src="/assets/imgs/empty-state.svg" 
        alt="No bookings" 
        width={200}
        className="mx-auto w-48 lg:min-w-80"
      />
    </div>
  )
}
