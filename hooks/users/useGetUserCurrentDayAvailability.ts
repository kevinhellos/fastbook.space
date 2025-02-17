import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function useGetUserCurrentDayAvailability(uid: string) {
    const userSnapshot = await getDoc(doc(db, "users", uid));

    if (userSnapshot.exists()){
        const availability = {
            monday: userSnapshot.data().mondayAvailable,
            tuesday: userSnapshot.data().tuesdayAvailable,
            wednesday: userSnapshot.data().wednesdayAvailable,
            thursday: userSnapshot.data().thursdayAvailable,
            friday: userSnapshot.data().fridayAvailable,
            saturday: userSnapshot.data().saturdayAvailable,
            sunday: userSnapshot.data().sundayAvailable,

            mondayCustomTime: userSnapshot.data().mondayCustomTime,
            tuesdayCustomTime: userSnapshot.data().tuesdayCustomTime,
            wednesdayCustomTime: userSnapshot.data().wednesdayCustomTime,
            thursdayCustomTime: userSnapshot.data().thursdayCustomTime,
            fridayCustomTime: userSnapshot.data().fridayCustomTime,
            saturdayCustomTime: userSnapshot.data().saturdayCustomTime,
            sundayCustomTime: userSnapshot.data().sundayCustomTime,
        };
        
        return availability;
    }

    else {
      console.error(`Failed to retrieve user's day availability data for user uid ${uid}`);
    }
}