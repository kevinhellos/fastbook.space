
import { db } from "@/config/firebase";
import { setDoc, doc } from "firebase/firestore"; 

export async function useCreateUserAccount(uid: string, name: string, email: string, photoUrl: string){
    await setDoc(doc(db, "users", uid), {
        name,
        email,
        photoUrl,
        bookingPageIsAvailable: true,
        
        mondayAvailable: true,
        mondayCustomTime: "",

        tuesdayAvailable: true,
        tuesdayCustomTime: "",

        wednesdayAvailable: true,
        wednesdayCustomTime: "",

        thursdayAvailable: true,
        thursdayCustomTime: "",

        fridayAvailable: true,
        fridayCustomTime: "",

        saturdayAvailable: true,
        saturdayCustomTime: "",

        sundayAvailable: true,
        sundayCustomTime: "",
    })
    .then(() => {
        console.log("User account created successfully");
        return uid;
    })
}