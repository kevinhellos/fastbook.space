"use client";

import { auth } from "@/config/firebase";
import { useCreateUserAccount } from "@/hooks/users/useCreateUserAccount";
import { useGetAllHostBookings } from "@/hooks/users/useGetAllHostBookings";
import useGetUserDetailsByUid from "@/hooks/users/useGetUserDetailsByUid";
import { BookUser } from "lucide-react";
import { useEffect, useState } from "react";

export default function page() {

    const getUserDetailsByUid = useGetUserDetailsByUid;
    const createUserAccount = useCreateUserAccount;
    const getAllHostBookings = useGetAllHostBookings;

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
    }

    useEffect(() => {
        createUserAccountIfNotExists();
    }, []);

    const [bookings, setBookings] = useState<any>(null);

    async function loadAllHostBookings() {
      const bookings = await getAllHostBookings(auth?.currentUser?.uid!);
      if (bookings) {
        setBookings(bookings);
      }
    }
    useEffect(() => {
      loadAllHostBookings();
    }, []);

    return (
        <>
            {/* <div className="flex justify-between"> */}
                <h1 className="lg:text-3xl text-2xl font-medium">
                    Hello {auth?.currentUser?.displayName}
                </h1>

            {/* <div className="px-3.5 py-2 rounded-sm bg-purple-100 border-l-2 border-l-purple-700 mt-5 text-sm">
                Page is under maintenance. Check back later.
            </div> */}

            {/* </div> */}

            <div className="grid lg:grid-cols-3 lg:gap-5 gap-3 md:grid-cols-2 sm:grid-cols-1 mt-5">

                {/* <div className="border px-3 py-5 rounded-md hover:bg-blue-50 cursor-pointer">
                    <h2 className="text-center text-4xl">0</h2>
                    <h3 className="flex text-xl mt-3 justify-center">
                        <CalendarDays
                            size={22}
                            strokeWidth={1.5}
                            className="text-blue-700 mt-[.2rem] me-2"
                        />
                        Events
                    </h3>
                </div> */}

                <div className="border px-3 py-5 rounded-md hover:bg-blue-50 cursor-pointer shadow-md">
                    <h2 className="text-center text-4xl">
                        {bookings?.length !== null && bookings?.length }
                        {bookings?.length == null && <span className="loading loading-dots loading-md text-blue-700"></span>}
                    </h2>
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
