"use client"

import CenterLoader from "@/components/CenterLoader";
import useGetUserDetailsByUid from "@/hooks/users/useGetUserDetailsByUid";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export function AvailableBadge() {
  return <span className="bg-green-50 text-green-700 px-2 py-1 rounded-md font-medium">Available</span>
}

export function UnavailableBadge() {
    return <span className="bg-red-50 text-red-700 px-2 py-1 rounded-md font-medium">Unavailable</span>
  }

export default function Pageclient({ uid } : { uid: string }) {

    const getdostDetail = useGetUserDetailsByUid;

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [host, setdost] = useState<any>([]);

    async function loadHostDetails() {
        const hostDetail = await getdostDetail(uid);
        if (hostDetail !== null) {
            // console.log(hostDetail);
            setdost(hostDetail);
            setIsLoading(false);
        }
        else {
            // Invalid host uid
            alert("Error: invalid link");
        }
    }

    useEffect(() => {
        loadHostDetails();
    }, []);

    if (isLoading) {
        return <CenterLoader/>
    }

    else {
        return (
            <>
                <Toaster/>
                <div className="mx-auto max-w-2xl border rounded-md mt-10 p-3">
                    <h1 className="text-sm text-center font-medium mt-5">
                        Make a Booking for
                    </h1>
                    <img 
                        className="rounded-full w-20 mx-auto mt-5"
                        src={host.photoUrl}
                        alt={`Photo of ${host?.name}`}
                    />
                    <h2 className="text-center text-lg mb-5 mt-3">{host.name}</h2>
        
                    <div className="space"></div>
        
                    <div className="overflow-x-auto max-w-sm mx-auto mb-5">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>Monday</td>
                                    <td>{host.mondayAvailable ? <AvailableBadge/> : <UnavailableBadge/>}</td>
                                    {/* <td>
                                        <button
                                            type="button"
                                            className="fs-btn-secondary"
                                        >
                                            Book
                                        </button>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>Tuesday</td>
                                    <td>{host.tuesdayAvailable ? <AvailableBadge/> : <UnavailableBadge/>}</td>
                                    {/* <td>
                                        <button
                                            type="button"
                                            className="fs-btn-secondary"
                                        >
                                            Book
                                        </button>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>Wednesday</td>
                                    <td>{host.wednesdayAvailable ? <AvailableBadge/> : <UnavailableBadge/>}</td>
                                    {/* <td>
                                        <button
                                            type="button"
                                            className="fs-btn-secondary"
                                        >
                                            Book
                                        </button>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>Thursday</td>
                                    <td>{host.thursdayAvailable ? <AvailableBadge/> : <UnavailableBadge/>}</td>
                                    {/* <td>
                                        <button
                                            type="button"
                                            className="fs-btn-secondary"
                                        >
                                            Book
                                        </button>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>Friday</td>
                                    <td>{host.fridayAvailable ? <AvailableBadge/> : <UnavailableBadge/>}</td>
                                    {/* <td>
                                        <button
                                            type="button"
                                            className="fs-btn-secondary"
                                        >
                                            Book
                                        </button>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>Saturday</td>
                                    <td>{host.saturdayAvailable ? <AvailableBadge/> : <UnavailableBadge/>}</td>
                                    {/* <td>
                                        <button
                                            type="button"
                                            className="fs-btn-secondary"
                                        >
                                            Book
                                        </button>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>Sunday</td>
                                    <td>{host.sundayAvailable ? <AvailableBadge/> : <UnavailableBadge/>}</td>
                                    {/* <td>
                                        <button
                                            type="button"
                                            className="fs-btn-secondary"
                                        >
                                            Book
                                        </button>
                                    </td> */}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button 
                        type="button"
                        className="fs-btn-primary w-full"
                        onClick={() => {
                            toast.error("Booking error\nBooking is currently not allowed", { position: "top-center", duration: 3000 })
                        }}
                    >
                        Book now
                    </button>
                </div>
            </>
        );
    }
}
