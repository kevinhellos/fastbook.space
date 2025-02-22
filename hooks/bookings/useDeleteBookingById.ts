import { db } from "@/config/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export async function useDeleteBookingById(id: string) {
    try {
        const expense = doc(db, "bookings", id);
        await deleteDoc(expense);
    }
    catch (error: any) {
        console.error(error);
    }
}