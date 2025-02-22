import { Metadata } from "next";
import Pageclient from "./page.client";
import useGetUserDetailsByUid from "@/hooks/users/useGetUserDetailsByUid";
import useGetBookingDetailsById from "@/hooks/bookings/useGetBookingDetailsById";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {

  let hostId = "";

  const bookingId = (await params).id;
  const booking: any = await useGetBookingDetailsById(bookingId); // Get the booking details by bookingId
  
  if (booking) {
    hostId = booking.hostId;
  }

  const hostDetails = await useGetUserDetailsByUid(hostId); // Retrieve the host details

  return {
    title: `${hostDetails?.name}'s Booking`,
    description: `Make a booking for ${hostDetails?.name}'s availability`,
  };

}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  return <Pageclient id={id} />;
}
