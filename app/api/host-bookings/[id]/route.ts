import { useGetAllHostBookings } from "@/hooks/users/useGetAllHostBookings";
import { NextResponse } from "next/server";

export async function GET( request: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const bookings = await useGetAllHostBookings(id!);
    return new NextResponse(JSON.stringify(bookings));
}