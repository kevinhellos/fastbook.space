"use client";

import { auth } from "@/config/firebase";
import { useCreateUserAccount } from "@/hooks/users/useCreateUserAccount";
import useGetUserDetailsByUid from "@/hooks/users/useGetUserDetailsByUid";
import { BookUser, CalendarDays } from "lucide-react";
import { useEffect } from "react";

export default function page() {

    const getUserDetailsByUid = useGetUserDetailsByUid;
    const createUserAccount = useCreateUserAccount;

    // Create a user if the current user uid is not in the users collection
    async function createUserAccountIfNotExists() {
        const user = await getUserDetailsByUid(auth?.currentUser?.uid!);
        
        if (user === null) {
            createUserAccount(
                auth?.currentUser?.uid!,
                auth?.currentUser?.displayName!,
                auth?.currentUser?.email!,
                auth?.currentUser?.photoURL!
            );
        }
        // else {
        //     console.log("User already exists");
        // }
    }

    useEffect(() => {
        createUserAccountIfNotExists();
    }, []);

    return (
        <>
            
            {/* <div className="flex justify-between"> */}
                <h1 className="lg:text-3xl text-2xl font-medium">
                    Hello {auth?.currentUser?.displayName}
                </h1>

                {/* <Link
                    href="/dashboard/create-event"
                    className="fs-btn-primary float-end"
                >
                    Create event
                </Link> */}

          <div className="px-3.5 py-2 rounded-sm bg-purple-100 border-l-2 border-l-purple-700 mt-5 text-sm">
            Page is under maintenance. Check back later.
          </div>

            {/* </div> */}

            <div className="grid lg:grid-cols-3 lg:gap-5 gap-3 md:grid-cols-2 sm:grid-cols-1 mt-5">

                <div className="border px-3 py-5 rounded-md hover:bg-blue-50 cursor-pointer">
                    <h2 className="text-center text-4xl">0</h2>
                    <h3 className="flex text-xl mt-3 justify-center">
                        <CalendarDays
                            size={22}
                            strokeWidth={1.5}
                            className="text-blue-700 mt-[.2rem] me-2"
                        />
                        Events
                    </h3>
                </div>

                <div className="border px-3 py-5 rounded-md hover:bg-blue-50 cursor-pointer">
                    <h2 className="text-center text-4xl">0</h2>
                    <h3 className="flex text-xl mt-3 justify-center">
                        <BookUser
                            size={22}
                            strokeWidth={1.5}
                            className="text-blue-700 mt-[.2rem] me-2"
                        />
                        Bookings
                    </h3>
                </div>

            </div>
        </>
  );
}
