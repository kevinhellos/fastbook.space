"use client"

import { ApprovedBadge, PendingBadge, RejectedBadge } from "@/components/Badges";
import CenterLoader from "@/components/CenterLoader";
import useGetBookingDetailsById from "@/hooks/bookings/useGetBookingDetailsById"
import { CheckCircle } from "lucide-react"
// import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Pageclient({ id } : { id: string }) {

  const getBookingDetailsById = useGetBookingDetailsById;
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  async function loadBookingDetails() {
    const booking = await getBookingDetailsById(id);
    // console.log(booking);
    if (booking) {
      setBookingDetails(booking);
    }
    else {
      setBookingDetails(null);
      toast.error("Invalid booking confirmation link", { duration: 5000 });
    }
  }

  useEffect(() => {
    loadBookingDetails();
  }, []);

  if (bookingDetails !== null) {
    return (
      <>
        <Suspense>
        <div className="mx-auto h-auto max-w-2xl border border-t-green-700 border-t-2 rounded-md mt-0 p-3 shadow-md">
          <span className="flex justify-center mt-3">
            <CheckCircle
              size={30}
              strokeWidth={1.5}
              className="me-2 text-green-700"
            />
          </span>
          <h1 className="text-xl text-center font-medium mt-3 mb-3">
            Booking Success
          </h1>
          <p className="text-center text-sm mt-3">Your booking is successful. Your booking detail is as follows.</p>
  
          <div className="p-7 h-fit">
            <h3 className="mt-5 text-lg font-medium px-3">Booking Details</h3>
            <div>
              <table className="table">
                <tbody>
                  <tr>
                    <td>Booking reference</td>
                    <td>{id}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td>{bookingDetails?.name}</td>
                  </tr>
                  <tr>
                    <td>Contact (email/ phone)</td>
                    <td>{bookingDetails?.contact}</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>{bookingDetails?.date}</td>
                  </tr>
                  <tr>
                    <td>Time</td>
                    <td>{bookingDetails?.time}</td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td>
                      {bookingDetails?.status == "Pending" && (
                        <div 
                          className="tooltip tooltip-bottom cursor-pointer" 
                          data-tip="Your booking is awaiting confirmation from the host. You can check back at this page at a later timing"
                        >
                          <PendingBadge/>
                        </div>
                      )}

                      {bookingDetails?.status == "Approved" && (
                        <div 
                          className="tooltip tooltip-bottom cursor-pointer" 
                          data-tip="Your booking has been approved by the host. The host will be in touch with you soon"
                        >
                          <ApprovedBadge/>
                        </div>
                      )}

                      {bookingDetails?.status == "Rejected" && (
                        <div 
                          className="tooltip tooltip-bottom cursor-pointer" 
                          data-tip="Your booking has been rejected by the host. You can proceed to make a new booking"
                        >
                          <RejectedBadge/>
                        </div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {bookingDetails?.status == "Rejected" && (
              <div className="bg-gray-50 rounded-sm px-3 py-2">
                <span className="text-sm block font-medium">Comment by host:</span>
                <p className="text-sm">
                  {bookingDetails?.commentByHost}
                </p>
              </div>
            )}
          </div>
          
          {bookingDetails?.status == "Rejected" && (
            <button
              type="button"
              className="fs-btn-secondary w-full"
              onClick={() => router.push(`/u/${bookingDetails?.hostId}`)}
            >
              Make another booking
            </button>
          )}
        </div>

        {searchParams.get("mode") == "host" && (
          <div className="w-full bg-purple-100 text-center py-2 fixed bottom-0">
            Viewing as a User
          </div>
        )}
        </Suspense>
      </>
    )
  }
  else {
    return (
      <>
        <Toaster/>
        <CenterLoader/>
      </>
    )
  }

}
