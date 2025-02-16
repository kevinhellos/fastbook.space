"use client"

import { auth } from "@/config/firebase"

export default function page() {
  return (
    <>
        <h1 className="lg:text-3xl text-2xl font-medium">
            Profile
        </h1>

        <span className="block mt-5">Photo</span>
        <img 
            className="rounded-full w-20"
            src={auth?.currentUser?.photoURL!}
            alt={`Photo of ${auth?.currentUser?.displayName!}`}
        />

        <label htmlFor="uid" className="block mt-3">Uid</label>
        <input
            name="uid"
            className="px-3.5 py-2 border w-full rounded-md mb-3"
            defaultValue={auth?.currentUser?.uid!}
            disabled
        />

        <label htmlFor="name" className="block mt-3">Name</label>
        <input
            name="name"
            className="px-3.5 py-2 border w-full rounded-md mb-3"
            defaultValue={auth?.currentUser?.displayName!}
            disabled
        />

        <label htmlFor="email" className="block mt-3">Email</label>
        <input
            name="email"
            className="px-3.5 py-2 border w-full rounded-md mb-3"
            defaultValue={auth?.currentUser?.email!}
            disabled
        />
    </>
  )
}
