import { db } from "@/config/firebase";
import { doc, updateDoc } from "firebase/firestore";

export async function useEditUserCustomTime(uid: string, day: string, customTime: string) {

    try {
        await updateDoc(doc(db, "users", uid), {
            [`${day}CustomTime`]: customTime,
        });
    }
    catch (error: any) {
        console.error(`Error: failed to update user's custom time for uid ${uid} to the database\n${error}`);
    }
}