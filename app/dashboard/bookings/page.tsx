"use client"

import AvailabilitySettings from "@/components/AvailabilitySettings";
import CenterLoader from "@/components/CenterLoader";
import { auth } from "@/config/firebase";
import { useDeleteBookingById } from "@/hooks/bookings/useDeleteBookingById";
import useUpdateBookingStatusById from "@/hooks/bookings/useUpdateBookingStatusById";
import { useGetAllHostBookings } from "@/hooks/users/useGetAllHostBookings";
import { Booking } from "@/interfaces";
import { Laptop, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function page() {

  const getAllHostBookings = useGetAllHostBookings;
  const updateBookingStatusById = useUpdateBookingStatusById;
  const deleteBookingById = useDeleteBookingById;

  const [bookings, setBookings] = useState<Booking[]>([]);
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
          <Laptop size={20} strokeWidth={1.5} className="me-2" />
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
        <>
          <Toaster/>
          <div className="overflow-x-auto mt-5 shadow-md">
            <table className="table border-t border-b">
              <thead className="bg-gray-50">
                <tr>
                  <th className="font-medium text-black">Booking page</th>
                  <th className="font-medium text-black">Created on</th>
                  <th className="font-medium text-black">Name</th>
                  <th className="font-medium text-black">Contact </th>
                  <th className="font-medium text-black">Date</th>
                  <th className="font-medium text-black">Time</th>
                  <th className="font-medium text-black">Status</th>
                  <th className="font-medium text-black">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                <tr key={index}>
                  <td>
                    <Link 
                      href={`/booking-confirmation/${booking.id}?mode=host`}
                      className="underline hover:text-blue-700"
                      target="_blank"
                    >
                      View
                    </Link>
                  </td>
                  <td>{booking.createdOn}</td>
                  <td>{booking.name}</td>
                  <td>{booking.contact}</td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td>
                    <select 
                      className={`fs-btn-plain font-medium
                        ${booking.status == "Pending" && "bg-yellow-50 text-yellow-700"}
                        ${booking.status == "Approved" && "bg-green-50 text-green-700"}
                        ${booking.status == "Rejected" && "bg-red-50 text-red-700"}
                      `}
                      value={booking.status}
                      onChange={async(e) => {
                        toast.loading("Updating booking status", { duration: 1000 });
                        await updateBookingStatusById(booking.id!, e.target.value)
                        .then(() => {
                          loadAllHostBookings();
                        })
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="flex gap-2">
                    <button 
                      type="button" 
                      className="fs-btn-plain hover:bg-red-50 hover:text-red-700"
                      onClick={async() => {
                        toast.loading("Deleting...", { duration: 1000 })
                        await deleteBookingById(booking.id!)
                        .then(() => {
                          toast.success(`Booking id ${booking.id} by ${booking.name} deleted`);
                          loadAllHostBookings(); // Refetch the data
                        })
                      }}
                    >
                      <Trash
                        size={20}
                        strokeWidth={1.5}
                      />
                    </button>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

    </>
  )
}
