import useGetBookingDetailsById from "@/hooks/bookings/useGetBookingDetailsById";
import { NextResponse } from "next/server";

export async function GET( request: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const booking = await useGetBookingDetailsById(id!);
    return new NextResponse(JSON.stringify(booking));
}