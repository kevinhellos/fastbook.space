export interface Booking {
    id?: string;
    name: string;
    contact: string;
    date: string;
    time: string;
    purpose: string;
    hostId: string;
    status: string;
    commentByHost: string;
    createdOn: string;
}

export interface User {
    id?: string;
    name: string;
    email: string;
    photoUrl: string;
    mondayAvailable: boolean;
    mondayCustomTime: string;
    tuesdayAvailable: boolean;
    tuesdayCustomTime: string;
    wednesdayAvailable: boolean;
    wednesdayCustomTime: string;
    thursdayAvailable: boolean;
    thursdayCustomTime: string;
    fridayAvailable: boolean;
    fridayCustomTime: string;
    saturdayAvailable: boolean;
    saturdayCustomTime: string;
    sundayAvailable: boolean;
    sundayCustomTime: string;
}