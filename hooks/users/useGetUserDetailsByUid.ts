// useGetUserDetailsByUid
import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";

export default async function useGetUserDetailsByUid(uid: string) {
    let user = null;

    const userSnapshot = await getDoc(doc(db, "users", uid));

    if (userSnapshot.exists()) {
      user = userSnapshot.data();
    }

    return user ? user : null;
}