import { CalendarCheck, CalendarX, CheckCircle, Clock, X } from "lucide-react";

export function PendingBadge() {
  return (
      <span className="fs-badge-yellow">
        <Clock size={18} strokeWidth={1.5} className="me-1" />
        Pending
      </span>
  );
}

export function ApprovedBadge() {
  return (
      <span className="fs-badge-green">
        <CheckCircle size={18} strokeWidth={1.5} className="me-1" />
        Approved
      </span>
  );
}

export function RejectedBadge() {
  return (
      <span className="fs-badge-red">
        <X size={18} strokeWidth={1.5} className="me-1" />
        Rejected
      </span>
  );
}

export function AvailableBadge() {
    return (
        <span className="bg-green-50 text-green-700 px-2 py-1 rounded-md font-medium flex w-fit">
            <CalendarCheck size={18} strokeWidth={1.5} className="me-1" />
            Available
        </span>
    );
}

export function UnavailableBadge() {
    return (
        <span className="bg-red-50 text-red-700 px-2 py-1 rounded-md font-medium flex w-fit">
            <CalendarX size={18} strokeWidth={1.5} className="me-1" />
            Unavailable
        </span>
    );
}
