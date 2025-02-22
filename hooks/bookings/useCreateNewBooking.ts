
import { db } from "@/config/firebase";
import { getCurrentDateTimeFormatted } from "@/utils";
import { addDoc, collection } from "firebase/firestore"; 

export async function useCreateNewBooking(name: string, contact: string, date: string, time: string, hostId: string) {
    const bookingRef = await addDoc(collection(db, "bookings"), {
        name,
        contact,
        date,
        time,
        hostId,
        status: "Pending", // Status: Pending, Approved, Rejected
        commentByHost: "",
        createdOn: getCurrentDateTimeFormatted()
    });
    return bookingRef.id;
}