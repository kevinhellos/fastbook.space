import { db } from "@/config/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default async function useUpdateBookingStatusById(id: string, status: string) {
    try {
        await updateDoc(doc(db, "bookings", id), {
            status
        });
    }
    catch (error: any) {
        console.error(`Error: failed to update booking id ${id} to the database\n${error}`);
    }
}