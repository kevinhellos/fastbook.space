import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";

export default async function useGetBookingDetailsById(id: string) {
    let booking = null;

    const bookingSnapshot = await getDoc(doc(db, "bookings", id));

    if (bookingSnapshot.exists()) {
        booking = bookingSnapshot.data();
    }

    return booking ? booking : null;
}