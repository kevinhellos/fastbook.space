import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function useGetAllHostBookings(currentHostId: string) {
    let bookings: any[] = [];

    try {
        const data = await getDocs(collection(db, "bookings"));
        bookings = data.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
            contact: doc.data().contact,
            date: doc.data().date,
            time: doc.data().time,
            hostId: doc.data().hostId,
            status: doc.data().status,
            commentByHost: doc.data().commentByHost,
            createdOn: doc.data().createdOn,
        }));
        // Filter all bookings to only contain bookings with hostId matching currentHostId
        bookings = bookings.filter((booking: any) => booking.hostId === currentHostId);
    } 
    catch (error: any) {
        console.error(`Error: failed to get all expenses from the database\n${error}`);
    }
    
    return bookings;
}