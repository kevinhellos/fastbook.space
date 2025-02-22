"use client"

import { auth } from "@/config/firebase";
import { useEditUserCustomTime } from "@/hooks/users/useEditUserCustomTime";
import { useEditUserDayAvailability } from "@/hooks/users/useEditUserDayAvailability";
import { useGetUserCurrentDayAvailability } from "@/hooks/users/useGetUserCurrentDayAvailability";
import { CalendarCog, Laptop } from "lucide-react";
// import Link from "next/link";
import { useEffect, useRef, useState } from "react"
import toast, { Toaster } from "react-hot-toast";
import { AvailableBadge, UnavailableBadge } from "./Badges";

export default function AvailabilitySettings() {

  const availabilityModal = useRef<HTMLDialogElement>(null);

  const [mondayAvailable, setMondayAvailable] = useState<boolean>(true);
  const [tuesdayAvailable, setTuesdayAvailable] = useState<boolean>(true);
  const [wednesdayAvailable, setWednesdayAvailable] = useState<boolean>(true);
  const [thursdayAvailable, setThursdayAvailable] = useState<boolean>(true);
  const [fridayAvailable, setFridayAvailable] = useState<boolean>(true);
  const [saturdayAvailable, setSaturdayAvailable] = useState<boolean>(true);
  const [sundayAvailable, setSundayAvailable] = useState<boolean>(true);

  const [mondayCustomTime, setMondayCustomTime] = useState<string|null>(null);
  const [tuesdayCustomTime, setTuesdayCustomTime] = useState<string|null>(null);
  const [wednesdayCustomTime, setWednesdayCustomTime] = useState<string|null>(null);
  const [thursdayCustomTime, setThursdayCustomTime] = useState<string|null>(null);
  const [fridayCustomTime, setFridayCustomTime] = useState<string|null>(null);
  const [saturdayCustomTime, setSaturdayCustomTime] = useState<string|null>(null);
  const [sundayCustomTime, setSundayCustomTime] = useState<string|null>(null);

  const [showSaveChangesNotice, setShowSaveChangesNotice] = useState<boolean>(false);

  const getUserCurrentDayAvailability = useGetUserCurrentDayAvailability;
  const editUserCustomTime = useEditUserCustomTime;
  const editUserDayAvailability = useEditUserDayAvailability;

  async function loadUserCurrentDayAvailability() {
    const availability = await getUserCurrentDayAvailability(auth?.currentUser?.uid!);

    if (availability) {
      // console.log(availability);
      setMondayAvailable(availability.monday);
      setTuesdayAvailable(availability.tuesday);
      setWednesdayAvailable(availability.wednesday);
      setThursdayAvailable(availability.thursday);
      setFridayAvailable(availability.friday);
      setSaturdayAvailable(availability.saturday);
      setSundayAvailable(availability.sunday);

      setMondayCustomTime(availability.mondayCustomTime);
      setTuesdayCustomTime(availability.tuesdayCustomTime);
      setWednesdayCustomTime(availability.wednesdayCustomTime);
      setThursdayCustomTime(availability.thursdayCustomTime);
      setFridayCustomTime(availability.fridayCustomTime);
      setSaturdayCustomTime(availability.saturdayCustomTime);
      setSundayCustomTime(availability.sundayCustomTime);
    }
  }

  useEffect(() => {
    loadUserCurrentDayAvailability();
  }, []);

  return (
    <>
      <button
        type="button"
        className="fs-btn-plain flex mt-5"
        onClick={() => availabilityModal?.current?.showModal()}
      >
        <CalendarCog size={20} strokeWidth={1.5} className="me-2" />
        Availability
      </button>

      <dialog id="availability_modal" className="modal" ref={availabilityModal}>
      <Toaster/>
      <div className="modal-box rounded-md max-w-3xl">
        <h3 className="font-medium text-xl">Availability settings</h3>

        <div className="px-3.5 py-2 rounded-sm bg-blue-50 border-l-2 border-l-blue-700 mt-3 text-sm">
          Custom time will only be shown when the status is <span className="font-medium">available</span> 
        </div>

        {showSaveChangesNotice && (
          <div className="px-3.5 py-2 rounded-sm bg-purple-100 border-l-2 border-l-purple-700 mt-5 text-sm">
            You have unsaved changes. Changes you made will not be saved.
          </div>
        )}

        <div className="overflow-x-auto mt-3">
            <table className="table">
              <thead>
                <tr>
                  <th className="font-semibold text-black">Day</th>
                  <th className="font-semibold text-black">Status</th>
                  <th className="font-semibold text-black">Edit Status</th>
                  <th className="font-semibold text-black">Custom time</th>
                </tr>
              </thead>
              <tbody>

                <tr>
                  <td>Monday</td>
                  <td>{mondayAvailable ? <AvailableBadge/> : <UnavailableBadge/>}</td>
                  <td>
                    <select
                      className="fs-btn-plain"
                      value={mondayAvailable ? "Available" : "Unavailable"}
                      onChange={async (e) => {
                        setMondayAvailable(e.target.value === "Available");
                        await editUserDayAvailability(auth?.currentUser?.uid!, "monday", e.target.value === "Available");
                      }}
                    >
                      <option value="Available">Available</option>
                      <option value="Unavailable">Unavailable</option>
                    </select>
                  </td>
                  <td>
                    <input 
                      type="text"
                      className="fs-input"
                      placeholder="Enter custom time"
                      value={mondayCustomTime ? mondayCustomTime : ""}
                      onChange={async (e) => {
                        setMondayCustomTime(e.target.value);
                      }}
                      onClick={() => setShowSaveChangesNotice(true)}
                    />
                    <button
                      type="button"
                      className="fs-btn-secondary ms-2"
                      onClick={async (e) => {
                        await editUserCustomTime(auth?.currentUser?.uid!, "monday", mondayCustomTime!);
                        setShowSaveChangesNotice(false);
                        toast.success("Monday custom time saved", { duration: 2000 });
                      }}
                    >
                      Save
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>Tuesday</td>
                  <td>{tuesdayAvailable ? <AvailableBadge/> : <UnavailableBadge/>}</td>
                  <td>
                    <select
                      className="fs-btn-plain"
                      value={tuesdayAvailable ? "Available" : "Unavailable"}
                      onChange={async (e) => {
                        setTuesdayAvailable(e.target.value === "Available");
                        await editUserDayAvailability(auth?.currentUser?.uid!, "tuesday", e.target.value === "Available");
                      }}
                    >
                      <option value="Available">Available</option>
                      <option value="Unavailable">Unavailable</option>
                    </select>
                  </td>
                  <td>
                    <input 
                      type="text"
                      className="fs-input"
                      placeholder="Enter custom time"
                      value={tuesdayCustomTime ? tuesdayCustomTime : ""}
                      onChange={async (e) => {
                        setTuesdayCustomTime(e.target.value);
                      }}
                      onClick={() => setShowSaveChangesNotice(true)}
                    />
                    <button
                      type="button"
                      className="fs-btn-secondary ms-2"
                      onClick={async (e) => {
                        await editUserCustomTime(auth?.currentUser?.uid!, "tuesday", tuesdayCustomTime!);
                        setShowSaveChangesNotice(false);
                        toast.success("Tuesday custom time saved", { duration: 2000 });
                      }}
                    >
                      Save
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>Wednesday</td>
                  <td>{wednesdayAvailable ? <AvailableBadge/> : <UnavailableBadge/>}</td>
                  <td>
                    <select
                      className="fs-btn-plain"
                      value={wednesdayAvailable ? "Available" : "Unavailable"}
                      onChange={async (e) => {
                        setWednesdayAvailable(e.target.value === "Available");
                        await editUserDayAvailability(auth?.currentUser?.uid!, "wednesday", e.target.value === "Available");
                      }}
                    >
                      <option value="Available">Available</option>
                      <option value="Unavailable">Unavailable</option>
                    </select>
                  </td>
                  <td>
                    <input 
                      type="text"
                      className="fs-input"
                      placeholder="Enter custom time"
                      value={wednesdayCustomTime ? wednesdayCustomTime : ""}
                      onChange={async (e) => {
                        setWednesdayCustomTime(e.target.value);
                      }}
                      onClick={() => setShowSaveChangesNotice(true)}
                    />
                    <button
                      type="button"
                      className="fs-btn-secondary ms-2"
                      onClick={async (e) => {
                        await editUserCustomTime(auth?.currentUser?.uid!, "wednesday", wednesdayCustomTime!);
                        setShowSaveChangesNotice(false);
                        toast.success("Wednesday custom time saved", { duration: 2000 });
                      }}
                    >
                      Save
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>Thursday</td>
                  <td>{thursdayAvailable ? <AvailableBadge/> : <UnavailableBadge/>}</td>
                  <td>
                    <select
                      className="fs-btn-plain"
                      value={thursdayAvailable ? "Available" : "Unavailable"}
                      onChange={async (e) => {
                        setThursdayAvailable(e.target.value === "Available");
                        await editUserDayAvailability(auth?.currentUser?.uid!, "thursday", e.target.value === "Available");
                      }}
                    >
                      <option value="Available">Available</option>
                      <option value="Unavailable">Unavailable</option>
                    </select>
                  </td>
                  <td>
                    <input 
                      type="text"
                      className="fs-input"
                      placeholder="Enter custom time"
                      value={thursdayCustomTime ? thursdayCustomTime : ""}
                      onChange={async (e) => {
                        setThursdayCustomTime(e.target.value);
                      }}
                      onClick={() => setShowSaveChangesNotice(true)}
                    />
                    <button
                      type="button"
                      className="fs-btn-secondary ms-2"
                      onClick={async (e) => {
                        await editUserCustomTime(auth?.currentUser?.uid!, "thursday", thursdayCustomTime!);
                        setShowSaveChangesNotice(false);
                        toast.success("Thursday custom time saved", { duration: 2000 });
                      }}
                    >
                      Save
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>Friday</td>
                  <td>{fridayAvailable ? <AvailableBadge/> : <UnavailableBadge/>}</td>
                  <td>
                    <select
                      className="fs-btn-plain"
                      value={fridayAvailable ? "Available" : "Unavailable"}
                      onChange={async (e) => {
                        setFridayAvailable(e.target.value === "Available");
                        await editUserDayAvailability(auth?.currentUser?.uid!, "friday", e.target.value === "Available");
                      }}
                    >
                      <option value="Available">Available</option>
                      <option value="Unavailable">Unavailable</option>
                    </select>
                  </td>
                  <td>
                    <input 
                      type="text"
                      className="fs-input"
                      placeholder="Enter custom time"
                      value={fridayCustomTime ? fridayCustomTime : ""}
                      onChange={async (e) => {
                        setFridayCustomTime(e.target.value);
                      }}
                      onClick={() => setShowSaveChangesNotice(true)}
                    />
                    <button
                      type="button"
                      className="fs-btn-secondary ms-2"
                      onClick={async (e) => {
                        await editUserCustomTime(auth?.currentUser?.uid!, "friday", fridayCustomTime!);
                        setShowSaveChangesNotice(false);
                        toast.success("Friday custom time saved", { duration: 2000 });
                      }}
                    >
                      Save
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>Saturday</td>
                  <td>{saturdayAvailable ? <AvailableBadge/> : <UnavailableBadge/>}</td>
                  <td>
                    <select
                      className="fs-btn-plain"
                      value={saturdayAvailable ? "Available" : "Unavailable"}
                      onChange={async (e) => {
                        setSaturdayAvailable(e.target.value === "Available");
                        await editUserDayAvailability(auth?.currentUser?.uid!, "saturday", e.target.value === "Available");
                      }}
                    >
                      <option value="Available">Available</option>
                      <option value="Unavailable">Unavailable</option>
                    </select>
                  </td>
                  <td>
                    <input 
                      type="text"
                      className="fs-input"
                      placeholder="Enter custom time"
                      value={saturdayCustomTime ? saturdayCustomTime : ""}
                      onChange={async (e) => {
                        setSaturdayCustomTime(e.target.value);
                      }}
                      onClick={() => setShowSaveChangesNotice(true)}
                    />
                    <button
                      type="button"
                      className="fs-btn-secondary ms-2"
                      onClick={async (e) => {
                        await editUserCustomTime(auth?.currentUser?.uid!, "saturday", saturdayCustomTime!);
                        setShowSaveChangesNotice(false);
                        toast.success("Saturday custom time saved", { duration: 2000 });
                      }}
                    >
                      Save
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>Sunday</td>
                  <td>{sundayAvailable ? <AvailableBadge/> : <UnavailableBadge/>}</td>
                  <td>
                    <select
                      className="fs-btn-plain"
                      value={sundayAvailable ? "Available" : "Unavailable"}
                      onChange={async (e) => {
                        setSundayAvailable(e.target.value === "Available");
                        await editUserDayAvailability(auth?.currentUser?.uid!, "sunday", e.target.value === "Available");
                      }}
                    >
                      <option value="Available">Available</option>
                      <option value="Unavailable">Unavailable</option>
                    </select>
                  </td>
                  <td>
                    <input 
                      type="text"
                      className="fs-input"
                      placeholder="Enter custom time"
                      value={sundayCustomTime ? sundayCustomTime : ""}
                      onChange={async (e) => {
                        setSundayCustomTime(e.target.value);
                      }}
                      onClick={() => setShowSaveChangesNotice(true)}
                    />
                    <button
                      type="button"
                      className="fs-btn-secondary ms-2"
                      onClick={async (e) => {
                        await editUserCustomTime(auth?.currentUser?.uid!, "sunday", sundayCustomTime!);
                        setShowSaveChangesNotice(false);
                        toast.success("Sunday custom time saved", { duration: 2000 });
                      }}
                    >
                      Save
                    </button>
                  </td>
                </tr>

              </tbody>
            </table>
        </div>
          <form method="dialog" className="mt-5">
            <button className="fs-btn-plain float-end">Close</button>
          </form>
      </div>  

      </dialog>
    </>
  )
}
