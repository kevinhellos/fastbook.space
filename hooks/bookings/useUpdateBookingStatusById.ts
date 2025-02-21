import { db } from "@/config/firebase";
import {doc, updateDoc } from "firebase/firestore";

export default async function useUpdateBookingStatusById(id: string, status: string) {
    try {
        const bookingDoc = doc(db, "bookings", id);
        await updateDoc(bookingDoc, {
            status
        });
    }
    catch (error: any) {
        console.error(`Error: failed to update booking id ${id} to the database\n${error}`);
    }
}