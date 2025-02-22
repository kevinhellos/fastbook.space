import useGetUserDetailsByUid from "@/hooks/users/useGetUserDetailsByUid";
import { NextResponse } from "next/server";

export async function GET( request: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const user = await useGetUserDetailsByUid(id!);
    return new NextResponse(JSON.stringify(user));
}