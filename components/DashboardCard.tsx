export default function DashboardCard({ children } : { children: React.ReactNode}) {
  return (
    <div className="border px-3 py-5 rounded-md cursor-pointer shadow-md">
        {children}
    </div>
  )
}
