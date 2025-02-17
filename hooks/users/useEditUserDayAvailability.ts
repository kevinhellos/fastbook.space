import { db } from "@/config/firebase";
import { doc, updateDoc } from "firebase/firestore";

export async function useEditUserDayAvailability(uid: string, day: string, isAvailable: boolean) {

    try {
        await updateDoc(doc(db, "users", uid), {
            [`${day}Available`]: isAvailable,
        });
    }
    catch (error: any) {
        console.error(`Error: failed to update user's availability for uid ${uid} to the database\n${error}`);
    }
}