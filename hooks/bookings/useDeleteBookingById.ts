import { db } from "@/config/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export async function useDeleteBookingById(id: string) {
    try {
        const booking = doc(db, "bookings", id);
        await deleteDoc(booking);
    }
    catch (error: any) {
        console.error(error);
    }
}