"use client"

import { AvailableBadge, UnavailableBadge } from "@/components/Badges";
import CenterLoader from "@/components/CenterLoader";
import { useCreateNewBooking } from "@/hooks/bookings/useCreateNewBooking";
import useGetUserDetailsByUid from "@/hooks/users/useGetUserDetailsByUid";
import { CalendarPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function Pageclient({ uid } : { uid: string }) {

    const getHostDetail = useGetUserDetailsByUid;
    const createNewBooking = useCreateNewBooking;

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [host, setdost] = useState<any>([]);
    const [noOfAvailableDays, setNoOfAvailableDays] = useState<number>(0);

    const bookingModal = useRef<HTMLDialogElement>(null);

    const [name, setName] = useState<string>("");
    const [contact, setContact] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [time, setTime] = useState<string>("");

    const [createBookingIsLoading, setCreateBookingIsLoading] = useState<boolean>(false);
    const [hasError, setHasError] = useState<string|null>(null);

    const router = useRouter();
    
    async function loadHostDetails() {
        const hostDetail = await getHostDetail(uid);
        let noOfAvailableDays = 0;

        if (hostDetail !== null) {
            // console.log(hostDetail);
            setdost(hostDetail);

            if (hostDetail.mondayAvailable) {
                noOfAvailableDays++;
            }
            if (hostDetail.tuesdayAvailable) {
                noOfAvailableDays++;
            }
            if (hostDetail.wednesdayAvailable) {
                noOfAvailableDays++;
            }
            if (hostDetail.thursdayAvailable) {
                noOfAvailableDays++;
            }
            if (hostDetail.fridayAvailable) {
                noOfAvailableDays++;
            }
            if (hostDetail.saturdayAvailable) {
                noOfAvailableDays++;
            }
            if (hostDetail.sundayAvailable) {
                noOfAvailableDays++;
            }

            setNoOfAvailableDays(noOfAvailableDays);
            setIsLoading(false);
        }
        else {
            // Invalid host uid
            alert("Error: invalid link");
        }
    }

    async function createBooking() {
        // loadHostDetails();
        setCreateBookingIsLoading(true);
        setHasError(null); // Reset the error on every submit

        if (name !== "" && contact !== "" && date !== "" && time !== "") {
            const bookingId: string = await createNewBooking(name, contact, date, time, uid);
            if (bookingId) {
                setHasError(null);
                setName("");
                setContact("");
                setDate("");
                setTime("");
                setCreateBookingIsLoading(false);
                bookingModal?.current?.close();
                router.push(`/booking-confirmation/${bookingId}`);
            }
        }
        else {
            setCreateBookingIsLoading(false);
            setHasError("Please complete all fields to submit booking");
        }
    }

    useEffect(() => {
        loadHostDetails();
    }, []);

    if (isLoading) {
        return <div className="mt-[20vh]"><CenterLoader/></div>
    }

    else {
        return (
            <>
                <Toaster/>
                <div className="mx-auto max-w-2xl border rounded-md mt-0 p-3 shadow-md">
                    <h1 className="text-sm text-center font-medium mt-3">
                        Make a Booking for
                    </h1>
                    <img 
                        className="rounded-full w-20 mx-auto mt-5"
                        src={host.photoUrl}
                        alt={`Photo of ${host?.name}`}
                    />
                    <h2 className="text-center text-lg mb-3 mt-3">{host.name}</h2>
                    <h3 className="text-sm text-center">{noOfAvailableDays} {noOfAvailableDays > 1 ? "days" : "day"} available</h3>
        
                    <div className="overflow-x-auto max-w-sm mx-auto mt-5 mb-5">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>Monday</td>
                                    <td>{host.mondayAvailable ? <AvailableBadge/> : <UnavailableBadge/>}</td>
                                    <td>{host.mondayAvailable && host.mondayCustomTime}</td>
                                </tr>
                                <tr>
                                    <td>Tuesday</td>
                                    <td>{host.tuesdayAvailable ? <AvailableBadge/> : <UnavailableBadge/>}</td>
                                    <td>{host.tuesdayAvailable && host.tuesdayCustomTime}</td>
                                </tr>
                                <tr>
                                    <td>Wednesday</td>
                                    <td>{host.wednesdayAvailable ? <AvailableBadge/> : <UnavailableBadge/>}</td>
                                    <td>{host.wednesdayAvailable && host.wednesdayCustomTime}</td>
                                </tr>
                                <tr>
                                    <td>Thursday</td>
                                    <td>{host.thursdayAvailable ? <AvailableBadge/> : <UnavailableBadge/>}</td>
                                    <td>{host.thursdayAvailable && host.thursdayCustomTime}</td>
                                </tr>
                                <tr>
                                    <td>Friday</td>
                                    <td>{host.fridayAvailable ? <AvailableBadge/> : <UnavailableBadge/>}</td>
                                    <td>{host.fridayAvailable && host.fridayCustomTime}</td>
                                </tr>
                                <tr>
                                    <td>Saturday</td>
                                    <td>{host.saturdayAvailable ? <AvailableBadge/> : <UnavailableBadge/>}</td>
                                    <td>{host.saturdayAvailable && host.saturdayCustomTime}</td>
                                </tr>
                                <tr>
                                    <td>Sunday</td>
                                    <td>{host.sundayAvailable ? <AvailableBadge/> : <UnavailableBadge/>}</td>
                                    <td>{host.sundayAvailable && host.sundayCustomTime}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Only show the book button if at least 1 day is available */}
                    {noOfAvailableDays >= 1 ? (
                        <>
                            <button 
                                type="button"
                                className="fs-btn-primary w-full flex justify-center"
                                onClick={() => {
                                    //  toast.error("Booking error\nBooking is currently not allowed", { position: "top-center", duration: 3000 });
                                    loadHostDetails();
                                    bookingModal?.current?.showModal();
                                }}
                            >
                                <CalendarPlus size={22} strokeWidth={1.5} className="me-2" />
                                Book now
                            </button>
                        
                            <dialog id="booking_modal" ref={bookingModal} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box rounded-sm p-7">
                        <h3 className="font-medium text-xl">Book a slot</h3>
                        <p className="py-4 text-sm">Please fill up the following information to complete your booking</p>

                        <div className="px-3.5 py-2 rounded-sm bg-blue-50 border-l-2 border-l-blue-700 mb-5 text-sm">
                            Bookings made outside the availability timing will be <span className="font-medium">cancelled</span> 
                        </div>

                        <label htmlFor="name" className="block">Name</label>
                        <input 
                            type="text" 
                            name="name"
                            placeholder="E.g. John Doe"
                            className="fs-input w-full mb-3"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <label htmlFor="contact" className="block">Contact (email/ mobile phone)</label>
                        <input 
                            type="text" 
                            name="contact"
                            placeholder=""
                            className="fs-input w-full mb-3"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label htmlFor="date" className="block">Date</label>
                                <input 
                                    type="date" 
                                    name="date"
                                    placeholder=""
                                    className="fs-input w-full mb-3"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="time" className="block">Time</label>
                                <input 
                                    type="time" 
                                    name="time"
                                    placeholder=""
                                    className="fs-input w-full mb-3"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                />
                            </div>
                        </div>

                        {hasError !== null && (
                            <div className="px-3.5 py-2 rounded-sm bg-red-50 border-l-2 border-l-red-700 text-red-700 mb-5 mt-2 text-sm">
                                {hasError}
                            </div>
                        )}

                        <div className="mt-5">
                            <button 
                                type="button"
                                className="fs-btn-primary w-full block mb-3"
                                onClick={() => {
                                    // bookingModal?.current?.close();
                                    createBooking();
                                }}
                                disabled={createBookingIsLoading}
                            >
                                {createBookingIsLoading ? "Loading..." : "Submit"}
                            </button>
                            <button 
                                type="button"
                                className="fs-btn-plain w-full block"
                                onClick={() => bookingModal?.current?.close()}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                            </dialog>
                        </>
                    ) : (
                        <button 
                            type="button"
                            className="fs-btn-plain w-full"
                        >
                            No timeslot is currently available for booking
                        </button>
                    )}
                </div>
            </>
        );
    }
}
