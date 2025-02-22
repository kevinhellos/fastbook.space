import useGetBookingDetailsById from "@/hooks/bookings/useGetBookingDetailsById";
import Pageclient from "./page.client";
import useGetUserDetailsByUid from "@/hooks/users/useGetUserDetailsByUid";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {

  let hostId = "";

  const bookingId = (await params).id; // Next Js 15, Dynamic APIs are Asynchronous
  const booking: any = await useGetBookingDetailsById(bookingId); // Get the booking details by bookingId
  
  if (booking) {
    hostId = booking.hostId;
  }

  const hostDetails = await useGetUserDetailsByUid(hostId); // Retrieve the host details

  return {
    title: `${hostDetails?.name}'s Booking`,
    description: `Make a booking for ${hostDetails?.name}'s availability`,
    openGraph: {
      images: [{
        url: hostDetails?.photoUrl,
        width: 1200,
        height: 630,
        alt: `${hostDetails?.name}'s Booking`
      }]
    }
  };

}


export default async function Page({ params }: { params: Promise<{ uid: string }> }) {
  const uid = (await params).uid;
  return <Pageclient uid={uid} />;
}
