import { auth } from "@/config/firebase";
import { signInWithPopup, GoogleAuthProvider, UserCredential } from "firebase/auth";

export async function useSignInWithGoogle() {
  const provider: GoogleAuthProvider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result: UserCredential) => {
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      if (!result) {
        console.error("Error: failed logging in...");
      }
      // const token = credential?.accessToken;
      // console.log(token);
      // const user = result.user;
    })
    .catch((error: any) => {
      console.error(error);
      // const errorCode = error.code;
      // const errorMessage = error.message;
    });
}