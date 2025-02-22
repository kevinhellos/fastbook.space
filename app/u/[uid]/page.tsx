import useGetBookingDetailsById from "@/hooks/bookings/useGetBookingDetailsById";
import Pageclient from "./page.client";
import useGetUserDetailsByUid from "@/hooks/users/useGetUserDetailsByUid";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ uid: string }> }): Promise<Metadata> {

  const hostId = (await params).uid; // Next Js 15, Dynamic APIs are Asynchronous
  const hostDetails = await useGetUserDetailsByUid(hostId); // Get the host details by hostId

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
