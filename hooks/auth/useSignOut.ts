import { Auth, signOut } from "firebase/auth";

export async function useSignOut(auth: Auth) {
    try {
        await signOut(auth);
    } 
    catch (error: any) {
        console.error(error);
    }
}