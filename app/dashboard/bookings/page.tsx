"use client"

import AvailabilitySettings from "@/components/AvailabilitySettings";
import CenterLoader from "@/components/CenterLoader";
import { auth } from "@/config/firebase";
import { useGetAllHostBookings } from "@/hooks/users/useGetAllHostBookings";
import { Laptop } from "lucide-react";
import { useEffect, useState } from "react";

export default function page() {

  const getAllHostBookings = useGetAllHostBookings;

  const [bookings, setBookings] = useState<any[]>([]);
  const [bookingIsLoading, setBookingIsLoading] = useState<boolean>(false);

  async function loadAllHostBookings() {
    setBookingIsLoading(true);
    const bookings = await getAllHostBookings(auth?.currentUser?.uid!);
    if (bookings) {
      setBookings(bookings);
      setBookingIsLoading(false);
    }
  }

  useEffect(() => {
    loadAllHostBookings();
  }, []);

  return (
    <>

      <h1 className="lg:text-3xl text-2xl font-medium">
        Bookings
      </h1>
      
      {/* <div className="px-3.5 py-2 rounded-sm bg-purple-100 border-l-2 border-l-purple-700 mt-5 text-sm">
        Page is under maintenance. Check back later.
      </div> */}

      <div className="flex gap-3">

        <AvailabilitySettings/>

        <a
          type="button"
          className="fs-btn-plain flex mt-5"
          href={`/u/${auth?.currentUser?.uid}`}
          target="_blank"
        >
          <Laptop size={22} strokeWidth={1.5} className="me-2" />
          Booking page
        </a>
      </div>

      {bookings.length == 0 ? (
        <>
          {bookingIsLoading ? (
            <CenterLoader/>
          ) : (
            <div className="border mt-5 text-center rounded-md">
              <h2 className="text-2xl mt-10 overflow text-gray-700">No bookings for now</h2>
              <p className="text-sm text-gray-700">Have a good day ahead</p>
              <img 
                src="/assets/imgs/empty-state.svg" 
                alt="No bookings" 
                width={200}
                className="mx-auto w-48 lg:w-96"
              />
            </div>
          )}
        </> 
      ) : (
          <div className="overflow-x-auto mt-5">
            <table className="table border-t">
              <thead className="bg-gray-50">
                <tr>
                  <th className="font-medium text-black">Name</th>
                  <th className="font-medium text-black">Contact (email/ mobile phone)</th>
                  <th className="font-medium text-black">Booking date</th>
                  <th className="font-medium text-black">Booking time</th>
                  <th className="font-medium text-black">Status</th>
                  <th className="font-medium text-black">Created on</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.name}</td>
                  <td>{booking.contact}</td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td>{booking.status}</td>
                  <td>{booking.createdOn}</td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
      )}

    </>
  )
}
